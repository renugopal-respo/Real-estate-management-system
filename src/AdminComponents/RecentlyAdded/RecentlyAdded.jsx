import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RecentlyAdded.module.css';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
const RecentlyAdded = ({path}) => {
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState(false);
  const [errmessage, setErrorMsg] = useState('');
  const navigate=useNavigate();
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    pincode: "",
    status:""
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const date=false;
  const limit = 10; // rows per page
 console.log("path:",path);
 console.log("date statte:",date);
  const fetchProperties = async () => {
    try {
      
      const res = await axios.get(`http://localhost:5000/admin/getRecentProperties`, {
        params: { ...filters,page,limit,totalPages}
      });
      const newData = res.data.data || [];  
      console.log(res.data);
      setProperties(newData); // append instead of replace
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = () => {
       
    fetchProperties();
    setFilters({ date: "", location: "", pincode: "" });
    setPage(1);   
  };

  const handleDeleteClick = async (e) => {
    try {
      const res = await axios.get('http://localhost:5000/admin/deleteProperties', {
        params: { property_id: e.target.value, 
          properties:JSON.stringify(properties) }
      });
      //setProperties(res.data.properties);
      setErrorMsg(res.data.message);
      const updatedProperty=properties.filter(prop=>prop.property_id!==res.data.propertyId);
      setProperties(updatedProperty);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setErrors(true);
        setErrorMsg(message);
      }
      console.log(error);
    }
  };

  const handleUpdateClick = (e) => {
    console.log("Update clicked for property:", e.target.value);
    const propertyId=e.target.value;
    navigate('/admin/update/', {state:{propertyId:propertyId}});
  };

  return (
    <div className={styles.container}>
      {errors && <h1>{errmessage}</h1>}
      <h2 className={styles.title}><span style={{position:"relative", right:"0.4rem"}}><FaHome/></span> Property Details</h2>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Search by location"
          value={filters.location}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          name="pincode"
          placeholder="Search by pincode"
          value={filters.pincode}
          onChange={handleFilterChange}
          className={styles.input}
        />
         <input
          type="text"
          name="status"
          placeholder="Search by status"
          value={filters.status}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <button className={styles.clearBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Property Table */}
      <div className={styles.tableScrool}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Location</th>
              <th>Pincode</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date Added</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((p) => (
                <tr key={p.property_id}>
                  <td>{p.property_id}</td>
                  <td>{p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.type_name}</td>
                  <td>{p.city}</td>
                  <td>{p.pincode}</td>
                  <td>₹{Number(p.price).toLocaleString()}</td>
                  <td>{p.status_name}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      value={p.property_id}
                      className={styles.updateButton}
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      value={p.property_id}
                      className={styles.removeButton}
                      onClick={handleDeleteClick}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className={styles.noData}>
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show More Pagination */}
      
      <div className={styles.pagination}>
  {/* Previous Button */}
  {page > 1 && (
    <button
      onClick={() => setPage(prev => prev - 1)}
      className={styles.pageBtn}
    >
      Prev
    </button>
  )}

  <span className={styles.pageInfo}>
    Page {page} of {totalPages}
  </span>

  {/* Next Button */}
  {page <=totalPages && (
    <button
      onClick={() => setPage(prev => prev + 1)}
      className={styles.pageBtn}
    >
      Next
    </button>
  )}
</div>

    </div>
  );
};

export default RecentlyAdded;
