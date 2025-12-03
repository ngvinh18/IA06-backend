import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('AppModule');

const mongoUri =
  process.env.MONGO_URI ??
  process.env.MONGO ??
  process.env.MONGO_DB_URI ??
  '';

if (!mongoUri) {
  logger.warn(
    '⚠️ MONGO_URI not set. Using fallback: mongodb://127.0.0.1:27017/ia06',
  );
}

const effectiveMongoUri =
  mongoUri !== '' ? mongoUri : 'mongodb://127.0.0.1:27017/ia06';

@Module({
  imports: [
    MongooseModule.forRoot(effectiveMongoUri),

    // ⭐ JwtModule GLOBAL
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'mysecret123',
      signOptions: { expiresIn: '1d' },
    }),

    UsersModule,
  ],
})
export class AppModule {}
