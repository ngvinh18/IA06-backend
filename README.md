# IA06 Backend – User Registration API

## Features
- NestJS API for user registration & login
- MongoDB + Mongoose
- Password hashing with bcryptjs
- JWT authentication
- Validation with class-validator
- CORS enabled for frontend

## Endpoints
### POST /users/register
- Validates email & password
- Checks duplicate email
- Hashes password
- Saves user to MongoDB

### POST /users/login
- Validates credentials
- Compares password hash
- Returns JWT token

### GET /users/me
- Requires Bearer token
- Returns user info except password

## Environment Variables
```
MONGO_URI=
JWT_SECRET=
PORT=
```

## Run Locally
```
npm install
npm run start:dev
```
