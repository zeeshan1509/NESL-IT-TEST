import jwt from 'jsonwebtoken';
import { User } from '../types/User';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function signJwt(user: User): string {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyJwt(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
