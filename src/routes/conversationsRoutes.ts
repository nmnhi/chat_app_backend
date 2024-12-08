import { Router } from "express";
import { fetchAllConversationsByUserId } from "../controllers/conversationsController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, fetchAllConversationsByUserId);

export default router;
