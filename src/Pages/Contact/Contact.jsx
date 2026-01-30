import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    mobile: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminNumber = "919876543210"; // <-- Replace with Admin WhatsApp number
    const message = `🏠 *New Property Inquiry*\n\n📋 Property ID: ${formData.propertyId}\n👤 Name: ${formData.name}\n📞 Mobile: ${formData.mobile}`;
    const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    setIsSubmit(true); // Show success message
    setFormData({ propertyId: "", name: "", mobile: "" }); // Reset form
  };

  const handleClose = () => {
    setIsSubmit(false);
  };

  return (
    <div className={styles.contactWrapper}>
      <section
        className={`${styles.contactSection} ${isSubmit ? styles.blurBackground : ""}`}
      >
        <div className={styles.contactContainer}>
          <h2>Contact Admin</h2>
          <p>Enter your details and the property ID. We’ll reach out to you soon.</p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="propertyId">Property ID</label>
              <input
                type="text"
                id="propertyId"
                name="propertyId"
                placeholder="Enter property ID"
                value={formData.propertyId}
                onChange={handleChange}
                required
              />
            </div>

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

      {/* ✅ Success message overlay */}
      {isSubmit && (
        <div className={styles.successOverlay}>
          <div className={styles.successBox}>
            <h3>✅ Submitted Successfully!</h3>
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

export default Contact;
