import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entities/users.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "../dtos/register.dto";
import * as bcrypt from 'bcryptjs'
import {LoginDto} from "../dtos/login.dto";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async register(registerDto: RegisterDto) : Promise<void> {
        const { username, email, password, role } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
            role,
        });
        await this.userRepository.save(user);
    }

    async validateUser(loginDto: LoginDto) : Promise<User | null> {
        const { username, password } = loginDto;
        const user = await this.userRepository.findOne({ where: { username }});
        if(user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
}
