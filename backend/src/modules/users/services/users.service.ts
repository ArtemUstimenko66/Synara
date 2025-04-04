import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '../enums/role.enum';
import { S3Service } from '../../s3-storage/services/s3.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private s3Service: S3Service,
  ) {}

  private calculateAge(birthDate: Date) : number {
    const ageDiff = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || Role.Guest,
    });

    if(user.birthDate) {
      user.age = this.calculateAge(user.birthDate);
    }

    return this.userRepository.save(user);
  }

  async updateUser(id: number, updateUserDto: any) : Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    Object.assign(user, updateUserDto);

    if(user.birthDate) {
      user.age = this.calculateAge(user.birthDate);
    }
    return this.userRepository.save(user);
  }

  async findAll(options: { limit: number; role: string; sortOrder: 'ASC' | 'DESC'; }): Promise<User[]> {
    const qb = this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.volunteer', 'volunteer')
        .leftJoinAndSelect('user.victim', 'victim')
        .leftJoinAndSelect('user.files', 'files');

    if (options.role && options.role.trim() !== '') {
      qb.andWhere('user.role = :role', { role: options.role });
    }

    const sortOrder = options.sortOrder ?? 'DESC';
    qb.orderBy('user.id', sortOrder)
        .take(options.limit);

    return qb.getMany();
  }


  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['volunteer', 'victim', 'announcements', 'gatherings', 'petitions', 'comments_author', 'files'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async blockUser(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.isBlockedUser = !user.isBlockedUser;
    return await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .returning("id")
        .execute();

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
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

  async uploadAvatar(
    userId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const avatarUrl = await this.s3Service.uploadFile(file, 'synarabucket');

    await this.userRepository.update(userId, { avatarUrl });
    return avatarUrl;
  }
}
