import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./form.module.css";
import axios from "axios";
import { setToken, getToken } from "../../utils/Token";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 


    if (!credentials.email || !credentials.password) {
      setError("Email and password are required");
      return;
    }

    try {
      
      const res = await axios.post("http://localhost:5000/users/loginUser", {
        user: credentials,
      });

      setToken(res.data.token);
      navigate("/"); // redirect after successful login
    } catch (error) {
      console.log("axios error", error);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

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
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Log In
        </button>

        <div>
          <p>
            Don’t have an account?{" "}
            <span>
              <Link to="/RegisterForm">Register</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
