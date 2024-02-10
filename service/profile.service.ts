import mongoose from 'mongoose';
import IProfile from '../model/profile.model'
import ProfileCollection from '../schema/profile.schema'


export default class userServices {
    getProfile=async (body:any)=>{
       return await ProfileCollection.findOne(body);

    }
    getProfileById=async (id:any)=>{
        return await ProfileCollection.findById(id);
    }
    updateProfile=async (id:any,body:any)=>{
        return await ProfileCollection.findByIdAndUpdate(id,{$set:body},{new:true});
    }
    addNewProfile=async (body:any)=>{
        return await  ProfileCollection.create(body)
    }
    getAllProfile=async ()=>{
        const profiles = await ProfileCollection.find({ isDelete: false });
        return profiles;
    }
}
