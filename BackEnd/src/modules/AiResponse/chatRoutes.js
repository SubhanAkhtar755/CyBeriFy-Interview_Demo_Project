import express from "express";
import authMiddleware from "../../middlewares/auth.js";
import { askGroq , getUserMessages} from "./controllers/groq.controller.js";

const router = express.Router();

router.post("/ask", authMiddleware , askGroq);
// Get user chat history
router.get("/history", authMiddleware, getUserMessages);

export default router;
