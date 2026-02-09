import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getToken, getDecodedToken } from "../../utils/Token";

const ProtectedRoute = () => {
  const token = getToken();
  console.log("Inside a protected Route");
  if (!token) {
    
    return <Navigate to="/admin/managementloginform" replace />;
  }

  try {
    const decoded = getDecodedToken();
    const { user_role } = decoded || {};

    if (
      user_role?.toLowerCase() === "staff" ||
      user_role?.toLowerCase() === "admin"
    ) {
      
      return <Outlet />;
    } else {
      
      return <Navigate to="/admin/managementloginform" replace />;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/admin/managementloginform" replace />;
  }
};

export default ProtectedRoute;
