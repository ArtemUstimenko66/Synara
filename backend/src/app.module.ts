import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { CacheModule } from './cache.module';
import { SmsModule } from './modules/sms/sms.module';
import { ConfirmEmailModule } from './modules/email/confirm-email/confirm-email.module';
import { SendEmailModule } from './modules/email/send-email/send-email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AuthGoogleModule,
    UsersModule,
    SmsModule,
    CacheModule,
    ConfirmEmailModule,
    SendEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
