import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Announcement } from '../../announcement/announcement.entity';
import { FileGathering } from '../entities/file-gathering.entity';
import { Gatherings } from '../../gatherings/entity/gatherings.entity';
import { S3Service } from './s3.service';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    @InjectRepository(FileGathering)
    private readonly fileGatheringRepository: Repository<FileGathering>,
    @InjectRepository(Gatherings)
    private readonly gatheringsRepository: Repository<Gatherings>,
    private readonly s3Service: S3Service,
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

  async uploadGatheringFile(
    gatheringId: number,
    file: Express.Multer.File,
    bucket: string,
  ) {
    const fileUrl = await this.s3Service.uploadFile(file, bucket);
    const fileRecord = await this.createGatheringFile(
      file.originalname,
      fileUrl,
      file.mimetype,
      gatheringId,
    );
    return { file: fileRecord };
  }

  async createGatheringFile(
    fileName: string,
    fileUrl: string,
    fileType: string,
    gatheringId: number,
  ) {
    const gathering = await this.gatheringsRepository.findOne({
      where: { id: gatheringId },
    });
    if (!gathering) {
      throw new NotFoundException('Gathering not found');
    }

    const file = this.fileGatheringRepository.create({
      fileName,
      fileUrl,
      fileType,
      gathering,
    });
    return this.fileGatheringRepository.save(file);
  }
}
