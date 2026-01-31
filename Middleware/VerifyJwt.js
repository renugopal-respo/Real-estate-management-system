import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Usually token is sent as: "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user data to req
    next(); // continue to next route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
