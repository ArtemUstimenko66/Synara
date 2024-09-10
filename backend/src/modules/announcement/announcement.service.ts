import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './announcement.entity';
import { LessThan, Repository } from 'typeorm';
import { TypeHelp } from './type-help.enum';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { User } from '../users/entities/users.entity';
import { PartialUpdateAnnouncementDto } from './dtos/update-announcement.dto';
import { addDays } from 'date-fns';
import { Cron } from '@nestjs/schedule';

interface FindAnnouncementsOptions {
  query: string;
  types?: TypeHelp[];
  sortOrder?: 'ASC' | 'DESC';
  limit: number;
  offset: number;
}

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
    return this.announcementRepository.find({
      relations: ['user', 'files'],
    });
  }

  async findOne(id: number): Promise<Announcement> {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
      relations: ['user', 'files'],
    });
    if (!announcement) {
      throw new BadRequestException(`Announcement with id ${id} not found`);
    }
    return announcement;
  }

  async findAnnouncements(
    options: FindAnnouncementsOptions,
  ): Promise<Announcement[]> {
    const qb = this.announcementRepository
      .createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.user', 'user');

    if (options.query && options.query.trim() !== '') {
      qb.andWhere('announcement.description ILIKE :query', {
        query: `%${options.query}%`,
      });
    }

    // filter by type help
    if (options.types && options.types.length > 0) {
      qb.andWhere('announcement.type_help IN (:...types)', {
        types: options.types,
      });
    }

    const sortOrder =
      options.sortOrder && ['ASC', 'DESC'].includes(options.sortOrder)
        ? options.sortOrder
        : 'DESC';

    qb.orderBy('announcement.date_posted', sortOrder)
      .take(options.limit)
      .skip(options.offset);

    return qb.getMany();
  }

  async updateUrgency(): Promise<void> {
    const currentDate = new Date();

    const thresholdDate = addDays(currentDate, 5);

    const announcements = await this.announcementRepository.find({
      where: {
        date_posted: LessThan(thresholdDate),
        isUrgent: false,
      },
    });

    for (const announcement of announcements) {
      announcement.isUrgent = true;
      await this.announcementRepository.save(announcement);
    }
  }

  @Cron('0 0 * * * *')
  async handleCron() {
    await this.updateUrgency();
  }

  async remove(id: number): Promise<void> {
    const result = await this.announcementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
  }
}
