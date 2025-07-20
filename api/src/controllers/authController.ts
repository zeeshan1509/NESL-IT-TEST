import { Request, Response } from 'express';
import { users } from '../utils/users';
import { signJwt } from '../utils/jwt';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signJwt(user);
  // Attach user info to request for downstream use (optional)
  (req as any).user = user;
  res.json({ token });
};
