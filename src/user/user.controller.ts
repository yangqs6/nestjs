import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/guard';


@Controller('users')
export class UserController {

    @UseGuards(JwtGuard)
    @Get("me")
    // getMe(@Req() req: Request){
    //     console.log(req.user)
    //     return "user info"
    // }
    getMe(
        @GetUser() user: User,
        @GetUser("email") email: string,
    ){
        console.log(email)
        
       return user;
    }


}
