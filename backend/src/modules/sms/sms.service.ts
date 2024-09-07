import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { UsersService } from '../users/services/users.service';
import { Cache } from 'cache-manager';

@Injectable()
export class SmsService {
  private readonly RESEND_INTERVAL = 30 * 1000;
  constructor(
    private twilioService: TwilioService,
    private userService: UsersService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(phoneNumber: string): Promise<void> {
    const now = new Date().getTime();
    const lastSent = await this.cacheManager.get<number>(
      `${phoneNumber}_lastSent`,
    );

    if (lastSent && now - lastSent < this.RESEND_INTERVAL) {
      throw new BadRequestException(
        'You can request a new code only every 30 seconds',
      );
    }

    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.cacheManager.set(
      phoneNumber,
      JSON.stringify({ code, expiresAt }),
      600,
    );

    await this.cacheManager.set(
      `${phoneNumber}_lastSent`,
      now,
      this.RESEND_INTERVAL / 1000,
    );

    await this.twilioService.sendSms(
      phoneNumber,
      `Your verification code: ${code}`,
    );
  }

  async validateCode(phoneNumber: string, code: string): Promise<boolean> {
    const record = await this.cacheManager.get<string>(phoneNumber);

    if (!record) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    const { code: storedCode, expiresAt } = JSON.parse(record);
    if (storedCode !== code || new Date() > new Date(expiresAt)) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    await this.cacheManager.del(phoneNumber);

    await this.userService.updatePhoneVerificationStatus(phoneNumber, true);
    return true;
  }
}
