// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import RegisterForm from "./Components/Register/RegisterForm";
import LoginForm from "./Components/Form/LoginForm";
import "./ApiService/axios.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        { UserRoutes()}
        

        {  AdminRoutes()}

       {/* <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/loginform" element={<LoginForm />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
