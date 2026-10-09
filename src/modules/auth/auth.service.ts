import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (
      loginDto.username !== adminUsername ||
      loginDto.password !== adminPassword
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: adminUsername, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
