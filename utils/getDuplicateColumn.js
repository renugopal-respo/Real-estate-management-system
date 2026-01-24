// utils/sqlErrors.js
export const getDuplicateColumn = (error) => {
  // Only process real MySQL duplicate key errors
  if (!error || error.code !== "ER_DUP_ENTRY" || !error.sqlMessage) return null;

  const msg = error.sqlMessage;

  // Ensure the message starts with or contains the expected duplicate pattern
  // Example: "Duplicate entry 'value' for key 'users.unique_email'"
  if (!/Duplicate entry/i.test(msg)) return null;

  // Capture the index name safely
  const match = msg.match(/for key ['`"]?([^'"`]+)['`"]?/i);
  if (!match) return null;

  let key = match[1]; // e.g. "users.unique_email"

  // Extract part after dot if table prefix exists
  if (key.includes(".")) key = key.split(".").pop();

  // Normalize possible unique constraint naming patterns
  if (/^unique_/i.test(key)) key = key.replace(/^unique_/i, "");
  if (/_unique$/i.test(key)) key = key.replace(/_unique$/i, "");

  // Clean extra quotes/backticks
  key = key.replace(/["'`]/g, "");

  return key.trim() || null;
};
