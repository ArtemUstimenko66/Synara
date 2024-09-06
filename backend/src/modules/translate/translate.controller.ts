import { Body, Controller, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  async translate(@Body() body: { text: string; targetLanguage: string }) {
    const { text, targetLanguage } = body;
    const translation = await this.translateService.translateText(
      text,
      targetLanguage,
    );
    return { translation };
  }
}
