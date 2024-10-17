import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { User } from '../users/entities/users.entity';
import { FileController } from './controllers/file.controller';
import { S3Service } from './services/s3.service';
import { FileService } from './services/file.service';
import { S3Config } from './aws-s3.config';
import { Announcement } from '../announcement/announcement.entity';
import { FileGathering } from './entities/file-gathering.entity';
import { GatheringsModule } from '../gatherings/gatherings.module';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Module({
  imports: [
    TypeOrmModule.forFeature([File, User, Announcement, FileGathering]),
    GatheringsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],

  controllers: [FileController],
  providers: [S3Service, FileService, S3Config],
  exports: [S3Service],
})
export class FileModule {}
