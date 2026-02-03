import { getUserByEmail as modelGetUser, addUser as modelAddUser,addStaffs ,removeStaffs} from '../Models/Usermodel.js';
import { hashPassword, isPasswordValid } from "../Middleware/PasswordHash.js";
import { generateToken } from "../utils/jwt.js";
import { getDuplicateColumn } from '../utils/getDuplicateColumn.js';
// Controller to create a user
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

      const token = generateToken(user);
      console.log(token);
      return res.json({ token, message: "User created successfully ✅" });
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
      return res.status(400).json({ message: "Required field is missing ❌" ,field:"null"});
    } else {
      return res.status(500).json({ message: "Database error, please try again later" });
    }
  }
  }


// Controller for login / get user
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
      user_id: userFromDb.user_id,
      email: userFromDb.email,
      role: userFromDb.role,
    };

    const token = generateToken(user);
    return res.json({ token, message: "Login successful ✅" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System failure" });
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