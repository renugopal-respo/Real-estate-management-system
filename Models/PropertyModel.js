const db = require('../config/db');

const getInitialProperties = async (limit, offset) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        p.property_id,
        p.addressline,
        p.price,
        p.location,
        img.image_url,
        type.property_type,
        sts.status_name
      FROM properties p
      JOIN locations l ON p.property_id = l.property_id
      JOIN property_images img ON img.property_id = p.property_id
      JOIN property_type type ON p.type_id = type.type_id
      JOIN property_status sts ON p.status_id = sts.status_id
      WHERE img.is_primary = 'true'
      LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    return rows; //  return the fetched data
  } catch (error) {
    console.error("Error fetching initial properties:", error);
    throw error;
  }
};
const getExclusiveProperties=async(limit,offset)=>{
      sql=` SELECT 
        p.property_id,
        p.addressline,
        p.price,
        p.location,
        img.image_url,
        type.property_type,
        sts.status_name
      FROM properties p
      JOIN locations l ON p.property_id = l.property_id
      JOIN property_images img ON img.property_id = p.property_id
      JOIN property_type type ON p.type_id = type.type_id
      JOIN property_status sts ON p.status_id = sts.status_id
      WHERE img.is_primary = 'true' and
      WHERE sts.name='Exclusive'
      LIMIT ? OFFSET ?`;
      try {
        const [rows]= await db.query(sql,[limit,offset]);
        if(rows.affectedRows>0){
            return rows;
        }
        else{
            return null;
        }
           
      } catch (error) {
        console.error("Error fetching Exclusive properties:", error);
         throw error;
      }
}
module.exports = { getInitialProperties ,getExclusiveProperties};
