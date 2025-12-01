import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return this.usersService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
@Get('me')
async me(@Req() req) {
  return this.usersService.getMe(req.user.email);
}

}
