import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['accessToken'];

    if (!cookie) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      request.user = this.jwtService.verify(cookie);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
