import axios from "axios";

// Create an axios instance
const adminapi = axios.create({
  baseURL: "http://localhost:5000/admin", // ✅ Your base URL here
  timeout: 10000,                       // optional: 10-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});
export const userapi = axios.create({
  baseURL: "http://localhost:5000/users", // ✅ Your base URL here
  timeout: 10000,                       // optional: 10-second request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default adminapi;
