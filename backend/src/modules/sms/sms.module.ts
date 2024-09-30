import { forwardRef, Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { TwilioService } from './twilio.service';
import { SmsController } from './sms.controller';
import { CacheModule } from '../../cache.module';
import { UsersModule } from '../users/modules/users.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CacheModule, UsersModule, forwardRef(() => AuthModule)],
  controllers: [SmsController],
  providers: [SmsService, TwilioService, JwtService],
  exports: [SmsService, TwilioService],
})
export class SmsModule {}
