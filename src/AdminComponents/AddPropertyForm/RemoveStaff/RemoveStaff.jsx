import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styles from './RemoveStaff.module.css';
import { userapi } from '../../../ApiService/axios';
import LoadingCard from '../../../Components/LoadingCard/LoadingCard';
import AlertCard from '../../../Components/AlertCard/AlertCard';
import axios from 'axios';
const RemoveStaff = () => {
  const options = ['Remove by ID', 'Remove by Email'];
  const [option, setOption] = useState();
  const [input, setInput] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [inputVisibility, setInputVisibility] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const[disable,setDisable]=useState(false);
  
  // Toggle dropdown visibility
  const handleDropDownClick = () => {
    setActiveDropdown((prev) => !prev);
    if (inputVisibility) setInputVisibility(false);
    if(responseMsg) setResponseMsg('');
  };

  // Select an option
  const handleOptionClick = (index, e) => {
    e.preventDefault();
    setOption(index);
    setActiveDropdown(false);
    setInputVisibility(true);
    setInput('');
  };

  // Input field change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  // Handle remove staff action
  const handleRemoveClick = async() => {
    
    if (!input.trim()) {
      alert('Please enter a valid ID or Email.');
      return;
    }
    console.log(`Removing staff by ${options[option]}:`, input);
    
   
    try {
       let deleteBy='';
           if(input.includes('@')){
        deleteBy='email';
    }
    else{
        deleteBy="userId"
    }
       const res=await userapi.delete('/removeStaff',{data:{
           deleteBy,
           value:input
       }}) 
       const {message}=res.data.message;
       console.log("Message:",message);
       setResponseMsg(message);
    } catch (error) {
        if(error.response.data.message){
            const message=error.response.data.message;
            setResponseMsg(message);
            console.log(message);
        }
    }
     
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropDownContainer}>
        <div className={styles.dropDown}>
          <p className={styles.dropDownPlaceholder} onClick={handleDropDownClick}>
            {option !== undefined ? options[option] : 'Select...'}
          </p>
          <button onClick={handleDropDownClick} className={styles.dropDownBtn}>
            <FaAngleDown style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        {activeDropdown && (
          <div className={styles.optionContainer}>
            {options.map((opt, index) => (
              <p
                key={index}
                role="button"
                onClick={(e) => handleOptionClick(index, e)}
              >
                {opt}
              </p>
            ))}
          </div>
        )}
      </div>

      {inputVisibility && (
        <div className={styles.inputContainer}>
          <input
            type={option === 1 ? 'email' : 'number'}
            placeholder={options[option]}
            value={input}
            onChange={handleInputChange}
            disabled={disable}
          />
          <button onClick={handleRemoveClick}
          disabled={disable}
          >Remove Staff</button>
        </div>
      )}
       {responseMsg && <p className={styles.response}>{responseMsg}</p>}
       {responseMsg && <AlertCard message={responseMsg}/>}
       
    </div>
  );
};

export default RemoveStaff;
