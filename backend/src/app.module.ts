import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: "postgres",
          host: "34.116.231.64",
          port: 5432,
          username: "postgres",
          password: "bkLpa@:&)<8?7LBJ",
          database: "Synara",
          entities: [__dirname + "/entities/**/*.entity{.ts,.js}"],
          synchronize : true
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
    constructor(private readonly connection: Connection) {}

    async onModuleInit() {
        try {
            const result = await this.connection.query('SELECT 1');
            console.log('Successfully connected to the database.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}
