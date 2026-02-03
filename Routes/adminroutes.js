import express from 'express';
import upload from '../Middleware/multer.js';
import { addProperties,
    recents,
    deleteProperties,
    getPropertyForUpdate,
deletePropertyImage,
updateProperty,
bookingList,
recentlySoldout
} from '../controllers/Admincontroller.js';
const router=express.Router();
router.get('/getRecentProperties',recents); 
router.get('/deleteProperties',deleteProperties);  
router.get('/getPropertyForUpdate',getPropertyForUpdate);
router.get('/getbookings',bookingList);
router.get('/recentlySoldout',recentlySoldout)
router.post('/addProperties',upload.array("images",5),addProperties);
router.put('/updateProperty',upload.array('images',5),updateProperty);
router.delete('/deletePropertyImage',deletePropertyImage);


export default router;