import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { VolunteersModule } from '../users/volunteers.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '../../cache.module';
import { SmsModule } from '../sms/sms.module';
import { VictimsModule } from '../users/victims.module';
import { TwitterStrategy } from './strategy/twitter.strategy';

@Module({
  imports: [
    UsersModule,
    VolunteersModule,
    VictimsModule,
    PassportModule,
    SmsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '55s' },
      }),
    }),
    CacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TwitterStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
