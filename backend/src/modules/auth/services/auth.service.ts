import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { LoginUserDto } from '../../users/dtos/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    const access_token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: [user.role],
    });
    const refresh_token = this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: [user.role],
      },
      { expiresIn: '7d', secret: 'JWT_SECRET_REFRESH' },
    );

    console.log('Login successful, access_token:', access_token);
    return { access_token, refresh_token };
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
      const access_token = this.jwtService.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: [user.role],
      });

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
