import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';

@Entity('files')
export class File {
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

  @ManyToOne(() => User, (user) => user.files)
  @ApiProperty({
    description: 'User associated with the file',
    type: () => User,
  })
  user?: User;
}
