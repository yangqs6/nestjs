import { Module } from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtStrategy } from "./strategy";


@Module({
    imports: [PrismaModule,JwtModule.register({})],
    controllers: [AuthController],
    providers:[AuthService,JwtStrategy],
})
export class AuthModule {}