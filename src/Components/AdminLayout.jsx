import React from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar/AdminNavbar.jsx"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet /> {/* Renders nested admin routes here */}
    </>
  );
};

export default AdminLayout;
