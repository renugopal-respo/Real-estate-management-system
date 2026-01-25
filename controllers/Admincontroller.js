import db from "../config/db.js";
import { getDuplicateColumn } from "../utils/getDuplicateColumn.js";
import { getUser } from "../Models/Usermodel.js";
import { addOwner } from "../Models/Usermodel.js";
import { recentlyAdded ,addProperty} from "../Models/PropertyModel.js";
import path from 'path';
export const addProperties = async (req, res) => {
     let ownerID;
  try {
    const files = req.files || [];
    const imagePaths = files.map((f) => f.path);
    
     try {
      const [rows] = await addOwner(req.body);
      ownerID = rows.insertId;
    } catch (error) {
      const column = getDuplicateColumn(error);
      if (["name", "email", "phone"].includes(column)) {
        const [rows] = await getUser(req.body.ownerEmail);
        if (rows.length > 0) {
          ownerID = rows[0].user_id;
        } else {
          throw new Error("Owner record not found after duplicate entry.");
        }
      } else {
        throw error;
      }
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