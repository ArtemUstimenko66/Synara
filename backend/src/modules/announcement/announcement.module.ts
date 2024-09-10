import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './announcement.entity';
import { UsersModule } from '../users/modules/users.module';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement]),
    ScheduleModule.forRoot({}),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
  exports: [AnnouncementService, TypeOrmModule],
})
export class AnnouncementModule {}
