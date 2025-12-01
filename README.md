
# IA06 Backend – User Registration API (NestJS)

## [1. Cài đặt]()

cd ia06-backend

**npm** install

## [2. File môi trường (.env)]()

Tạo file .env trong thư mục backend:

MONGO_URI=mongodb://localhost:27017/ia06

**JWT_SECRET=mysecret123**

## [3. Chạy server]()

npm run start:dev

Server chạy tại: http://localhost:3000

## [4. API]()

### [POST

/user/register]()

Body:

{

  **"email"**:**"example@gmail.com"**,

  **"password"**:**"123456"**

**}**

### [POST

/user/login]()

Body:	

{

  **"email"**:**"example@gmail.com"**,

  **"password"**:**"123456"**

**}**
