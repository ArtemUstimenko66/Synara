import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VolunteersEntity } from '../entities/volunteers.entity';
import { CreateVolunteerDto } from '../dtos/create-volunteer.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectRepository(VolunteersEntity)
    private volunteersRepository: Repository<VolunteersEntity>,
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
}
