// src/Routes/UserRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import PropertyContextProvider from "../Contextapi/Propertycontext";
import UserLayout from "../Components/UserLayout";
import Home from "../Pages/Home/Home";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import ContactForm from "../Components/ContactFormForAddProperty/ContactForm";
import UserProfile from "../Pages/Profile/UserProfile";
import DetailViewCard from "../Components/Cardgroup/DetailViewCard/DetailViewCard";

const UserRoutes = () => {
  return (
    <Route element={<UserLayout />}>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/blog"
        element={<Blog />}
      />
      <Route 
      path="/about"
       element={<About />} 
       />
      <Route 
      path="/contact" 
      element={<Contact />}
       />
      <Route 
      path="/userprofile" 
      element={<UserProfile />} 
      />
      <Route
       path="/detailview" 
      element={<DetailViewCard />} 
      />
      <Route 
      path="/contactformforaddproperty" 
      element={<ContactForm/>}
      />
    </Route>
  );
};

export default UserRoutes;
