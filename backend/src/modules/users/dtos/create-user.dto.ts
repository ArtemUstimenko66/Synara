import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'secure_password123',
  })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'guest',
  })
  role?: Role;
}
