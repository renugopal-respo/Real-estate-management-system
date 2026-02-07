import jwt from 'jsonwebtoken'
import { getUserByEmail } from '../Models/Usermodel.js';
export const JWT_SECRET = "mySuperSecretKey123";
 export const generateToken =(user)=> {
    
   const token= jwt.sign(
      { id: user.id, user_role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // token expires in 1 hour
    );
    console.log("token:",token);
   return token; 
}
export const generateRefreshToken = (user) => {
  console.log("Refersh tokken are generated");
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
};