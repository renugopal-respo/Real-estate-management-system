const express=require('express');
const router=express.Router();
const PropertyController=require('../controllers/Propertycontroller')
router.get('/getExclusiveProperties',PropertyController.getExclusiveProperties);
router.get('/getInitialProperties',PropertyController.getInitialProperties);
module.exports=router;