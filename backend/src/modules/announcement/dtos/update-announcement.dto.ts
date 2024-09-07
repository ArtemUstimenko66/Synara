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
    example: '2024-08-25',
    description: 'Date when user posted the announcement',
    type: String,
    required: false,
  })
  @IsDateString()
  @IsOptional()
  datePosted?: Date;

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
