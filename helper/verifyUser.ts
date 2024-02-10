import express,{Request,Response,NextFunction} from 'express';
import mongoose from 'mongoose';
import { IUser } from '../model/user.model';
import UserCollection from '../schema/user.schema';
import jwt from 'jsonwebtoken';
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let secretKey: string | undefined | any = process.env.SECRET_KEY;
      const authorizationHeader: any = req.headers['authorization'];
      let token: string | undefined | any = authorizationHeader.split(' ')[1];
  
      let { userId, role }: any = jwt.verify(token, secretKey);
  
      const user: IUser | null = await UserCollection.findById(userId);
  
      if (user !== null && user?.role === 'user') {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "Not allowed: User doesn't have the required role" });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
  