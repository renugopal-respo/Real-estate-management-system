import RecentlyAdded from "../RecentlyAdded/RecentlyAdded";
import React from 'react'
import InputGroup from "../InputGroup/InputGroup";
import Table from "../Table/Table";
import axios from "axios";
import { useState,useEffect } from "react";
import { data } from "react-router-dom";
const BookingList = () => {
  const [page,setPage]=useState({page:1,limit:10});
  const[totalPages,setTotalPages]=useState(0);
  const[properties,setProperties]=useState([]);
  const getEmptyState=()=> {
  return {
    date: "",
    location: "",
    statusOptions: ["SCHEDULED", "COMPLETED", "CANCELED"],
    typeOptions: ["Apartment", "Villa", "Plot"],
    propertyStatusOptions: ["Rent", "Buy", "Sold Out"],

    // selected values
    status: "",
    type: "",
    propertyStatus: "",
  };
}
  const [filters, setFilters] = useState(
    getEmptyState
);
 const fetchBookingList=async()=>{
  console.log("function Booking list called");
      const newFilters=
      {visited_date:filters.date,
        city:filters.location,
        type_name:filters.type,
        status_name:filters.propertyStatus,
         propertyVisitStatus:filters.status}
        try {
          const res= await axios.get('http://localhost:5000/admin/getbookings',{
            params:{ filters:JSON.stringify(newFilters),
              page: JSON.stringify(page)
            }
          });
          
        } catch (error) {
           console.log(error.response.data);
        }
  }

  useEffect(()=>{
    fetchBookingList();
  },[page]);

  const handleSubmit=()=>{
    console.log("Parent submit called");
    console.log(filters);
    fetchBookingList();    
  }
 
  
  return (
    <div> 
      <InputGroup 
      title='Bookings List'
       filters={filters}
       setFilters={setFilters}
       onClick={handleSubmit}
    />
    <Table input={[]}/>
    </div>
  )
}

export default BookingList;