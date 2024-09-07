import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '../enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || Role.Guest,
    });
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['volunteer', 'victim'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { phoneNumber } });
  }
  //
  // async findById(id: number): Promise<User | undefined> {
  //   return this.userRepository.findOne({
  //     where: { id },
  //   });
  // }

  async updatePhoneVerificationStatus(
    phoneNumber: string,
    isVerified: boolean,
  ): Promise<void> {
    await this.userRepository.update(
      { phoneNumber },
      { isPhoneVerified: isVerified },
    );
  }
}
