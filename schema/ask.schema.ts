import IAsk from "../model/ask.model";
import mongoose from "mongoose";
import { Schema } from "mongoose";
const AskSchema= new Schema({
    id:{type:mongoose.Types.ObjectId},
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    businessCategory: { type: mongoose.Types.ObjectId, required: true },
    keyword: [{ type: String, required: true }],
    description: { type: String },
    isDelete:{type:Boolean,default:false},
   
  });
  
  export default mongoose.model('Ask', AskSchema);