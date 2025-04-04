import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query,
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
import { EnumValidationPipe } from './enum-validation.pipe';
import { TypeHelp } from './type-help.enum';
import { FindAnnouncementsOptions } from './announcement.service';

@ApiTags('Announcement')
@Controller('api/announcements')
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

  @ApiOperation({
    summary: 'Find announcements with filters, search and sorting',
  })
  @ApiResponse({ status: 200, type: [Announcement] })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Volunteer, Role.Victim, Role.Guest, Role.Admin)
  @Get('/')
  getAllAnnouncements(
      @Req() req: Request,
      @Query('query') query?: string,
    @Query('type', new EnumValidationPipe(TypeHelp)) types?: TypeHelp[],
    @Query('limit') limit = 12,
    @Query('offset') offset = 0,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    @Query('isUrgent') isUrgent?: boolean,

  ) {
    const options: FindAnnouncementsOptions = {
      query,
      types,
      sortOrder,
      limit,
      offset,
      isUrgent
    };
    const user = req.user;
    const announcements = this.announcementService.findAnnouncements(options, user);
    return announcements;
  }

  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post('block-announcement/:id')
  async blockAnnouncement(@Param('id', ParseIntPipe) id: number) {
    return this.announcementService.blockAnnouncement(id);
  }

  @Get('/completed')
  @ApiOperation({ summary: 'Get completed announcements for current user' })
  @ApiResponse({ status: 200, type: [Announcement] })
  getCompletedAnnouncements(@Req() req: Request): Promise<Announcement[]> {
    const user = req.user as User;
    return this.announcementService.findCompletedAnnouncementsForUser(user.id);
  }

  @Get("/completed/:idVolunteer")
  @ApiOperation({ summary: 'Get completed announcements by the volunteer, who completed them' })
  @ApiResponse({ status: 200, type: [Announcement] })
  getCompletedAnnouncementsByVolunteer(@Param('idVolunteer') id: number): Promise<Announcement[]> {
    return this.announcementService.getCompletedAnnouncementsByVolunteer(id);
  }

  @Get('/favorite')
  @ApiOperation({ summary: 'Get completed announcements for current user' })
  @ApiResponse({ status: 200, type: [Announcement] })
  getFavoriteAnnouncements(@Req() req: Request): Promise<Announcement[]> {
    const user = req.user as User;
    return this.announcementService.findFavoriteAnnouncementsForUser(user.id);
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

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark announcement as completed' })
  @ApiResponse({ status: 200, type: Announcement })
  markAnnouncementAsCompleted(@Param('id') id: number, @Body("volunteerWhoComplete") volunteerWhoCompleted: User) : Promise<Announcement> {
    return this.announcementService.markAnnouncementAsCompleted(id, volunteerWhoCompleted);
  }


  @Patch(':id/favorite')
  @ApiOperation({ summary: 'Mark announcement as favorite' })
  @ApiResponse({ status: 200, type: Announcement })
  markAnnouncementAsFavorite(@Param('id') id: number) : Promise<Announcement> {
    return this.announcementService.markAnnouncementAsFavorite(id);
  }

  @Patch(':id/increment-views')
  @ApiOperation({ summary: 'Increment Views' })
  @ApiResponse({ status: 200, type: Announcement })
  incrementViews(@Param('id') id: number) : Promise<Announcement> {
    return this.announcementService.incrementViewsCount(id);
  }

  @Patch(':id/increment-responses')
  @ApiOperation({ summary: 'Increment Responses' })
  @ApiResponse({ status: 200, type: Announcement })
  incrementResponses(@Param('id') id: number) : Promise<Announcement> {
    return this.announcementService.incrementResponsesCount(id);
  }


}
