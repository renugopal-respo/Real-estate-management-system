import express from 'express'
import { createUser,loginUser,addStaff,removeStaff ,refreshToken} from '../controllers/Usercontoller.js';
const router = express.Router();
router.post('/createUser',createUser);
router.post('/loginUser',loginUser);
router.post('/addStaff',addStaff);
router.delete('/removeStaff',removeStaff);
router.post('/refreshToken',refreshToken);
export default router;