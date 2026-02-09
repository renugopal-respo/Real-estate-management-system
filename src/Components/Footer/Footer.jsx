import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        
        <div className={styles.footerBrand}>
          <h3>RealEstateHub</h3>
          <p>
            Find your dream property with trusted agents and verified listings.
            We connect you with the best homes across the country.
          </p>
        </div>

        
        <div className={styles.footerLinks}>
          <h4>Quick Links</h4>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            Home
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
            Properties
          </NavLink>
         
         
        </div>

       
        <div className={styles.footerSocial}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 RealEstateHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
