import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TwilioService } from './twilio.service';
import { Cache } from 'cache-manager';

@Injectable()
export class SmsService {
  constructor(
    private twilioService: TwilioService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(phoneNumber: string): Promise<void> {
    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.cacheManager.set(
      phoneNumber,
      JSON.stringify({ code, expiresAt }),
      600,
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
    return true;
  }
}
