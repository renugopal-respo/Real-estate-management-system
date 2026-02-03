import express from 'express'
import { createUser,loginUser,addStaff,removeStaff } from '../controllers/Usercontoller.js';
const router = express.Router();
router.post('/createUser',createUser);
router.post('/loginUser',loginUser);
router.post('/addStaff',addStaff);
router.delete('/removeStaff',removeStaff);
export default router;