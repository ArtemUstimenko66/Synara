import {ApiProperty} from "@nestjs/swagger";
import {IsDecimal, IsEnum, IsNumber, IsOptional} from "class-validator";
import {Column} from "typeorm";
import {GenderType} from "../enums/gender.enum";
import {SupportType} from "../enums/support-type.enum";
import {WorkingDays} from "../enums/working-days.enum";

export class UpdateVolunteerDto {
    @ApiProperty({
        description: 'Region where the volunteer is located',
        example: 'Kharkiv',
        required: false,
    })
    @IsOptional()
    region?: string;

    @ApiProperty({
        example: 'Kyiv',
        description: 'City where the volunteer is located',
        required: false,
    })
    @IsOptional()
    city?: string;

    @ApiProperty({
        description: 'Types of support the volunteer provides',
        example: ['MENTOR', 'SUPPORTER'],
        required: false,
    })
    @IsOptional()
    @IsEnum(SupportType, {
        each: true,
        message: 'Each support type must be a valid SupportType',
    })
    supports?: SupportType;

    @ApiProperty({
        example: 'Individual consultations',
        description: 'Short description of each type of support',
        required: false,
    })
    @IsOptional()
    support_description?: string;

    @ApiProperty({
        example: 123456,
        description: 'Unique identification number of the volunteer',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    volunteer_identification_number?: number;

    @ApiProperty({
        example: 4.5,
        description: 'Rating of the volunteer (from 0 to 5 stars)',
        required: false,
    })
    @IsOptional()
    @IsDecimal()
    rating?: number;

    @ApiProperty({
        example: 'Monday',
        description: 'Start working day of the volunteer',
        required: false,
    })
    @IsOptional()
    @IsEnum(WorkingDays, {
        each: true,
        message: 'Each WorkingDay type must be a valid WorkingDays',
    })
    startWorkingDay?: WorkingDays;

    @ApiProperty({
        example: 'Friday',
        description: 'End working day of the volunteer',
        required: false,
    })
    @IsOptional()
    @IsEnum(WorkingDays, {
        each: true,
        message: 'Each WorkingDay type must be a valid WorkingDays',
    })
    endWorkingDay?: WorkingDays;

    @ApiProperty({
        example: '09:00',
        description: 'Start time of the volunteer\'s working hours in HH:mm format',
        required: false,
    })
    @IsOptional()
    startTime?: string;

    @ApiProperty({
        example: '17:00',
        description: 'End time of the volunteer\'s working hours in HH:mm format',
        required: false,
    })
    @IsOptional()
    endTime?: string;

    @ApiProperty({
        example: 'Helping the elderly with daily tasks.',
        description: 'Description of the volunteer’s activities',
        required: false,
    })
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 'Кваліфікований',
        description: 'Answer of moderator about volunteer qualification.',
        required: false,
    })
    @IsOptional()
    moderator_answer?: string;

    @ApiProperty({
        example: 'true',
        description: 'Is show my profile in volunteer search.',
    })
    @IsOptional()
    is_show_my_profile?: boolean;

}