import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Chat } from '../../real-time-chat/chats/chat.entity';

export class CurrentPhoneDto {
  @ApiProperty({
    example: 'http/jit.si/volunteer-NameVolunteer-Date',
    description: 'Link to conference',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  chat: Chat;
}
