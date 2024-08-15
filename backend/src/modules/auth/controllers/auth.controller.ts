import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoginUserDto } from '../../users/dtos/login-user.dto';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { Roles } from '../roles.decorator';
import { Role } from '../../users/role.enum';
import { RoleGuard } from '../guards/roles.guard';
import { Response, Request } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, type: 'Bearer Token' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.authService.login(loginUserDto);

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: false,
      maxAge: 604800000,
    });
    res
      .status(201)
      .send({ message: 'Logged in successfully', access_token, refresh_token });
  }

  @Post('/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Refresh token not provided',
      });
    }

    try {
      const { access_token } =
        await this.authService.refreshToken(refreshToken);

      res.cookie('accessToken', access_token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      return res.status(HttpStatus.OK).json({ access_token });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Invalid refresh token',
      });
    }
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, type: User })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.Volunteer)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Logout' })
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send({ message: 'Logged out successfully' });
  }
}
