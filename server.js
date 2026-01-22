import express from 'express';
import { hashPassword } from './Middleware/PasswordHash.js';
import db from './config/db.js';
import userRoutes from './Routes/userRoute.js'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());
// Middleware example
app.use('/users',userRoutes);

// A simple route to test
app.get('/', (req, res) => {
  res.send('Password hash logged in console ✅');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  
});
