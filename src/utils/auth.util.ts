import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { id: number; username: string; role: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};
