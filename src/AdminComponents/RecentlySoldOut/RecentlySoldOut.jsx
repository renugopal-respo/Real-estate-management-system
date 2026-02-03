import InputGroup from "../InputGroup/InputGroup";
import Table from "../Table/Table";
import React, { useEffect, useState } from 'react'
import LoadingCard from "../../Components/LoadingCard/LoadingCard";
import AlertCard from "../../Components/AlertCard/AlertCard";
import adminapi from "../../ApiService/axios";
//input ,page,setPage,totalPages
//{ title="Input Group", filters=[], setFilters, onClick
const RecentlySoldOut = () => {
    const getEmptyState=()=>{
         return {
    date: "",
    location: "",
    statusOptions: ["SOLDOUTS", "RENTED"],
    typeOptions: ["Apartment", "Villa", "Plot"],
    propertyStatusOptions: ["Rent", "Buy", "Sold Out"],

    // selected values
    status: "",
    type: "",
    propertyStatus: "",
  };
    }
    const[filters,setFilters]=useState(getEmptyState);
    const [page,setPage]=useState(1);
    const[totalPages,setTotalPages]=useState();
    const[loading,setLoading]=useState(false);
    const[err,setErr]=useState(false);
    const[properties,setProperties]=useState([])
    const fetchProperties=async()=>{
         const newFilters=
      {
        visited_date:filters.date,
        city:filters.location,
        type_name:filters.type,
        status_name:filters.propertyStatus,
        propertySoldoutStatus:filters.status
     }
     try {
        const res=await adminapi.get('/recentlySoldout',{
           params:{filters:JSON.stringify(newFilters),
            page:page
     }});
        
     } catch (error) {
       
     }
    }
    const handleSubmit=async(formData)=>{
        fetchProperties();
        setPage(1);
    }
   useEffect(()=>{
      fetchProperties();
   },[page])
  return (
    <div><InputGroup 
    title="Sold Out's"
    filters={filters}
    setFilters={setFilters}
    onClick={handleSubmit}/>
    <Table input={properties} 
    page={page}
    setPage={setPage}
    onClick={handleSubmit}/>
    </div>
  )
}

export default RecentlySoldOut