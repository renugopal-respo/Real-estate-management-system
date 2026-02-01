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

    const parts = filters.map((item, index) => `${item} = ?`);
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
