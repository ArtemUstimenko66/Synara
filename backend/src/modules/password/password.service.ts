import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      parseInt(this.configService.get('SALT'), 10),
    );
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
