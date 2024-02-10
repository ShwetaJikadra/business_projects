import dotenv from 'dotenv';
dotenv.config();
import express,{Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose';
import { IUser } from '../model/user.model';
import UserCollection from '../schema/user.schema';
import jwt from 'jsonwebtoken'

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  
  const authorizationHeader:any = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.json({ error: 'Authorization header is missing' });
  }

  let secretKey: string | undefined | any = process.env.SECRET_KEY;
  let token: string  = authorizationHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, secretKey);
    const userId: string = decoded.userId; 

    // console.log(userId);

    const user: IUser | null = await UserCollection.findById(userId) || null;

    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.json({ message: "User Invalid" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
