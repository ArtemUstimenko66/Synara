import { ApiProperty } from '@nestjs/swagger';
import { TypeHelp } from '../type-help.enum';
import { IsNotEmpty, IsEnum, IsString, IsDate } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({
    example: '2024-08-25',
    description: 'Date when the announcement is posted',
    type: Date,
  })
  @IsDate()
  @IsNotEmpty()
  datePosted: Date;

  @ApiProperty({
    example: 'I need psychological help',
    description: 'Description of the announcement',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'humanitarian',
    description: 'Type of help requested',
    type: String,
  })
  @IsEnum(TypeHelp)
  @IsNotEmpty()
  typeHelp: TypeHelp;
}
