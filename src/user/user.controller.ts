import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {

    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getMe(@Req() req: Request){
        // console.log("111111")
        // console.log(req.body)
        console.log(req)
        return req.body;
        // return "user info"
    }
}
