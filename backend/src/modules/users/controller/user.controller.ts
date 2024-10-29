import {
  Body,
  Controller, Delete,
  Get,
  Param, ParseIntPipe, Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors, UsePipes,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { VictimService } from '../services/victim.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {VolunteersEntity} from "../entities/volunteers.entity";
import {FindVolunteersOptions, VolunteersService} from "../services/volunteer.service";
import {SupportType} from "../enums/support-type.enum";
import {EnumValidationPipe} from "../../announcement/enum-validation.pipe";
import {GenderType} from "../enums/gender.enum";
import {UpdateUserDto} from "../dtos/update-user.dto";
import {UpdateVictimDto} from "../dtos/update-victim.dto";
import {UpdateVolunteerDto} from "../dtos/update-volunteer.dto";

@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(
    private userService: UsersService,
    private victimService: VictimService,
    private volunteerService: VolunteersService
  ) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/coordinates-by-city')
  async getVictimCoordinates(@Query('city') city: string) {
    return this.victimService.findVictimsByCity(city);
  }

  @Get('/users-by-radius')
  async getVictimsByRadius(
      @Query('radius') radius: number,
      @Query('city') city: string,
  ) {
    const decodedCity = decodeURIComponent(city);
    return this.victimService.getUsersByRadius(radius, decodedCity);
  }

  @ApiResponse({ status: 200, type: [VolunteersEntity] })
  @Get('/volunteer')
  getAllVolunteers(
      @Query('name') name?: string,
      @Query('supports', new EnumValidationPipe(SupportType)) supports?: SupportType[],
      @Query('gender') gender?: GenderType,
      @Query('minAge') minAge?: number,
      @Query('maxAge') maxAge?: number,
      @Query('limit') limit = 12,
      @Query('offset') offset = 0,
      @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    const options: FindVolunteersOptions = {
      name,
      supports,
      gender,
      minAge,
      maxAge,
      limit,
      offset,
      sortOrder,
    }
    const volunteers = this.volunteerService.findVolunteers(options);
    return volunteers;
  }

  @ApiResponse({ status: 200, type: VolunteersEntity })
  @Get('/volunteer/:id')
  async findVolunteerById(@Param('id') id: number): Promise<VolunteersEntity> {
    return this.volunteerService.findVolunteerById(id);
  }

  @Get()
  async getUsers(@Query('limit') limit = 12, @Query('role') role= 'volunteer', @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',) {
    const options = {
      limit,
      role,
      sortOrder,
    };
    return this.userService.findAll(options);
  }

  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('block-user/:id')
  async blockUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.blockUser(id);
  }


  @ApiResponse({ status: 200, type: VolunteersEntity })
  @Get('/user/:id')
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @ApiResponse({ status: 200, type: VolunteersEntity })
  @Patch("volunteer/:id")
  @UseGuards(JwtAuthGuard)
  async recordModeratorAnswer(@Body() updateVolunteer : UpdateVolunteerDto, @Param("id", ParseIntPipe) id : number){
    return this.volunteerService.updateVolunteer(updateVolunteer, id)
  }

  @ApiResponse({ status: 200, type: VolunteersEntity })
  @Patch("victim/:id")
  @UseGuards(JwtAuthGuard)
  async updateVictim(@Body() updateVictim : UpdateVictimDto, @Param("id", ParseIntPipe) id : number){
    return this.victimService.updateVictim(updateVictim, id)
  }


  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.delete(+id);
  }



  @UseGuards(JwtAuthGuard)
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(userId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async updateUser(
      @Param('id') userId: number,
      @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Get(':id/rating')
  async calculateVolunteerRating(@Param('id') id: number) : Promise<{ rating: number }> {
    const rating = await this.volunteerService.calculateVolunteerRating(id);
    return { rating };
  }
}
