import mongoose from 'mongoose';
import { IUser } from '../model/user.model';
import UserCollection from '../schema/user.schema';


export default class userServices {
    getUser=async (body:any)=>{
       return await UserCollection.findOne(body,{isDelete:false});

    }
    getUserById=async (id:any)=>{
        return await UserCollection.findById(id);
    }
    updateUser=async (id:any,body:any)=>{
        return await UserCollection.findByIdAndUpdate(id,{$set:body},{new:true});
    }
    addNewUser=async (body:any)=>{
        return await  UserCollection.create(body)
    }
    getAllUser=async ()=>{
        const users=UserCollection.find({isDelete:false});
        return users;
    }
}
