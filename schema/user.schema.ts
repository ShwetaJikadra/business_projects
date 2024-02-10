import { IUser } from "../model/user.model";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      require: true,
      match: /^[a-zA-Z]+$/,
    },
    mname: {
      type: String,
      require: true,
      match: /^[a-zA-Z]+$/,
    },
    lname: {
      type: String,
      require: true,
      match: /^[a-zA-Z]+$/,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
      type: String,
      require: true,
    },
    
    gender: {
      type: String,
      eval: ["male", "female"],
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
      match: /^\d{10}$/,
    },
    role: {
      type: String,
      eval: ["admin", "user"],
      default: "user",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    photo:{
      type:String

    },
    resetToken:{
      type:String
    }
  },
  { timestamps: true }
);
const UserCollection = mongoose.model("user", userSchema);
export default UserCollection;
