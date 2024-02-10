import express from 'express';
import {addBusiness,deleteBusiness,updateBusiness,mylead} from '../../controller/admin/business.controller';
import { verifyUser } from '../../helper/verifyUser';
import { verifyAdmin } from '../../helper/verifyAdmin';
import { verifyToken } from '../../helper/verifyToken';

const businessRoutes=express.Router();
    businessRoutes.post('/add-new-business',verifyAdmin,verifyToken,addBusiness);
    businessRoutes.put('/update-business/:id',verifyAdmin,verifyToken,updateBusiness);
    businessRoutes.delete('/delete-business/:id',verifyAdmin,verifyToken,deleteBusiness);
    businessRoutes.get('/mylead',verifyAdmin,verifyToken,mylead);
    export default businessRoutes;