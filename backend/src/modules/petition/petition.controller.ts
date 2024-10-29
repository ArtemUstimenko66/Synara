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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/entities/users.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { FindPetitionOptions, PetitionService } from './petition.service';
import { CreatePetitionDto } from "./dtos/create-petition.dto";
import { Petition } from "./petition.entity";
import { PetitionTopic } from "./enums/petition-topic.enum";
import { EnumValidationPipe } from "../announcement/enum-validation.pipe";
import {PetitionType} from "./enums/petition-type.enum";
import {Announcement} from "../announcement/announcement.entity";
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

    @ApiOperation({
        summary: 'Find announcements with filters, search and sorting',
    })
    @ApiResponse({ status: 200, type: [Petition] })
    @Get('/')
    @Roles(Role.Volunteer, Role.Victim, Role.Guest, Role.Admin)
    @UseGuards(JwtAuthGuard)
    getAllAnnouncements(
        @Req() req: Request,
        @Query('query') query?: string,
        @Query('topic', new EnumValidationPipe(PetitionTopic)) topics?: PetitionTopic[],
        @Query('types', new EnumValidationPipe(PetitionType)) types?: PetitionType[],
        @Query('title') title?: string,
        @Query('limit') limit = 12,
        @Query('offset') offset = 0,
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
        @Query('sortField') sortField: 'creationDate' | 'deadline' = 'creationDate',
    ) {
        const options: FindPetitionOptions = {
            query,
            topics,
            types,
            title,
            sortOrder,
            sortField,
            limit,
            offset,
        };
        const user = req.user;

        const petitions = this.petitionService.findPetitions(options, user);

        return petitions;
    }

    // @Get('favorites')
    // @ApiOperation({ summary: 'Get favorite petitions' })
    // @ApiResponse({ status: 200, type: [Petition] })
    // getFavoritePetitions() : Promise<Petition[]> {
    //     return this.petitionService.findFavoritePetitions();
    // }

    @ApiOperation({ summary: 'Get an announcement by ID' })
    @ApiResponse({ status: 200, type: [Petition] })
    @Get('/user/:id')
    findPetitionsByUserId(@Param('id') id: number): Promise<Petition[]> {
        return this.petitionService.findPetitionsByUserId(id);
    }

    @Get('/completed')
    @ApiOperation({ summary: 'Get completed petitions for current user' })
    @ApiResponse({ status: 200, type: [Petition] })
    getCompletedPetitions(@Req() req: Request): Promise<Petition[]> {
        const user = req.user as User;
        return this.petitionService.findCompletedPetitionsForUser(user.id);
    }

    @Get('/favorite')
    @ApiOperation({ summary: 'Get completed petitions for current user' })
    @ApiResponse({ status: 200, type: [Petition] })
    getFavoritePetitions(@Req() req: Request): Promise<Petition[]> {
        const user = req.user as User;
        return this.petitionService.findFavoritePetitionsForUser(user.id);
    }

    @ApiResponse({ status: 200, type: User })
    @UseGuards(JwtAuthGuard)
    @Post('block-petition/:id')
    async blockGathering(@Param('id', ParseIntPipe) id: number) {
        return this.petitionService.blockPetition(id);
    }

    @ApiOperation({ summary: 'Delete a petition by ID' })
    @ApiResponse({ status: 204 })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.petitionService.delete(+id);
    }



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

    @Patch(':id/complete')
    @ApiOperation({ summary: 'Mark petition as completed' })
    @ApiResponse({ status: 200, type: Petition })
    markPetitionAsCompleted(@Param('id') id: number) : Promise<Petition> {
        return this.petitionService.markPetitionAsCompleted(id);
    }

    @Patch(':id/favorite')
    @ApiOperation({ summary: 'Mark petition as favorite' })
    @ApiResponse({ status: 200, type: Petition })
    markPetitionAsFavorite(@Param('id') id: number) : Promise<Petition> {
        return this.petitionService.markPetitionAsFavorite(id);
    }
}