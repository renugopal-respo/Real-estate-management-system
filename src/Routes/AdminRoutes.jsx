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
import AddStaff from "../AdminComponents/AddStaff/AddStaff.jsx";
import RemoveStaff from "../AdminComponents/AddPropertyForm/RemoveStaff/RemoveStaff";
import ProtectedRoute from "../Components/ProtectedRoutes/ProtectedRoute";

const AdminRoutes = () => (
  <>
    <Route
      path="/admin/managementloginform"
      element={<ManagementSideLoginForm />}
    />

  
    <Route path="/admin" element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route
          index
          element={
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
              Welcome Admin Dashboard
            </h2>
          }
        />
        <Route path="addpropertyform" element={<AddPropertyForm />} />
        <Route path="propertytable" element={<PropertyTable />} />
        <Route path="recentlyadded" element={<RecentlyAdded />} />
        <Route path="update" element={<UpdateForm />} />
        <Route path="bookinglist" element={<BookingList />} />
        <Route path="recentlysoldout" element={<RecentlySoldOut />} />
        <Route path="addstaff" element={<AddStaff />} />
        <Route path="removestaff" element={<RemoveStaff />} />
      </Route>
    </Route>
  </>
);

export default AdminRoutes;
