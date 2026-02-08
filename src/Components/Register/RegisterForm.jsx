import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Registerform.module.css";
import axios from "axios";
import { setToken } from "../../utils/Token.js";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";   // 👈 import icons

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    contact: "",
    age: "",
    user_role: "CUSTOMER",
  });

  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState(true);   // 👈 toggle state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleVisibility = (e) => {
    e.preventDefault();
    setInputType((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccess("");

    const errors = {};
    try {
      if (!formData.user_name) errors.name = "Name is required.";
      if (!formData.email) errors.email = "Email is required.";
      if (!formData.password) errors.password = "Password is required.";
      if (!formData.contact) errors.contact = "Contact number is required.";
      if (!formData.age) errors.age = "Age is required.";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email))
        errors.email = "Please enter a valid email address.";

      if (formData.password && formData.password.length < 6)
        errors.password = "Password must be at least 6 characters long.";

      if (formData.contact && !/^[0-9]{10}$/.test(formData.contact))
        errors.contact = "Contact number must be 10 digits.";

      const userAge = parseInt(formData.age);
      if (formData.age && (isNaN(userAge) || userAge <= 0))
        errors.age = "Please enter a valid positive age.";

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      setSuccess("Validation successful — user data is ready!");
      const res = await axios.post("http://localhost:5000/users/createUser", {
        user: formData,
      });

      setSuccess(res.data.message);
      setFormData({
        user_name: "",
        email: "",
        password: "",
        contact: "",
        age: "",
        user_role: "CUSTOMER",
      });

      const token = res.data.token;
      setToken(token);
      navigate("/mm");
    } catch (error) {
      const errors = {};
      if (error.response && error.response.data) {
        const { field, message } = error.response.data;
        errors[field] = message;
        setSuccess(message);
      } else {
        errors.general = "Something went wrong. Please try again.";
      }
      setFormErrors(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>

        {success && <p className={styles.success}>{success}</p>}

        {/* Name */}
        <div className={styles.inputGroup}>
          <label>Name :</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            className={`${styles.input} ${formErrors.name ? styles.errorBorder : ""}`}
          />
          {formErrors.name && <p className={styles.fieldError}>{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${formErrors.email ? styles.errorBorder : ""}`}
          />
          {formErrors.email && <p className={styles.fieldError}>{formErrors.email}</p>}
        </div>

        {/* Password with visibility toggle */}
        <div className={styles.input2}>
          <label>Password :</label>
          <input
            type={inputType ? "password" : "text"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${formErrors.password ? styles.errorBorder : ""}`}
          />
          <button
            className={styles.passwordVisibilityBtn}
            onClick={handleVisibility}
            type="button"
          >
            {inputType ? <FaEyeSlash /> : <FaEye />}
          </button>
          {formErrors.password && <p className={styles.fieldError}>{formErrors.password}</p>}
        </div>

        {/* Contact */}
        <div className={styles.inputGroup}>
          <label>Contact :</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={`${styles.input} ${formErrors.contact ? styles.errorBorder : ""}`}
          />
          {formErrors.contact && <p className={styles.fieldError}>{formErrors.contact}</p>}
        </div>

        {/* Age */}
        <div className={styles.inputGroup}>
          <label>Age :</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`${styles.input} ${formErrors.age ? styles.errorBorder : ""}`}
          />
          {formErrors.age && <p className={styles.fieldError}>{formErrors.age}</p>}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Validating..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <span>
            <Link to="/LoginForm">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
