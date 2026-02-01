import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/", // ✅ Your base URL here
  timeout: 10000,                       // optional: 10-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
