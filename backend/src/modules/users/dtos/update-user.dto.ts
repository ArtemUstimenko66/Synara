import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
import { GenderType } from '../enums/gender.enum';
import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsDate,
    MinLength,
    IsEnum,
    IsNumber,
} from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'secure_password123',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password?: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;

    @ApiProperty({
        example: '+38066996699',
        description: 'Phone number of the user',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsPhoneNumber(null, { message: 'Invalid phone number' })
    phoneNumber?: string;

    @ApiProperty({
        description: 'The birth date of the user',
        example: '1990-01-01',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsDate({ message: 'Invalid date format' })
    birthDate?: Date;

    @ApiProperty({
        description: 'The role of the user',
        example: 'guest',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsEnum(Role, { message: 'Invalid role value' })
    role?: Role;

    @ApiProperty({
        description: 'The gender of the user',
        example: 'male',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsEnum(GenderType, {
        each: true,
        message: 'Each gender type must be a valid GenderType',
    })
    gender?: GenderType;

    @ApiProperty({
        example: '1234567890',
        description: 'UNP of the user',
        required: false, // Поле не обязательно
    })
    @IsOptional()
    @IsNumber({}, { message: 'UNP must be a number' })
    UNP?: number;
}
