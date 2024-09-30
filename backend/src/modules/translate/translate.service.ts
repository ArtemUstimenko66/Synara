import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';

@Injectable()
export class TranslateService {
  private translate: Translate;

  constructor() {
    this.translate = new Translate({
      key: 'AIzaSyDx4I-E8nJivVQtvzZbzN6HpYcdTtTCJfY',
    });
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    const [translation] = await this.translate.translate(text, targetLanguage);
    return translation;
  }
}
