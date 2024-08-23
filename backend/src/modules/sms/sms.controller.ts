import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { UsersService } from '../users/services/users.service';
import { AuthService } from '../auth/services/auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sms')
@Controller('sms')
export class SmsController {
  constructor(
    private smsService: SmsService,
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // @Post('send-code')
  // @HttpCode(200)
  // async sendCode(@Body('phoneNumber') phoneNumber: string) {
  //   await this.smsService.sendVerificationCode(phoneNumber);
  //   return { message: 'Verification code sent successfully' };
  // }

  @Post('send-code')
  @HttpCode(200)
  async sendCode(@Body('phoneNumber') phoneNumber: string) {
    await this.smsService.sendVerificationCode(phoneNumber);
    return { message: 'Verification code sent successfully' };
  }

  @Post('verify-code')
  @HttpCode(200)
  async verifyCode(
    @Body() { phoneNumber, code }: { phoneNumber: string; code: string },
    @Res() res: Response,
  ) {
    const isValid = this.smsService.validateCode(phoneNumber, code);

    if (isValid) {
      const user = await this.userService.findUserByPhoneNumber(phoneNumber);
      if (!user) {
        throw new BadRequestException('User not found');
      }

      const tokens = await this.authService.generateTokens(user);

      res.cookie('accessToken', tokens.access_token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });
      res.cookie('refreshToken', tokens.refresh_token, {
        httpOnly: true,
        secure: false,
        maxAge: 604800000,
      });
      return res
        .status(200)
        .send({ message: 'Phone number verified successfully', ...tokens });
    } else {
      throw new BadRequestException('Verification failed');
    }
  }
}
