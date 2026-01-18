const db=require('../config/db');
const getTables=async()=>{
    const [rows]= await db.query("SHOW TABLES");
    return rows;
}
module.exports={
    getTables,
}