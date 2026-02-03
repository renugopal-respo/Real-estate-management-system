import AdminForm from "../AdminForm/AdminForm";
import React, { useState } from 'react'
import {userapi} from '../../ApiService/axios.js'
import LoadingCard from "../../Components/LoadingCard/LoadingCard.jsx";
const AddStaff = () => {
const [responseMessage,setResponseMessage]=useState('');
    const handleSubmit=async(formData)=>{
          console.log(formData);
          try {
            const res=await userapi.post('/addStaff',formData);
            console.log(res.data);
            const {message}=res.data;
            setResponseMessage(message);
          } catch (error) {
            console.log(error.response);
             if(error.response.data){
                const {message}=error.response.data;
                setResponseMessage(message);
                console.log("Error message:",responseMessage);
             }
          }
    }
  return (
    <div><AdminForm    
      formTitle="Add Staff"
      onSubmit={handleSubmit}
      responsemessage={responseMessage}
      />
      <LoadingCard message="Please wait"/>
      </div>
  )
}

export default AddStaff