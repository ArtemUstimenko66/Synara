import { Module } from '@nestjs/common';
import { UsersModule } from '../users/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    PasswordModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy, JwtStrategy],
  exports: [AuthGoogleService, GoogleStrategy, JwtStrategy],
})
export class AuthGoogleModule {}
