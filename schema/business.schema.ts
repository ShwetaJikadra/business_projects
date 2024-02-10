import IBusiness from "../model/business.model";
import mongoose from "mongoose";
import { Schema } from "mongoose";
const BusinessSchema = new Schema({
    business_name: { type: String ,unique:true,required: true },
    admin:{type:Schema.Types.ObjectId,required:true},
    business_address: [
        {
            addressLine1: { type: String, required: true },
            addressLine2: { type: String, required: true },
            district: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
        },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    keywords: [{ type: String, required: true }],
    contactNumber: { type: Number, required: true },
    website: { type: String, required: true },
    email: { type: String, required: true },
    photos: [{ type: String}],
    socialLinks: [
        {
            name: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    isDelete:{
        type:Boolean,
        default:false

    },
    lead:[{ type: mongoose.Types.ObjectId }],
});

export default mongoose.model<IBusiness>("Business", BusinessSchema);
