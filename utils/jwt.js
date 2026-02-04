import jwt from 'jsonwebtoken'
 export const generateToken =(user)=> {
    const JWT_SECRET = "mySuperSecretKey123";

   const token= jwt.sign(
      { id: user.id, user_role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // token expires in 1 hour
    );
    console.log("token:",token);
   return token; 
}
export const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};