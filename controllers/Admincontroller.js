import db from "../config/db.js";
import Lowdb, {saveDB,getCache,generateCacheKeyValue} from '../utils/Store.js'
import { getDuplicateColumn } from "../utils/getDuplicateColumn.js";
import { deleteImages } from "../utils/deleteImages.js";
import { normalizeMultiFormData,parseJson } from "../utils/normalizeMultiFormData.js";
import { filterIsEmpty } from "../utils/checkFiltersIsEmpty.js";
import {whereClauseBuilder} from '../utils/WhereClauseBuilder.js'
import { getUserByEmail } from "../Models/Usermodel.js";
import { addOwner,addStaffs } from "../Models/Usermodel.js";
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
getTotalPage,
getToatalPagesByStatus,
getAllPropertyVisits,
getCountAllFromPropertyVisits,
recentlySoldouts}
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
  let newTotal;
  let whereClause=[];
  let values=[];
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
  
  console.log("Computed date:",newdate);
  
  try {
    const rows = await recentlyAdded(limitNum, offset, newdate, location, newPinCode);
    console.log(rows);
    if(parseInt(totalPages)===0||totalPages===''){
      const rows=await getTotalPage();
      newTotal=rows[0].total;
      console.log("totalPages:",newTotal);
    }
   
    res.status(200).json({
      message: "Recent properties fetched successfully",
      count: rows.length,
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages:newTotal
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
    
    console.log("path:", imagePaths);
    console.log("Parsed amenities:", parsedAmenities);
    console.log("status name:",data.status_name);
    // Get reference data
    const [allAmenities, loc, st] = await Promise.all([
      getAllAmenties(),
      getLocationByName(data.city),
      getStatusByName(data.status_name),
    
    ]);
    console.log("All amenties:",allAmenities);
    const locationId = loc[0]?.location_id || 0;
    const statusId = st[0]?.status_id || 0;

    // ✅ Build set clause dynamically
    const setClause = [];
    const filteredData = [];
    let userDetails=[];
    const userDetailsSetClause=[];
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
            key==='name'||
            key ==='email'||
            key ==='phone' ){
             userDetails.push(data[key]);
             userDetailsSetClause.push(`${key}=?`)
        }
        }                  
    });
    userDetails.push(data.user_id);
    // Add location & status IDs
    setClause.push("location_id = ?", "status_id = ?","user_id=?");
    filteredData.push(locationId, statusId,data.user_id);
    // Add propertyId for WHERE clause
    filteredData.push(propertyId);
    console.log("SET CLAUSE:", setClause.join(", "));
    console.log("DATA:", filteredData);
    console.log("user details:",userDetails);
    console.log("user details set clause:",userDetailsSetClause);
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
      propertyId,
      userDetails,
      userDetailsSetClause});
    if(response===true){
      console.log("transaction succesfull hpy hpy hpyy...");
      res.status(200).
      json({message:"property SuccessFully Updated"});
    }
  }catch(error){
      console.log(error);
  }
}
export const bookingList=async(req,res)=>{
   console.log("request:",req.query);
   const filters=parseJson(req.query.filters);
   const page=JSON.parse(req.query.paginationDetails);
   let condition=[];
   let where=[];
   let data=[];
   let newTotal;
   let rows;
   let offset=(page-1)*10;
   console.log("offset:",offset);
   
   try {
    if(filters.visited_date!=='' || 
      filters.city!=='' || 
      filters.type_name!=='' ||
      filters.status_name !=='' ||
      filters. propertyVisitStatus!==''){
         Object.keys(filters).forEach(key=>{
     if(filters[key]!==''){
      where.push(key);
      condition.push('AND');
      data.push(filters[key]);
     }
   })  
   console.log("filters:",filters);
   console.log("page:",page);
   const object=whereClauseBuilder(where,condition,data);
  
      newTotal=await getToatalPagesByStatus(object.whereClause,object.values);
      object.values.push(limit);
      object.values.push(offset);
      console.log(object);
       rows= await getAllPropertyVisits(object.whereClause,object.values)
      console.log("rows:",rows);
   }
    else{ 
      console.log("else block")
       newTotal=await getCountAllFromPropertyVisits();     
   }
     res.status(200).json({data:rows,
      paginationDetails:{
        page:page,
        totalPages:newTotal
      },
      message:"succes"
     })
   }catch (error) {
     console.log(error);
   }
}
export const recentlySoldout=async(req,res)=>{
  console.log("requset reached:",req.query);
  const filters=JSON.parse(req.query.filters);
  const page=JSON.parse(req.query.page);
  console.log("Filters:",filters);
  console.log("page:",page);
  let where=[];
  let values=[];
  let wheredata=[]
 let conditions=[];
 let totalPages=0;
 let offset=(page-1)*10;
 try {
    if(page===1 && !(filterIsEmpty(filters))){     
       if(filters.visited_date!=='' || 
      filters.city!=='' || 
      filters.type_name!=='' ||
      filters.status_name !=='' ||
      filters. propertyVisitStatus!==''){
         Object.keys(filters).forEach(key=>{
     if(filters[key]!==''){
      where.push(key);
      conditions.push('AND');
      wheredata.push(filters[key]);
     }
   })  
       const{whereClause,values}=whereClauseBuilder(where,conditions,wheredata);
      console.log("values:",values);
       console.log("whereClause:",whereClause);
       totalPages=await getToatalPagesByStatus(whereClause,values);
    }}

    else{    
      console.log("else block");
       totalPages=await getTotalPage();

    }
    values.push(filters.propertySoldoutStatus,
    filters.propertySoldoutStatus)
    
    const type=filters.type_name;
    values.push(type,type);
   
    const location=filters.city;
    values.push(location,location);

    const date=filters.created_at;
    values.push(date);
    console.log(values);
    const rows=await recentlySoldouts(values);
    console.log(rows);
    console.log(totalPages);
    console.log(rows)
    res.status(200).json({properties:rows,
      paginationDetails:{
        page:page,
        totalPages:Math.ceil(totalPages/10)
      }
    })
}catch (error) {
  console.log(error);
  res.status(400).json("message:Probelm in sever...Try again later ")
 }
}