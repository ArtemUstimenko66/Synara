import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import {AuthGoogleModule} from "./modules/auth-google/auth-google.module";
import {User} from "./modules/users/entities/users.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
             useFactory: (configService: ConfigService) => ({
            //     type: 'postgres',
            //     host: configService.get<string>('DB_HOST'),
            //     port: configService.get<number>('DB_PORT'),
            //     username: configService.get<string>('DB_USERNAME'),
            //     password: configService.get<string>('DB_PASSWORD'),
            //     database: configService.get<string>('DB_NAME'),
            //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            //     synchronize: true, // Не использовать на продакшене
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '12345',
                database: 'synara',
                entities: [User],
                synchronize: true,
             }),
            inject: [ConfigService],
        }),
        AuthModule,
        UsersModule,
        AuthGoogleModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}