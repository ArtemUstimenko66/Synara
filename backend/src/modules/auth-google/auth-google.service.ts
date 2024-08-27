import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthGoogleService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private passwordService: PasswordService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate JWT');
    }
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated!');
    }

    try {
      const userExist = await this.findUserByEmail(user.email);

      if (!userExist) {
        return this.registerUser(user);
      }

      return this.getTokens(userExist);
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign in user');
    }
  }

  async registerUser(user: User) {
    try {
      const newUser = this.userRepository.create(user);
      newUser.password = await this.passwordService.hashPassword(
        this.generateRandomPassword(),
      );
      //  newUser.username = user.email.split('@')[0];
      await this.userRepository.save(newUser);

      return this.getTokens(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  getTokens(user: User) {
    const accessToken = this.generateJwt({
      id: user.id,
      email: user.email,
      roles: [user.role],
    });

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        roles: [user.role],
      },
      { expiresIn: '7d', secret: 'JWT_SECRET_REFRESH' },
    );

    return { accessToken, refreshToken };
  }

  generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }
}
