import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ConfirmIpnController } from './confirm-ipn.controller';
import { ConfirmIpnService } from './confirm-ipn.service';

@Module({
  imports: [UsersModule],
  controllers: [ConfirmIpnController],
  providers: [ConfirmIpnService],
  exports: [ConfirmIpnService],
})
export class ConfirmIpnModule {}
