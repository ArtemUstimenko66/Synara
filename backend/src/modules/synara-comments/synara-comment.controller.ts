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
import { SynaraCommentService } from './synara-comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SynaraCommentCreateDto } from './dto/synara-comment-create.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SynaraComment } from './entity/synara-comment.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { User } from '../users/entities/users.entity';
import { Request } from 'express';
import { SynaraCommentUpdateDto } from './dto/synara-comment-update.dto';

@Controller('api/synara-comments')
@UseGuards(JwtAuthGuard)
export class SynaraCommentController {
  constructor(private readonly serviceSynaraComment: SynaraCommentService) {}

  @ApiOperation({ summary: 'Create a new comment of Synara' })
  @ApiResponse({ status: 201, type: SynaraComment })
  @Post()
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  create(
    @Body() createcommentDto: SynaraCommentCreateDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.serviceSynaraComment.create(createcommentDto, user);
  }

  @ApiOperation({ summary: 'Get all comments of Synara' })
  @ApiResponse({ status: 200, type: [SynaraComment] })
  @Get()
  getAll(): Promise<SynaraComment[]> {
    return this.serviceSynaraComment.getAll();
  }

  @ApiOperation({ summary: 'Update comment of Synara' })
  @ApiResponse({ status: 200, type: SynaraComment })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateComment: SynaraCommentUpdateDto,
  ) {
    return this.serviceSynaraComment.update(id, updateComment);
  }

  @ApiOperation({ summary: 'Delete comment of Synara' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  deleteComment(@Param('id') id: number): Promise<void> {
    return this.serviceSynaraComment.delete(id);
  }
}
