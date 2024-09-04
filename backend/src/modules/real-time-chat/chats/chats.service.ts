import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatMember } from './chat-member.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
    @InjectRepository(ChatMember)
    private chatMembersRepository: Repository<ChatMember>,
  ) {}

  async findAll(): Promise<Chat[]> {
    return this.chatsRepository.find({ relations: ['members'] });
  }

  async create(
    chatData: Partial<Chat>,
    userIds: number[],
    currentUserId: number,
  ): Promise<Chat> {
    const chat = this.chatsRepository.create(chatData);
    const savedChat = await this.chatsRepository.save(chat);

    const chatMembers = [
      { chatId: savedChat.id, userId: currentUserId },
      ...userIds.map((userId) => ({ chatId: savedChat.id, userId })),
    ];

    await this.chatMembersRepository.save(chatMembers);

    return savedChat;
  }
}
