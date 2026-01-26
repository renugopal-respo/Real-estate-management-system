import express from 'express';
import upload from '../Middleware/multer.js';
import { addProperties,
    recents,
    deleteProperties,
    getPropertyForUpdate} from '../controllers/Admincontroller.js';
const router=express.Router();
router.post('/addProperties',upload.array("images",5),addProperties)
router.get('/getRecentProperties',recents); 
router.get('/deleteProperties',deleteProperties);  
router.put('/getPropertyForUpdate/:propertyId',getPropertyForUpdate);
export default router;