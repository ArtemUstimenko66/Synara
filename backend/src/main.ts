import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 8080);
  const corsOrigin = configService.get<string>('CORS_ORIGIN', '*');

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  const logger = new Logger('Bootstrap');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
