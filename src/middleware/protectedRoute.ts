import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
}

export function authCookie(req: Request, res: Response, next: NextFunction) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret missing');
  }

  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    // ✅ THIS LINE WAS MISSING
    (req as any).userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
