import { Module } from '@nestjs/common';
import typeorm from './config/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { UsersModule } from './modules/users/modules/users.module';
import { VolunteersModule } from './modules/users/modules/volunteers.module';
import { VictimsModule } from './modules/users/modules/victims.module';
import { SmsModule } from './modules/sms/sms.module';
import { CacheModule } from './cache.module';
import { ConfirmEmailModule } from './modules/email/confirm-email/confirm-email.module';
import { SendEmailModule } from './modules/email/send-email/send-email.module';
import { FileModule } from './modules/s3-storage/file.module';
import { PasswordModule } from './modules/util-password/password.module';
import { ResetPasswordModule } from './modules/reset-password/reset-password.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { TranslateModule } from './modules/translate/translate.module';
import { ChatsModule } from './modules/real-time-chat/chats/chats.module';
import { MessagesModule } from './modules/real-time-chat/messages/messages.module';
import { TranslationModule } from './modules/translation/translation.module';

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
    AnnouncementModule,
    TranslateModule,
    ChatsModule,
    MessagesModule,
    TranslationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
