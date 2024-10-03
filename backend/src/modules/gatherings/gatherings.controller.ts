import {
  Body,
  Controller, Delete,
  Get,
  Param, ParseArrayPipe, Patch,
  Post,
  Query, Req,
  UseGuards,
} from '@nestjs/common';
import { GatheringsService } from './gatherings.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUpdateGatheringDto } from './dtos/create-update-gathering.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { Gatherings } from './entity/gatherings.entity';
import { FindGatheringsOptions } from './interfaces/find-gathering-options.interface';
import { Request } from 'express';
import { User } from "../users/entities/users.entity";
import { TypeEnding } from "./enums/TypeEnding";

@ApiTags('Gatherings')
@Controller('api/gatherings')

export class GatheringsController {
  constructor(private readonly gatheringService: GatheringsService) {}


  @ApiOperation({ summary: 'Create a new gathering' })
  @ApiResponse({ status: 201, type: Gatherings })
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  create(
      @Body() createGatheringDto: CreateUpdateGatheringDto,
      @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.gatheringService.create(createGatheringDto, user);
  }

  @ApiOperation({
    summary: 'Find gatherings with filters, search and sorting',
  })
  @ApiResponse({ status: 200, type: [Gatherings] })
  @Get('/')
  async getAllGatherings(
      @Query('query') query?: string,
      @Query('limit') limit = 12,
      @Query('offset') offset = 0,
      @Query('isUrgent') isUrgent?: boolean,
      @Query('moneyTo') moneyTo?: number,
      @Query('moneyFrom') moneyFrom?: number,
      @Query('typeEnding', new ParseArrayPipe({ items: String, optional: true }))
          typeEnding?: TypeEnding[],
      @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    const options: FindGatheringsOptions = {
      query,
      limit,
      offset,
      sortOrder,
      isUrgent,
      moneyFrom,
      moneyTo,
      typeEnding,
    };
    return this.gatheringService.findGatherings(options);
  }

  @ApiOperation({ summary: 'Get an gathering by ID' })
  @ApiResponse({ status: 200, type: Gatherings })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gatherings> {
    return this.gatheringService.findOne(+id);
  }

  @ApiOperation({ summary: 'Partially update a gathering by ID' })
  @ApiResponse({ status: 200, type: Gatherings })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
      @Param('id') id: number,
      @Body() updateAnnouncementDto: CreateUpdateGatheringDto,
  ): Promise<Gatherings> {
    return this.gatheringService.update(+id, updateAnnouncementDto);
  }

  @ApiOperation({ summary: 'Delete a gathering by ID' })
  @ApiResponse({ status: 204 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.gatheringService.delete(+id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark gathering as completed' })
  @ApiResponse({ status: 200, type: Gatherings })
  markGatheringsAsCompleted(@Param('id') id: number) : Promise<Gatherings> {
    return this.gatheringService.markGatheringsAsCompleted(id);
  }

  @Patch(':id/favorite')
  @ApiOperation({ summary: 'Mark gathering as favorite' })
  @ApiResponse({ status: 200, type: Gatherings })
  markGatheringsAsFavorite(@Param('id') id: number) : Promise<Gatherings> {
    return this.gatheringService.markGatheringsAsFavorite(id);
  }
}