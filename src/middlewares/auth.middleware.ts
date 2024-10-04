import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express{
      interface Request{
          user?: AuthPayload
      }
  }
}
export interface AuthPayload{
  id: number;
  username: string;
  role: string;
}

const ValidateSignature  = async(req: Request) => {

  const signature = req.get('Authorization');
  const sec = process.env.JWT_SECRET;
  if(sec==undefined){
      throw new Error("JWT_SECRET is not defined");
  }
  if(signature){
      try {
          const payload =  jwt.verify(signature.split(' ')[1], sec) as AuthPayload; 
          req.user = payload;
          return true;

      } catch(err){
          return false
      } 
  }
  return false
};

export const AuthMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  const isValid = await ValidateSignature(req);
  if(isValid){
      next();
  } else {
      res.status(401).json({message: 'Unauthorized'});
  }
};

export const checkAdminApi = async(req: Request, res: Response, next: NextFunction) => {
  if(req.user?.role === 'ADMIN'){
      validateAdminApiKey(req, res, next);
      next();
  } else {
      res.status(401).json({message: 'Unauthorized'});
  }
}
export const validateAdminApiKey = (req: Request, res: Response, next: NextFunction) => {
  const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
};



