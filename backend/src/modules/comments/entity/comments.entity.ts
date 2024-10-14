import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import {VolunteersEntity} from "../../users/entities/volunteers.entity";

@Entity('comment')
export class Comment {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the comment',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 4.5,
    description: 'Rating of volunteer',
    type: Number,
  })
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  rating: number;

  @Column({ type: 'timestamp', default: new Date(), nullable: false })
  dateCreated: Date;

  @ApiProperty({
    example: 'Very good volunteer',
    description: 'Description of volunteer',
    type: String,
  })
  @Column({ type: 'varchar', length: 225, nullable: false })
  description: string;

  @ManyToOne(() => User, (user) => user.comments_author, {
    onDelete: 'CASCADE',
  })
  author: User;

  @ManyToOne(() => VolunteersEntity, (volunteer) => volunteer.comments_volunteer, {
    onDelete: 'CASCADE',
  })
  volunteer: VolunteersEntity;
}
