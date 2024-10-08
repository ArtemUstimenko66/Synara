import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';

@Entity('synara-comment')
export class SynaraComment {
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
  text: string;

  @ApiProperty({
    example: 3,
    description: 'Rating of comment',
  })
  @Column({ type: 'int', default: 3 })
  rating: number;

  @Column({ type: 'timestamp', default: new Date(), nullable: false })
  dateCreated: Date;

  @ManyToOne(() => User, (user) => user.synaraComment, { onDelete: 'CASCADE' })
  author: User;
}
