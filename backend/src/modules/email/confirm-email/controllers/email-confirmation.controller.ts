import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { Response } from 'express';
import { UsersService } from '../../../users/services/users.service';
import { SmsService } from '../../../sms/sms.service';

@Controller('api/confirmation-email')
// @UseInterceptors(ClassSerializerInterceptor )
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly userService: UsersService,
    private readonly smsService: SmsService,
  ) {}

  @Post('/send-confirmation-link')
  async sendConfirmationLink(@Body('email') email: string) {
    await this.emailConfirmationService.sendVerificationLink(email);
  }

  @Get('/confirm')
  async confirm(@Query('token') token: string, @Res() res: Response) {
    const email =
      await this.emailConfirmationService.decodeConfirmationToken(token);
    await this.emailConfirmationService.confirmEmail(email);

    //const user = await this.userService.findByEmail(email);
    // if (user && user.phoneNumber) {
    //   await this.smsService.sendVerificationCode(user.phoneNumber);
    // }
    return res.redirect('http://localhost:5173/home');
  }
}
