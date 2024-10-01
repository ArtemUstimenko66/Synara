import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/entities/users.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { PetitionService } from './petition.service';
import {CreatePetitionDto} from "./dtos/create-petition.dto";
import {Petition} from "./petition.entity";
@ApiTags('Petition')
@Controller('api/petitions')
@UseGuards(JwtAuthGuard)
export class PetitionController {
    constructor(private readonly petitionService: PetitionService) {}

    @ApiOperation({ summary: 'Create a new announcement' })
    @ApiResponse({ status: 201, type: Petition })
    @Post()
    @Roles(Role.Volunteer, Role.Victim, Role.Guest)
    create(
        @Body() createPetitionDto: CreatePetitionDto,
        @Req() req: Request,
    ): Promise<Petition> {
        const user = req.user as User;
        return this.petitionService.create(createPetitionDto, user);
    }

    // @ApiOperation({
    //     summary: 'Find announcements with filters, search and sorting',
    // })
    // @ApiResponse({ status: 200, type: [Announcement] })
    // @Get('/')
    // getAllAnnouncements(
    //     @Query('query') query?: string,
    //     @Query('type', new EnumValidationPipe(TypeHelp)) types?: TypeHelp[],
    //     @Query('limit') limit = 12,
    //     @Query('offset') offset = 0,
    //     @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
    //     @Query('isUrgent') isUrgent?: boolean,
    //     // radius
    // ) {
    //     const options: FindAnnouncementsOptions = {
    //         query,
    //         types,
    //         sortOrder,
    //         limit,
    //         offset,
    //         isUrgent,
    //     };
    //     const announcements = this.announcementService.findAnnouncements(options);
    //     return announcements;
    // }

    @ApiOperation({ summary: 'Get an announcement by ID' })
    @ApiResponse({ status: 200, type: Petition })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Petition> {
        return this.petitionService.findOne(+id);
    }

    // @ApiOperation({ summary: 'Partially update an announcement' })
    // @ApiResponse({ status: 200, type: Announcement })
    // @Patch(':id')
    // update(
    //     @Param('id') id: number,
    //     @Body() updateAnnouncementDto: PartialUpdateAnnouncementDto,
    // ): Promise<Announcement> {
    //     return this.announcementService.update(+id, updateAnnouncementDto);
    // }

    // @ApiOperation({ summary: 'Delete an announcement by ID' })
    // @ApiResponse({ status: 204 })
    // @Delete(':id')
    // remove(@Param('id') id: string): Promise<void> {
    //     return this.announcementService.remove(+id);
    // }
}
