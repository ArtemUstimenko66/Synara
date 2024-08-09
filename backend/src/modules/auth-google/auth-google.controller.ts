import {Controller, Get, HttpStatus, Req, Res, UseGuards,} from '@nestjs/common';
import { Response } from 'express';
import {AuthGoogleService} from "./auth-google.service";
import {GoogleOauthGuard} from "./guards/google-oauth.guard";


@Controller("auth-google")
export class AuthGoogleController{
    constructor(private authService : AuthGoogleService) {
    }

    @Get('/google')
    @UseGuards(GoogleOauthGuard)
    async authGoogle(){

    }

    @Get('/google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res : Response) {
        try {
            const token = await this.authService.signIn(req.user);

            res.cookie('access_token', token, {
                maxAge: 2592000000,
                sameSite: true,
                secure: false,
            });

            return res.status(HttpStatus.OK).send({message: 'Authentication successful', token});
        }
        catch(error){
            console.error('Error in Google callback:', error.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Authentication failed' });
        }
    }

}