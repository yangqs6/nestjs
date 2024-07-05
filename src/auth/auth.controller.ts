import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import {AuthDto} from "./dto/auth.dto"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // body decorator vs Req decorator 
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto.email);
        console.log(dto.password)
        return this.authService.signup();
    }

    @Post('signin')
    signin(@Req() req: Request) {
        console.log(req.body);
        return this.authService.signin();
    }
}
