import { Outlet } from "react-router-dom";
import { getToken,JwtDecode } from "../../utils/Token";
import React from 'react'

const ProtectedRoute = () => {
    const token=getToken;
    if(token){
        
    }
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute