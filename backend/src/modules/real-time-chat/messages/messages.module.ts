import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { MessagesGateway } from './message.geteway';
import { User } from '../../users/entities/users.entity';
import { Chat } from '../chats/chat.entity';
import { UsersModule } from '../../users/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {MessageController} from "./message.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User, Chat]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [MessagesService, MessagesGateway],
  controllers: [MessageController],
  exports: [MessagesService, TypeOrmModule],
})
export class MessagesModule {}