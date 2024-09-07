import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VictimsEntity } from '../entities/victim.entity';
import { CreateVictimDto } from '../dtos/create-victim.dto';

@Injectable()
export class VictimService {
  constructor(
    @InjectRepository(VictimsEntity)
    private victimsRepository: Repository<VictimsEntity>,
  ) {}

  async create(createVictimDto: CreateVictimDto): Promise<VictimsEntity> {
    const victim = this.victimsRepository.create(createVictimDto);
    return await this.victimsRepository.save(victim);
  }
}
