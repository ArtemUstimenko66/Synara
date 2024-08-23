import { forwardRef, Module } from '@nestjs/common';
import { EmailConfirmationService } from './services/email-confirmation.service';
import { ConfigModule } from '@nestjs/config';
import { SendEmailModule } from '../send-email/send-email.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersModule } from '../../users/users.module';
import { EmailConfirmationController } from './controllers/email-confirmation.controller';
import { SmsModule } from '../../sms/sms.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule,
    forwardRef(() => SendEmailModule),
    forwardRef(() => UsersModule),
    forwardRef(() => SmsModule),
  ],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService, JwtAuthGuard],
  exports: [EmailConfirmationService],
})
export class ConfirmEmailModule {}
