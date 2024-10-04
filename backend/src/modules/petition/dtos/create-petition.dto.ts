import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import {PetitionTopic} from "../enums/petition-topic.enum";
import {Column} from "typeorm";

export class CreatePetitionDto {
    @ApiProperty({
        example: 'Save the Forests',
        description: 'Title of the petition',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(225)
    title: string;

    @ApiProperty({
        example: 'NO_SUBJECT',
        description: 'Topic of the petition',
        type: String,
    })
    @IsOptional()
    topic?: PetitionTopic[];

    @ApiProperty({
        example: '12345',
        description: 'Petition number',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    petitionNumber: string;

    @ApiProperty({
        example: 'Alex',
        description: 'Petition author',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    petitionAuthor: string;

    @ApiProperty({
        example: 'We request the government to take immediate action to save the forests...',
        description: 'Full text of the petition',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        example: 'https://example.com/petition/save-the-forests',
        description: 'Link to the petition',
        type: String,
    })
    @IsNotEmpty()
    @IsUrl()
    @MaxLength(500)
    link: string;

    @ApiProperty({
        example: false,
        description: 'Indicates whether the petition has a response',
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    hasResponse?: boolean;

    @ApiProperty({
        example: '2024-10-15T12:00:00.000Z',
        description: 'Date when the petition was responded to, optional',
        type: Date,
        required: false,
    })
    @IsOptional()
    responseDate?: Date;

    // @ApiProperty({
    //     example: '2024-09-23T18:30:00.000Z',
    //     description: 'Date when the petition was created',
    //     type: Date,
    // })
    // @IsOptional()
    // creationDate: Date;

    @ApiProperty({
        example: false,
        description: 'Indicates whether the petition is completed',
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;

    @ApiProperty({
        example: 0,
        description: 'Number of signatures for the petition',
    })
    signatureCount?: number;
}