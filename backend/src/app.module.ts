import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { UsersModule } from './modules/users/users.module';
import { VolunteersModule } from './modules/users/volunteers.module';
import { VictimsModule } from './modules/users/victims.module';
import { SmsModule } from './modules/sms/sms.module';
import { CacheModule } from './cache.module';
import { ConfirmEmailModule } from './modules/email/confirm-email/confirm-email.module';
import { SendEmailModule } from './modules/email/send-email/send-email.module';
import { FileModule } from './modules/s3-storage/file.module';
import { PasswordModule } from './modules/password/password.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    AuthGoogleModule,
    UsersModule,
    VolunteersModule,
    VictimsModule,
    SmsModule,
    CacheModule,
    ConfirmEmailModule,
    SendEmailModule,
    FileModule,
    PasswordModule,
    ResetPasswordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
