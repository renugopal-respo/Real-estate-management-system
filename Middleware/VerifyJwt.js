import { response } from "express";
import { getUserByEmail } from "../Models/Usermodel.js";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "mySuperSecretKey123";

export const verifyToken = async(req, res, next) => {  
 console.log("Request reached verification stage");
  const authHeader = req?.headers?.authorization;
  const url=req.url.replace('/','').toLowerCase();

  console.log("Url:",url);
  
  if(['loginuser','createuser'].includes(url)){
    console.log("login routes skipped");
    return next();
  }

  if (!authHeader ) {
    return res.status(401).json({ message: "Token missing" });
  } 
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  
      console.log("Authenticated")
   return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("token expired");
      return res.status(401).json({ message: "Token expired" });
    } 
    else if (error.name === "JsonWebTokenError") {
      console.log("Invalid token")
      return res.status(403).json({ message: "Invalid token" });
    } 
    else {
      console.log("Token verification failed");
      return res.status(500).json({ message: "Token verification failed" });
    }
  }
};


