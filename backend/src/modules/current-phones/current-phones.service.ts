import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentPhones } from './entity/current-phones.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CurrentPhoneDto } from './dto/current-phone.dto';

@Injectable()
export class CurrentPhonesService {
  constructor(
    @InjectRepository(CurrentPhones)
    private readonly currentPhonesRepository: Repository<CurrentPhones>,
  ) {}

  async addLink(currentPhoneDto: CurrentPhoneDto) {
    try {
      const currentPhone = this.currentPhonesRepository.create({
        ...currentPhoneDto,
      });

      return await this.currentPhonesRepository.save(currentPhone);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new BadRequestException(err.message);
      }

      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async getLink(chatId: number): Promise<any> {
    const currentPhone = await this.currentPhonesRepository.findOne({
      where: { chatId },
    });
console.log(currentPhone.link);
    return { link: currentPhone.link };
  }

  async deleteLink(chatId: number): Promise<void> {
    const currentPhone = await this.currentPhonesRepository.delete({
      chatId,
    });
    if (currentPhone.affected === 0) {
      throw new NotFoundException(`Chat with id ${chatId} not found`);
    }
  }
}
