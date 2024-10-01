import {
  Body,
  Controller, Delete,
  Get,
  Param, Patch,
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
import {User} from "../users/entities/users.entity";

@ApiTags('Gatherings')
@Controller('gatherings')
@UseGuards(JwtAuthGuard)
export class GatheringsController {
  constructor(private readonly gatheringService: GatheringsService) {}

  @ApiOperation({ summary: 'Create a new gathering' })
  @ApiResponse({ status: 201, type: Gatherings })
  @Post()
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
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ) {
    const options: FindGatheringsOptions = {
      query,
      limit,
      offset,
      sortOrder,
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
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAnnouncementDto: CreateUpdateGatheringDto,
  ): Promise<Gatherings> {
    return this.gatheringService.update(+id, updateAnnouncementDto);
  }

  @ApiOperation({ summary: 'Delete a gathering by ID' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.gatheringService.delete(+id);
  }
}
