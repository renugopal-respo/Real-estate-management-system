import multer from 'multer';
import path from 'path';
import { addProperties } from '../controllers/Admincontroller.js';
import express from 'express';
const router=express.Router();
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,cb)=>{
        cb(null,Date.now()+
    path.extname(file.originalname));
    }
});
const upload=multer({
    storage,
    limits:{
        fileSize:3*1024*1024*1024
    }
});

export default upload;