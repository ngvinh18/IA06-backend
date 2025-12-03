import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private jwtService: JwtService,  // ⭐ ĐÃ THÊM CHÍNH XÁC
  ) {}

  async register(dto: CreateUserDto) {
    // Kiểm tra email trùng
    const exist = await this.userModel.findOne({ email: dto.email });
    if (exist) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Tạo user mới
    const user = new this.userModel({
      email: dto.email,
      password: hashedPassword,
    });

    try {
      const savedUser = await user.save();

      return {
        email: savedUser.email,
        createdAt: (savedUser as any).createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException('Cannot create user');
    }
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
      throw new ConflictException('Email không tồn tại');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ConflictException('Sai mật khẩu');
    }

    // ⭐ Tạo JWT thật
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
    return await this.userModel.findOne({ email });
  }
}
