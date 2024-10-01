import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../../users/entities/users.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

interface CustomRequest extends Request {
  user: User;
}

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @Get()
  // findAll(): Promise<Chat[]> {
  //   return this.chatsService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('/mark-read')
  // async markMessageRead(@Body('idMessage') idMessage: number) {
  //   return this.chatsService.markMessageAsRead(idMessage);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChats(
      @Req() req: CustomRequest,
      @Query('archived') archived?: boolean,
      @Query('blocked') blocked?: boolean,
      @Query('username') username?: string
  ) {
    // const accessToken = req.cookies['accessToken'];
    // console.log(accessToken);
    const userId = req.user.id;
    return this.chatsService.getChats(
        userId,
        { archived, blocked, username },
        // accessToken,
    );
  }

  @ApiOperation({ summary: 'Create chat' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateChatDto })
  @ApiResponse({
    status: 201,
    description: 'Chat successfully created',
    type: Chat,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
      @Body() createChatDto: CreateChatDto,
      @Req() req: CustomRequest,
  ): Promise<Chat> {
    const { name, isGroup, userIds } = createChatDto;
    const currentUserId = req.user.id;
    return this.chatsService.create({ name, isGroup }, userIds, currentUserId);
  }

  @ApiOperation({ summary: 'Archive chat' })
  @ApiResponse({ status: 200, description: 'Chat successfully archived' })
  @Patch(':chatId/archive')
  async archiveChat(@Param('chatId') chatId: number) {
    return this.chatsService.archiveChat(chatId);
  }

  @ApiOperation({ summary: 'Unarchive chat' })
  @ApiResponse({ status: 200, description: 'Chat successfully unarchived' })
  @Patch(':chatId/unarchive')
  async unarchiveChat(@Param('chatId') chatId: number) {
    return this.chatsService.unarchiveChat(chatId);
  }

  @ApiOperation({ summary: 'Block chat' })
  @ApiResponse({ status: 200, description: 'Chat successfully blocked' })
  @Patch(':chatId/block')
  async blockChat(@Param('chatId') chatId: number) {
    return this.chatsService.blockChat(chatId);
  }

  @ApiOperation({ summary: 'Unblock chat' })
  @ApiResponse({ status: 200, description: 'Chat successfully unblocked' })
  @Patch(':chatId/unblock')
  async unblockChat(@Param('chatId') chatId: number) {
    return this.chatsService.unblockChat(chatId);
  }
}
