import { getUserByEmail as modelGetUser, addUser as modelAddUser,addStaffs ,removeStaffs,deleteUser, getUserByEmail} from '../Models/Usermodel.js';
import { hashPassword, isPasswordValid } from "../Middleware/PasswordHash.js";
import { generateToken,generateRefreshToken } from "../utils/jwt.js";
import { getDuplicateColumn } from '../utils/getDuplicateColumn.js';
import {getFavourites} from '../Models/PropertyModel.js'
import { JWT_SECRET } from '../config/JwtKeys.js';
export const createUser = async (req, res) => {
  const { password, email, user_role } = req.body.user;
  console.log(req.body.user);
  try {
    const hashedPassword = await hashPassword(password);
      
    const dbResult = await modelAddUser({
      ...req.body.user},
       hashedPassword
    );

    if (dbResult.affectedRows > 0) {
      const user = {
        id: dbResult.insertId,
        email,
        role: user_role,
      };

      const accessToken = generateToken(user);
      const refreshToken=generateRefreshToken(user);    
      console.log("refresh Token:",refreshToken);

      res.cookie("refreshToken", refreshToken, {
      httpOnly: true, 
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, 
      sameSite: "Strict",
      maxAge: 7* 24 * 60 * 60 * 1000, 
    });
      return res.json({ token:accessToken, message: "User created successfully " });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }

  } catch (error) {
    console.log(error);
    if (error.code === "ER_DUP_ENTRY") {
        const column=getDuplicateColumn(error);
        if(column==='email'){
            return res.status(400).
            json({ message: "Email already exists ",
                field:'email' });
        }
        else{
             return res.status(400).
            json({ message: "Mobile Number already exists ",
                field:'contact' });
        }
      
    } else if (error.code === "ER_BAD_NULL_ERROR") {
      return res.status(400).json({ message: "Required field is missing " ,field:"null"});
    } else {
      return res.status(500).json({ message: "Database error, please try again later" });
    }
  }
  
  }

export const loginUser = async (req, res) => {
  const { email, password } = req.body.user;
  console.log("requset body:",req.body);

  try {
    const rows = await modelGetUser(email);
    console.log(rows);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
     
    const userFromDb = rows[0];
    const isValid = await isPasswordValid( userFromDb.password_hash,password);

    if (!isValid){
      return res.status(401).json({ message: "Invalid password" });
    } 

    const user = {
      id: userFromDb.user_id,
      email: userFromDb.email,
      role: userFromDb.role,
    };

    const token = generateToken(user);
    const refreshToken=generateRefreshToken(user);
      console.log(token);
      console.log("refresh Token:",refreshToken);

      res.cookie("accessToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.json({ token, message: "Login successful " });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System failure" });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refresh token call");
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken,JWT_SECRET );
    const newAccessToken = jwt.sign(
      { user_id: decoded.user_id, email: decoded.email, role: decoded.role },
      JWT_SECRET,
      { expiresIn: "10h" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const addStaff=async(req,res)=>{
   console.log(req.body);
   const{email,password}=req.body;
   try {
    const hashedPassword=await hashPassword(password);
     const userId=await addStaffs(email,hashedPassword);
     res.status(200).json({staffId:userId,message:"Staff Added..."})
   } catch (error) {
    console.log(error);
      if (error.code === "ER_DUP_ENTRY") {
        const column=getDuplicateColumn(error);
        if(column==='email'){
            return res.status(400).
            json({ message: "Email already exists ",
                field:'email' });
        }
   }
  }
}
export const removeStaff=async(req,res)=>{
  console.log("requset reaches",req.body);
  const {deleteBy,value}=req.body;
  let whereClause;
  if(deleteBy==='email'||value.includes('@')){
     whereClause='WHERE email=?'
  }
  if(deleteBy==='userId'||typeof value===Number){
    whereClause='WHERE user_id=?'
  }
  try {
     const result=await removeStaffs( whereClause,value);
     if(result>0){
      res.status(200).json({message:'Staff Removed Succesfully'})
     }
     else{
      res.status(400).json({message:"Staff Doesn't Exists, Invalid StaffId Or Email"})
     }
  } catch (error) {
    console.log(error);
  }
}
export const getUserProfile=async(req,res)=>{
  console.log("Requst reached:",req.query)
  const {id,email}=req.user
  console.log(req.user);

  if(!id && !email){
      return res.status(400).
      json({message:"Email and user id both required"});
    }

  try {
    const [users,favourites]= await Promise.all([
      getUserByEmail(email),
      getFavourites(id)   
    ]);
    console.log(users.length);
    console.log(users);
    console.log("favorites:",favourites);
     return res.status(200).
    json({succes:true,
      name:users[0].name,
      role:users[0].role,
      favorites:favourites
    })
  } catch (error) {
    console.log("error in getUserProfile",error);
    return res.status(400).
    json({message:"please try again later..."})

  }
 
}
