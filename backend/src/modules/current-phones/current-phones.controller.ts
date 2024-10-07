import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentPhonesService } from './current-phones.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentPhoneDto } from './dto/current-phone.dto';

@Controller('api/current-phones')
@UseGuards(JwtAuthGuard)
export class CurrentPhonesController {
  constructor(private readonly currentPhonesService: CurrentPhonesService) {}

  @Post('addLink')
  addLink(@Body() currentPhonesDto: CurrentPhoneDto) {
    return this.currentPhonesService.addLink(currentPhonesDto);
  }

  @Delete('delete/:chatId')
  deleteLink(@Param('chatId') chatId: number) {
    return this.currentPhonesService.deleteLink(chatId);
  }

  @Get('link/:chatId')
  getLink(@Param('chatId') chatId: number) {
    return this.currentPhonesService.getLink(chatId);
  }
}
