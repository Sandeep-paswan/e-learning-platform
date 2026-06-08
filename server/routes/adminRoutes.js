import express from "express";
import { getAdminOverview } from "../controllers/adminController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", requireAuth, requireAdmin, getAdminOverview);

export default router;
