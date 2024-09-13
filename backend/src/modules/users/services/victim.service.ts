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
    const victims = await this.victimsRepository.find({
      where: { city },
      relations: [
        'user',
        'user.announcements',
        'user.announcements.files',
        'user.announcements.user',
      ],
    });
    const victimsWithCoordinates = await Promise.all(
        victims.map(async (victim) => {
          const { street, houseNumber, user } = victim;
          const address = `${city}, ${street} ${houseNumber}`; //${region},

          const coordinates = await this.geocodingService.getCoordinates(address);
          console.log(victim);
          return {
            victimId: victim.id,
            address,
            coordinates,
            user,
            announcements: user?.announcements || [],
          };
        }),
    );

    return victimsWithCoordinates;
  }

  async getUsersByRadius(radius: number, city: string): Promise<any[]> {
    const victimsWithCoordinates = await this.findVictimsByCity(city);

    const centreCoordinates = await this.geocodingService.getCoordinates(city);
    const victimsInRange = victimsWithCoordinates.filter((victim) => {
      const distance = this.getDistanceFromLatLonInKm(
        centreCoordinates.lat,
        centreCoordinates.lng,
        victim.coordinates.lat,
        victim.coordinates.lng,
      );
      console.log('Distance', distance);
      return distance <= radius;
    });

    const announcements = await Promise.all(
        victimsInRange.map(async (victim) => victim.announcements)
    );

    const flattenedAnnouncements = announcements.flat();

    return flattenedAnnouncements;

  }
  getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
