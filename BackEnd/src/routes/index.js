import { Router } from "express";
import userRoutes from '../modules/user/routes.js';
import aiResponseRoutes from '../modules/AiResponse/chatRoutes.js';

const router = Router();

router.use('/user',  userRoutes);

router.use('/ai-response',  aiResponseRoutes);

export default router; 