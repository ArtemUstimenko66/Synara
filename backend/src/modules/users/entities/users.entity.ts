import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role.enum';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the user',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username of the user',
    type: String,
  })
  @Column()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
    uniqueItems: true,
    type: String,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '+38066996699',
    description: 'Phone number of the user',
    type: String,
  })
  @Column({ nullable: true })
  phoneNumber: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the user account',
    type: String,
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Role of the user in the system',
    type: String,
  })
  @Column({ type: 'enum', enum: Role, default: Role.Guest })
  role: Role;

  @ApiProperty({
    example: 'true',
    description: 'Confirmation of user phone number',
    type: Boolean,
  })
  @Column({ default: false })
  isPhoneVerified: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Confirmation of user email',
    type: Boolean,
  })
  @Column({ default: false })
  isConfirmedEmail: boolean;
}
