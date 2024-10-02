import { Module } from '@nestjs/common';
import { GatheringsController } from './gatherings.controller';
import { GatheringsService } from './gatherings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gatherings } from './entity/gatherings.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gatherings]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [GatheringsController],
  providers: [GatheringsService],
  exports: [GatheringsService, TypeOrmModule],
})
export class GatheringsModule {}