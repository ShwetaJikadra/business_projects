import Icategory from "../model/category.model";
import mongoose from "mongoose";
import { Schema } from "mongoose";
const CategorySchema= new Schema({
  id:{type:mongoose.Types.ObjectId},
    category_name: { type: String, required: true,unique:true },
    isDelete:{type:Boolean,default:false}
  });
  
  export default mongoose.model<Icategory>('Category', CategorySchema);

