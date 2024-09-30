import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVictimDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user',
  })
  @IsNumber({}, { message: 'User ID must be a number' })
  userId: number;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the victim',
  })
  @IsString({ message: 'Region must be a string' })
  region: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'City of the victim',
  })
  @IsString({ message: 'City must be a string' })
  city: string;

  @ApiProperty({
    example: 'Shevchenko',
    description: 'Street of the victim',
  })
  @IsString({ message: 'Street must be a string' })
  street: string;

  @ApiProperty({
    example: '99',
    description: 'House number of the victim',
  })
  @IsNumber({}, { message: 'House number must be a number' })
  houseNumber: string;

  @ApiProperty({
    example: '201',
    description: 'Flat number of the victim',
  })
  @IsNumber({}, { message: 'Flat number must be a number' })
  flatNumber: number;
}
