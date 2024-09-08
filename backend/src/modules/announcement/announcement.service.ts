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


interface FileterOptions {
  types?: TypeHelp[];
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

  async findAll(limit: number, offset: number): Promise<Announcement[]> {
    return this.announcementRepository.find({
      relations: ['user', 'files'],
      take: limit,
      skip: offset,
    })
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

  async search(query: string): Promise<Announcement[]> {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Search query cannot be empty');
    }
    return this.announcementRepository
      .createQueryBuilder('announcement')
      .where('announcement.description ILIKE :query', { query: `%${query}%` })
      .leftJoinAndSelect('announcement.user', 'user')
      .getMany();
  }

  async filterAnnouncements(options: FileterOptions) : Promise<Announcement[]> {
    const qb = this.announcementRepository
        .createQueryBuilder('announcement')
        .leftJoinAndSelect('announcement.user', 'user');

    if(options.types && options.types.length > 0) {
      qb.andWhere('announcement.typeHelp IN (:...types)', { types: options.types });
    }
    return qb.getMany();
  }

  async remove(id: number): Promise<void> {
    const result = await this.announcementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
  }
}
