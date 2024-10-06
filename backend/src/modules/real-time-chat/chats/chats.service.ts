import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatMember } from './chat-member.entity';
import { Message } from '../messages/message.entity';

@Injectable()
export class ChatsService {
  constructor(
      @InjectRepository(Chat)
      private chatsRepository: Repository<Chat>,
      @InjectRepository(ChatMember)
      private chatMembersRepository: Repository<ChatMember>,
      @InjectRepository(Message)
      private messagesRepository: Repository<Message>,
  ) {}

  async findAll(): Promise<Chat[]> {
    return this.chatsRepository.find({ relations: ['members'] });
  }

  async markMessageAsRead(idMessage: number) {
    const messageToUpdate = await this.messagesRepository.findOne({
      where: { id: idMessage },
    });
    if (!messageToUpdate) {
      throw new BadRequestException('Incorrect message id');
    } else {
      messageToUpdate.isRead = true;
      return await this.messagesRepository.save(messageToUpdate);
    }
  }

  async getChats(
      userId: number,
      filters: { archived?: boolean; blocked?: boolean; username: string },
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
        .where(
            'chat.id IN (SELECT cm."chatId" FROM "chat_member" cm WHERE cm."userId" = :userId)',
            { userId },
        )

    if (filters.username) {
      queryBuilder.andWhere(
          '(users.firstName LIKE :username OR users.lastName LIKE :username)',
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

    queryBuilder.orderBy('lastMessage.timestamp', 'DESC');

    return queryBuilder.getMany();
  }

  async create(
      chatData: Partial<Chat>,
      userIds: number[],
      currentUserId: number,
  ): Promise<Chat> {

    const isGroupChat = userIds.length > 1;

    if(!isGroupChat) {
      const existingChat = await this.chatsRepository
          .createQueryBuilder('chat')
          .innerJoin('chat.members', 'chatMember')
          .where('chat.isGroup = false')
          .andWhere('chatMember.userId IN (:currentUserId, :otherUserId)', {
            currentUserId: currentUserId,
            otherUserId: userIds[0]
          })
          .groupBy('chat.id')
          .having('COUNT(chatMember.userId) = 2')
          .getOne();

      if (existingChat) {
        throw new BadRequestException('A private chat with this user already exists');
      }
    }

    const chat = this.chatsRepository.create({ ...chatData, isGroup: isGroupChat });
    const savedChat = await this.chatsRepository.save(chat);

    const chatMembers = [
      { chatId: savedChat.id, userId: currentUserId },
      ...userIds.map(userId => ({ chatId: savedChat.id, userId })),
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
