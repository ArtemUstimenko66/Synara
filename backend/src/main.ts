import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.use(
      session({
        secret: 'secsecsec',
        resave: false,
        saveUninitialized: false,
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 8080);
  const corsOrigin = [
    'https://synara.help',
    'https://www.synara.help',
    'http://localhost:5173'
  ];

  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('api')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
