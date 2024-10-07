import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ChatMember } from './chat-member.entity';
import { Message } from '../messages/message.entity';
import {CurrentPhones} from "../../current-phones/entity/current-phones.entity";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isGroup: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  isBlocked: boolean;

  @OneToMany(() => ChatMember, (chatMember) => chatMember.chat)
  members: ChatMember[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @OneToOne(() => CurrentPhones, (currentPhones) => currentPhones.chat)
  current_phones?: CurrentPhones;
}
