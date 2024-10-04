import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gatherings } from './entity/gatherings.entity';
import { Repository } from 'typeorm';
import { CreateUpdateGatheringDto } from './dtos/create-update-gathering.dto';
import { FindGatheringsOptions } from './interfaces/find-gathering-options.interface';
import { User } from '../users/entities/users.entity';
import {TypeEnding} from "./enums/TypeEnding";

@Injectable()
export class GatheringsService {
  constructor(
      @InjectRepository(Gatherings)
      private gatheringRepository: Repository<Gatherings>,
  ) {}

  async create(
      createGatheringDto: CreateUpdateGatheringDto,
      user: User,
  ): Promise<Gatherings> {
    if (+createGatheringDto.collected > +createGatheringDto.goal) {
      throw new BadRequestException('collected money must be less than goal');
    }
    try {
      const gatheringToCreate = this.gatheringRepository.create({
        ...createGatheringDto,
        user,
      });
      return await this.gatheringRepository.save(gatheringToCreate);
    } catch (e) {
      throw new BadRequestException('incorrect data');
    }
  }

  async update(id: number, updateGatheringDto: CreateUpdateGatheringDto) {
    if (+updateGatheringDto.collected > +updateGatheringDto.goal) {
      throw new BadRequestException('collected money must be less than goal');
    }
    try {
      await this.gatheringRepository.update(id, updateGatheringDto);
      const gatheringToUpdate = await this.gatheringRepository.findOne({
        where: { id },
      });
      if (!gatheringToUpdate) {
        throw new NotFoundException(`Gathering with id ${id} not found`);
      }
      return gatheringToUpdate;
    } catch (e) {
      throw new BadRequestException('incorrect data');
    }
  }

  async findAll(): Promise<Gatherings[]> {
    return this.gatheringRepository.find();
  }

  async findOne(id: number): Promise<Gatherings> {
    const gathering = await this.gatheringRepository
        .createQueryBuilder('gathering')
        .leftJoinAndSelect('gathering.user', 'user')
        .leftJoinAndSelect('gathering.files', 'files')
        .where('gathering.id = :id', { id })
        .getOne();

    if (!gathering) {
      throw new BadRequestException(`Gathering with id ${id} not found`);
    }
    return gathering;
  }


  async findGatherings(
      options: Partial<FindGatheringsOptions> = {},
  ): Promise<Gatherings[]> {
    const qb = this.gatheringRepository.createQueryBuilder('gathering')
        .leftJoinAndSelect('gathering.user', 'user')
        .leftJoinAndSelect('gathering.files', 'files')
    if (options.query && options.query.trim() !== '') {
      const lowerCaseQuery = options.query.toLowerCase();
      qb.andWhere(
          '(LOWER(gathering.description) LIKE LOWER(:query) OR LOWER(gathering.name) LIKE LOWER(:query))',
          { query: `%${lowerCaseQuery}%` },
      );
    }


    if (options.isUrgent !== undefined) {
      if (options.isUrgent) {
        const currentDate = new Date();
        const afterFiveDays = new Date();
        afterFiveDays.setDate(currentDate.getDate() + 5);

        qb.andWhere(
            'gathering.endGathering BETWEEN :currentDate AND :afterFiveDays',
            {
              currentDate: currentDate.toISOString(),
              afterFiveDays: afterFiveDays.toISOString(),
            },
        );
      }
    }

    if (options.moneyTo !== undefined) {
      qb.andWhere('gathering.goal <= :moneyTo', {
        moneyTo: options.moneyTo,
      });
    }
    if (options.moneyFrom !== undefined) {
      qb.andWhere('gathering.goal >= :moneyFrom', {
        moneyFrom: options.moneyFrom,
      });
    }

    if (options.typeEnding && options.typeEnding.length > 0) {
      const currentDate = new Date();

      if (options.typeEnding.includes(TypeEnding.EndsThisWeek)) {
        const endOfWeek = new Date();
        //чтоб было только до конца недели
        // const dayOfWeek = currentDate.getDay();
        // const daysUntilEndOfWeek = 7 - (dayOfWeek === 0 ? 7 : dayOfWeek);
        // endOfWeek.setDate(currentDate.getDate() + daysUntilEndOfWeek);

        endOfWeek.setDate(currentDate.getDate() + 7);

        qb.andWhere(
            'gathering.endGathering BETWEEN :currentDate AND :endOfWeek',
            {
              currentDate: currentDate.toISOString(),
              endOfWeek: endOfWeek.toISOString(),
            },
        );
      }
      if (options.typeEnding.includes(TypeEnding.EndsThisMonth)) {
        const endOfMonth = new Date(currentDate);
        endOfMonth.setMonth(
            currentDate.getMonth() + 1 > 11
                ? currentDate.getMonth() - 11
                : currentDate.getMonth() + 1,
        );
        endOfMonth.setDate(0);

        console.log(endOfMonth.toISOString());

        qb.andWhere(
            'gathering.endGathering BETWEEN :currentDate AND :endOfMonth',
            {
              currentDate: currentDate.toISOString(),
              endOfMonth: endOfMonth.toISOString(),
            },
        );
      }
    }

    const sortOrder = options.sortOrder ?? 'DESC';
    qb.orderBy('gathering.createdAt', sortOrder)
        .take(options.limit)
        .skip(options.offset);

    return qb.getMany();
  }

  async delete(id: number): Promise<void> {
    const result = await this.gatheringRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gathering with id ${id} not found`);
    }
  }

  async updateGatheringStatus(id: number, updatedData: Partial<Gatherings>): Promise<Gatherings> {
    const gatherings = await this.gatheringRepository.findOne({ where: { id }});

    if (!gatherings) {
      throw new NotFoundException(`Gathering with ID ${id} not found`);
    }

    Object.assign(gatherings, updatedData);

    return this.gatheringRepository.save(gatherings);
  }

  async markGatheringsAsCompleted(id: number) : Promise<Gatherings> {
    return this.updateGatheringStatus(id, { is_completed: true });
  }

  async markGatheringsAsFavorite(id: number): Promise<Gatherings> {
    return this.updateGatheringStatus(id, { is_favorite: true });
  }
}