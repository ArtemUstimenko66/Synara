import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './modules/translation/entities/translation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {
    this.firstLaunch();
  }

  async firstLaunch() {
    if ((await this.translationRepository.find()).length == 0) {
      await this.translationRepository.save({
        name: 'hopeBack',
        original: 'НАДІЯ НА КРИЛАХ ПОВЕРТАЄТЬСЯ',
        page: 'home',
      });
      await this.translationRepository.save({
        name: 'underHopeBack',
        original:
          'У важкі часи ми стаємо сильнішими разом. Приєднуйтесь до нашої спільноти підтримки та допомоги.',
        page: 'home',
      });
      await this.translationRepository.save({
        name: 'join',
        original: 'ПРИЄДНАТИСЯ',
        page: 'home',
      });
      await this.translationRepository.save({
        name: 'sign in',
        original: 'ВХІД В АККАУНТ',
        page: 'login',
      });
      await this.translationRepository.save({
        name: 'email',
        original: 'Пошта',
        page: 'login',
      });
      await this.translationRepository.save({
        name: 'password',
        original: 'Пароль',
        page: 'login',
      });
    }
  }
}
