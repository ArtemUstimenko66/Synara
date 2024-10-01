import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Petition } from "./petition.entity";
import { PetitionController } from "./petition.controller";
import { PetitionService } from "./petition.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Petition]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
            }),
        }),
    ],
    controllers: [PetitionController],
    providers: [PetitionService],
    exports: [PetitionService, TypeOrmModule],
})
export class PetitionModule {}
