import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { UsersModule } from '../users/modules/users.module';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement]),
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
  providers: [AnnouncementService, JwtStrategy],
  controllers: [AnnouncementController],
  exports: [AnnouncementService, TypeOrmModule],
})
export class AnnouncementModule {}
