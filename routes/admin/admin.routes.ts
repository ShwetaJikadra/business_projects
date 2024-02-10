import express from 'express';
import {
    getUser,getProfile,getAllProfile,getAllUser
} from '../../controller/admin/admin.controller'
import { verifyAdmin } from '../../helper/verifyAdmin';
import { verifyToken } from '../../helper/verifyToken';

const adminRoutes =express.Router();
   adminRoutes.get('/get-user/:id',verifyAdmin,verifyToken,getUser);
   adminRoutes.get('/get-profile/:id',verifyAdmin,verifyToken,getProfile);
   adminRoutes.get('/get-all-profile',verifyAdmin,verifyToken,getAllProfile);
   adminRoutes.get('/get-all-user',verifyAdmin,verifyToken,getAllUser)
export default adminRoutes