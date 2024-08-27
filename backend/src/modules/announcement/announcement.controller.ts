import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Announcement')
@Controller('announcement')
export class AnnouncementController {
  constructor() {}
}
