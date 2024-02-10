import express from 'express';
import {addBusiness,deleteBusiness,updateBusiness,mylead} from '../../controller/admin/business.controller';


import { verifyToken } from '../../helper/verifyToken';

const businessRoutes=express.Router();
    businessRoutes.post('/add-new-business',verifyToken,addBusiness);
    businessRoutes.put('/update-business/:id',verifyToken,updateBusiness);
    businessRoutes.delete('/delete-business/:id',verifyToken,deleteBusiness);
    businessRoutes.get('/mylead',verifyToken,mylead);
    export default businessRoutes;