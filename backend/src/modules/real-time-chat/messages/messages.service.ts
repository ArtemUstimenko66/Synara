import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../../users/entities/users.entity';
import { Chat } from '../chats/chat.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async findByChatId(chatId: number, skip: number, take: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: {
        chat: { id: chatId },
      },
      skip,
      take,
      order: { id: 'DESC'},
      relations: ['chat', 'sender'],
    });
  }

  async create(
    content: string,
    chatId: number,
    senderId: number,
    type: 'text' | 'image',
  ): Promise<Message> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });
    const sender = await this.userRepository.findOne({
      where: { id: senderId },
    });

    if (!chat || !sender) {
      throw new Error('Chat or Sender not found');
    }

    const message = this.messageRepository.create({
      content,
      chat,
      sender,
      type,
    });

    return this.messageRepository.save(message);
  }

  async markMessageAsRead(idMessage: number) {
    const messageToUpdate = await this.messageRepository.findOne({
      where: { id: idMessage },
      relations: ['chat'],
    });

    if (!messageToUpdate) {
      throw new BadRequestException('Incorrect message id');
    }

    messageToUpdate.isRead = true;
    //console.log("!!!!! -> ", messageToUpdate);
    return await this.messageRepository.save(messageToUpdate);
  }

}
