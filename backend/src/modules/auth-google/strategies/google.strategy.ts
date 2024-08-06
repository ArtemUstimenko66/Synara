import {PassportStrategy} from "@nestjs/passport";
import {Inject, Injectable} from "@nestjs/common";
import {Strategy, VerifyCallback} from "passport-google-oauth2";
import config from '../../../config/config';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../users/entities/users.entity";
import {Repository} from "typeorm";
import { ConfigType } from '@nestjs/config';



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {

    constructor(
        @Inject(config.KEY) private configService:ConfigType<typeof  config>,
        @InjectRepository(User) private userRepository : Repository<User>,
    ) {
        super({
            clientID : configService.google.clientID,
            clientSecret : configService.google.clientSecret,
            callbackURL : configService.google.callbackURL,
            scope: ['profile', 'email'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile : any,
        done : VerifyCallback
    ) : Promise<any>{
        const {id, name, emails, photos} = profile;

        const user = {
            provider: 'google',
            providerId: id,
            email : emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture : photos[0].value,
        }

        done(null, user);


    }

}