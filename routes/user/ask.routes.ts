import askSchema from "../../schema/ask.schema";
import express from 'express';
import { verifyToken } from "../../helper/verifyToken";


const askRoutes=express.Router();
import { addNewAsk,deleteAsk,myAsk } from "../../controller/user/ask.controller";
import { verifyUser } from "../../helper/verifyUser";
askRoutes.post('/add-ask',verifyToken,addNewAsk);
askRoutes.delete('/delete-ask/:id',verifyToken,deleteAsk);
askRoutes.get('/myask',verifyToken,myAsk)
export default askRoutes;