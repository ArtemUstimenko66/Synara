import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { Announcement } from './announcement.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/entities/users.entity';
import { PartialUpdateAnnouncementDto } from './dtos/update-announcement.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';

@ApiTags('Announcement')
@Controller('announcements')
@UseGuards(JwtAuthGuard)
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @ApiOperation({ summary: 'Create a new announcement' })
  @ApiResponse({ status: 201, type: Announcement })
  @Post()
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    @Req() req: Request,
  ): Promise<Announcement> {
    const user = req.user as User;
    return this.announcementService.create(createAnnouncementDto, user);
  }

  @ApiOperation({ summary: 'Get all announcements' })
  @ApiResponse({ status: 200, type: [Announcement] })
  @Get()
  findAll(): Promise<Announcement[]> {
    return this.announcementService.findAll();
  }

  @ApiOperation({ summary: 'Get an announcement by ID' })
  @ApiResponse({ status: 200, type: Announcement })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Announcement> {
    return this.announcementService.findOne(+id);
  }

  @ApiOperation({ summary: 'Partially update an announcement' })
  @ApiResponse({ status: 200, type: Announcement })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAnnouncementDto: PartialUpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.announcementService.update(+id, updateAnnouncementDto);
  }

  @ApiOperation({ summary: 'Delete an announcement by ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.announcementService.remove(+id);
  }
}
