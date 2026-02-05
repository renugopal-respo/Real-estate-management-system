import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./FilterContainerTest.module.css";

const PropertyFilterGroup = ({onSubmit}) => {
  
  const [properties, setProperties] = useState([
    "ALL",
    "BUY",
    "RENT",
    "SALE",
    "PG",
    "VILLA",
  ]);

  const [propertyType, setPropertyType] = useState("ALL");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  
  const locations = [
    { value: "CHENNAI", label: "Chennai" },
    { value: "COIMBATORE", label: "Coimbatore" },
    { value: "MADURAI", label: "Madurai" },
    { value: "TIRUCHIRAPPALLI", label: "Tiruchirappalli" },
    { value: "SALEM", label: "Salem" },
    { value: "TIRUNELVELI", label: "Tirunelveli" },
    { value: "THANJAVUR", label: "Thanjavur" },
    { value: "VELLORE", label: "Vellore" },
    { value: "DINDIGUL", label: "Dindigul" },
    { value: "THOOTHUKUDI", label: "Thoothukudi" },
    { value: "ERODE", label: "Erode" },
    { value: "NAMAKKAL", label: "Namakkal" },
    { value: "KANCHIPURAM", label: "Kanchipuram" },
    { value: "TIRUVALLUR", label: "Tiruvallur" },
    { value: "VIRUDHUNAGAR", label: "Virudhunagar" },
    { value: "RAMANATHAPURAM", label: "Ramanathapuram" },
    { value: "KARUR", label: "Karur" },
    { value: "NAGAPATTINAM", label: "Nagapattinam" },
    { value: "TIRUPPUR", label: "Tiruppur" },
    { value: "CUDDALORE", label: "Cuddalore" },
  ];

  
  useEffect(() => {
    if (properties.length > 0) {
      setIsActive(0);
      setPropertyType("ALL");
    }
  }, [properties]);

  
  const handleTypeClick = (index) => {
    const selectedType = properties[index];
    setIsActive(index);
    setPropertyType(selectedType);
  };

  
  const handleLocationChange = (selectedOption) => {
    if (selectedOption) {
      setLocation(selectedOption.value);
    } else {
      setLocation("");
    }
  };

  
  const handlePriceChange = (e) => {
     const{value}=e.target;
     setPrice(value);
     if(value>3000){
        setError(false);
     }
     else{
        setError(true);
        setErrorMsg("Price Starts at 3000");
     }
  };
 
  
  const caseInsensitiveFilter = (option, inputValue) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase());

   
  useEffect(() => {
    console.log({
      propertyType,
      location,
      price,
    });
  }, [propertyType, location, price]);
 
  const handleSearchClick=()=>{
    onSubmit({
      propertyType,
      location,
      price,
    });
  }
  return (
    <div className={styles.container}>
      {/* ==== Property Type Buttons ==== */}
      <div className={styles.buttongroup}>
        {properties.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTypeClick(index)}
            className={
              index === isActive ? styles.isActive : styles.notActive
            }
          >
            {item}
          </button>
        ))}
      </div>

      {/* ==== Location Dropdown ==== */}
      <div className={styles.selectContainer}>
        <Select
          classNamePrefix="react-select"
          options={locations}
          onChange={handleLocationChange}
          value={
            location
              ? locations.find((loc) => loc.value === location)
              : null
          }
          isSearchable
          placeholder="Select district..."
          filterOption={caseInsensitiveFilter}
        />
      </div>

      {/* ==== Price Input ==== */}
      <div className={styles.inputcontainer}>
        <input
          type="text"
          placeholder="Enter price"
          onChange={handlePriceChange}
          value={price}
        />
        {error && <p className={styles.error}>{errorMsg}</p>}
      </div>
      <div className={styles.searchBtnContainer}>
        <button styles={styles.searchBtn}
        onClick={handleSearchClick}>
          Search
          </button>
          </div>
    </div>
  );
};

export default PropertyFilterGroup;
