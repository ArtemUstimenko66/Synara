import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SupportType } from '../enums/support-type.enum';
import { User } from './users.entity';

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
  supports: SupportType[];

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

  @OneToOne(() => User, (user) => user.volunteer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
