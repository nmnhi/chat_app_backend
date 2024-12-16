import { Router } from "express";
import {
  CheckOrCreateConversation,
  fetchAllConversationsByUserId
} from "../controllers/conversationsController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, fetchAllConversationsByUserId);
router.post("/check-or-create", verifyToken, CheckOrCreateConversation);

export default router;
