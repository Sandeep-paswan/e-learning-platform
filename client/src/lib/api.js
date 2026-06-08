import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: apiBase,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

export const getCourses = async () => {
  const { data } = await api.get("/courses");
  return data;
};

export const getCourseBySlug = async (slug) => {
  const { data } = await api.get(`/courses/${slug}`);
  return data;
};

export const getDashboardOverview = async () => {
  const { data } = await api.get("/courses/dashboard/overview");
  return data;
};

export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const getAdminOverview = async () => {
  const { data } = await api.get("/admin/overview");
  return data;
};

export default api;
