import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      // ✅ Calculate scrollbar width dynamically
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // offset scrollbar removal
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>RealEstate</div>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <div
        className={`${styles.navlinks} ${isOpen ? styles.active : ""}`}
        onClick={closeMenu}
      >
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Home</NavLink>
        <NavLink to="/blog" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Blog</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Contact</NavLink>
        <NavLink to="/userprofile" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Profile</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
