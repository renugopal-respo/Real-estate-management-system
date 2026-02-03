import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PropertyContextProvider from "./Contextapi/Propertycontext";
import LoginForm from "./Components/Form/LoginForm";
import RegisterForm from "./Components/Register/RegisterForm";
import Blog from "./Pages/Blog/Blog";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import UserProfile from "./Pages/Profile/UserProfile";
import DetailViewCard from "./Components/Cardgroup/DetailViewCard/DetailViewCard";
import AddPropertyForm from "./AdminComponents/AddPropertyForm/AddPropertyForm";
import PropertyTable from "./AdminComponents/PropertyTable/PropertyTable";
import RecentlyAdded from "./AdminComponents/RecentlyAdded/RecentlyAdded";
import UpdateForm from "./AdminComponents/UpdateForm/UpdateForm";
import BookingList from "./AdminComponents/BookingList/BookingList";
import AdminForm from "./AdminComponents/AdminForm/AdminForm";
import AddStaff from "./AdminComponents/AddStaff/AddStaff";
import ManagementSideLoginForm from "./AdminComponents/ManagementSideLoginForm/ManagementSideLoginForm";
import RemoveStaff from "./AdminComponents/AddPropertyForm/RemoveStaff/RemoveStaff";
import RecentlySoldOut from "./AdminComponents/RecentlySoldOut/RecentlySoldOut";
import UserLayout from "./Components/UserLayout"
import AdminLayout from "./Components/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ====== USER ROUTES ====== */}
        <Route element={<UserLayout />}>
          <Route
            path="/loginform"
            element={
              <PropertyContextProvider>
                <Home/>
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
          <Route path="/detailview/:id" element={<DetailViewCard />} />
        </Route>

        {/* ====== ADMIN ROUTES ====== */}
        <Route path='/'element={<AdminLayout />}>
          <Route path="/admin" element={<h2 style={{textAlign:'center', marginTop:'2rem'}}>Welcome Admin Dashboard</h2>} />
          <Route path="/admin/addpropertyform" element={<AddPropertyForm />} />
          <Route path="/admin/propertytable" element={<PropertyTable/>}/>
          <Route path="/admin/recentlyadded" element={<RecentlyAdded/>}/>
          <Route path="/admin/update/" element={<UpdateForm/>}/>
          <Route path='/admin/bookinglist' element={<BookingList/>}/>
          <Route path='/admin/addstaff'  element={<AddStaff/>}/>
          <Route path='/admin/removestaff' element={<RemoveStaff/>}/>
          <Route path='/admin/managementloginform' element={<ManagementSideLoginForm/>}/>
          <Route path="/admin/recentlysoldout" element={<RecentlySoldOut/>}/>
          {/* Add more admin pages later */}
        </Route>

        {/* ====== AUTH ROUTES ====== */}
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/loginform" element={<LoginForm />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
