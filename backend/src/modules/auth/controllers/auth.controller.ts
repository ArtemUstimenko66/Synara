import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
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
import { Role } from '../../users/enums/role.enum';
import { RoleGuard } from '../guards/roles.guard';
import { Response, Request } from 'express';
import { CreateVolunteerDto } from '../../users/dtos/create-volunteer.dto';
import { CreateVictimDto } from '../../users/dtos/create-victim.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, type: 'Bearer Token' })
  @UseGuards(LocalAuthGuard)
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.authService.login(loginUserDto);

    res.cookie('accessToken', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 604800000,
      sameSite: 'none',
    });
    res
      .status(201)
      .send({ message: 'Logged in successfully', access_token, refresh_token });
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, type: User })
  @Post('/register')
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Body('volunteerDetails') createVolunteerDto: CreateVolunteerDto,
    @Body('victimDetails') createVictimDto: CreateVictimDto,
  ) {
    return await this.authService.register(
      createUserDto,
      createVolunteerDto,
      createVictimDto,
    );
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({ status: 200, type: 'Bearer Token' })
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

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.authService.getUserById(id);
  }

  @ApiOperation({ summary: 'Logout' })
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send({ message: 'Logged out successfully' });
  }

  //Twitter auth
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuth(@Req() req: Request) {}

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const tokens = await this.authService.generateTokens(user);

    res.cookie('accessToken', tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: 'none',
    });

    res.cookie('refreshToken', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 604800000,
      sameSite: 'none',
    });
    res.redirect('synara.help/profile');
  }
}
