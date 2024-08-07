import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Inject, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { ConfigType } from '@nestjs/config';
import config from '../../../config/config'
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entities/users.entity";
import {Repository} from "typeorm";


export type JwtPayload = {
    sub: string;
    email: string;
};


export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        const extractJwtFromCookie = (req) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };
        super({
            ignoreExpiration: false,
            secretOrKey: configService.jwt.secret,
            jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: JwtPayload){
        const userId = parseInt(payload.sub);
        const user = await this.userRepository.findOneBy({id : userId});

        if(!user) {
            throw new UnauthorizedException('Please log in to continue')
        }

        return{
            id: payload.sub,
            email: payload.email,
        }

    }
}










