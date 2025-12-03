import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const logger = new Logger('AppModule');

const mongoUri = process.env.MONGO_URI ?? process.env.MONGO || process.env.MONGO_DB_URI ?? '';

if (!mongoUri) {
  logger.warn(
    'MONGO_URI is not set. Application will attempt to connect with fallback local MongoDB. ' +
      'Set MONGO_URI env var to point to your MongoDB Atlas or production DB.',
  );
}

// use fallback local mongodb string to avoid empty string causing immediate failure
const effectiveMongoUri = mongoUri || 'mongodb://127.0.0.1:27017/ia06';

@Module({
  imports: [
    MongooseModule.forRoot(effectiveMongoUri, {
      // You can add options here if needed
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret123',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
})
export class AppModule {}
