import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeHelp } from '../type-help.enum';

export class PartialUpdateAnnouncementDto {
  @ApiProperty({
    example: 'Important Announcement',
    description: 'Title of the announcement',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Here are the detailed instructions for assistance...',
    description: 'Details of the announcement',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  details?: string;

  @ApiProperty({
    example: '2024-08-25',
    description: 'Date when user posted the announcement',
    type: String,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  datePosted?: Date;

  @ApiProperty({
    example: 'Shelter at X location',
    description: 'Current location of the victim',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  currentLocation?: string;

  @ApiProperty({
    example: 'I need a psychological help',
    description: 'Description of the announcement',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'humanitarian',
    description: 'Type of help needed or provided',
    type: String,
    required: false,
  })
  @IsEnum(TypeHelp)
  @IsOptional()
  typeHelp?: TypeHelp;

  @ApiProperty({
    example: 1,
    description: 'User ID who posted the announcement',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  userId?: number;
}
