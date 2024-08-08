import {Module} from "@nestjs/common";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGoogleController} from "./auth-google.controller";
import {AuthGoogleService} from "./auth-google.service";
import {GoogleStrategy} from "./strategies/google.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {PassportModule} from "@nestjs/passport";


@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory:  (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
    ],
    controllers: [AuthGoogleController],
    providers: [AuthGoogleService, GoogleStrategy, JwtStrategy],
    exports: [AuthGoogleService, GoogleStrategy, JwtStrategy],
    }
)
export class AuthGoogleModule {}