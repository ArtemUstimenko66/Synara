import {ApiProperty} from "@nestjs/swagger";
import {IsDecimal, IsEnum, IsNumber, IsOptional} from "class-validator";
import {Column} from "typeorm";
import {GenderType} from "../enums/gender.enum";
import {SupportType} from "../enums/support-type.enum";
import {WorkingDays} from "../enums/working-days.enum";

export class UpdateVictimDto {
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
        example: 'Shevchenko',
        description: 'Street where the victim resides',
    })
    @IsOptional()
    street?: string;

    @ApiProperty({
                    example: 99,
                    description: "House number of the victim's residence",
                })
    @IsOptional()
    houseNumber?: string;

    @ApiProperty({
        example: 201,
        description: "Flat number of the victim's residence",
    })
    @IsOptional()
    flatNumber?: number;

}