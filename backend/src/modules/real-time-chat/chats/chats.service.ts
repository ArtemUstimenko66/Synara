import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getChats(
    userId: number,
    filters: { archived?: boolean; blocked?: boolean; username?: string },
  ) {
    const queryBuilder = this.chatsRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.members', 'chatMember')
      .leftJoinAndSelect('chatMember.user', 'users')
      .leftJoin(
        'chat.messages',
        'lastMessage',
        `lastMessage.id = (
        SELECT m.id FROM message m
        WHERE m."chatId" = chat.id
        ORDER BY m.timestamp DESC
        LIMIT 1
      )`,
      )
      .addSelect(['lastMessage.content', 'lastMessage.timestamp'])
      .where('chatMember.userId = :userId', { userId });

    if (filters.username) {
      queryBuilder.andWhere(
        '(users.firstName LIKE :username OR users.lastName ILIKE :username)',
        { username: `%${filters.username}%` },
      );
    }

    if (filters.archived !== undefined) {
      queryBuilder.andWhere('chat.isArchived = :archived', {
        archived: filters.archived,
      });
    }

    if (filters.blocked !== undefined) {
      queryBuilder.andWhere('chat.isBlocked = :blocked', {
        blocked: filters.blocked,
      });
    }

    return queryBuilder.getMany();
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

  async archiveChat(chatId: number) {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.isArchived = true;
    return this.chatsRepository.save(chat);
  }

  async unarchiveChat(chatId: number) {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.isArchived = false;
    await this.chatsRepository.save(chat);
    return chat;
  }

  async blockChat(chatId: number) {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.isBlocked = true;
    return this.chatsRepository.save(chat);
  }

  async unblockChat(chatId: number) {
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    chat.isBlocked = false;
    return this.chatsRepository.save(chat);
  }
}
