import  express from 'express';
const user = express.Router();
import userRoutes from './user.routes';
import askRoutes from './ask.routes';
import { verifyToken } from '../../helper/verifyToken';



user.use('/user',userRoutes);
user.use('/ask',verifyToken,askRoutes);

export default user;
