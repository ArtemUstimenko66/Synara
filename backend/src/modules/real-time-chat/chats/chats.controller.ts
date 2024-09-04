import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../../users/entities/users.entity';

interface CustomRequest extends Request {
  user: User;
}

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  findAll(): Promise<Chat[]> {
    return this.chatsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createChatDto: CreateChatDto,
    @Req() req: CustomRequest,
  ): Promise<Chat> {
    const { name, isGroup, userIds } = createChatDto;
    const currentUserId = req.user.id;
    return this.chatsService.create({ name, isGroup }, userIds, currentUserId);
  }
}
