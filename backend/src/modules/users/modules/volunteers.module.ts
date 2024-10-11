import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { VolunteersEntity } from '../entities/volunteers.entity';
import { VolunteersService } from '../services/volunteer.service';
import { CommentsModule } from "../../comments/comments.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([VolunteersEntity]),
    forwardRef(() => AuthModule),
    CommentsModule
  ],
  controllers: [],
  providers: [VolunteersService],
  exports: [VolunteersService, TypeOrmModule],
})
export class VolunteersModule {}
