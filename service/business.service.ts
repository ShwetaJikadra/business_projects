import businessSchema from "../schema/business.schema";
import mongoose from "mongoose";


export default class Business {
    getBusiness=async (body:any)=>{
           return businessSchema.findOne(body);
    }
    addBusiness=async (body:any)=>{
        return businessSchema.create(body)
    }
    updateBusinessById=async (id:any,body:any)=>{
        return businessSchema.findByIdAndUpdate(id,{$set:body},{new:true});
    }
     updateBusiness=async (body:any)=>{
        return businessSchema.findOneAndUpdate({body},{body},{new:true});  
     }
}