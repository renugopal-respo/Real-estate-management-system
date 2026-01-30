import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet /> {/* Renders nested user routes here */}
    </>
  );
};

export default UserLayout;
