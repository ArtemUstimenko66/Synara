import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGoogleService {
  private readonly logger = new Logger(AuthGoogleService.name); // Инициализация логгера

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  generateJwt(payload) {
    try {
      return this.jwtService.sign(payload);
    } catch (error) {
      this.logger.error('Error generating JWT', error.stack);
      throw new InternalServerErrorException('Failed to generate JWT');
    }
  }

  async signIn(user) {
    if (!user) {
      this.logger.warn('Unauthenticated user attempt');
      throw new BadRequestException('Unauthenticated!');
    }

    try {
      const userExist = await this.findUserByEmail(user.email);

      if (!userExist) {
        this.logger.log(
          `User with email ${user.email} not found. Registering new user.`,
        );
        return this.registerUser(user);
      }

      this.logger.log(`User with email ${user.email} found. Signing in.`);
      return this.generateJwt({
        sub: userExist.id,
        username: userExist.username,
        email: userExist.email,
      });
    } catch (error) {
      this.logger.error('Error during sign in', error.stack);
      throw new InternalServerErrorException('Failed to sign in user');
    }
  }

  async registerUser(user: User) {
    try {
      const newUser = this.userRepository.create(user);
      newUser.password = await this.hashPassword(this.generateRandomPassword());
      newUser.username = user.email.split('@')[0]; //generateFromEmail(user.email, 5);
      await this.userRepository.save(newUser);

      return this.generateJwt({
        sub: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async hashPassword(password: string): Promise<string> {
    // console.log("Salt: ", this.configService.get("SALT"))
    const salt = await bcrypt.genSalt(
      parseInt(this.configService.get('SALT'), 10),
    );
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  async findUserByEmail(email: string) {
    try {
      this.logger.log(`Looking for user with email: ${email}`);
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        this.logger.warn(`No user found with email: ${email}`);
        return null;
      }

      this.logger.log(`User found with email: ${email}`);
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by email: ${email}`, error.stack);
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }
}
