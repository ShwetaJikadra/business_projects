import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path = require('path');
const imagePath=path.join(__dirname,'public','image');
import bodyParser = require('body-parser');
import user from './routes/user/index.routes'
import admin from './routes/admin/index.routes';
import multer from 'multer';

dotenv.config();

const app = express();
app.use(express.json());
app.use('public/image/',express.static(imagePath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

const url = process.env.MONGO_DB_URL || '';
const port = process.env.PORT || 2020;

async function main() {
  await mongoose.connect(url);
}

main()
  .then(() => console.log('Database connected...'))
  .catch(() => console.log('Internal server error'));
  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to MyTypescript Application." });
  });
  app.use('/api',user);
  app.use('/api/admin',admin)

app.listen(port, () => {
  console.log(`Server connected at port ${port}`);
});
