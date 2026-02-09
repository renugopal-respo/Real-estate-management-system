import { response } from "express";
import { getUserByEmail } from "../Models/Usermodel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/JwtKeys.js";

export const verifyToken = async(req, res, next) => {  
 const loginRoutes=['loginuser','createuser'];
 console.log("Request reached verification stage");
  //const authHeader = req?.headers?.authorization;
  const url=req.url.replace('/','').toLowerCase();
  const accessToken=req?.cookies?.accessToken;
  
  console.log("Url:",url);
  console.log("full url:",req.url);
  console.log("cookies:",accessToken);

  if(loginRoutes.includes(url)){
    console.log("login routes skipped");
    return next();
  }


  if(!accessToken){
      return res.status(401)
      .json({message:"Token Is missing..."})
  }

   const token =  accessToken;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  
    console.log("Authenticated")
   return next();
  } 
   catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("token expired");
      return res.status(401).json({ message: "Token expired" });
    } 

    else if (error.name === "JsonWebTokenError") {
      console.log("Invalid token")
      return res.status(401).json({ message: "Invalid token" });
    } 

    else {
      console.log("Token verification failed");
      return res.status(500).json({ message: "Token verification failed" });
    }
  }
};


