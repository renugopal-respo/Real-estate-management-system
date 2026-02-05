export const normalizeImageURL = (path) => {
  if (!path) return "";

  const cleanPath = path.replace(/\\/g, "/");

  if (cleanPath.startsWith("http")) {
    return cleanPath;
  }

  const serverBase = "http://localhost:5000/";
  return `${serverBase}${cleanPath}`;
};
