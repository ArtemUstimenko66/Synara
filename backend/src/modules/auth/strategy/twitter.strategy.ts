import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { UsersService } from '../../users/services/users.service';
import { Role } from '../../users/enums/role.enum';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly usersService: UsersService) {
    super({
      consumerKey: 'c2G4RI18Ir4jHGXc9pwqBl6tK',
      consumerSecret: 'e5k5FLrF2YDJCKGKfkE18meJ3J0QYg1cqjvZ13ai3p9fxwB77G',
      callbackURL: 'https://synara.help/auth/twitter/callback',
      includeEmail: true,
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    const { id, emails, displayName } = profile;
    const email = (emails && emails[0] && emails[0].value) || null;

    if (!email) {
      throw new Error('No email found from Twitter profile');
    }
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      const newUser = await this.usersService.create({
        email,
        firstName: displayName.split(' ')[0],
        lastName: displayName.split(' ')[1] || '',
        password: '',
        role: Role.Volunteer,
      });
      return newUser;
    }
    return user;
  }
}
