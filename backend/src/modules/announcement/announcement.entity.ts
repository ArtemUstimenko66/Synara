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
  datePosted: Date;

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
  @Column({default: 0})
  viewsCount: number;

  @ApiProperty({
    example: 'humanitarian',
    description: 'What kind of help somebody provide or need',
    type: String,
  })
  @Column({type: 'enum', enum: TypeHelp, default: TypeHelp.Humanitarian})
  typeHelp: TypeHelp;

  @ApiProperty({
    example: 5,
    description: 'Number of responses to the announcement',
    type: Number,
  })
  @Column({default: 0})
  responsesCount: number;

  @ManyToOne(() => User, (user) => user.announcements)
  user: User;

  @OneToMany(() => File, (file) => file.announcement)
  files: File[];
}
