import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';

@Entity('victims')
export class VictimsEntity {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the victim',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region where the victim resides',
  })
  @Column({ nullable: true })
  region: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'City where the victim resides',
  })
  @Column({ nullable: true })
  city: string;

  @ApiProperty({
    example: 'Shevchenko',
    description: 'Street where the victim resides',
  })
  @Column({ nullable: true })
  street: string;

  @ApiProperty({
    example: 99,
    description: "House number of the victim's residence",
  })
  @Column({ type: 'int', nullable: true })
  houseNumber: number;

  @ApiProperty({
    example: 201,
    description: "Flat number of the victim's residence",
  })
  @Column({ type: 'int', nullable: true })
  flatNumber: number;

  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the associated user',
  })
  @Column({ type: 'int', nullable: true })
  userId: number;

  @OneToOne(() => User, (user) => user.victim)
  @JoinColumn({ name: 'userId' })
  user: User;
}
