import {
  Column,
  Entity, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
import { VolunteersEntity } from './volunteers.entity';
import { GenderType } from '../enums/gender.enum';
import { VictimsEntity } from './victim.entity';
import { File } from '../../s3-storage/entities/file.entity';
import { Announcement } from '../../announcement/announcement.entity';
import { ChatMember } from '../../real-time-chat/chats/chat-member.entity';
import { Message } from '../../real-time-chat/messages/message.entity';
import { Gatherings } from "../../gatherings/entity/gatherings.entity";
import {Petition} from "../../petition/petition.entity";
import {Comment} from "../../comments/entity/comments.entity";
import {SynaraComment} from "../../synara-comments/entity/synara-comment.entity";

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    type: String,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    type: String,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the user account',
    type: String,
  })
  @Column({ type: 'varchar', nullable: false })
  password?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    uniqueItems: true,
    type: String,
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email?: string;

  @ApiProperty({
    example: '+38066996699',
    description: 'Phone number of the user',
    type: String,
    required: false,
  })
  @Column({ type: 'varchar', nullable: true })
  phoneNumber?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birthdate of the user',
    type: String,
  })
  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @ApiProperty({
    example: 30,
    description: 'Age of the user',
    type: Number,
  })
  @Column({ type: 'int', nullable: true })
  age?: number;

  @ApiProperty({
    example: 'guest',
    description: 'Role of the user in the system',
    type: String,
  })
  @Column({ type: 'enum', enum: Role, default: Role.Guest })
  role?: Role;

  @ApiProperty({
    example: 'male',
    description: 'Gender of the user',
    type: String,
  })
  @Column({ type: 'enum', enum: GenderType, nullable: true })
  gender?: GenderType;

  @ApiProperty({
    example: 1234567890,
    description: 'UNP (Unique Identification Number) of the user',
    type: Number,
  })
  @Column({ type: 'bigint', unique: true, nullable: true })
  UNP?: number;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL to the users avatar',
    type: Number,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl?: string;

  @ApiProperty({
    example: false,
    description: 'Confirmation of user phone number',
    type: Boolean,
  })
  @Column({ default: false })
  isPhoneVerified?: boolean;

  @ApiProperty({
    example: false,
    description: 'Confirmation of user email',
    type: Boolean,
  })
  @Column({ default: false })
  isConfirmedEmail?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether user blocked',
    type: Boolean,
  })
  @Column({ default: false })
  isBlockedUser?: boolean;

  @OneToOne(() => VolunteersEntity, (volunteers) => volunteers.user)
  volunteer?: VolunteersEntity;

  @OneToOne(() => VictimsEntity, (victim) => victim.user)
  victim?: VictimsEntity;

  @OneToMany(() => File, (file) => file.user)
  files?: File[];

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements?: Announcement[];

  @OneToMany(() => ChatMember, (chatMember) => chatMember.user)
  chatMembers: ChatMember[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Gatherings, (gatherings) => gatherings.user)
  gatherings: Gatherings[];

  @OneToMany(() => Petition, (petitions) => petitions.author)
  petitions: User;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments_author?: Comment[];

  @OneToMany(() => Comment, (comment) => comment.volunteer)
  comments_volunteer?: Comment[];

  @OneToMany(() => SynaraComment, (synaraComment) => synaraComment.author)
  synaraComment?: SynaraComment[];

  @OneToMany(() => Announcement, (announcement) => announcement.volunteer_who_complete)
  complete_announcements?: Announcement[];

}