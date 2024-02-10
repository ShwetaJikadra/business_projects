import { Request,Response,NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
declare module 'express' {
    interface Request {
      image?: string;
    }
  }

  const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any){
      cb(null, 'public/image/ProfileImage');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

const handleProfileImageUpload = (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    req.image = `${req.file.path}`;
  }
  next();
};
export { upload, handleProfileImageUpload };