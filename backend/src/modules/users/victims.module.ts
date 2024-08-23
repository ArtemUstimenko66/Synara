import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VictimService } from './services/victim.service';
import { VictimsEntity } from './entities/victim.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([VictimsEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [VictimService],
  exports: [VictimService, TypeOrmModule],
})
export class VictimsModule {}
