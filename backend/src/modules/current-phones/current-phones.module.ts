import { Module } from '@nestjs/common';
import { CurrentPhonesService } from './current-phones.service';
import { CurrentPhonesController } from './current-phones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentPhones } from './entity/current-phones.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrentPhones]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [CurrentPhonesController],
  providers: [CurrentPhonesService],
  exports: [CurrentPhonesService],
})
export class CurrentPhonesModule {}
