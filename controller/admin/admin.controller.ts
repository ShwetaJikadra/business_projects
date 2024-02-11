import mongoose from 'mongoose';
import express,{Request,Response} from 'express';
import { verifyToken } from '../../helper/verifyToken';

import IProfile from '../../model/profile.model';
import { IUser } from '../../model/user.model';
import UserCollection from '../../schema/user.schema';
import ProfileCollection from '../../schema/profile.schema';
import UserServices from '../../service/user.service';
const userServices=new UserServices()
import ProfileServices from '../../service/profile.service'
const profileServices=new ProfileServices()

export const getUser=async (req:Request,res:Response)=>{
    let id:any=req.params.id
   let user:any=await userServices.getUser({_id:id,isDelete:false});
   if(!user)
   {
    res.json({message:'user not found'})
   }
   console.log(user)
   return res.json({message:'User found',Details:user})
}
export const getProfile=async (req:Request,res:Response)=>{
    let id:any=req.params.id
   let user:any=await profileServices.getProfile({_id:id});
   if(!user)
   {
    res.json({message:'user not found'})
   }
   console.log(user)
   return res.json({message:'User found',Profile:user})
}

export const getAllProfile = async (req: Request, res: Response) => {
    try {
        let id: any = req.params.id;
        let users: any[] = await profileServices.getAllProfile();

        if (!users || users.length === 0) {
            return res.json({ message: 'No profiles found' });
        }

        console.log(users);
        return res.json({ message: 'Profiles found', profiles: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getAllUser = async (req: Request, res: Response) => {
    try {
        let id: any = req.params.id;
        let users: any[] = await userServices.getAllUser();

        if (!users || users.length === 0) {
            return res.json({ message: 'No profiles found' });
        }

        console.log(users);
        return res.json({ message: 'Profiles found', profiles: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


