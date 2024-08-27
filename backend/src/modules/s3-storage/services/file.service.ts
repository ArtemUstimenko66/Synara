import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createFile(
    fileName: string,
    fileUrl: string,
    fileType: string,
    userId: number,
  ): Promise<File> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const file = this.fileRepository.create({
      fileName,
      fileUrl,
      fileType,
      user,
    });
    return this.fileRepository.save(file);
  }
}
