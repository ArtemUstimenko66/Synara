import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SynaraCommentCreateDto {
  @ApiProperty({
    example: 'Hello, Synara is good',
    description: 'Text for the comment',
    type: Date,
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    example: '5',
    description: 'Rating of the comment',
    type: Date,
  })
  @IsNumber()
  rating: number;
}
