import React from "react";
export const setToken=(token)=>{
    localStorage.setItem("token",token);
}
export const getToken=()=>{
    const token=localStorage.getItem("token");
    if(token){
        return token;
    }
    else{
        return null;
    }
}
export const IsLoggedIn=()=>{
    const token=localStorage.getItem("token");
    if(token){
        return token;
    }
    else{
        return null;
    }
}