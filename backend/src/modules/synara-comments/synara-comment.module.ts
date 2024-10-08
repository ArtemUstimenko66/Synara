import { Module } from '@nestjs/common';
import { SynaraCommentService } from './synara-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SynaraComment } from './entity/synara-comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SynaraCommentController } from './synara-comment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SynaraComment]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [SynaraCommentController],
  providers: [SynaraCommentService],
  exports: [SynaraCommentService],
})
export class SynaraCommentModule {}
