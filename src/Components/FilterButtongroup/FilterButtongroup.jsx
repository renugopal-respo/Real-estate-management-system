import React, { useContext, useState } from 'react';
import Select from 'react-select';
import styles from './FilterButtongroup.module.css';
import { PropertyContext } from '../../Contextapi/Propertycontext';
const FilterButtongroup = () => {
  const [locations] = useState([
    { value: 'CHENNAI', label: 'Chennai' },
    { value: 'COIMBATORE', label: 'Coimbatore' },
    { value: 'MADURAI', label: 'Madurai' },
    { value: 'TIRUCHIRAPPALLI', label: 'Tiruchirappalli' },
    { value: 'SALEM', label: 'Salem' },
    { value: 'TIRUNELVELI', label: 'Tirunelveli' },
    { value: 'THANJAVUR', label: 'Thanjavur' },
    { value: 'VELLORE', label: 'Vellore' },
    { value: 'DINDIGUL', label: 'Dindigul' },
    { value: 'THOOTHUKUDI', label: 'Thoothukudi' },
    { value: 'ERODE', label: 'Erode' },
    { value: 'NAMAKKAL', label: 'Namakkal' },
    { value: 'KANCHIPURAM', label: 'Kanchipuram' },
    { value: 'TIRUVALLUR', label: 'Tiruvallur' },
    { value: 'VIRUDHUNAGAR', label: 'Virudhunagar' },
    { value: 'RAMANATHAPURAM', label: 'Ramanathapuram' },
    { value: 'KARUR', label: 'Karur' },
    { value: 'NAGAPATTINAM', label: 'Nagapattinam' },
    { value: 'TIRUPPUR', label: 'Tiruppur' },
    { value: 'CUDDALORE', label: 'Cuddalore' },
  ]);
  const [dprice,setdPrice]=useState("");
  const [value,selectedValue]=useState("");
  const [error,setError]=useState(false);
  const [errormsg,setErrorMsg]=useState("");
  const [loc,setLoc]=useState("");
  const{price,setPrice,location,setLocation}=useContext(PropertyContext);
  const handleChange = (selectedOption) => {
    console.log(selectedOption.value);
    setLoc(selectedOption.value);
    setLocation(loc);  
  };
  const handleInputChange = (e) => {
  const val = e.target.value;
  setdPrice(val);
  setPrice(val); 
  // add this line
  if(val===""){
    setError(false);
  }
  else if (val >= 3000 && val > 0) {
    setPrice(val);
    setError(false);
  } else if (val <= 3000) {
        setError(true);
    setErrorMsg("Minimum Price starts at 3000");
  } else {   
    setErrorMsg("Value must not be negative");
    setError(true);
  }
  
};

  const caseInsensitiveFilter = (option, inputValue) => {
    if (!inputValue) return true;
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

 
  return (
    
    <div className={styles.container}>
      <Select
        classNamePrefix="react-select"
        options={locations}
        onChange={handleChange}
        isSearchable
        placeholder="Select district..."
        filterOption={caseInsensitiveFilter}
      />
      <div className={styles.inputcontainer}>
         <input type="text" 
       placeholder={"Enter price"}
       onChange={(e)=>{handleInputChange(e)}}
       value={dprice}  
        />
        {error && <p className={styles.error}>{errormsg}</p>}
      </div>
      
    </div>
  );
};

export default FilterButtongroup;
