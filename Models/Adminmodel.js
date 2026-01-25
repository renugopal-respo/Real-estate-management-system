import db from "../config/db.js";
import { addOwner } from "./Usermodel.js";
export const addProperty = async (imagePaths, data) => {
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
