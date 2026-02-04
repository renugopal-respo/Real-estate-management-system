// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Form/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER ROUTES */}
        {UserRoutes()}

        {/* ADMIN ROUTES */}
        {AdminRoutes()}

        {/* AUTH ROUTES */}
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/loginform" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
