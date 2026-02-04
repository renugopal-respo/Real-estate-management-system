import AdminForm from "../AdminForm/AdminForm";
import React, { useState } from 'react'
import {userapi} from '../../ApiService/axios.js'
import LoadingCard from "../../Components/LoadingCard/LoadingCard.jsx";
const AddStaff = () => {
const [responseMessage,setResponseMessage]=useState('');
const [loading,setLoading]=useState(false);
    const handleSubmit=async(formData)=>{
          console.log(formData);
          try {
            setLoading(prev=>!prev);
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
          finally{
              setLoading(prev=>!prev);
          }
    }
  return (
    <div><AdminForm    
      formTitle="Add Staff"
      onSubmit={handleSubmit}
      responsemessage={responseMessage}
      />
      { loading && <LoadingCard message="Please wait"/>}
      </div>
  )
}

export default AddStaff