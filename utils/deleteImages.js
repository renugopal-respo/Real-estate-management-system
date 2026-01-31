import fs from "fs/promises";
import path from "path";

export const deleteImages = async (images) => {
  try {
    // Helper: safely build full absolute path
    const resolvePath = (img) => {
      const imagePath = typeof img === "object" ? img.image_url : img;
      // join ensures both / and \ work on all OS
      return path.join(process.cwd(), imagePath.startsWith(".") ? imagePath.slice(1) : imagePath);
    };

    if (Array.isArray(images)) {
      await Promise.all(
        images.map(async (img) => {
          const fullPath = resolvePath(img);
          try {
            await fs.unlink(fullPath);
            console.log(" Deleted:", fullPath);
          } catch (err) {
            if (err.code === "ENOENT") {
              console.warn(" File not found, skipping:", fullPath);
            } else {
              console.error("Error deleting:", fullPath, err.message);
            }
          }
        })
      );
    } else {
      // Single path
      const fullPath = resolvePath(images);
      await fs.unlink(fullPath);
      console.log(" Deleted:", fullPath);
    }

    console.log("All delete operations completed");
  } catch (error) {
    console.error("Controller error:", error);
  }
};
