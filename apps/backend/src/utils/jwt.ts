import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/index.js';

const SECRET = process.env.JWT_SECRET || 'your_secret_key_change_in_production';
const EXPIRE = process.env.JWT_EXPIRE || '7d';

export const generateToken = (userId: string, email: string, role: string): string => {
  const payload: JWTPayload = {
    userId,
    email,
    role,
  };
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRE });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, SECRET) as JWTPayload;
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
};
