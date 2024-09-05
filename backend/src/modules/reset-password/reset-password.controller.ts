import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Response } from 'express';

@Controller('reset')
export class ResetPasswordController {
  constructor(private readonly profileService: ResetPasswordService) {}

  @Post('send-email-reset-password')
  async sendEmailForResettingPassword(@Body('email') email: string) {
    return await this.profileService.sendEmailForResettingPassword(email);
  }

  @Get('allow-reset-password')
  async allowResettingPassword(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const email = await this.profileService.decodeToken(token);
      if (email) {
        return res.redirect(
          `http://localhost:5173/new-password?token=${token}`,
        );
      }
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDto) {
    return await this.profileService.resetPassword(resetPasswordDTO);
  }
}
