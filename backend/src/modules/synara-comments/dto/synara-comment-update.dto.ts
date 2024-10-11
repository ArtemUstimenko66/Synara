import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SynaraCommentUpdateDto {
  @ApiProperty({
    example: 'Hello, Synara is good',
    description: 'Text for the comment',
    type: Date,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    example: '5',
    description: 'Rating of the comment',
    type: Date,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: '2024-10-8T12:00:00.000Z',
    description: 'Date when the comment was created',
    type: Date,
    required: false,
  })
  @IsOptional()
  dateCreated: Date;
}
