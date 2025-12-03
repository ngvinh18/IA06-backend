import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    if (!dto || !dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required');
    }

    // Check duplicate email
    const exist = await this.userModel.findOne({ email: dto.email }).exec();
    if (exist) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = new this.userModel({
      email: dto.email,
      password: hashedPassword,
    });

    try {
      const savedUser = await user.save();

      // Return safe response (no password)
      return {
        email: savedUser.email,
        createdAt: (savedUser as any).createdAt,
      };
    } catch (error) {
      // Log error server-side if you want (console for now)
      console.error('Error creating user:', error?.message ?? error);
      throw new InternalServerErrorException('Cannot create user');
    }
  }

  async login(dto: LoginUserDto) {
    if (!dto || !dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user) {
      throw new NotFoundException('Email does not exist');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT
    const token = await this.jwtService.signAsync({
      id: user._id,
      email: user.email,
    });

    return {
      message: 'Đăng nhập thành công',
      token,
    };
  }

  async getMe(email: string) {
    if (!email) return null;
    return await this.userModel.findOne({ email }).select('-password').exec();
  }
}
