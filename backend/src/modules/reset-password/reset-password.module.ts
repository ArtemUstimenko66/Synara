import { Module } from '@nestjs/common';
import { UsersModule } from '../users/modules/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { SendEmailModule } from '../email/send-email/send-email.module';
import { PasswordModule } from '../util-password/password.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    UsersModule,
    SendEmailModule,
    PasswordModule,
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
