import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfirmIpnService {
  private startDate = new Date(1899, 11, 31);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async checkUserIPNByBirth(ipn: string, birth: Date) {
    if (ipn.length != 10 && ipn.length != 12) {
      throw new BadRequestException('Incorrect ipn');
    }

    const days = Math.floor(
      (birth.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24),
    );
    if (ipn.startsWith(days.toString())) {
      return 'valid';
    } else {
      return 'invalid';
    }
  }
}
