import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './announcement.entity';
import { Repository } from 'typeorm';
import { TypeHelp } from './type-help.enum';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { User } from '../users/entities/users.entity';
import { PartialUpdateAnnouncementDto } from './dtos/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    user: User,
  ): Promise<Announcement> {
    const announcement = this.announcementRepository.create({
      ...createAnnouncementDto,
      user,
    });
    return this.announcementRepository.save(announcement);
  }

  async update(
    id: number,
    updateAnnouncementDto: PartialUpdateAnnouncementDto,
  ): Promise<Announcement> {
    await this.announcementRepository.update(id, updateAnnouncementDto);
    const updatedAnnouncement = await this.announcementRepository.findOne({
      where: { id },
    });
    if (!updatedAnnouncement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return updatedAnnouncement;
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Announcement> {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!announcement) {
      throw new BadRequestException(`Announcement with id ${id} not found`);
    }
    return announcement;
  }

  async remove(id: number): Promise<void> {
    const result = await this.announcementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
  }
}
