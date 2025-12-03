import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

// NOTE:
// JwtModule được đăng ký ở AppModule (global for app) — không cần register lại ở UsersModule.
// Nếu bạn muốn cấu hình riêng cho UsersModule, có thể import JwtModule ở đây, nhưng tránh đăng ký hai lần.

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
