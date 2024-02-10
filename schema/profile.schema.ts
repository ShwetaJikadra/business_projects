import IProfile from "../model/profile.model";
import mongoose from 'mongoose';
import UserCollection from "./user.schema";


const profileSchema=new mongoose.Schema({
      dob:{
        type:Date,
        require:true

      },
      address:{
        type:String,
        require:true
      },
      blood_group:{
        type:String,
        require:true
      },
      education:{
        type:String,
        require:true
      },
      marital_status:{
        type:String,
        eval:['married','unmaried'],
        require:true

      },
      native_address:{
        type:String,
        require:true
      },
      maternal_village:{
        type:String,
        require:true
      },
      maternal_surname:{
        type:String,
        require:true
      },
      user: {
        type:Object,
        required: true,
      },
      isDelete:{
        type:Boolean,
        default:false
      }
      
      
}, { timestamps: true })
const  ProfileCollection=mongoose.model<IProfile>('profile',profileSchema);
export default ProfileCollection;