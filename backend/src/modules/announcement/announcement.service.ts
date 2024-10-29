import {
  BadRequestException, HttpException, HttpStatus,
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
import { differenceInDays } from 'date-fns';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface FindAnnouncementsOptions {
  query: string;
  types?: TypeHelp[];
  sortOrder?: 'ASC' | 'DESC';
  limit: number;
  offset: number;
  isUrgent?: boolean;
}

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
  ) {}

  private updateUrgency(announcement: Announcement): void {
    const today = new Date();
    const daysUntilDeadline = differenceInDays(announcement.date_posted, today);
    announcement.is_urgent = daysUntilDeadline <= 5;
  }

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
    user: User,
  ): Promise<Announcement> {
    const announcement = this.announcementRepository.create({
      ...createAnnouncementDto,
      user,
    });
    this.updateUrgency(announcement);
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
    this.updateUrgency(updatedAnnouncement);
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
    options: Partial<FindAnnouncementsOptions> = {},
    user: any
  ): Promise<Announcement[]> {
    const qb = this.announcementRepository
      .createQueryBuilder('announcement')
      .leftJoinAndSelect('announcement.user', 'user')
        .leftJoinAndSelect('user.volunteer', 'volunteer')
        .leftJoinAndSelect('announcement.files', 'files');

    qb.andWhere('announcement.is_completed = false');

    if (options.query && options.query.trim() !== '') {
      qb.andWhere('announcement.description ILIKE :query', {
        query: `%${options.query}%`,
      });
    }

    if('roles' in user){
      console.log(user.roles)
      if(!(user.roles as string[]).includes('admin'))
        qb.andWhere('announcement.isBlockedAnnouncement = :isBlock', {
          isBlock: "false"
        })
    }

    // filter by type help
    if (options.types && options.types.length > 0) {
      qb.andWhere('announcement.type_help IN (:...types)', {
        types: options.types,
      });
    }

    // filter by urgency
    if (options.isUrgent !== undefined) {
      qb.andWhere('announcement.is_urgent = :isUrgent', {
        isUrgent: options.isUrgent,
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

  async blockAnnouncement(id){
    const announcement = await this.announcementRepository.findOneBy({id});
    if (!announcement) {
      throw new HttpException('Announcement not found', HttpStatus.NOT_FOUND);
    }
    announcement.isBlockedAnnouncement = !announcement.isBlockedAnnouncement;
    return await this.announcementRepository.save(announcement);
  }


  async findCompletedAnnouncementsForUser(userId: number) : Promise<Announcement[]> {
    return this.announcementRepository
        .createQueryBuilder('announcement')
        .leftJoinAndSelect('announcement.user', 'user')
        .where('announcement.is_completed = :isCompleted', { isCompleted: true })
        .andWhere('user.id = :userId', { userId })
        .getMany();
  }

  async findFavoriteAnnouncementsForUser(userId: number): Promise<Announcement[]> {
    return this.announcementRepository
        .createQueryBuilder('announcement')
        .leftJoinAndSelect('announcement.user', 'user')
        .where('announcement.is_favorite = :isFavorite', { isFavorite: true })
        .andWhere('user.id = :userId', { userId })
        .getMany();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleUrgencyUpdate() {
    const today = new Date();
    const announcements = await this.announcementRepository.find();

    for (const announcement of announcements) {
      const daysUntilDeadline = differenceInDays(
        announcement.date_posted,
        today,
      );
      if (daysUntilDeadline <= 5 && !announcement.is_urgent) {
        announcement.is_urgent = true;
        await this.announcementRepository.save(announcement);
      }
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.announcementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
  }

  async incrementCount(id: number, field: 'viewsCount' | 'responsesCount'): Promise<Announcement> {
    const announcement = await this.findOne(id);
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    announcement[field] += 1;

    return this.announcementRepository.save(announcement);
  }

  async updateAnnouncementStatus(id: number, updatedData: Partial<Announcement>): Promise<Announcement> {
    const announcement = await this.announcementRepository.findOne({ where: { id }});

    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    Object.assign(announcement, updatedData);

    return this.announcementRepository.save(announcement);
  }

  async markAnnouncementAsCompleted(id: number, volunteer_who_complete: User) : Promise<Announcement> {
    return this.updateAnnouncementStatus(id, { is_completed: true, volunteer_who_complete });
  }


  async markAnnouncementAsFavorite(id: number): Promise<Announcement> {
    const announcement = await this.findOne(id);
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    announcement.is_favorite = !announcement.is_favorite;

    return this.announcementRepository.save(announcement);
  }

  async incrementViewsCount(id: number): Promise<Announcement> {
    return this.incrementCount(id, 'viewsCount');
  }

  async incrementResponsesCount(id: number): Promise<Announcement> {
    return this.incrementCount(id, 'responsesCount');
  }

  async getCompletedAnnouncementsByVolunteer(idVolunteer:number){
    return await this.announcementRepository.find({
      where: { volunteer_who_complete : {id: idVolunteer} },
      relations: ['volunteer_who_complete', 'user']
    })
  }

}


