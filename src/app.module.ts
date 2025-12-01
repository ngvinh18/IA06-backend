import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret123',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
})
export class AppModule {}
