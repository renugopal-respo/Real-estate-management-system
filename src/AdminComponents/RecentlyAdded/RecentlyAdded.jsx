import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RecentlyAdded.module.css';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Select from 'react-select'
const RecentlyAdded = ({path}) => {
  const [properties, setProperties] = useState([]);
  const [errors, setErrors] = useState(false);
  const [errmessage, setErrorMsg] = useState('');
  const navigate=useNavigate();
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    pincode: "",
    status:"",
    type:""
  });
  const [page, setPage] = useState(1);
  const [filterPage,setFilterPage]=useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const date=false;
  const limit = 10; 
 console.log("path:",path);
 console.log("date statte:",date);
  const fetchProperties = async () => {
    try {
      
      const res = await axios.get(`http://localhost:5000/admin/getRecentProperties`, {
        params: { ...filters,page,limit,totalPages}
      });
      const newData = res.data.data || [];  
      console.log(res.data);
      setProperties(newData);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page,filterPage]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = () => {
    setFilterPage((prev)=>!prev);
   // setFilters({ date: "", location: "", pincode: "" });
    setPage(1);   
  };

  const handleDeleteClick = async (e) => {
    try {
      const res = await axios.get('http://localhost:5000/admin/deleteProperties', {
        params: { property_id: e.target.value, 
          properties:JSON.stringify(properties) }
      });
      console.log(res.data);
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

      
     <div className={styles.filters}>

  <input
    type="date"
    name="date"
    value={filters.date}
    onChange={handleFilterChange}
    className={styles.input}
  />

  {/* 🔹 Location dropdown (React Select) */}
  <Select
    className={styles.input}
    options={[
      { value: "Chennai", label: "Chennai" },
      { value: "Coimbatore", label: "Coimbatore" },
      { value: "Madurai", label: "Madurai" },
      { value: "Trichy", label: "Trichy" },
      { value: "Salem", label: "Salem" },
      { value: "Erode", label: "Erode" },
      { value: "Tirunelveli", label: "Tirunelveli" },
      { value: "Vellore", label: "Vellore" },
      { value: "Nagercoil", label: "Nagercoil" },
    ]}
    value={filters.location ? { value: filters.location, label: filters.location } : null}
    onChange={(selectedOption) =>
      setFilters((prev) => ({
        ...prev,
        location: selectedOption ? selectedOption.value : "",
      }))
    }
    placeholder="Select Location..."
    isClearable
  />

  
  <Select
    className={styles.input}
    options={[
      { value: "Buy", label: "Buy" },
      { value: "Rent", label: "Rent" },
      { value: "Sale", label: "Sale" },
    ]}
    value={filters.status ? { value: filters.status, label: filters.status } : null}
    onChange={(selectedOption) =>
      setFilters((prev) => ({
        ...prev,
        status: selectedOption ? selectedOption.value : "",
      }))
    }
    placeholder="Select Status..."
    isClearable
  />

  
  <Select
    className={styles.input}
    options={[
      { value: "Apartment", label: "Apartment" },
      { value: "Villa", label: "Villa" },
      { value: "PG", label: "PG" },
      { value: "Plot", label: "Plot" },
      { value: "Commercial", label: "Commercial" },
    ]}
    value={filters.type ? { value: filters.type, label: filters.type } : null}
    onChange={(selectedOption) =>
      setFilters((prev) => ({
        ...prev,
        type: selectedOption ? selectedOption.value : "",
      }))
    }
    placeholder="Select Type..."
    isClearable
  />

  
  <input
    type="text"
    name="pincode"
    placeholder="Search by pincode"
    value={filters.pincode}
    onChange={handleFilterChange}
    className={styles.input}
  />

  
  <button className={styles.clearBtn} onClick={handleSubmit}>
    Apply Filters
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
