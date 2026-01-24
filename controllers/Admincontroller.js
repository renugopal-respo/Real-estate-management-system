import db from "../config/db.js";
import { addProperty } from "../Models/Adminmodel.js";

export const addProperties = async (req, res) => {
  try {
    const files = req.files || [];
    const imagePaths = files.map((f) => f.path);

    // Add property (model handles amenities, location, etc.)
    const propertyID = await addProperty(imagePaths, req.body);

    res.status(201).json({
      message: "Property added successfully",
      propertyID,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: "Failed to add property", error: error.message });
  }
};
