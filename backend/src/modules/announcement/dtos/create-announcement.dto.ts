import { ApiProperty } from '@nestjs/swagger';
import { TypeHelp } from '../type-help.enum';
import {IsNotEmpty, IsEnum, IsString, IsDate, IsBoolean} from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({
    example: '2024-08-25',
    description: 'Date when the announcement is posted',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  datePosted: Date;

  @ApiProperty({
    example: 'I need psychological help',
    description: 'Description of the announcement',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Urgent',
    description: 'Urgent of the announcement',
    type: String,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_urgent: boolean;

  @ApiProperty({
    example: 'humanitarian',
    description: 'Type of help requested',
    type: String,
  })
  @IsEnum(TypeHelp)
  @IsNotEmpty()
  typeHelp: TypeHelp;
}
