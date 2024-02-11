import { Router } from 'express';
import express from 'express';
const admin = express.Router();

import { verifyToken } from '../../helper/verifyToken';
import adminRoutes from './admin.routes';

import businessRoutes from './business.routes';

admin.use('/admin',adminRoutes);
admin.use('/business',businessRoutes)
     
    

export default admin;