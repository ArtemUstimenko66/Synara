import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';
import { TypeHelp } from './type-help.enum';

@Injectable()
export class AnnouncementService {
  constructor(
      @InjectRepository(Announcement)
      private announcementRepository: Repository<Announcement>,
  ) {}

  async create() {}

  async findByTypeHelp(typeHelp: string) {
    const typeHelpValid = TypeHelp[typeHelp as keyof typeof TypeHelp];

    if (!typeHelpValid) {
      throw new BadRequestException(`Invalid typeHelp: ${typeHelp}`);
    }
    return await this.announcementRepository.findOneBy({
      typeHelp: typeHelpValid,
    });
  }
}