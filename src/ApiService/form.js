// api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // adjust to match your backend

// Axios instance (optional: helpful for interceptors later)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ LOGIN API
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/users/verify", {
      email: credentials.email,
      password: credentials.pass, // match backend field
    });

    return { success: true, data: res.data };
  } catch (error) {
    // Handle backend or network errors gracefully
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Login failed. Please check your credentials.";
    return { success: false, error: message };
  }
};

// ✅ REGISTER API
export const registerUser = async (userData) => {
  try {
    const res = await api.post("/users", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phnnumber: userData.contact,
      role: "CUSTOMER", // default role
      age: userData.age,
    });

    return { success: true, data: res.data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Registration failed. Please try again.";
    return { success: false, error: message };
  }
};

export default api;
