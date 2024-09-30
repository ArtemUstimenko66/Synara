import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
import { GenderType } from '../enums/gender.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  MinLength,
  IsEnum,
  IsNumber,
} from 'class-validator';
import {SupportType} from "../enums/support-type.enum";

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name is required' })
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'secure_password123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @ApiProperty({
    example: '+38066996699',
    description: 'Phone number of the user',
  })
  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @ApiProperty({
    description: 'The birth date of the user',
    example: '1990-01-01',
  })
  @IsDate({ message: 'Invalid date format' })
  birthDate?: Date;

  @ApiProperty({
    description: 'The role of the user',
    example: 'guest',
  })
  @IsOptional()
  @IsEnum(Role, { message: 'Invalid role value' })
  role?: Role;

  @ApiProperty({
    description: 'The gender of the user',
    example: 'male',
  })
  @IsEnum(GenderType, {
    each: true,
    message: 'Each gender type  must be a valid GenderType',
  })
  gender?: GenderType;

  @ApiProperty({
    example: '1234567890',
    description: 'UNP of the user',
  })
  @IsNumber({}, { message: 'UNP must be a number' })
  UNP?: number;
}
