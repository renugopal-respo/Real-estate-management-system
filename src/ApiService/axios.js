import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Global config
axios.defaults.withCredentials = true;


export const adminapi = axios.create({
  baseURL: "http://localhost:5000/admin",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials:true
});

export const userapi = axios.create({
  baseURL: "http://localhost:5000/users",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const propertyapi = axios.create({
  baseURL: "http://localhost:5000/properties",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default adminapi;

