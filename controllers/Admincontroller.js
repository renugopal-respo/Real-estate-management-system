import db from "../config/db.js";
import { getDuplicateColumn } from "../utils/getDuplicateColumn.js";
import { getUser } from "../Models/Usermodel.js";
import { addOwner } from "../Models/Usermodel.js";
import { recentlyAdded ,
  addProperty,
  deleteProperty,
  getPropertyImages,
  getPropertyAmentiesById,
  getPropertyById,
  getPropertyImageById} 
  from "../Models/PropertyModel.js";
import path from 'path';
import { error } from "console";
export const addProperties = async (req, res) => {
     let ownerID;
  try {
    const files = req.files || [];
    const imagePaths = files.map((f) => f.path);
    
     try {
      const rows = await addOwner(req.body);
      ownerID = rows;
    } catch (error) {
      const column = getDuplicateColumn(error);
      console.log(column);
      console.log(ownerID);
      console.log("Email",req.body.ownerEmail);
      try {
         const rows = await getUser(req.body.ownerEmail); 
         ownerID=rows;
      } catch (error) {
        console.log("error in getuser");
      }
         
     console.log("User Id:",ownerID);   
      
    }
    const propertyID = await addProperty(imagePaths, req.body,ownerID);

    res.status(201).json({
      message: "Property added successfully",
      propertyID,
    });
  } catch (error) {
    
    console.error("Controller error:", error);
    res.status(500).json({ message: "Failed to add property", error: error.message });
  }
};

export const recents = async (req, res) => {
  console.log("Request received:", req.query);

  const { page, limit = 4, date, location = "", pincode = "" } = req.query;
  
   const limitNum = parseInt(limit, 10) || 10;
   const offset = (parseInt(page, 10) - 1) * limitNum;

  // calculate fallback date (default: one month ago)
  let newdate = date;
  let newPinCode;
  if (!date || date.trim() === "") {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    newdate = d.toISOString().slice(0, 19).replace("T", " ");
  }
  if(pincode!==''){
     newPinCode=parseInt(pincode);
  }
  else{
    newPinCode=pincode;
  }
  try {
    const rows = await recentlyAdded(limitNum, offset, newdate, location, newPinCode);
    console.log(rows);
    res.status(200).json({
      message: "Recent properties fetched successfully",
      count: rows.length,
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching recent properties:", error);
    res.status(500).json({
      message: "Failed to fetch recent properties",
      error: error.message,
    });
  }
};
export const deleteProperties = async (req, res) => {
  console.log("request reached:", req.query);

  const { property_id, properties } = req.query;
  const newProperty_Id = parseInt(property_id);

  // Parse properties if passed as JSON string
  let prop = [];
  try {
    prop = JSON.parse(properties);
  } catch (err) {
    console.log("Failed to parse properties:", err);
  }

  try {
    // Get property images
    const [images] = await getPropertyImages(newProperty_Id);
    // TODO: delete images with multer here
    console.log(images);
    // Delete property from DB
    const response = await deleteProperty(newProperty_Id);
    
    // Filter out deleted property
    if(response.affectedRows>0){
           return res
      .status(200)
      .json({ message: "Property Deleted Successfully"});
    }
    
    
   
    
  } catch (error) {
    console.log(error);
     
    console.log(rows)
    return res.status(400).json({ message: "Failed to delete property" });
  }
};
export const getPropertyForUpdate=async(req,res)=>{
    const property_id=req.params.propertyId;
    if(property_id===parseInt(property_id)){
      console.log("true");
    }
    else{
      console.log("false");

    }
}
