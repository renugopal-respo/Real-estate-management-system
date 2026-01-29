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
export const getUserByEmail = async (email) => {
  const sql = `
    SELECT role,email,user_id,password_hash FROM users 
    WHERE LOWER(email) =?
  `;
  try {
    const [rows] = await db.query(sql, [email.toLowerCase()]);
    console.log( "user id from user model:",rows[0].user_id)
    return rows;
  } catch (error) {
    console.log("sql message:",error.sql_message);
    throw error;
  }
};
export const addOwner = async (data) => {
  try {
    const [rows] = await db.query(
      `INSERT INTO users (name, email, phone, role, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.ownerName,
        data.ownerEmail,
        data.ownerContact,
        "OWNER",
        "ACTIVE",
      ]
    );

    // ✅ rows.insertId will contain the new owner's ID
    return rows.insertId;
  } catch (error) {
    console.log("owner creation error:", error);
    throw error;
  }
};