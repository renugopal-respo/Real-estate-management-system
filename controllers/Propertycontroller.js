import { json } from "express";
import { getPropertiesForCard,
    addFavorites,
    getFavourites,
    removeFavorites
 } from "../Models/PropertyModel.js";

export const getPropertyForCard = async (req, res) => {
  try {
    console.log("Request Reached:", req.query);

    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    console.log("Filters:", filters);
    console.log("Page:", page);

    
    let type = filters.type || "";
    const price = filters.price || "";
    const location = filters.city || "";
    let status=filters.status|| "";
    const numericPrice = price ? Number(price) : "";

    if(type==='ALL'){
        type='';
    }
    if(status==='ALL'){
        status='';
    }

    const data = [
      type, type || "", // pt.type
      status,status || "", // ps.status
      numericPrice, numericPrice || "", // p.price
      location, location || "", // l.city
      limit, offset
    ];
     console.log("Final Data Array:", data);

       try {
        const rows=await getPropertiesForCard(data);
        console.log(rows);
         res.status(200).json({
      message: "Property Fethced Succesfully",
      properties:rows,
      pagination:{page:page}
    });
       } catch (error) {
        console.log(error);
       }
   
  } catch (error) {
    console.error("Error in getPropertyForCard:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const addToFavourites=async(req,res)=>{
     const{user_id,property_id}=req.query;
     const userId=  Number(user_id) || '';
     const propertId=Number(property_id)|| '';
     console.log("Requset reached:",req.query);
     console.log("userID:",userId);
     console.log("Property_id:",propertId)
     try {
        if(userId==='' || propertId===''){
        return res.status(400)
        .json({message:"Please Login for Add Favorites"})
     }
        const result=await addFavorites([userId,propertId]);
        
            const favorites=await getFavourites(userId);
            res.status(200).
            json({favorites:favorites,
                useerId:userId,
                message:"Added to Favorites",
            });
        
     } catch (error) {
        console.log(error);
        if(error.code==='ER_DUP_ENTRY'){
            return res.status(401).json({
                message:"Property Alrdy in your Favorites list"
            })
        }
        if(error.code==='ER_NO_REFERENCED_ROW_2'){
            return res.status(400).json({
                message:"Invalid User or Property Does not Exists"
            })
        }
        res.status(400).
        json("Please Try again Later");
     }
}
export const getUsersFavourites=async(req,res)=>{
    const {userId}=req.query;
    const user_id=Number(userId)||'';
    try {
    if(userId===''){
        return res.status(401).
        json({message:"Please Login for Add Favorites"})
    }
    const rows=await getFavourites(user_id);
    if(rows.lenth===0){
       return res.status(400).
        json({message:"No Favorites"});
    }
    res.status(200)
    .json({favorites:rows,
           useerId:userId,                
           message:"Added to Favorites",
            });
    } catch (error) {
        console.log(error);
        res.status(400).
        json({message:"Server is Busy,Please Try agin Later"});
    }
   
}
export const removeFromFavorites=async(req,res)=>{
    const{userId,propertyId}=req.body;
    console.log("Request reahed:",userId,"  ",propertyId);
    const user_id=Number(userId)||'';
    const property_id=Number(propertyId)||'';
    if(user_id===''){
      return res.status(400).
      json({message:"Please Login..."});
    }
    if(property_id===''){
         return res.status(400).
      json({message:"Invalid Property Id "});
    }
    try {
        const data=[user_id,property_id];
        const result=await removeFavorites(data);
        if(result>0){
            console.log("Property removed Successfully");
            return res.status(200).
            json({message:" Property Removed From Favorites...",
                propertyId:property_id
            });
        }
        else{
            return res.status(200).json({
                message:`Property alredy Removed From your favorites...
                  Or Property no longer Exists`
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).
        json({message:"Server is busy Please try agin later..."})
    }
    
}