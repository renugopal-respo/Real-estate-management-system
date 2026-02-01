export const whereClauseBuilder = (filters, conditions, data) => {
  let whereClause = '';
  let values = [];

  try {
    if (!Array.isArray(filters) || !Array.isArray(conditions) || !Array.isArray(data)) {
      throw new Error("filters, conditions, and data must be arrays");
    }

    if (!(filters.length === conditions.length && conditions.length === data.length)) {
      throw new Error("filters, conditions, and data must be of equal length");
    }

    let parts = [];
    filters.forEach((item, index) => 
      { if(item==='status_name'){
        parts.push(`ps.${item} = ?`)
       }
       else if(item==='city'){
          parts.push(`l.${item}=?`);
       }
       else if(item==='type_name'){
          parts.push(`pt.${item}=?`);
       }
       else{
         parts.push(`DATE(pv.${item})<=CURDATE()`);
       }       
  }    );
    values = data;

    // ✅ Join using conditions, skip trailing condition at end
    whereClause = 'WHERE ';
    for (let i = 0; i < parts.length; i++) {
      whereClause += parts[i];
      if (i < conditions.length - 1) {
        whereClause += ` ${conditions[i]} `;
      }
    }
  } catch (error) {
    console.log(error.message || "Error in building where clause");
  }

  return { whereClause, values };
};
