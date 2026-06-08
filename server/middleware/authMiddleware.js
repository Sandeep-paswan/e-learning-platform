import mongoose from "mongoose";
import User from "../models/User.js";
import sampleUsers, { publicUser } from "../data/sampleUsers.js";
import { verifyToken } from "../utils/auth.js";

const getFallbackUserById = (id) =>
  sampleUsers.find((user) => (user._id || user.id) === id);

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : "";

    if (!token) {
      return res.status(401).json({ message: "Authentication required." });
    }

    const payload = verifyToken(token);

    if (!payload?.userId) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(payload.userId).lean();

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      req.user = publicUser(user);
      return next();
    }

    const fallbackUser = getFallbackUserById(payload.userId);

    if (!fallbackUser) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = publicUser(fallbackUser);
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Authentication failed." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  return next();
};
