import mongoose from "mongoose";
import express,{Request,Response} from 'express'
import businessSchema from "../../schema/business.schema";
import Business from '../../model/business.model';
import BusinessService from '../../service/business.service'
import categorySchema from "../../schema/category.schema";
const bisunessService = new BusinessService();
export const addBusiness=async (req:Request,res:Response)=>{

     const {business_name,business_address,category_name,category,keywords,contactNumber,website,email,photos,admin}=req.body;
  
     let business:any=await bisunessService.getBusiness({business_name:business_name,isDelete:false});
     if(business)
     {
          return res.json({message:'Business is already available'});
     }
     let cat:any=await categorySchema.findOne({category_name:category_name,isDelete:false});
     if(!cat){
     let category1:any=await categorySchema.create({category_name:category_name});
     category1.save();
     
     business=await businessSchema.create({...req.body,admin:req.user?._id,category:category1._id});
            return res.json({message:'business added success',business})
     }
     else{
          business=await businessSchema.create({...req.body,admin:req.user?._id,category:cat._id});
          return res.json({message:'business added success',business})
     }
}

// export const addBusinessImage=async (req:Request,res:Response)=>{
//      const {photos,_id}=req.body;
//      let business=await businessSchema.findById(_id)
//      if(!business)
//      {
//           return res.json({message:"you have not available this business"})
//      }





// }
export const deleteBusiness=async (req:Request,res:Response)=>{
     let id:any=req.params.id;
     let business:any=await businessSchema.findById(id);
     if(!business)
     {
          return res.json({message:'you have not this business'})
     }
     business=await businessSchema.findByIdAndUpdate(id,{$set:{isDelete:true}},{new:true});
     business.save();
     let cat:any=await categorySchema.findOneAndUpdate({_id:business.category},{$set:{isDelete:true}},{new:true});
     cat.save();
     res.json({message:'Business Delete Success and also category'})
     
}
export const updateBusiness=async (req:Request,res:Response)=>{
     let id:any=req.params.id;
     const {category_name}=req.body;
     let business:any=await businessSchema.findById(id);
     if(!business)
     {
          return res.json({message:'you have not this business'})
     }
     business=await businessSchema.findByIdAndUpdate(id,{$set:req.body},{new:true});
     business.save();
     let cat:any=await categorySchema.findOneAndUpdate({_id:business.category},{$set:{category_name:category_name}},{new:true});
     cat.save();
     res.json({message:'Business Update Success and also category'})

}
export const mylead=async (req:Request,res:Response)=>{

     let business=await businessSchema.find({admin:req.user?._id,isDelete:false},{lead:1});
return res.json(business);
}
