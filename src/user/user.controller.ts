import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {

    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getMe(@Req() req: Request){
        console.log(req.user)
        
        // console.log("111111")
        // console.log(req.body)
        // console.log("---------------------")
        // console.log(req)
        // console.log("-----------------------!!!!!!!!!!!")
        // return req.user;
        // console.log(req.json)
        

        return "user info"
    }
}
