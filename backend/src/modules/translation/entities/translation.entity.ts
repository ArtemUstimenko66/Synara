import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('translation')
export class Translation {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the translation',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({
    example: '',
    description: 'Title of translation',
    type: String,
  })
  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

  @ApiProperty({
    example: 'хто ми?',
    description: 'Original phrase in ukrainian',
    type: String,
  })
  @Column({ type: 'varchar', length: 500, nullable: false })
  original: string;



  @ApiProperty({
    example: 'home',
    description: 'Title of the page, which contains this word',
    type: String,
  })
  @Column({ type: 'varchar', length: 30, nullable: false })
  page: string;
}
