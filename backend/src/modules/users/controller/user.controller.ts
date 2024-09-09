import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import {VictimService} from "../services/victim.service";

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

  @Get(':id/coordinates')
  async getVictimCoordinates(@Param('id') id: number) {
    const coordinates  = await this.victimService.getVictimCoordinates(id);
    return coordinates;
  }
}
