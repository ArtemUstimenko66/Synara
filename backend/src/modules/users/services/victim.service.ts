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

  async findVictimsByCity(city: string): Promise<any[]> {
    const victims = await this.victimsRepository.find({ where: { city } });

    const victimsWithCoordinates = await Promise.all(
      victims.map(async (victim) => {
        const { street, houseNumber } = victim;
        const address = `${city}, ${street}, ${houseNumber}`;

        const coordinates = await this.geocodingService.getCoordinates(address);

        return {
          victimId: victim.id,
          address,
          coordinates,
        };
      }),
    );

    return victimsWithCoordinates;
  }
}
