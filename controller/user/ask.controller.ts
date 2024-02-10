import express,{Request,Response} from 'express';
import sendMail from '../../helper/sendmail';
import mongoose from 'mongoose';
import askSchema from '../../schema/ask.schema'
import AskService from '../../service/ask.service';
import categorySchema from '../../schema/category.schema';
import IAsk from '../../model/ask.model';


import businessSchema from '../../schema/business.schema';
const askService=new AskService();

export const addNewAsk = async (req: Request, res: Response) => {
  try {
    const { businessCategory, keyword, description } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const category: any = await categorySchema.findById(businessCategory);
    if (!category) {
      return res.json({ message: 'Category not found' });
    }

    const existingAsk = await askSchema.findOne({
      businessCategory: businessCategory,
      keyword: keyword,
      description: description,
    user:req.user._id
    });

    if (existingAsk) {
    
      return res.json({ message: 'Ask already exists', ask: existingAsk });
    }

    const ask: any = await askSchema.create({
      user: req.user,
      businessCategory: businessCategory,
      keyword: keyword,
      description: description,
    });
   ask.save();
   const updatedBusinesses = await businessSchema.updateMany(
    { category: businessCategory },
    { $push: { lead: ask._id } }
  );
    
    sendMail(ask);

    res.json({ message: 'Ask added successfully and lead', ask });
  } catch (error) {
    console.error('Error adding ask:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const deleteAsk=async (req:Request,res:Response)=>{
        let id:any=req.params.id;
        let ask:any=await askSchema.findOne({user:req.user,id:id,isDelete:false});
        if(!ask){
            return res.json({message:'ask not found'})
        }
        ask=await askSchema.findByIdAndUpdate(id,{$set:{isDelete:false}},{new:true});
        ask.save();
        const updatedBusinesses = await businessSchema.updateMany(
          {},
          { $pull: { lead: id } }
        );
        return res.json({message:'ask delete success'});
     

}
export const myAsk=async (req:Request,res:Response)=>{
  let ask:any[]=await askSchema.find({user:req.user?._id,isDelete:false})
 return  res.json(ask)

}