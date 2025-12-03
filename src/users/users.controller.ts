import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // REGISTER — nhận email, password, username
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  // LOGIN — nhận email + password (KHÔNG nhận username)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  // GET PROFILE — trả về thông tin user dựa vào token
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    return this.usersService.getMe(req.user.email);
  }
}
