import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminForm.module.css';
import { FaEyeSlash ,FaEye} from 'react-icons/fa';
const AdminForm = ({formTitle,onSubmit,responsemessage}) => {
     const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [inputType,setInputType]=useState(true);
  const[resMessage,setResMessage]=useState(responsemessage);
  //const navigate = useNavigate();

  // 🔹 Handle input change (FIXED)
  const handleChange = (e) => {
    const { name, value } = e.target; //  correct fields
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  //password visibilty
  const handleVisibility=(e)=>{
    e.preventDefault();
      setInputType(prev=>!prev);
  }
  //  Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    // Simple empty validation
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }

     onSubmit(credentials);
     
  };
  useEffect(()=>{
    setResMessage(responsemessage)
  },[responsemessage]);
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{formTitle}</h2>

        {(error && <p className={styles.error}>{error}</p>    
        )}
         {(resMessage && <p className={styles.error}>{resMessage}</p>    
        )}
        <div className={styles.input1}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.input2}>
          <label>Password</label>
          <input
            type={inputType ? 'password': 'text'}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className={styles.input}
          />
          <button className={styles.passwordVisibilityBtn}
          onClick={handleVisibility} >
         {inputType ?<FaEyeSlash/>:<FaEye/>}
          </button>
        </div>

        <button className={styles.button}>
          Add
        </button>

        <div>
        
        </div>
      </form>
    </div>
  );
}

export default AdminForm