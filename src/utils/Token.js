import React from "react";

import { jwtDecode } from "jwt-decode";
export const setToken=(token)=>{
    localStorage.setItem("token",token);
}
export const getToken=()=>{
    const token=localStorage.getItem("token");
    if(token){
        return token;
    }
    else{
        return null;
    }
}
export const IsLoggedIn=()=>{
    const token=localStorage.getItem("token");
    if(token){
        return token;
    }
    else{
        return null;
    }
}
export const getDecodedToken = () => {
  const token = localStorage.getItem("token");

  if (!token || typeof token !== "string" || token.trim() === "") {
    console.warn("No valid token found in localStorage");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

/*axios.get("/protected", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});*/