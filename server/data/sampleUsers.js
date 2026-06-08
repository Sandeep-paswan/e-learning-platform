import { hashPassword } from "../utils/auth.js";

const baseUsers = [
  {
    id: "learner-demo",
    name: "Sandeep Paswan",
    email: "student@learnhub.dev",
    phone: "8757354880",
    password: "student123",
    role: "student",
    enrolledCourses: ["mern-stack-mastery", "frontend-ui-engineering"],
  },
  {
    id: "admin-demo",
    name: "LearnHub Admin",
    email: "admin@learnhub.dev",
    phone: "9876543210",
    password: "admin123",
    role: "admin",
    enrolledCourses: [
      "mern-stack-mastery",
      "frontend-ui-engineering",
      "cloud-devops-foundations",
    ],
  },
];

export const sampleUsers = baseUsers.map((user) => ({
  ...user,
  passwordHash: hashPassword(user.password),
}));

export const publicUser = (user) => ({
  _id: user._id || user.id,
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  phone: user.phone || "",
  role: user.role,
  enrolledCourses: user.enrolledCourses || [],
});

export default sampleUsers;
