import { ApiProperty } from '@nestjs/swagger';
import { TypeHelp } from '../type-help.enum';
import {IsNotEmpty, IsEnum, IsString, IsDate, IsBoolean} from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({
    example: 'Important Announcement',
    description: 'Title of the announcement',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Here are the detailed instructions for assistance...',
    description: 'Details of the announcement',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({
    example: '2024-08-25',
    description: 'Date when the announcement is posted',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  datePosted: Date;

  @ApiProperty({
    example: 'Shelter at X location',
    description: 'Current location of the victim',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  currentLocation: string;

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
