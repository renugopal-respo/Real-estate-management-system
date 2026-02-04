// src/Routes/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";
import AddPropertyForm from "../AdminComponents/AddPropertyForm/AddPropertyForm";
import PropertyTable from "../AdminComponents/PropertyTable/PropertyTable";
import RecentlyAdded from "../AdminComponents/RecentlyAdded/RecentlyAdded";
import UpdateForm from "../AdminComponents/UpdateForm/UpdateForm";
import BookingList from "../AdminComponents/BookingList/BookingList";
import ManagementSideLoginForm from "../AdminComponents/ManagementSideLoginForm/ManagementSideLoginForm";
import RecentlySoldOut from "../AdminComponents/RecentlySoldOut/RecentlySoldOut";
import AddStaff from "../AdminComponents/AddStaff/AddStaff";
import RemoveStaff from "../AdminComponents/AddPropertyForm/RemoveStaff/RemoveStaff";

const AdminRoutes = () => {
  return (
    <Route path="/" element={<AdminLayout />}>
      <Route
        path="/admin"
        element={
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            Welcome Admin Dashboard
          </h2>
        }
      />
      <Route path="/admin/addpropertyform" element={<AddPropertyForm />} />
      <Route path="/admin/propertytable" element={<PropertyTable />} />
      <Route path="/admin/recentlyadded" element={<RecentlyAdded />} />
      <Route path="/admin/update" element={<UpdateForm />} />
      <Route path="/admin/bookinglist" element={<BookingList />} />
      <Route
        path="/admin/managementloginform"
        element={<ManagementSideLoginForm />}
      />
      <Route path="/admin/recentlysoldout" element={<RecentlySoldOut />} />
      <Route path="/admin/addstaff" element={<AddStaff />} />
      <Route path="/admin/removestaff" element={<RemoveStaff />} />
    </Route>
  );
};

export default AdminRoutes;
