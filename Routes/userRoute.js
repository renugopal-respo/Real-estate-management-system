import express from 'express'
import { createUser,
    loginUser,
    addStaff,
    removeStaff ,
    refreshToken,
getUserProfile} from '../controllers/Usercontoller.js';
    import { Authorization,roleBasedAuthorization } from '../Middleware/Authorization.js';
    import { verifyToken } from '../Middleware/VerifyJwt.js';
const router = express.Router();
router.post('/createUser',verifyToken,createUser);
router.post('/loginUser',loginUser);
router.post('/addStaff',verifyToken,Authorization,addStaff);
router.post('/refreshToken',refreshToken);
router.delete('/removeStaff',Authorization,removeStaff);
router.get('/getUserProfile',getUserProfile)
export default router;