import express from 'express';
import upload from '../Middleware/multer.js';
import { addProperties } from '../controllers/Admincontroller.js';
const router=express.Router();
router.post('/addProperties',upload.array("images",5),addProperties
    
    
);
export default router;