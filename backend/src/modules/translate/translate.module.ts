import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { ConfigModule } from '@nestjs/config';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [ConfigModule, TranslationModule],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}
