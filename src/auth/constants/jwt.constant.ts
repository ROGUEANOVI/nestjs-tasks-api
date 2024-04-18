import * as dotenv from 'dotenv';
dotenv.config();

export const JwtConstants = {
  secretKey: process.env.SECRET_KEY
}