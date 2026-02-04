import express from 'express';
import { hashPassword } from './Middleware/PasswordHash.js';
import db from './config/db.js';
import userRoutes from './Routes/userRoute.js'
import adminRoutes from './Routes/adminroutes.js'
import cors from 'cors';
import session from 'express-session';
import cookieParser from "cookie-parser";
import Lowdb, {initDB,saveDB} from './utils/Store.js';
const app = express();
await initDB();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());
console.log("hiii")
// Middleware example
app.use('/users',userRoutes);
//Admin Routes
app.use('/admin',adminRoutes);
//file Acces
app.use('/uploads', express.static('uploads'));

// A simple route to test
app.get('/', (req, res) => {
  res.send('Password hash logged in console ✅');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  
});
