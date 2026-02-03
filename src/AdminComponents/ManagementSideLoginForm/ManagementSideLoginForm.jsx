import React, { useState } from 'react'
import AdminForm from '../AdminForm/AdminForm'
import { userapi } from '../../ApiService/axios.js'
const ManagementSideLoginForm = () => {
    const[responseMessage,setResponseMessage]=useState('');
    const handleSubmit=async(formData)=>{
        console.log("form data:",formData);
    }
  return (
    <div><AdminForm 
    formTitle='Login Form'
    onSumbmit={handleSubmit}
    responsemessage={responseMessage}/></div>
  )
}

export default ManagementSideLoginForm