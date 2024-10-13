import { Controller, Get } from '@nestjs/common';
import { UnbrokennessService } from './unbrokenness.service';

@Controller('unbrokenness')
export class UnbrokennessController {
  constructor(private readonly unbrokennessService: UnbrokennessService) {}

  @Get()
  async getUnbrokennessMap() {
    return await this.unbrokennessService.getUnbrokennessMap();
  }

  @Get("deep-map")
  async getDeepMap() {
    return await this.unbrokennessService.getDeepMap();
  }
}
