import mongoose from "mongoose";

export default interface IAsk 
{
    _id?:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
    businessCategory:mongoose.Types.ObjectId;
    keyword: string[];
    description: string;
    isDelete:Boolean;
   
}