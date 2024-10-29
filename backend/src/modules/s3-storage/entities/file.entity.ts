import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';
import { Announcement } from '../../announcement/announcement.entity';

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

  @ApiProperty({
    example: false,
    description: 'Confirmation of user email',
    type: Boolean,
  })
  @Column({ default: false })
  isAvatar?: boolean;


  @ManyToOne(() => User, (user) => user.files, {
        onDelete: 'CASCADE',
      }
  )
  @ApiProperty({
    description: 'User associated with the file',
    type: () => User,
  })
  user?: User;

  @ManyToOne(() => Announcement, (announcement) => announcement.files, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    description: 'Announcement associated with the file',
    type: () => Announcement,
  })
  announcement?: Announcement;
}
