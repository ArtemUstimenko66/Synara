import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/entities/users.entity';

export class CommentsUpdateDto {
  @ApiProperty({
    example: 'Дуже гарнтй волонтер',
    description: 'Description of the comment',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '5',
    description: 'Rating of the gathering',
    type: String,
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'User',
    description: 'User',
    type: User,
  })
  @IsOptional()
  volunteer?: User;

  @ApiProperty({
    example: 'User',
    description: 'User',
    type: User,
  })
  @IsOptional()
  author?: User;
}
