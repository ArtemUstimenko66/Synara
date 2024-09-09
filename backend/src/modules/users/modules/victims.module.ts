import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { VictimService } from '../services/victim.service';
import { VictimsEntity } from '../entities/victim.entity';
import { GeocodingService } from "../services/geocoding.service";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [
    TypeOrmModule.forFeature([VictimsEntity]),
    forwardRef(() => AuthModule),
    HttpModule,
  ],
  controllers: [],
  providers: [VictimService, GeocodingService],
  exports: [VictimService, GeocodingService, TypeOrmModule],
})
export class VictimsModule {}
