import express from "express";
import authRoutes from "./auth.route.js";
import ConversationRoute from "./conversation.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", ConversationRoute);

export default router;
