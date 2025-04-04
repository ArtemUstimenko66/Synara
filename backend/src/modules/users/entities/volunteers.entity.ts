import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportType } from '../enums/support-type.enum';
import { User } from './users.entity';
import { WorkingDays } from "../enums/working-days.enum";
import {Comment} from "../../comments/entity/comments.entity";

@Entity('volunteers')
export class VolunteersEntity {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the volunteer',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region where the volunteer is located',
  })
  @Column({ nullable: true })
  region: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'City where the volunteer is located',
  })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    example: ['MENTOR', 'SUPPORTER'],
    description: 'Types of support the volunteer provides',
    type: [String],
  })
  @Column({
    type: 'enum',
    enum: SupportType,
    array: true,
    nullable: true,
  })
  supports: SupportType;

  @ApiProperty({
    example: 'Individual consultations',
    description: 'Short description of each type of support',
  })
  @Column({ nullable: true, default: "Тут потрібен текст про Вашу підтримку" })
  support_description: string;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the associated user',
  })
  @Column({ type: 'int', nullable: true })
  userId: number;

  @ApiProperty({
    example: 123456,
    description: 'Unique identification number of the volunteer',
    required: false,
  })
  @Column({ type: 'int', nullable: true })
  volunteer_identification_number?: number;

  @ApiProperty({
    example: 4.5,
    description: 'Rating of the volunteer (from 0 to 5 stars)',
    required: false,
  })
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true, default: 0 })
  rating?: number;

  @ApiProperty({
    example: 'Monday',
    description: 'Start working day of the volunteer',
  })
  @Column({ nullable: true, default:WorkingDays.MONDAY })
  startWorkingDay?: WorkingDays;

  @ApiProperty({
    example: 'Friday',
    description: 'End working day of the volunteer',
  })
  @Column({ nullable: true, default:WorkingDays.FRIDAY })
  endWorkingDay?: WorkingDays;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the volunteer\'s working hours in HH:mm format',
  })
  @Column({ nullable: true, default: "9:00" })
  startTime?: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the volunteer\'s working hours in HH:mm format',
  })
  @Column({ nullable: true, default: "17:00" })
  endTime?: string;

  @ApiProperty({
    example: 'Helping the elderly with daily tasks.',
    description: 'Description of the volunteer’s activities',
  })
  @Column({ type: 'text', nullable: true, default: "Я волонтер Synara" })
  description: string;

  @ApiProperty({
    example: 'Кваліфікований',
    description: 'Answer of moderator about volunteer qualification.',
  })
  @Column({ type: 'text', nullable: true })
  moderator_answer?: string;

  @ApiProperty({
    example: 'true',
    description: 'Is show my profile in volunteer search.',
  })
  @Column({ type: 'boolean', nullable: true, default: true })
  is_show_my_profile?: boolean;


  @OneToOne(() => User, (user) => user.volunteer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.volunteer)
  comments_volunteer?: Comment[];
}
