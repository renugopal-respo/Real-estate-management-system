import db from "../config/db.js";
import { getDuplicateColumn } from "../utils/getDuplicateColumn.js";
import { deleteImages } from "../utils/deleteImages.js";
import { normalizeMultiFormData,parseJson } from "../utils/normalizeMultiFormData.js";
import { getUserByEmail } from "../Models/Usermodel.js";
import { addOwner } from "../Models/Usermodel.js";
import { recentlyAdded ,
  addProperty,
  deleteProperty,
  getPropertyImages,
  getPropertyAmentiesById,
  getPropertyById,
  getPropertyImageById,
  deleteImageById,
  getAllAmenties,
  getLocationByName,
  getStatusByName,
deleteAllImagesByID,
insertAmenities,
insertPropertyImages,
updatePropertyDetails,
updatePropertyTransaction,
getTotalPage}
  from "../Models/PropertyModel.js";
 import path from 'path';
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
         const rows = await getUserByEmail(req.body.ownerEmail); 
         const {email,phone,user_id}=rows[0];
         if (
    email.toLowerCase() === req.body.ownerEmail.toLowerCase() &&
    phone !== req.body.ownerContact
  ) {
    deleteImages(imagePaths);
    return res.status(400).json({
      message: "Email already exists. Use a different email ID.",
    });
  }

  // Case 2: Email different but phone number same
  if (
    email.toLowerCase() !== req.body.ownerEmail.toLowerCase() &&
    phone === req.body.ownerContact
  ) {
    deleteImages(imagePaths);
    return res.status(400).json({
      message: "Contact number already exists. Use a different contact number.",
    });
  }
  // Valid user found
   ownerID = user_id;
  console.log("User Id:", ownerID);
      } catch (error) {
        console.log("error in getuser");
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
  let total;
  const { page, limit = 10, date, location = "", pincode = "",totalPages } = req.query;
  
   const limitNum = parseInt(limit, 10) || 10;

   const offset = (parseInt(page) - 1) * limitNum;

  // calculate fallback date (default: one month ago)
  let newdate = date;
  let newPinCode;
  if (!date || date.trim() === "") {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    newdate = d.toISOString().slice(0, 19).replace("T", " ");
    console.log(d);
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
    if(parseInt(totalPages)===0||totalPages===''){
      const rows=await getTotalPage();
      total=rows[0].total;
      console.log("totalPages:",total);
    }
    res.status(200).json({
      message: "Recent properties fetched successfully",
      count: rows.length,
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages:Number(Math.ceil(total/limit))
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
    const images = await getPropertyImages(newProperty_Id);
     deleteImages(images);
    // Delete property from DB
    const response = await deleteProperty(newProperty_Id);   
    if(response>0){
           return res
      .status(200)
      .json({ message: "Property Deleted Successfully",propertyId:property_id});
    }     
  } catch (error) {
    console.log(error);    
    console.log(rows)
    return res.status(400).json({ message: "Failed to delete property" });
  }
};
export const getPropertyForUpdate=async(req,res)=>{
    const {propertyId}=req.query;
    const newPropertyId=parseInt(propertyId);
    console.log("requst reached:",newPropertyId);
    let properties;
    let images;
    let amenities;
    try {
      const [
  property,
  images,
  amenities
] = await Promise.all([
  getPropertyById(newPropertyId),
  getPropertyImageById(newPropertyId),
  getPropertyAmentiesById(newPropertyId)
]);
console.log("image paths:",images);
console.log("Properties:",property);
console.log("amneties:",amenities);
console.log(newPropertyId);
res.status(200).json({message:"feched succesfully",property,amenities,images})
    }

     catch (error) {
      console.log(error);
      res.status(400).json({message:"issue in fetching properits"})
    
    }
};
export const deletePropertyImage=async(req,res)=>{
  const {propertyId,image_url}=req.body;
  console.log(req.body);
   try {
    const result=await deleteImageById(propertyId,image_url);
    if(result.affectedRows>0){
       deleteImages(image_url);
        res.status(200).json({message:"Image Removed"});
    }
    else{
      res.status(400).json({message:"Invalid Property"});
    }
   } catch ( error) {
     console.log(error);
     res.status(400).json({message:"Property deletion problem"})
   }
}
export const updateProperty = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);
    // Normalize & parse
    const data = normalizeMultiFormData(body);
    console.log("parsed body:",data);
    const parsedAmenities = parseJson(body.amenities);
    const propertyId = parseInt(body.propertyId);
    const files = req.files || [];
    const imagePaths = files.map((f) => f.path);
    let filterAmenties=[];
    let propertyWithImages=[];
    let userDetails=[];
    console.log("path:", imagePaths);
    console.log("Parsed amenities:", parsedAmenities);
    console.log("status name:",data.status_name);
    // Get reference data
    const [allAmenities, loc, st,userId] = await Promise.all([
      getAllAmenties(),
      getLocationByName(data.city),
      getStatusByName(data.status_name),
      getUserByEmail(data.email)
    ]);
    console.log("All amenties:",allAmenities);
    const locationId = loc[0]?.location_id || 0;
    const statusId = st[0]?.status_id || 0;

    // ✅ Build set clause dynamically
    const setClause = [];
    const filteredData = [];

    Object.keys(data).forEach((key) => {
      if (
        key !== "propertyId" &&
        key !== "amenities" &&
        key !== "newImages" &&                      
        data[key] !== "" &&
        data[key] !== null&&
        key !=='status_name'&&
        key !=='city'&&
        key!=='name'&&
        key !=='email'&&
        key !=='phone' &&
        key!=='type_name'
      ) {       
          setClause.push(`${key} = ?`);
          filteredData.push(data[key]);
        }else{
           if(
            key==='name'&&
            key ==='email'&&
            key ==='phone' ){
             userDetails.push(data[key]);
        }
        }                
      
    });

    // Add location & status IDs
    setClause.push("location_id = ?", "status_id = ?","user_id=?");
    filteredData.push(locationId, statusId,userId[0].user_id);
    // Add propertyId for WHERE clause
    filteredData.push(propertyId);
    console.log("SET CLAUSE:", setClause.join(", "));
    console.log("DATA:", filteredData);
    console.log("user details:",userDetails);
    allAmenities.forEach(amnety=>{
        const name=amnety.amenties_name;
        const id=amnety.amenties_id;
        parsedAmenities.forEach(items=>{
           if(items===name){
              filterAmenties.push([propertyId,id]);
           }
    })
    });

    imagePaths.forEach(items=>{
       propertyWithImages.push([propertyId,items]);
    })   
    console.log("Immages:",propertyWithImages);
    console.log("Filetr:",filterAmenties);
    const response=await updatePropertyTransaction({setClause,
      filteredData,
      filterAmenties,
      propertyWithImages,
      propertyId});
    if(response===true){
      console.log("transaction succesfull hpy hpy hpyy...");
      
    }
  }catch(error){
      console.log(error);
  }
}