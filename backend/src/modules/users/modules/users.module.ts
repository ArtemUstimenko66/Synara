import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { UserController } from '../controller/user.controller';
import { VictimsModule } from './victims.module';
import { FileModule } from '../../s3-storage/file.module';
import {VolunteersModule} from "./volunteers.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    VictimsModule,
    VolunteersModule,
    FileModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], //TypeOrmModule что бы другие модули могли работать с ним.
})
export class UsersModule {}
