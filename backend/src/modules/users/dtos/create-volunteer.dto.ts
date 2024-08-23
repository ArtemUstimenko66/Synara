import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { SupportType } from '../enums/support-type.enum';

export class CreateVolunteerDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user',
  })
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: number;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the volunteer',
  })
  @IsString({ message: 'Region must be a string' })
  region: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'City of the volunteer',
  })
  @IsString({ message: 'City must be a string' })
  city: string;

  @ApiProperty({
    example: ['MENTOR', 'SUPPORTER'],
    description: 'Types of support the volunteer provides',
    type: [String],
  })
  @IsArray({ message: 'Supports must be an array' })
  @IsEnum(SupportType, {
    each: true,
    message: 'Each support type must be a valid SupportType',
  })
  supports: SupportType[];

  @ApiProperty({
    example: 12345,
    description: 'Identification number of the volunteer',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Volunteer identification number must be a number' })
  volunteer_identification_number?: number;
}
