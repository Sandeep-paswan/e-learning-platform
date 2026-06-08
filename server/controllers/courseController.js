import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import sampleCourses, { dashboardSnapshot } from "../data/sampleCourses.js";
import sampleUsers from "../data/sampleUsers.js";

const normalizeCourse = (course) => {
  if (course._id) {
    return course;
  }

  return {
    ...course,
    _id: course.id,
  };
};

const getFallbackCourses = () => sampleCourses.map(normalizeCourse);

const getFallbackUserById = (userId) =>
  sampleUsers.find((user) => (user._id || user.id) === userId);

export const getCourses = async (_req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const courses = await Course.find().lean();

      if (courses.length > 0) {
        return res.status(200).json(courses);
      }

      const seededCourses = await Course.insertMany(sampleCourses);
      return res.status(200).json(seededCourses);
    }

    return res.status(200).json(getFallbackCourses());
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch courses.",
      error: error.message,
    });
  }
};

export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const course = await Course.findOne({ slug }).lean();

      if (course) {
        return res.status(200).json(course);
      }
    }

    const fallbackCourse = getFallbackCourses().find((course) => course.slug === slug);

    if (!fallbackCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json(fallbackCourse);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch course details.",
      error: error.message,
    });
  }
};

export const getDashboard = async (_req, res) => {
  try {
    return res.status(200).json(dashboardSnapshot);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard data.",
      error: error.message,
    });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user.id).lean();
      const courses = await Course.find({
        slug: { $in: user?.enrolledCourses || [] },
      }).lean();

      return res.status(200).json(courses);
    }

    const fallbackUser = getFallbackUserById(req.user.id);
    const courses = getFallbackCourses().filter((course) =>
      (fallbackUser?.enrolledCourses || []).includes(course.slug)
    );
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch enrolled courses.",
      error: error.message,
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { slug } = req.params;

    if (mongoose.connection.readyState === 1) {
      const [course, user] = await Promise.all([
        Course.findOne({ slug }),
        User.findById(req.user.id),
      ]);

      if (!course) {
        return res.status(404).json({ message: "Course not found." });
      }

      if (!user.enrolledCourses.includes(slug)) {
        user.enrolledCourses.push(slug);
        await user.save();
      }

      return res.status(200).json({
        message: "Course enrolled successfully.",
        enrolledCourses: user.enrolledCourses,
        course,
      });
    }

    const fallbackUser = getFallbackUserById(req.user.id);
    const fallbackCourse = getFallbackCourses().find((course) => course.slug === slug);

    if (!fallbackCourse) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (fallbackUser && !fallbackUser.enrolledCourses.includes(slug)) {
      fallbackUser.enrolledCourses.push(slug);
    }

    return res.status(200).json({
      message: "Course enrolled successfully.",
      enrolledCourses: fallbackUser?.enrolledCourses || [],
      course: fallbackCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to enroll in course.",
      error: error.message,
    });
  }
};
