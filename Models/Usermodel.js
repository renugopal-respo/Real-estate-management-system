import db from "../config/db.js";

//  Add a user
export const addUser = async (data, hashedPassword) => {
  const sql = `
    INSERT INTO users (name, email, phone, password_hash, role, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const [rows] = await db.query(sql, [
      data.user_name,
      data.email,
      data.contact,
      hashedPassword,
      data.user_role,
      "ACTIVE",
    ]);
    return rows;
  } catch (error) {
    throw error;
  }
};

//  Get a user
export const getUser = async (email) => {
  const sql = `
    SELECT role,email,user_id,password_hash FROM users 
    WHERE email = ?
  `;
  try {
    const [rows] = await db.query(sql, email);
    return rows;
  } catch (error) {
    throw error;
  }
};

