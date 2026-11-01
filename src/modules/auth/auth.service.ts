import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the admin user in MongoDB
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the plaintext password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and return the JWT
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Add this method inside your AuthService class
  async seedAdmin() {
    const adminEmail = 'admin@portfolio.com';
    const plainPassword = 'admin123'; // Change this to your preferred secure password

    const existingUser = await this.userModel
      .findOne({ email: adminEmail })
      .exec();
    if (existingUser) {
      return { message: 'Admin user already exists.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newAdmin = new this.userModel({
      email: adminEmail,
      password: hashedPassword,
    });

    await newAdmin.save();
    return { message: 'Admin seeded successfully.', email: adminEmail };
  }
}
