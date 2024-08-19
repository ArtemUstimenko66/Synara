import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { LoginUserDto } from '../../users/dtos/login-user.dto';
import { User } from '../../users/entities/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phoneNumber,
      roles: [user.role],
    };

    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: 'JWT_SECRET_REFRESH',
    });

    return { access_token, refresh_token };
  }

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, phoneNumber, role } = createUserDto;

    const user = await this.userService.create({
      username,
      email,
      password,
      phoneNumber,
      role,
    });

    const { password: _, ...result } = user;
    return { ...result, message: 'User registered successfully.' };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: 'JWT_SECRET_REFRESH',
      });
      const user = await this.userService.findByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { access_token } = await this.generateTokens(user);

      console.log(
        'Token refreshed successfully, new access_token:',
        access_token,
      );
      return { access_token };
    } catch (error) {
      console.log('Error during token refresh:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
