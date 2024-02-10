import express from 'express';
import {
    getUser,getProfile,getAllProfile,getAllUser
} from '../../controller/admin/admin.controller'

import { verifyToken } from '../../helper/verifyToken';

const adminRoutes =express.Router();
   adminRoutes.get('/get-user/:id',verifyToken,getUser);
   adminRoutes.get('/get-profile/:id',verifyToken,getProfile);
   adminRoutes.get('/get-all-profile',verifyToken,getAllProfile);
   adminRoutes.get('/get-all-user',verifyToken,getAllUser)
export default adminRoutes