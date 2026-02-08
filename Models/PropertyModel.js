import db from "../config/db.js";
//ADMIN BASED

export const addProperty = async (imagePaths, data,ownerID) => {
  const connection = await db.getConnection();
  try {
    const {
      ownerName,
      ownerContact,
      ownerEmail,
      location,
      amenities,
      propertyType,
      status,
      bedrooms,
      bathrooms,
      price,
      addressLine,
      description,
      area_sqft,
      road_access,
    } = data;

    const parsedAmenities = JSON.parse(amenities);
    const activeAmenities = Object.keys(parsedAmenities).filter(
      (key) => parsedAmenities[key]
    );

    let amenityIds = [];
    let propertyTypeID;
    let propertyStatusID;
    let locationID;
    let propertyID;

    // Begin transaction
    await connection.beginTransaction();
    //Create Owner
    
    // --- Fetch amenity IDs ---
    for (const name of activeAmenities) {
      const [rows] = await connection.query(
        `SELECT amenties_id FROM amenties WHERE lower(amenties_name) = ?`,
        [name.toLocaleLowerCase()]
      );
      if (rows.length > 0) amenityIds.push(rows[0].amenties_id);
    }

    // --- Fetch property type ---
    const [typeRows] = await connection.query(
      `SELECT type_id FROM property_type WHERE lower(type_name) = ?`,
      [propertyType.toLowerCase()]
    );
    if (typeRows.length === 0)
      throw new Error("Invalid property type");
    propertyTypeID = typeRows[0].type_id;

    // --- Fetch status ---
    const [statusRows] = await connection.query(
      `SELECT status_id FROM property_status WHERE lower(status_name) = ?`,
      [status.toLowerCase()]
    );
    if (statusRows.length === 0)
      throw new Error("Invalid property status");
    propertyStatusID = statusRows[0].status_id;

    // --- Fetch location ---
    const [locRows] = await connection.query(
      `SELECT location_id FROM locations WHERE lower(city) = ?`,
      [location.toLowerCase()]
    );
    if (locRows.length === 0)
      throw new Error("Invalid location");
    locationID = locRows[0].location_id;

    // --- Insert property ---
    const [result] = await connection.query(
      `INSERT INTO properties 
      (user_id, bedromms, bathromms, price, addressline, description, area_sqft, road_acces, type_id, status_id, location_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [   
        ownerID,
        bedrooms,
        bathrooms,
        price,
        addressLine,
        description,
        area_sqft,
        true,
        propertyTypeID,
        propertyStatusID,
        locationID,
      ]
    );

    propertyID = result.insertId;

    // --- Link amenities ---
    for (const id of amenityIds) {
      await connection.query(
        `INSERT INTO property_with_amenties (property_id, amenties_id) VALUES (?, ?)`,
        [propertyID, id]
      );
    }

    // --- Insert images ---
    
    for (const path of imagePaths) {
    const primray=path[0];
    if(path!==primray){
        await connection.query(
        `INSERT INTO property_images (property_id, image_url) VALUES (?, ?)`,
        [propertyID, path]
      );
    }
    else{
      await connection.query(`INSERT INTO property_images
        (property_id,image_url,is_primary)
        VALUES(?,?,?)`,[propertyID,path,true]);
    }
      
    }

    await connection.commit();
    connection.release();

    return propertyID;
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Error adding property:", error);
    throw error;
  }
};
// Insert amenities
export const insertAmenities = async (amenitiesArray) => {
  const sql = "INSERT INTO property_with_amenties (property_id, amenties_id) VALUES ?";
  const [result] = await db.query(sql, [amenitiesArray]);
  return result;
};

// Insert property images
export const insertPropertyImages = async (imageArray) => {
  const sql = "INSERT INTO property_images (property_id, image_url) VALUES ?";
  const [result] = await db.query(sql, [imageArray]);
  return result;
};


export const getStatusByName=async(statusName)=>{
   const sql=`SELECT status_id FROM property_status
   WHERE LOWER(status_name)=LOWER(?)`;
   try {
    const [rows]= await db.query(sql,[statusName]);
    return rows;
   } catch (error) {
      console.log("errror in staus fetch");
      throw error;
   }
}
export const getLocationByName=async(LocationName)=>{
  const sql=`SELECT location_id,city FROM locations 
  WHERE LOWER(city)=?`;
  try {
    const [rows]=await db.query(sql,[LocationName.toLowerCase()]);
    console.log("location:",rows);
    return rows;
  } catch (error) {
    console.log('error in location fetching:');
    throw error;
  }
}
export const getAllAmenties=async()=>{
  const sql=`SELECT * FROM amenties`;
  try {
    const [rows]=await db.query(sql);
    if(rows.length>0){
      return rows;
    }
  } catch (error) {
    console.log("error in fetching amenties");
     throw error;
  }
}


export const recentlyAdded = async (limit, offset, date, location, pincode,totalPages) => {
  const sql = `
    SELECT 
      u.name,
      u.phone,
      u.user_id,
      p.property_id,
      p.price,
      l.city,
      l.pincode,
      ps.status_name,
      pt.type_name,
      p.created_at
    FROM properties p
    JOIN users u ON p.user_id = u.user_id
    JOIN locations l ON p.location_id = l.location_id
    JOIN property_status ps ON p.status_id = ps.status_id
    JOIN property_type pt ON p.type_id = pt.type_id
    WHERE DATE(p.created_at)BETWEEN ? AND CURDATE()
    AND (LOWER(l.city)=? OR ?=' ') 
    AND (l.pincode=LOWER(?) OR LOWER(?)=' ')
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `;
  const [rows] = await db.query(sql, [date,location.toLowerCase(),location.toLowerCase(), pincode, pincode,limit, offset]);
  
  return rows;
};
export const getTotalPage=async()=>{ 
   const sql=`SELECT COUNT(*) as total FROM properties`;
   try {
     const[rows]=await db.query(sql);
     return rows;
   } catch (error) {
     console.log()
   }
  
}
export const getPropertyImages=async(propertyId)=>{
   const sql=`SELECT image_url from property_images pi
   JOIN properties p ON pi.property_id=p.property_id
   where pi.property_id=? `;
   try {
    const[rows]=await db.query(sql,propertyId);

      return rows;
    
   } catch (error) {
    console.log("fetching error");
       throw error;
   }
}
export const getPropertyById=async(propertyId)=>{
  const sql=`SELECT 
  p.user_id,
  u.name,
  u.email,
  u.phone,
  p.bedromms,
  p.bathromms,
  p.price,
  p.addressline,
  p.description,
  p.area_sqft,
  p.road_acces,
  p.property_id,
  l.city,
  ps.status_name,
  pt.type_name
FROM properties p
JOIN property_type pt ON p.type_id = pt.type_id
JOIN property_status ps ON p.status_id = ps.status_id
JOIN locations l ON p.location_id = l.location_id
JOIN users u ON p.user_id=u.user_id
WHERE p.property_id = ? `;
   try {
    const [rows]=await db.query(sql,[propertyId]);
    return rows[0]||null;//if fetch on property always return single object
   } catch (error) {
     console.log("error in fecth properties");
   }
}
export const getPropertyImageById=async(propertyId)=>{
  const sql=`select image_url from property_images
  where property_id=?`;
  try {
    const [images]=await db.query(sql,[propertyId]);
    return images;
  } catch (error) {
    console.log("error in fecth properties:")
    throw error;
  }
}
export const getPropertyAmentiesById=async(propertyId)=>{
  const sql=`select a.amenties_name from amenties a 
  JOIN property_with_amenties pwa ON a.amenties_id=pwa.amenties_id
  where pwa.property_id=?`
  try {
    const[amenties]=await db.query(sql,[propertyId]);
    return amenties;
  } catch (error) {
    console.log("error in amenties fetch ");
    throw error;
  }
}
export const deleteImageById=async(propertyId,image_url)=>{
   const sql=`DELETE FROM property_images
   WHERE property_id=? AND image_url=?`;
   try {
    const [result]=await db.query(sql,[propertyId,image_url]);
    return result;

   } catch (error) {
      console.log("Error in property image delte");
      throw error;
   }
}
export const deleteProperty=async(property_id)=>{
  const sql=`DELETE FROM properties where property_id =?`;
  try {
     const [result]=await db.query(sql,property_id);
   if(result.affectedRows>0){   
    return 1;
   }
   
  } catch (error) {
     throw error;
  }  
}
export const deleteAllImagesByID=async(propertyId)=>{
  const sql=`DELETE FROM property_images 
  WHERE property_id=?`;
  try {
    const [result]=await db.query(sql,[propertyId]);
    return result;
  } catch (error) {
     console.log("Error deltee all images",error);
  }
}
export const deleteOldAmenities = async (propertyId) => {
  try {
    await db.query("DELETE FROM property_with_amenties WHERE property_id = ?", [propertyId]);
  } catch (error) {
    console.log("error in amenties deltee:",error);
  }
  
};
export const updatePropertyDetails = async (setClause,values) => {
  const sql = `UPDATE properties SET ${setClause.join(", ")} WHERE property_id = ?`;
  try {
    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
     console.log("error in update properties");
     throw error;
  }  
};
export const updatePropertyTransaction = async (data) => {
  const { setClause, filteredData, filterAmenties, propertyWithImages, propertyId ,userDetails,userDetailsSetClause} = data;
  const connection = await db.getConnection();
  console.log(userDetailsSetClause,userDetails);
  try {
    await connection.beginTransaction();

    // 1️ Update property details
    const sqlUpdate = `UPDATE properties SET ${setClause.join(", ")} WHERE property_id = ?`;
    await connection.query(sqlUpdate, [...filteredData, propertyId]);

    // 2️ Update images (if any)
    if (propertyWithImages.length > 0) {
      const sqlDeleteImages = `DELETE FROM property_images WHERE property_id = ?`;
      await connection.query(sqlDeleteImages, [propertyId]);

      const sqlInsertImages = `INSERT INTO property_images (property_id, image_url) VALUES ?`;
      await connection.query(sqlInsertImages, [propertyWithImages]);
    }

    // 3️ Update amenities
    const sqlDeleteAmenities = `DELETE FROM property_with_amenties WHERE property_id = ?`;
    await connection.query(sqlDeleteAmenities, [propertyId]);

    const sqlInsertAmenities = `INSERT INTO property_with_amenties (property_id, amenties_id) VALUES ?`;
    await connection.query(sqlInsertAmenities, [filterAmenties]);

    //4 Update Owner
    const sql= `UPDATE users SET ${userDetailsSetClause.join(", ")}
    WHERE user_id=?`;
    await connection.query(sql,userDetails);

    // 4️ Commit everything
    await connection.commit();

    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
export const getAllPropertyVisits=async(whereClause,values)=>{
       const sql=`SELECT 
    pv.property_id,
    pt.type_name,
    l.city,
    ps.status_name,
    pv.user_id,
    u.name,
    u.phone,
    pv.visited_date,
    pv.visited_time,
    pv.status
FROM property_visits pv
JOIN properties p ON pv.property_id = p.property_id
JOIN property_type pt ON p.type_id = pt.type_id
JOIN locations l ON p.location_id = l.location_id 
JOIN property_status ps ON p.status_id = ps.status_id
JOIN users u ON pv.user_id = u.user_id
${whereClause}
LIMIT ? OFFSET ?`;
  try {
   const [rows]=await db.query(sql,values);
   console.log(rows);
           return rows;
        } catch (error) {
          console.log("Error in Getting property Visits");
            throw error;
        }
};
export const getToatalPagesByStatus=async(whereClause,data)=>{
   const sql=`SELECT COUNT(*)as total FROM  properties p
   JOIN locations l ON p.location_id=l.location_id
   JOIN property_visits pv ON p.property_id=pv.property_id
   JOIN property_status ps  ON p.status_id=ps.status_id
   JOIN property_type pt ON p.type_id= pt.type_id
   ${whereClause}
   `
   try {
    const [rows]=await db.query(sql,data);
    return rows[0].total;
   } catch (error) {
      console.log(error);
      throw error
   }
}
export const getCountAllFromPropertyVisits=async()=>{
    const sql=` SELECT COUNT(*) as total FROM property_visits`;
    try {
      const[rows]=await db.query(sql);
      return rows[0].total;
    } catch (error) {
       console.log("error in propertycisits count");
       throw error;
    }
}
export const recentlySoldouts=async(data)=>{
   const sql=`SELECT u.user_id,
   u.name,
   u.email,
   p.property_id,
   p.created_at,
   ps.status_name,
   p.price,
   l.city,
   l.pincode,
   l.state
   FROM properties p
   JOIN locations l ON p.location_id=l.location_id
   JOIN property_status ps ON p.status_id=ps.status_id
   JOIN property_type pt ON p.type_id=pt.type_id
   JOIN users u ON  p.user_id=u.user_id
   WHERE (ps.status_name=? OR ?='')
   AND (pt.type_name=? OR ?='')
   AND (l.city=? OR ?='') 
   AND ((p.created_at BETWEEN ? AND CURDATE()) OR (p.created_at>=CURDATE()))
   `;
   try {
    const [rows]=await db.query(sql,data);
    return rows;
   } catch (error) {
     console.log("Error in recently soldout model");
     throw error;
   }
}  
export const getPropertiesForCard=async(data)=>{
  const sql=`SELECT 
  p.property_id,
  p.price,
  pt.type_name,
  ps.status_name,
  l.city,
  pi.image_url
  FROM properties p
  JOIN property_type pt ON p.type_id=pt.type_id
  JOIN property_status ps ON p.status_id=ps.status_id
  JOIN locations l ON p.location_id=l.location_id
  LEFT JOIN property_images pi ON p.property_id=pi.property_id
  WHERE (pt.type_name=? OR ?='')
  AND (ps.status_name=? OR ?='')
  AND (p.price<=? OR ?='')
  AND (l.city=? OR ?='')
  AND pi.is_primary=0
  LIMIT ? OFFSET ?
  `;
 try {
  const [rows]=await db.query(sql,data);
  return rows;
 } catch (error) {
    console.log("Error in initialCard Fetch");
    throw error;
 }
} 
export const addFavorites=async(data)=>{
   const sql=`INSERT INTO  favourites (user_id, property_id)
    VALUES(?,?)`;
    try {
      const [result]=await db.query(sql,data);
       return result.insertId;
    } catch (error) {
       console.log("error in add favorites");
       throw error;
    }
}
export const getFavourites = async (userId) => {
  const sql = `
    SELECT 
      p.property_id,
      p.price,
      pt.type_name,
      ps.status_name,
      l.city,
      pi.image_url
    FROM favourites f
    JOIN properties p ON f.property_id = p.property_id
    JOIN property_type pt ON p.type_id = pt.type_id
    JOIN property_status ps ON p.status_id = ps.status_id
    JOIN locations l ON p.location_id = l.location_id
    LEFT JOIN property_images pi ON p.property_id = pi.property_id 
    WHERE f.user_id = ? AND  (pi.is_primary =0 || pi.is_primary=true)
  `;
  
  try {
    const [rows] = await db.query(sql, [userId]);
    return rows;
  } catch (error) {
    console.log("Error in getFavourites:", error);
    throw error;
  }
};
export const removeFavorites=async(data)=>{
  const sql=`DELETE FROM favourites 
  WHERE user_id=? AND property_id=?`;
  try {
    const [result]=await db.query(sql,data);
    return result.affectedRows;
  } catch (error) {
    console.log("Error in remove favurites");
    throw error;
  }
}

export const getPropertyDetails = async (propertyId) => {
  try {
    const [propertyRows] = await db.query(
      `
      SELECT 
        p.property_id,
        p.title,
        p.price,
        p.description,
        p.addressline,
        p.bedromms,
        p.bathromms,
        p.area_sqft,
        p.land_area,
        p.land_unit,
        p.road_acces,
        p.facing,
        p.created_at,
        u.name AS owner_name,
        u.phone AS owner_phone,
        u.email AS owner_email,
        l.city,
        l.state,
        l.country,
        ps.status_name,
        pt.type_name
      FROM properties p
      JOIN users u ON p.user_id = u.user_id
      JOIN locations l ON p.location_id = l.location_id
      JOIN property_status ps ON p.status_id = ps.status_id
      JOIN property_type pt ON p.type_id = pt.type_id
      WHERE p.property_id = ?
      `,
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return null;
    }

    const [images] = await db.query(
      `SELECT image_url, is_primary FROM property_images WHERE property_id = ?`,
      [propertyId]
    );

    const [amenities] = await db.query(
      `SELECT a.amenties_name
       FROM amenties a
       JOIN property_with_amenties pa ON a.amenties_id = pa.amenties_id
       WHERE pa.property_id = ?`,
      [propertyId]
    );

    return {
      ...propertyRows[0],
      images,
      amenities: amenities.map((a) => a.amenties_name),
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw error;
  }
};

export const getRelatedProperties = async (city, type_name, status_name, excludeId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        p.property_id,
        p.price,
        p.title,
        p.addressline,
        p.description,
        p.bedromms,
        p.bathromms,
        p.area_sqft,
        l.city,
        pt.type_name,
        ps.status_name,
        (SELECT image_url FROM property_images WHERE property_id = p.property_id LIMIT 1) AS image_url
      FROM properties p
      JOIN locations l ON p.location_id = l.location_id
      JOIN property_type pt ON p.type_id = pt.type_id
      JOIN property_status ps ON p.status_id = ps.status_id
      WHERE l.city = ? 
        OR pt.type_name = ?
        OR ps.status_name = ?
        OR p.property_id != ?
      ORDER BY p.created_at DESC
      LIMIT 6
      `,
      [city, type_name, status_name, excludeId]
    );

    return rows;
  } catch (error) {
    console.error(" Error fetching related properties:", error);
    throw error;
  }
};

