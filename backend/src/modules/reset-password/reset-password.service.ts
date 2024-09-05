import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import VerificationTokenPayload from '../email/confirm-email/intefaces/verificationTokenPayload.inteface';
import SendEmailService from '../email/send-email/services/send-email.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { PasswordService } from '../util-password/password.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: SendEmailService,
    private readonly passwordService: PasswordService,

    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async sendEmailForResettingPassword(email: string) {
    const userExist = await this.userRepository.findOneBy({ email });
    if (!userExist) {
      throw new BadRequestException('User does not exist');
    }

    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_RESET_PSW_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_RESET_PSW_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('EMAIL_RESET_PSW_CONFIRMATION_URL')}?token=${token}`;

    const text = `To change a password, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Resetting password',
      text,
    });
  }

  async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get(
          'JWT_RESET_PSW_VERIFICATION_TOKEN_SECRET',
        ),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Password-resetting token expired');
      }
      throw new BadRequestException('Bad password-resetting token');
    }
  }

  async resetPassword(resetPasswordDTO: ResetPasswordDto) {
    try {
      const user = await this.userRepository.findOneBy({
        email: resetPasswordDTO.email,
      });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      user.password = await this.passwordService.hashPassword(
        resetPasswordDTO.password,
      );

      await this.userRepository.save(user);
      return 'reseted';
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to reset user password',
      );
    }
  }
}
