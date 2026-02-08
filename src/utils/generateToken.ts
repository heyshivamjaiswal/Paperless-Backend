import jwt from 'jsonwebtoken';

export const generatedToken = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is missing');
  }

  const secret = process.env.JWT_SECRET;
  return jwt.sign({ userId }, secret, { expiresIn: '30d' });
};
