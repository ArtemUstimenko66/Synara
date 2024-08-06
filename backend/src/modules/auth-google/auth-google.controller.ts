import {Controller, Get, HttpStatus, Req, Res, UseGuards,} from '@nestjs/common';
import { Response } from 'express';
import {AuthGoogleService} from "./auth-google.service";
import {GoogleOauthGuard} from "./guards/google-oauth.guard";


@Controller("auth-google")
export class AuthGoogleController{
    constructor(private authService : AuthGoogleService) {
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async authGoogle(){

    }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res : Response){
        const token = await this.authService.signIn(req.user);

        res.cookie('access_token', token, {
            maxAge: 2592000000,
            sameSite: true,
            secure: false,
        });

        return res.status(HttpStatus.OK);

    }

}