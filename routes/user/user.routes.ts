import  express from 'express';
const userRoutes = express.Router();
import { handleProfileImageUpload,upload } from '../../helper/imageUpload';
import { verifyToken } from '../../helper/verifyToken';

import {signup,login,createProfile,changeProfilePhoto,updateProfile,deleteAccount,resetPassword,forgetPassword} from '../../controller/user/user.controller'
    userRoutes.post('/signup',upload.single('photo'),handleProfileImageUpload,signup);
    userRoutes.post('/login',login);
    userRoutes.post('/create-profile',verifyToken,createProfile);
    userRoutes.put('/change-profile-image',verifyToken,upload.single('photo'),handleProfileImageUpload,changeProfilePhoto);
    userRoutes.put('/update-profile',verifyToken,updateProfile);
    userRoutes.delete('/delete-account',verifyToken,deleteAccount);
    userRoutes.put('/resetPassword',verifyToken,resetPassword);
    userRoutes.post('/forget-password',verifyToken, forgetPassword);
    
export default userRoutes
