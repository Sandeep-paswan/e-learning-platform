import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import sampleCourses from "../data/sampleCourses.js";
import sampleUsers from "../data/sampleUsers.js";

export const getAdminOverview = async (_req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [courseCount, userCount, adminCount] = await Promise.all([
        Course.countDocuments(),
        User.countDocuments(),
        User.countDocuments({ role: "admin" }),
      ]);

      return res.status(200).json({
        stats: [
          { label: "Courses", value: courseCount },
          { label: "Users", value: userCount },
          { label: "Admins", value: adminCount },
        ],
      });
    }

    return res.status(200).json({
      stats: [
        { label: "Courses", value: sampleCourses.length },
        { label: "Users", value: sampleUsers.length },
        { label: "Admins", value: sampleUsers.filter((user) => user.role === "admin").length },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch admin overview.",
      error: error.message,
    });
  }
};
