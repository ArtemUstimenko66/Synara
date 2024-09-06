import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Announcement } from '../../announcement/announcement.entity';

@Injectable()
export class FileService {
  constructor(
      @InjectRepository(File)
      private readonly fileRepository: Repository<File>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Announcement)
      private readonly announcementRepository: Repository<Announcement>,
  ) {}

  async createFile(
      fileName: string,
      fileUrl: string,
      fileType: string,
      userId: number,
      announcementId: number,
  ): Promise<File> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const announcement = await this.announcementRepository.findOne({
      where: { id: announcementId },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const file = this.fileRepository.create({
      fileName,
      fileUrl,
      fileType,
      user,
      announcement,
    });
    return this.fileRepository.save(file);
  }
}