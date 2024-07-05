import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import {AuthDto} from "./dto/auth.dto"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // body decorator vs Req decorator 
    @Post('signup')
    signin(@Body() dto: AuthDto){
        // console.log(1)
        return this.authService.signup(dto);
    }

    @Post('signin')
    signup(@Body() dto: AuthDto) {
        return this.authService.signin();
    }
}
