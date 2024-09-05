import { Body, Controller, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  async translate(@Body() body: { targetLanguage: string; page: string }) {
    const { targetLanguage, page } = body;
    const translation = await this.translateService.translateText(
      targetLanguage,
      page,
    );
    return { translation };
  }
}
