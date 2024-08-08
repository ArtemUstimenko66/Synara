import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/users.entity";
import {Repository} from "typeorm";
import {generateFromEmail} from 'unique-username-generator'



@Injectable()
export class AuthGoogleService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    generateJwt(payload){
        return this.jwtService.sign(payload);
    }

    async signIn(user){
        if(!user){
            throw new BadRequestException("Unauthenticated!");
        }

        const userExist = await this.findUserByEmail(user.email);

        if(!userExist){
            return this.registerUser(user);
        }

        return this.generateJwt({
            sub: userExist.id,
            email: userExist.email,
        })

    }

    async registerUser(user: User){
        try{
            const newUser = this.userRepository.create(user);
            newUser.username = generateFromEmail(user.email, 5);
            await this.userRepository.save(newUser);
            return this.generateJwt({
                sub: newUser.id,
                email: newUser.email,
            });
        }
        catch {
            throw new InternalServerErrorException();
        }
    }



    async findUserByEmail(email){
        const user = await this.userRepository.findOneBy({ email });

        if(!user){
            return null;
        }

        return user;
    }

}