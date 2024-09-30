import { Module } from '@nestjs/common';
import { UnbrokennessService } from './unbrokenness.service';
import { ConfigModule } from '@nestjs/config';
import { UnbrokennessController } from './unbrokenness.controller';

@Module({
    imports: [ConfigModule],
    controllers: [UnbrokennessController],
    providers: [UnbrokennessService],
})
export class UnBrokennessModule {}