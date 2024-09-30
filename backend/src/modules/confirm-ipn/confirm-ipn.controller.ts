import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmIpnService } from './confirm-ipn.service';
import { ConfirmIpnDto } from './dtos/confirm-ipn.dto';

@ApiTags('Confirmation of ipn')
@Controller('api/confirm-ipn')
export class ConfirmIpnController {
  constructor(private readonly ipnService: ConfirmIpnService) {}

  @Post('/check')
  async checkUserIPN(@Body() confirmIPNDto: ConfirmIpnDto) {
    const birth = new Date(confirmIPNDto.date);
    return this.ipnService.checkUserIPNByBirth(confirmIPNDto.ipn, birth);
  }
}
