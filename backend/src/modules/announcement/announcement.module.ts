import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { UsersModule } from '../users/users.module';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement]), UsersModule],
  providers: [AnnouncementService],
  controllers: [AnnouncementController],
  exports: [AnnouncementService, TypeOrmModule],
})
export class AnnouncementModule {}
