import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import { Chat } from '../../real-time-chat/chats/chat.entity';

@Entity('current-phones')
export class CurrentPhones {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the gathering',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'http/jit.si/volunteer-NameVolunteer-Date',
    description: 'Link to conference',
    type: String,
  })
  @Column({ type: 'text', nullable: false })
  link: string;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the associated chat',
  })
  @Column({ type: 'int', nullable: true })
  chatId: number;

  @OneToOne(() => Chat, (chat) => chat.current_phones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatId' })
  chat: Chat;
}
