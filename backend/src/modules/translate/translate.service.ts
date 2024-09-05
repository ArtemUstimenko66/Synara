import { BadRequestException, Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from '../translation/entities/translation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TranslateService {
  private translate: Translate;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {
    this.translate = new Translate({
      key: this.configService.get('GOOGLE_TRANSLATION_KEY'), //'AIzaSyDx4I-E8nJivVQtvzZbzN6HpYcdTtTCJfY',
    });
  }

  async translateText(targetLanguage: string, page: string): Promise<any[]> {
    try {
      const elementsFromPage = await this.translationRepository.find({
        where: { page },
      });

      const translatedText: any[] = [];
      if (targetLanguage !== 'uk') {
        for (const translation of elementsFromPage) {
          const [currentTranslation] = await this.translate.translate(
            translation.original,
            targetLanguage,
          );
          this.addToTranslatedArray(
            translatedText,
            translation.name,
            currentTranslation,
          );
        }
      } else {
        for (const translation of elementsFromPage) {
          this.addToTranslatedArray(
            translatedText,
            translation.name,
            translation.original,
          );
        }
      }
      return translatedText;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  private addToTranslatedArray(
    translatedText: any[],
    name: string,
    currentTranslation: string,
  ) {
    translatedText.push({
      name: name,
      translation: currentTranslation,
    });
  }
}
