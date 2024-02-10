import  express from 'express';
const user = express.Router();
import userRoutes from './user.routes';
import askRoutes from './ask.routes';
import { verifyToken } from '../../helper/verifyToken';
import { verifyUser } from '../../helper/verifyUser';


user.use('/user',userRoutes);
user.use('/ask',verifyUser,verifyToken,askRoutes);

export default user;
