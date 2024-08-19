import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from '../intefaces/verificationTokenPayload.inteface';
import SendEmailService from '../../send-email/services/send-email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: SendEmailService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_EMAIL_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async resendConfirmationLink(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (user.isConfirmedEmail) {
        throw new BadRequestException('This email has been confirmed already');
        // return " has been confirmed already";
      }

      await this.sendVerificationLink(user.email);
      return ' get confirmation link';
    } catch {}
  }

  async confirmEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user.isConfirmedEmail) {
        throw new BadRequestException('This email has been confirmed already');
      }
      await this.userRepository.update(
        { email },
        {
          isConfirmedEmail: true,
        },
      );
    } catch {}
  }
}
