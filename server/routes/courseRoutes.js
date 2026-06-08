import express from "express";
import {
  enrollInCourse,
  getCourseBySlug,
  getCourses,
  getDashboard,
  getMyCourses,
} from "../controllers/courseController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/dashboard/overview", getDashboard);
router.get("/my-courses/list", requireAuth, getMyCourses);
router.post("/:slug/enroll", requireAuth, enrollInCourse);
router.get("/:slug", getCourseBySlug);

export default router;
