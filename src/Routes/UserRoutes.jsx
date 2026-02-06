// src/Routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import PropertyContextProvider from "../Contextapi/Propertycontext";
import UserLayout from "../Components/UserLayout";
import Home from "../Pages/Home/Home";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import UserProfile from "../Pages/Profile/UserProfile";
import DetailViewCard from "../Components/Cardgroup/DetailViewCard/DetailViewCard";

const UserRoutes = () => {
  return (
    <Route element={<UserLayout />}>
      <Route
        path="/mm"
        element={
          <PropertyContextProvider>
            <Home />
          </PropertyContextProvider>
        }
      />
      <Route
        path="/blog"
        element={
          <PropertyContextProvider>
            <Blog />
          </PropertyContextProvider>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/detailview" element={<DetailViewCard />} />
    </Route>
  );
};

export default UserRoutes;
