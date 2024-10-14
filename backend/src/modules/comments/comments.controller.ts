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
import { CommentService } from './comments.service';
import { CommentsCreateDto } from './dto/comments-create.dto';
import { User } from '../users/entities/users.entity';
import { Comment } from './entity/comments.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { CommentsUpdateDto } from './dto/comments-update.dto';

@Controller('api/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  @Roles(Role.Volunteer, Role.Victim, Role.Guest)
  async createComment(
    @Body() createCommentDto: CommentsCreateDto,
    @Req() req: Request,
  ): Promise<Comment> {
    const author = req.user as User;
    return this.commentsService.createComment(createCommentDto, author);
  }

  @ApiOperation({ summary: 'Partially update an comment' })
  @ApiResponse({ status: 200, type: Comment })
  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: CommentsUpdateDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete an comment' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/')
  getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: 'Get an comment' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get(':id')
  getComment(@Param('id') id: number) {
    return this.commentsService.getComment(id);
  }

  @ApiOperation({ summary: 'Get comments by volunteer ID' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/user/:userId')
  async getCommentsByVolunteerId(@Param('userId') userId: number) {
    return this.commentsService.getCommentsByVolunteerId(userId);
  }

}
