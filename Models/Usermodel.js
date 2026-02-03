import db from "../config/db.js";

//  Add a user
export const addUser = async (data, hashedPassword) => {
  const sql = `
    INSERT INTO users (name, email, phone, password_hash, role, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await db.query(sql, [
      data.user_name,
      data.email,
      data.contact,
      hashedPassword,
      data.user_role,
      "ACTIVE",
    ]);
    return result;
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
    const [result] = await db.query(
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
    return result.insertId;
  } catch (error) {
    console.log("owner creation error:", error);
    throw error;
  }
};
export const addStaffs=async(email,password)=>{
   try {
     const sql=`INSERT INTO users(email,password_hash,role) 
     VALUES(?,?,?)`
     const [result]=await db.query(sql,[email,password,'STAFF']);
     return result.insertId;
   } catch (error) {
     console.log("error in add staff");
     throw error;
   }
}
export const removeStaffs=async(whereClause,value)=>{
  const sql=`DELETE FROM users ${whereClause}`;
  try {
    const [result]=await db.query(sql,value);
    return result.affectedRows;
  } catch (error) {
    console.log("Error in Remove Staff");
    throw error;
  }
}