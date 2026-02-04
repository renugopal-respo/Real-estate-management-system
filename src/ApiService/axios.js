import axios from "axios";
import { jwtDecode } from "jwt-decode";


function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.warn("Invalid token:", error);
    return true;
  }
}

// Global config
axios.defaults.withCredentials = true;

// ====== Admin API ======
export const adminapi = axios.create({
  baseURL: "http://localhost:5000/admin",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ====== User API ======
export const userapi = axios.create({
  baseURL: "http://localhost:5000/users",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ====== Request Interceptor ======
userapi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");

  if (isTokenExpired(token)) {
    try {
      const res = await axios.post(
        "http://localhost:5000/users/refreshToken",
        {},
        { withCredentials: true }
      );
      token = res.data.accessToken;
      localStorage.setItem("token", token);
    } catch (error) {
      console.warn("Failed to refresh token:", error);
      localStorage.removeItem("token");
      window.location.href = "/admin/managementloginform";
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ====== Response Interceptor (optional) ======
userapi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/managementloginform";
    }
    return Promise.reject(error);
  }
);

export default adminapi;
