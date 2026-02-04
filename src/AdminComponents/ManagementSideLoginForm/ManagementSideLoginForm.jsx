import React, { useState } from "react";
import AdminForm from "../AdminForm/AdminForm";
import { userapi } from "../../ApiService/axios.js";
import AlertCard from "../../Components/AlertCard/AlertCard.jsx";
import { setToken } from "../../utils/Token.js";
const ManagementSideLoginForm = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (formData) => {
    console.log("form data:", formData);

    try {
      
      const res = await userapi.post("/loginUser", {
        user: {
          email: formData.email,
          password: formData.password,
        },
      });      
      setResponseMessage(res.data?.message || "Login successful!");
      setAlert(true);
      console.log("Response:", res.data);
      

    } catch (error) {     
      setAlert(prev=>!prev);

      if (error.response) {
        console.log("Server Error:", error.response.status);
        setResponseMessage(
          error.response.data?.message || "Login failed: Unauthorized user"
        );
      } else if (error.request) {
        console.log("No response received:", error.request);
        setResponseMessage("Network error: No response from server");
      } else {
        console.log("Error:", error.message);
        setResponseMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <AdminForm
        formTitle="Login Form"
        onSubmit={handleSubmit}
        responsemessage={responseMessage}
      />
      {alert && <AlertCard message={responseMessage} />}
    </div>
  );
};

export default ManagementSideLoginForm;
