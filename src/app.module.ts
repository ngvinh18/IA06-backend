import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('AppModule');

// ✔ Fix mixing ?? and ||
const mongoUri =
  process.env.MONGO_URI ??
  process.env.MONGO ??
  process.env.MONGO_DB_URI ??
  '';

if (!mongoUri) {
  logger.warn(
    '⚠️ MONGO_URI is not set. Using fallback: mongodb://127.0.0.1:27017/ia06',
  );
}

// ✔ fallback nếu biến môi trường không tồn tại
const effectiveMongoUri = mongoUri !== '' ? mongoUri : 'mongodb://127.0.0.1:27017/ia06';

@Module({
  imports: [
    // ✔ Không thêm options lỗi thời
    MongooseModule.forRoot(effectiveMongoUri),

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret123',
      signOptions: { expiresIn: '1d' },
    }),

    UsersModule,
  ],
})
export class AppModule {}
