import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import { generateFromEmail } from 'unique-username-generator';

@Injectable()
export class AuthGoogleService {
    private readonly logger = new Logger(AuthGoogleService.name); // Инициализация логгера

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    generateJwt(payload) {
        try {
            return this.jwtService.sign(payload);
        } catch (error) {
            this.logger.error('Error generating JWT', error.stack);
            throw new InternalServerErrorException('Failed to generate JWT');
        }
    }

    async signIn(user) {
        if (!user) {
            this.logger.warn('Unauthenticated user attempt');
            throw new BadRequestException("Unauthenticated!");
        }

        try {
            const userExist = await this.findUserByEmail(user.email);

            if (!userExist) {
                this.logger.log(`User with email ${user.email} not found. Registering new user.`);
                return this.registerUser(user);
            }

            this.logger.log(`User with email ${user.email} found. Signing in.`);
            return this.generateJwt({
                sub: userExist.id,
                email: userExist.email,
            });
        } catch (error) {
            this.logger.error('Error during sign in', error.stack);
            throw new InternalServerErrorException('Failed to sign in user');
        }
    }

    async registerUser(user: User) {
        try {
            this.logger.log(`Registering new user with email: ${user.email}`);
            const newUser = this.userRepository.create(user);
            newUser.password = this.generateRandomPassword();
            newUser.username = generateFromEmail(user.email, 5);
            await this.userRepository.save(newUser);

            this.logger.log(`User registered successfully with ID: ${newUser.id}`);
            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
            });
        } catch (error) {
            this.logger.error(`Error registering user with email: ${user.email}`, error.stack);
            throw new InternalServerErrorException('Failed to register user');
        }
    }

    generateRandomPassword(): string {
        return Math.random().toString(36).slice(-8);
    }

    async findUserByEmail(email: string) {
        try {
            this.logger.log(`Looking for user with email: ${email}`);
            const user = await this.userRepository.findOneBy({ email });

            if (!user) {
                this.logger.warn(`No user found with email: ${email}`);
                return null;
            }

            this.logger.log(`User found with email: ${email}`);
            return user;
        } catch (error) {
            this.logger.error(`Error finding user by email: ${email}`, error.stack);
            throw new InternalServerErrorException('Failed to find user by email');
        }
    }
}
