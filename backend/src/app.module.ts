import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: "postgres",
          host: "",
          port: 5432,
          username: "",
          password: "",
          database: "",
          entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
          synchronize : true
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
