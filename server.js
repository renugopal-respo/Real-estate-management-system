import express from 'express';
import { hashPassword } from './Middleware/PasswordHash.js';
import db from './config/db.js';
import userRoutes from './Routes/userRoute.js'
import adminRoutes from './Routes/adminroutes.js'
import propertieRoutes from './Routes/propertyroutes.js'
import cors from 'cors';
import session from 'express-session';
import cookieParser from "cookie-parser";
import Lowdb, {initDB} from './utils/Store.js';
import { verifyToken } from './Middleware/VerifyJwt.js';
import { Authorization } from './Middleware/Authorization.js';

const app = express();
await initDB();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
console.log("hiii")
//User Routes
app.use('/users',verifyToken,userRoutes);
//Admin Routes
app.use('/admin',verifyToken,Authorization,adminRoutes);
//Property Routes
app.use('/properties',verifyToken,propertieRoutes)
//file Acces
app.use('/uploads', express.static('uploads'));
// A simple route to test

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  
});
