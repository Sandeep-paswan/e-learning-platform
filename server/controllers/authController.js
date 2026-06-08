import mongoose from "mongoose";
import User from "../models/User.js";
import sampleUsers, { publicUser } from "../data/sampleUsers.js";
import { hashPassword, signToken, verifyPassword } from "../utils/auth.js";

const fallbackUsers = [...sampleUsers];

const findFallbackUserByEmail = (email) =>
  fallbackUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());

const findFallbackUserByPhone = (phone) =>
  fallbackUsers.find((user) => user.phone === phone);

const issueAuthResponse = (user) => ({
  token: signToken({ userId: user._id || user.id, role: user.role }),
  user: publicUser(user),
});

const validateAuthInput = ({ name, email, phone, password }) => {
  if (name !== undefined && String(name).trim().length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (!email && !phone) {
    return "Please provide a valid email or phone.";
  }

  if (email && !String(email).includes("@")) {
    return "Please provide a valid email.";
  }

  if (phone && String(phone).replace(/\D/g, "").length < 10) {
    return "Please provide a valid phone number.";
  }

  if (!password || String(password).length < 6) {
    return "Password must be at least 6 characters.";
  }

  return "";
};

export const register = async (req, res) => {
  try {
    const { name = "", email = "", phone = "", password = "" } = req.body;
    const normalizedEmail = String(email).toLowerCase();
    const normalizedPhone = String(phone).replace(/\D/g, "");
    const validationError = validateAuthInput({
      name,
      email: normalizedEmail,
      phone: normalizedPhone,
      password,
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { phone: normalizedPhone || null }],
      }).lean();

      if (existingUser) {
        return res.status(409).json({ message: "Email or phone already registered." });
      }

      const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        phone: normalizedPhone || undefined,
        passwordHash: hashPassword(password),
        role: "student",
        enrolledCourses: [],
      });

      return res.status(201).json(issueAuthResponse(user));
    }

    const existingFallbackUser =
      findFallbackUserByEmail(normalizedEmail) ||
      (normalizedPhone ? findFallbackUserByPhone(normalizedPhone) : null);

    if (existingFallbackUser) {
      return res.status(409).json({ message: "Email or phone already registered." });
    }

    const fallbackUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash: hashPassword(password),
      role: "student",
      enrolledCourses: [],
    };

    fallbackUsers.push(fallbackUser);
    return res.status(201).json(issueAuthResponse(fallbackUser));
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email = "", phone = "", identifier = "", password = "" } = req.body;
    const normalizedIdentifier = String(identifier || email || phone).trim();
    const normalizedEmail = normalizedIdentifier.includes("@")
      ? normalizedIdentifier.toLowerCase()
      : "";
    const normalizedPhone = normalizedEmail
      ? ""
      : normalizedIdentifier.replace(/\D/g, "");
    const validationError = validateAuthInput({
      name: "ok",
      email: normalizedEmail,
      phone: normalizedPhone,
      password,
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    if (mongoose.connection.readyState === 1) {
      const query = normalizedEmail
        ? { email: normalizedEmail }
        : { phone: normalizedPhone };
      const user = await User.findOne(query).lean();

      if (!user || !verifyPassword(password, user.passwordHash)) {
        return res.status(401).json({ message: "Invalid email/phone or password." });
      }

      return res.status(200).json(issueAuthResponse(user));
    }

    const fallbackUser = normalizedEmail
      ? findFallbackUserByEmail(normalizedEmail)
      : findFallbackUserByPhone(normalizedPhone);

    if (!fallbackUser || !verifyPassword(password, fallbackUser.passwordHash)) {
      return res.status(401).json({ message: "Invalid email/phone or password." });
    }

    return res.status(200).json(issueAuthResponse(fallbackUser));
  } catch (error) {
    return res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
};

export const getMe = async (req, res) => res.status(200).json({ user: req.user });
