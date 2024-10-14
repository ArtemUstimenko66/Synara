import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TypeHelp } from './type-help.enum';
import { User } from '../users/entities/users.entity';
import { File } from '../s3-storage/entities/file.entity';

@Entity('announcement')
export class Announcement {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the announcement',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2024-08-25',
    description: 'Date, when user posted announcement',
    type: Date,
  })
  @Column()
  date_posted: Date;

  @ApiProperty({
    example: 'Important Announcement',
    description: 'Title of the announcement',
    type: String,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @ApiProperty({
    example: 'Here are the detailed instructions for assistance...',
    description: 'Details of the announcement',
    type: String,
  })
  @Column({ type: 'text', nullable: true })
  details: string;

  @ApiProperty({
    example: 'I need a psychological help',
    description: 'What help somebody need, or what help somebody gives',
    type: String,
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 123,
    description: 'Number of views for the announcement',
    type: Number,
  })
  @Column({ default: 0 })
  viewsCount: number;

  @ApiProperty({
    example: 'Shelter at X location',
    description: 'Current location of the victim',
    type: String,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  currentLocation: string;

  @ApiProperty({
    example: 'humanitarian',
    description: 'What kind of help somebody provide or need',
    type: String,
  })
  @Column({ type: 'enum', enum: TypeHelp, default: TypeHelp.Humanitarian })
  type_help: TypeHelp;

  @ApiProperty({
    example: 5,
    description: 'Number of responses to the announcement',
    type: Number,
  })
  @Column({ default: 0 })
  responsesCount: number;

  @Column({ default: false })
  @ApiProperty({
    example: true,
    description: 'Urgency of the announcement',
    type: Boolean,
  })
  is_urgent: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if the announcement is completed',
    type: Boolean,
  })
  @Column( { default: false })
  is_completed: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if the announcement is favorite',
    type: Boolean,
  })
  @Column( { default: false })
  is_favorite: boolean;

  @ApiProperty({
    example: '2024-08-25',
    description: 'Date when the announcement was created',
    type: Date,
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.announcements)
  user: User;

  @OneToMany(() => File, (file) => file.announcement)
  files: File[];

  @ManyToOne(() => User, (user) => user.complete_announcements)
  volunteer_who_complete: User;

}
