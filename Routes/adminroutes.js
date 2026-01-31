import express from 'express';
import upload from '../Middleware/multer.js';
import { addProperties,
    recents,
    deleteProperties,
    getPropertyForUpdate,
deletePropertyImage,
updateProperty,
bookingList} from '../controllers/Admincontroller.js';
const router=express.Router();
router.post('/addProperties',upload.array("images",5),addProperties);
router.put('/updateProperty',upload.array('images',5),updateProperty);
router.get('/getRecentProperties',recents); 
router.get('/deleteProperties',deleteProperties);  
router.get('/getPropertyForUpdate',getPropertyForUpdate);
router.delete('/deletePropertyImage',deletePropertyImage);

export default router;