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

      return this.generateJwt({
        id: userExist.id,
        email: userExist.email,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to sign in user');
    }
  }

  async registerUser(user: User) {
    try {
      console.log('Registering user with data:', user); // Для отладки

      // Создаем нового пользователя и устанавливаем необходимые поля
      const newUser = this.userRepository.create(user);
      newUser.password = await this.passwordService.hashPassword(
        this.generateRandomPassword(),
      );
      console.log('New user before saving:', newUser); // Для отладки

      await this.userRepository.save(newUser);

      console.log('User saved successfully:', newUser); // Для отладки

      return this.generateJwt({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.error('Error registering user:', error); // Для отладки
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
