import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { EmailConfirmationService } from '../services/email-confirmation.service';
import { Response } from 'express';

@Controller('confirmation-email')
// @UseInterceptors(ClassSerializerInterceptor )
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('/confirm')
  async confirm(@Query('token') token: string, @Res() res: Response) {
    const email =
      await this.emailConfirmationService.decodeConfirmationToken(token);
    await this.emailConfirmationService.confirmEmail(email);
    return res.status(HttpStatus.OK).send({ message: `${email} confirmed` });
  }

  @Post('/resend-confirmation-link')
  async resendConfirmationLink(
    @Body('email') email: string,
    @Res() res: Response,
  ) {
    const result =
      await this.emailConfirmationService.resendConfirmationLink(email);
    return res.status(HttpStatus.OK).send({ message: `${email} ${result}` });
  }
}
