import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('SECRET_KEY'),
            signOptions: { expiresIn: '1h' },
        }),
          inject: [ConfigService],
      })
  ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
