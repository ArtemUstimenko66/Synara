import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SendEmailService from './services/send-email.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [SendEmailService],
  exports: [SendEmailService],
})
export class SendEmailModule {}
