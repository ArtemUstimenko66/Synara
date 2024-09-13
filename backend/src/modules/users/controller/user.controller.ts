import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { VictimService } from '../services/victim.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UsersService,
    private victimService: VictimService,
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('coordinates-by-city')
  async getVictimCoordinates(@Query('city') city: string) {
    return this.victimService.findVictimsByCity(city);
  }

  @Get('users-by-radius')
  async getVictimsByRadius(
      @Query('radius') radius: number,
      @Query('city') city: string,
  ) {
    const decodedCity = decodeURIComponent(city);
    return this.victimService.getUsersByRadius(radius, decodedCity);
  }

  @Get()
  async getUsers() {
    return this.userService.findAll();
  }
}
