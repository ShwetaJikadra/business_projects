import mongoose from "mongoose";
import ICategory from "./category.model";

interface IBusiness {
  _id?: string;
  admin:mongoose.Types.ObjectId;
  business_name: string;
  business_address: BusinessAddress[];
  category: mongoose.Types.ObjectId;
  keywords: string[];
  contactNumber: number;
  website: string;
  email: string;
  photos: string[];
  socialLinks: SocialLink[];
  isDelete:Boolean;
  lead:mongoose.Types.ObjectId[];
  
}

interface BusinessAddress {
  addressLine1: string;
  addressLine2: string;
  district: string;
  state: string;
  country: string;
}


interface SocialLink {
  name: string;
  url: string;
}

export default IBusiness;