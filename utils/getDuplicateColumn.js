// utils/sqlErrors.js

/**
 * Returns the column name that caused a duplicate entry error
 * @param {Error} error - MySQL error object
 * @returns {string|null} - column name or null if not found
 */
export const getDuplicateColumn = (error) => {
  if (error.code !== "ER_DUP_ENTRY") return null;

  // Extract the key/index name from sqlMessage
  const match = error.sqlMessage.match(/for key '(.+)'/);
  if (!match) return null;

  let column = match[1];

  // If the key includes table.column, just get the column
  if (column.includes('.')) {
    column = column.split('.').pop();
  }

  return column;
};
