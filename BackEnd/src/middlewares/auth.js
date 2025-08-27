import jwt from "jsonwebtoken";
import { ENV } from "../constants/index.js";
const authMiddleware = (req, res, next) => {
  try {
    // Try header first
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : req.cookies?.token;

    if (!token) return res.status(401).json({ error: "Unauthorized: Token missing" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
