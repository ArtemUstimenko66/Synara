import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Gatherings } from '../../gatherings/entity/gatherings.entity';

@Entity('files_gathering')
export class FileGathering {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'File identifier',
    example: 1,
  })
  id?: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'File name',
    example: 'example.jpg',
  })
  fileName?: string;

  @Column({ type: 'varchar', length: 2048 })
  @ApiProperty({
    description: 'File URL',
    example: 'https://example.com/file/example.jpg',
  })
  fileUrl?: string;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({
    description: 'File type',
    example: 'image/jpeg',
  })
  fileType?: string;

  @ManyToOne(() => Gatherings, (gathering) => gathering.files, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'Gathering associated with the file',
    type: () => Gatherings,
  })
  gathering?: Gatherings;
}
