import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../users/entities/users.entity';

export class CommentsCreateDto {
  @ApiProperty({
    example: 'Дуже гарнтй волонтер',
    description: 'Description of the comment',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '5',
    description: 'Rating of the gathering',
    type: String,
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  volunteer: User;
}
