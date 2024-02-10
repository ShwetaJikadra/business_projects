import express, { Request, Response } from "express";
import mongoose, { AnyExpression } from "mongoose";
import { IUser } from "../../model/user.model";
import UserCollection from "../../schema/user.schema";
import ProfileCollection from "../../schema/profile.schema";
import UserServices from "../../service/user.service";
const userServices = new UserServices();
import ProfileServices from "../../service/profile.service";
const profileServices = new ProfileServices();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
import { verifyToken } from "../../helper/verifyToken";
import userRoutes from "../../routes/user/user.routes";
import randomstring from 'randomstring';
import sendResetPasswordMail from "../../helper/sendResetPasswordMail";
import { Types } from 'mongoose';
// import { upload,handleProfileImageUpload } from '../../helper/imageUpload';

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
export const signup = async (req: Request, res: Response) => {
  try {
    let {
      fname,
      mname,
      lname,
      email,
      password,
    
      gender,
      role,
      mobile,
      photo,
    } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let user: any = await UserCollection.findOne({
      email: email,
      isDelete: false,
    });
    if (user) {
      return res.json({ message: "user is already signup please login" });
    }

    user = await userServices.addNewUser({
      fname: fname,
      lname: lname,
      mname: mname,
      email: email,
      password: hashPassword,
    
      gender: gender,
      role: role,
      mobile: mobile,
    });
    if (req.file) {
      user.photo = req.file.path;
    }
    await user.save();

    return res.json({ message: "signup success", user });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let user: any = await userServices.getUser({
      email: email,
      isDelete: false,
    });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    let decodePassword: any = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!decodePassword) {
      return res.json({ message: "password does not match" });
    }

    const payload = {
      userId: user._id,
    };
    const token: string = jwt.sign(payload, process.env.SECRET_KEY || "");

    return res.status(200).json({ token, message: "Login success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      dob,
      address,
      blood_group,
      education,
      marital_status,
      native_address,
      maternal_village,
      maternal_surname,
      village,
    } = req.body;

    // Check if req.user is defined
    if (!req.user) {
      return res.json({
        message: "User not authenticated or user ID not available",
      });
    }

    // Extract specific fields from req.user
    const { mobile, photo, gender, fname, mname, lname, _id } = req.user;

    // Check if a profile already exists for the user
    const existingProfile = await ProfileCollection.findOne({
      "user._id": req.user._id,
    });

    if (existingProfile) {
      return res.json({ message: "Profile already exists for the user" });
    }

    // Now req.user should be available, proceed with creating the profile
    let profile = await profileServices.addNewProfile({
      dob,
      address,
      blood_group,
      education,
      marital_status,
      native_address,
      maternal_village,
      maternal_surname,
      village,
      user: {
        _id,
        mobile,
        photo,
        gender,
        fname,
        mname,
        lname,
      },
    });

    // Save the profile
    await profile.save();

    return res.json({ message: "Add profile success" });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal Server Error" });
  }
};

export const changeProfilePhoto = async (req: Request, res: Response) => {
  try {
    

    let user:any=await userServices.getUserById(req.user?._id);
    if (req.file) {
      user = await userServices.updateUser(req.user?._id, {
        photo: req.file.path,
      });
    }
    
    user=await profileServices.getProfileById(req.user?._id)
   
    let updatePhoto:any= await ProfileCollection.updateOne({'user._id':req.user?._id},{$set:{'user.photo':req.file?.path}})
    console.log(updatePhoto);
  
    return res.json({ message: "update profile photo success..." });
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const {
      dob,
      address,
      blood_group,
      education,
      marital_status,
      native_address,
      maternal_village,
      maternal_surname,
      village,
      gender,
      mobile,
    } = req.body;
    let user: any = await userServices.getUser(
      req.user?._id
     
    );
    if (!user) {
      return res.json({ message: "user not found...." });
    }

    let profile:any = await ProfileCollection.updateOne({'user._id':req.user?._id},{$set:req.body});
      profile=await profileServices.getProfile({'user._id':req.user?._id});
    // user = await userServices.updateUser(req.user, req.body);
    return res.json({ message: "Profile Update Success", profile:profile, user :user});
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server Error" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    let user: any = await userServices.getUser(
      req.user?._id
     
    );
    if (!user) {
      return res.json({ message: "user not found...." });
    }
    user = await UserCollection.findByIdAndUpdate(
      req.user?._id,
      { $set: { isDelete: true } },
      { new: true }
    );
    let profile = await ProfileCollection.updateOne(
      {'user._id':req.user?._id},
      { $set: { isDelete: true } }
    );
    
    return res.json({ message: "Permenent delete Account" });
  } catch (err) {
    console.log(err);
    return res.json("Internal server Error");
  }

};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { cur_pass, new_pass, con_pass } = req.body;

   
    if (req.user) {
     
      const userPassword = req.user.password;
      const checkpass = await bcrypt.compare(cur_pass, userPassword);


      if (!checkpass) {
        return res
          .status(401)
          .json({ message: "Current password is incorrect" });
      }

      if (new_pass !== con_pass) {
        return res
          .status(400)
          .json({ message: "New password and confirm password do not match" });
      }

      // Hash the new password
      const hashPassword = await bcrypt.hash(new_pass, 10);

      // Update the user's password in the database
      const updatedUser = await userServices.updateUser(req.user._id, 
         { password: hashPassword },
      );

      if (updatedUser) {
        return res.json({ message: "Password reset success", new_pass });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "User not authenticated or user ID not available" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user: any = await UserCollection.findOne({ email: email, isDelete: false });

    if (user) {
      const randomString = randomstring.generate();
      const data = await userServices.updateUser(user._id, { $set: { resetToken: randomString } });

    
      sendResetPasswordMail(user.fname, user.email, randomString);

      res.status(200).json({ message: 'Reset token generated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

