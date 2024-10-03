import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FileGathering } from '../../s3-storage/entities/file-gathering.entity';
import {User} from "../../users/entities/users.entity";

@Entity('gathering')
export class Gatherings {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the gathering',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Збір на авто для 36 бригади',
    description: 'Name of the gathering',
    type: String,
  })
  @Column({ type: 'varchar', length: 225, nullable: false })
  name: string;

  @ApiProperty({
    example: 'Допоможіть купити авто',
    description: 'Description of the gathering',
    type: String,
  })
  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @ApiProperty({
    example: 'Нам потрібен автомоіль з гарним мотором',
    description: 'Detail of the gathering',
    type: String,
  })
  @Column({ type: 'varchar', length: 500, nullable: false })
  detail: string;

  @ApiProperty({
    example: 'Військовим',
    description: 'Who need help in the gathering',
    type: String,
  })
  @Column({ type: 'varchar', length: 225, nullable: false })
  whoNeedHelp: string;

  @ApiProperty({
    example: 'На допомогу військовим',
    description: 'Where money of the gathering will used',
    type: String,
  })
  @Column({ type: 'varchar', length: 225, nullable: false })
  whereMoneyWillUsed: string;

  @ApiProperty({
    example: '60000',
    description: 'Amount money of the gathering, that needed',
    type: Number,
  })
  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
  goal: number;

  @ApiProperty({
    example: '60000',
    description: 'Amount money of the gathering, that collected',
    type: Number,
  })
  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: false })
  collected: number;

  @ApiProperty({
    example: '2024-09-25',
    description: 'Start of the gathering',
    type: Date,
  })
  @Column({ type: 'date', nullable: true })
  startGathering: Date;

  @ApiProperty({
    example: '2024-09-30',
    description: 'End of the gathering',
    type: Date,
  })
  @Column({ type: 'date', nullable: true })
  endGathering: Date;

  @ApiProperty({
    example: '4627100101654724',
    description: 'Number of the card, where will collected money',
    type: String,
  })
  @Column({ type: 'varchar', length: '30', nullable: false })
  numberOfCard: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the gatherings is completed',
    type: Boolean,
  })
  @Column( { default: false })
  is_completed: boolean;

  @ApiProperty({
    example: true,
    description: 'Indicates if the gatherings is favorite',
    type: Boolean,
  })
  @Column( { default: false })
  is_favorite: boolean;

  @ApiProperty({
    example: '2024-09-23T18:30:00.000Z',
    description: 'Timestamp when the gathering was created',
    type: Date,
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.gatherings)
  user?: User;

  @OneToMany(() => FileGathering, (file) => file.gathering)
  files: FileGathering[];
}