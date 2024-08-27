import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { SendEmailModule } from '../email/send-email/send-email.module';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    forwardRef(() => UsersModule),
    forwardRef(() => SendEmailModule),
    forwardRef(() => PasswordModule),
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
