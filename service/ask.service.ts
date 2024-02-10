import askSchema from "../schema/ask.schema";
import mongoose from "mongoose";
import express,{Request,Response} from 'express';

export default class AskService {
    addNewAsk=async (body:any)=>{
        await askSchema.create(body);

    }
    getAskById=async (id:any)=>{
        await askSchema.findById(id,{isDelete:false});
    }
    updateAsk=async (id:any,body:any)=>{
         await askSchema.findByIdAndUpdate(id,{set:body},{new:true});
    }
}