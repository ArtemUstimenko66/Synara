import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGoogleService } from './auth-google.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth-google')
export class AuthGoogleController {
  constructor(private authService: AuthGoogleService) {}

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async authGoogle() {}

  @Get('/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.signIn(
        req.user,
      );

      res.cookie('accessToken', accessToken, {
        maxAge: 2592000000,
        //sameSite: 'none', // ???
        secure: false,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 604800000,
      });

      return res.redirect('http://localhost:5173/profile');
    } catch (error) {
      console.error('Error in Google callback:', error.stack);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Authentication failed' });
    }
  }
}
