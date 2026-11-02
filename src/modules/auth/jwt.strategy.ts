import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'your_super_secret_jwt_key',
    });
  }

  async validate(payload: any) {
    // 1. Check payload.email instead of payload.username
    if (!payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // 2. Return the email so it gets attached to the Express Request object
    return { userId: payload.sub, email: payload.email };
  }
}
