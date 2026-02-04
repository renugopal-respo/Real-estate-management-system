import { Outlet,useNavigate } from "react-router-dom";
import { getToken,JwtDecode } from "../../utils/Token";
import React from 'react'
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const token=getToken;  
    const navigate=useNavigate();
    if(token){
        const decoded=jwtDecode(token);
        const{user_role}=decoded;
        if(user_role.toLowerCase()==="staff".toLowerCase()||
        user_role.toLowerCase()==='admin'.toLowerCase()){
           return <Outlet/>
        }
        else{
            navigate('/admin/managementloginform');
        }       
    }
    
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute