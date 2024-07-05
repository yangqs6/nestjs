import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt"){
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: 
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET")
        })
    }


//    async validate(payload: {sub:number; email:string;}){
//         console.log("hihihihi")
//         const user = 
//             await this.prisma.user.findUnique({
//             where:{
//                 id: payload.sub
//             }
//         })
//         delete user.hash;
//         console.log("hihihihi")
//         console.log(user)
//         return user
//     }


    async validate(payload: { sub: number; email: string }) {
        // console.log(req)
        console.log('Payload:', payload);

        const user = await this.prisma.user.findUnique({
        where: {
            id: payload.sub,
        },
        });

        if (!user) {
        throw new UnauthorizedException();
        }

        // req.user = user; // 设置 req.user
        return user;
        // return "hello"
    }
}