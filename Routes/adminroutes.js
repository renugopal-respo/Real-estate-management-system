import express from 'express';
import upload from '../Middleware/multer.js';
import { addProperties,recents } from '../controllers/Admincontroller.js';
const router=express.Router();
router.post('/addProperties',upload.array("images",5),addProperties)
router.get('/getRecentProperties',recents); 
    
export default router;