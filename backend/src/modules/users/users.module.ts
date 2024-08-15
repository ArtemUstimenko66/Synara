import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controller/user.controller';
import { User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], //export typeOrm ???
})
export class UsersModule {}
