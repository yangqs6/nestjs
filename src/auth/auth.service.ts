import { ForbiddenException, Injectable } from "@nestjs/common";

import { User,Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService, 
        private config: ConfigService) {}
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            })
            delete user.hash;
            return this.signToken(user.id, user.email);
            
        } catch(error){
            if (error instanceof PrismaClientKnownRequestError){
                if (error.code == "P2002"){
                    throw new ForbiddenException(
                        "credentials taken prisma a a a"
                    );
                }
            }
            throw error;
        }
        // return {msg:"sign in111"}
    }
    async signin(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (!user) 
            throw new ForbiddenException(
            "Credentials incorrect: user exists ",
            );
        
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new ForbiddenException(
                "Credentials incorrect: password not correct",
                );
        delete user.hash;
        // return user;
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<string>{
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get("JWT_SECRET")
        return this.jwt.signAsync(payload,{
            expiresIn: "15m",
            secret: secret,
        })
    }
}