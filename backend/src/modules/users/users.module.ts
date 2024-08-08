import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { User } from "./entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],

  //Добавил, так как была ошибка с User Repository
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
