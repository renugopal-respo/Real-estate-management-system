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
      await connection.query(
        `INSERT INTO property_images (property_id, image_url) VALUES (?, ?)`,
        [propertyID, path]
      );
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

export const recentlyAdded = async (limit, offset, date, location, pincode) => {
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
export const deleteProperty=async(property_id)=>{
  const sql=`DELETE FROM properties where property_id =?`;
  try {
     const [rows]=await db.query(sql,property_id);
   if(rows.affectedRows>0){   
    return 1;
   }
   
  } catch (error) {
     throw error;
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
