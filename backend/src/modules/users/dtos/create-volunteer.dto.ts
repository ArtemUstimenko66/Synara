import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsArray,
  IsOptional,
  IsNumber, IsDecimal, Min, Max,
} from 'class-validator';
import { SupportType } from '../enums/support-type.enum';
import {WorkingDays} from "../enums/working-days.enum";

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
  supports: SupportType;

  @ApiProperty({
    example: 12345,
    description: 'Identification number of the volunteer',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Volunteer identification number must be a number' })
  volunteer_identification_number?: number;

  @IsOptional()
  @IsDecimal( { decimal_digits: '1,1'})
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiProperty({
    example: ['Monday', 'Wednesday', 'Friday'],
    description: 'Working days of the volunteer',
    required: false,
  })

  @ApiProperty({
    example: 'Monday',
    description: 'Start working day of the volunteer',
  })
  @IsOptional()
  @IsString({ message: 'Start working day must be a string' })
  startWorkingDay?: WorkingDays;

  @ApiProperty({
    example: 'Friday',
    description: 'End working day of the volunteer',
  })
  @IsOptional()
  @IsString({ message: 'End working day must be a string' })
  endWorkingDay?: WorkingDays;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the volunteer\'s working hours in HH:mm format',
  })
  @IsString({ message: 'Working hours must be a string' })
  startTime?: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the volunteer\'s working hours in HH:mm format',
  })
  @IsString({ message: 'Working hours must be a string' })
  endTime?: string;

  @ApiProperty({
    example: 'Helping the elderly with daily tasks.',
    description: 'Description of the volunteer’s activities',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
