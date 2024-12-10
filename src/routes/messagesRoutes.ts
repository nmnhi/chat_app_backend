import { Router } from "express";
import { fetchAllMessagesByConversationId } from "../controllers/messagesController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:conversationId", verifyToken, fetchAllMessagesByConversationId);

export default router;
