import React, { useState } from "react";
import styles from "./Contact.module.css";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminNumber = "919876543210";
    const message = `*New Inquiry*\n\nName: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}`;
    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    setIsSubmit(true);
    setFormData({ name: "", email: "", mobile: "" });
  };

  const handleClose = () => {
    setIsSubmit(false);
    navigate(-1);
  };

  return (
    <div className={styles.contactWrapper}>
      <section
        className={`${styles.contactSection} ${
          isSubmit ? styles.blurBackground : ""
        }`}
      >
        <div className={styles.contactContainer}>
          <h2>Contact Admin</h2>
          <p>Enter your details and we’ll reach out to you soon.</p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
      </section>

      {isSubmit && (
        <div className={styles.successOverlay}>
          <div className={styles.successBox}>
            <h3>Submitted Successfully!</h3>
            <p>Our team will contact you shortly.</p>
            <button onClick={handleClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
