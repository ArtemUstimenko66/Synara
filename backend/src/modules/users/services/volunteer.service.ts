import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { VolunteersEntity } from '../entities/volunteers.entity';
import { CreateVolunteerDto } from '../dtos/create-volunteer.dto';
import { SupportType } from "../enums/support-type.enum";
import { GenderType } from "../enums/gender.enum";
import { Comment } from "../../comments/entity/comments.entity";
import {UpdateVolunteerDto} from "../dtos/update-volunteer.dto";

export interface FindVolunteersOptions {
  name?: string;
  supports?: SupportType[];
  gender?: GenderType;
  minAge?: number;
  maxAge?: number;
  sortOrder?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}

@Injectable()
export class VolunteersService {
  constructor(
    @InjectRepository(VolunteersEntity)
    private volunteersRepository: Repository<VolunteersEntity>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(
    createVolunteerDto: CreateVolunteerDto,
  ): Promise<VolunteersEntity> {
    const volunteer = this.volunteersRepository.create(createVolunteerDto);
    return await this.volunteersRepository.save(volunteer);
  }

  async findByUserId(userId: number): Promise<VolunteersEntity> {
    return this.volunteersRepository.findOne({
      where: { userId },
    });
  }

  async updateVolunteer(updatedVolunteer : UpdateVolunteerDto, id : number){
    const volunteer = await this.volunteersRepository.findOneBy({ user:{id}});
    if (!volunteer) {
      throw new NotFoundException(`Volunteer ${id} not found`);
    }

    Object.assign(volunteer, updatedVolunteer);

    return await this.volunteersRepository.save(volunteer);
  }


  async findVolunteers(
      options: Partial<FindVolunteersOptions> = {},
  ): Promise<VolunteersEntity[]> {
    const qb = this.volunteersRepository
        .createQueryBuilder('volunteer')
        .leftJoinAndSelect('volunteer.user', 'user');
    qb.andWhere('volunteer.is_show_my_profile = :isShowProfile', {
      isShowProfile : true
    })


    this.applyNameFilter(qb, options.name);
    this.applySupportsFilter(qb, options.supports);
    this.applyGenderFilter(qb, options.gender);
    this.applyAgeFilter(qb, options.minAge, options.maxAge);

    if (options.sortOrder) {
      qb.orderBy('volunteer.rating', options.sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    return qb.getMany();
  }

  async findVolunteerById(userId: number): Promise<VolunteersEntity> {
    const volunteer = await this.volunteersRepository
        .createQueryBuilder('volunteer')
        .leftJoinAndSelect('volunteer.user', 'user')
        .where('user.id = :userId', { userId })
        .getOne();

    if (!volunteer) {
      throw new Error(`Volunteer with user ID ${userId} not found`);
    }

    return volunteer;
  }


  private applyNameFilter(qb: SelectQueryBuilder<VolunteersEntity>, name?: string) {
    if (name?.trim()) {
      qb.andWhere('user.firstName ILIKE :name OR user.lastName ILIKE :name', {
        name: `%${name}%`,
      });
    }
  }

  private applySupportsFilter(qb: SelectQueryBuilder<VolunteersEntity>, supports?: string | string[]) {
    if (supports && supports.length > 0) {
      const supportsArray = [].concat(supports);
      qb.andWhere('volunteer.supports && :supports', {
        supports: supportsArray,
      });
    }
  }

  private applyGenderFilter(qb: SelectQueryBuilder<VolunteersEntity>, gender?: string) {
    if (gender) {
      qb.andWhere('user.gender = :gender', { gender });
    }
  }

  private applyAgeFilter(
      qb: SelectQueryBuilder<VolunteersEntity>,
      minAge?: number,
      maxAge?: number
  ) {
    const today = new Date();
    if (minAge !== undefined) {
      const minBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      qb.andWhere('user.birthDate <= :minBirthDate', { minBirthDate });
    }

    if (maxAge !== undefined) {
      const maxBirthDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
      qb.andWhere('user.birthDate >= :maxBirthDate', { maxBirthDate });
    }
  }

  async calculateVolunteerRating(userId: number): Promise<number> {
    const volunteer = await this.volunteersRepository.findOne({
      where: { id: userId },
    });

    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${userId} not found`);
    }

    const comments = await this.commentRepository.find({
      where: { volunteer: { id: userId } },
    });

    if (comments.length === 0) {
      volunteer.rating = 0;
    } else {
      const totalRating = comments.reduce((sum, comment) => sum + parseFloat(comment.rating.toString()), 0);
      const averageRating = totalRating / comments.length;

      volunteer.rating = parseFloat(averageRating.toFixed(2)); // Используя toFixed
      // volunteer.rating = Math.round((averageRating + Number.EPSILON) * 100) / 100; // Используя Math.round
    }

    await this.volunteersRepository.save(volunteer);
    return volunteer.rating;
  }
}
