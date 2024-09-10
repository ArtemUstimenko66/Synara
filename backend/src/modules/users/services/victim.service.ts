import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VictimsEntity } from '../entities/victim.entity';
import { CreateVictimDto } from '../dtos/create-victim.dto';
import { GeocodingService } from './geocoding.service';

@Injectable()
export class VictimService {
  constructor(
    @InjectRepository(VictimsEntity)
    private victimsRepository: Repository<VictimsEntity>,
    private geocodingService: GeocodingService,
  ) {}

  async create(createVictimDto: CreateVictimDto): Promise<VictimsEntity> {
    const victim = this.victimsRepository.create(createVictimDto);
    return await this.victimsRepository.save(victim);
  }


  async getVictimCoordinates(
    id: number,
  ): Promise<{ lat: number; lng: number }> {
    const victim = await this.victimsRepository.findOne({
      where: { id },
    });

    if (!victim) {
      throw new Error('Victim not found');
    }

    const address = `${victim.street} ${victim.houseNumber}, ${victim.city}, ${victim.region}, ${victim.flatNumber}`;
    return this.geocodingService.getCoordinates(address);
  }
}
