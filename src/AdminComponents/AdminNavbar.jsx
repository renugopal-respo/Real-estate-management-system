import React, { useState, useEffect, useRef } from "react";
import styles from "../AdminComponents/AdminNavbar/AdminNavbar.module.css";
import { FaChevronDown, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleHamburgerToggle = () => {
    setMenuOpen(!menuOpen);
    setActiveDropdown(null);
  };

  const handleSearchClick = () => {
    navigate("/admin/propertytable");
    setMenuOpen(false); // close sidebar after navigating
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  // ✅ Detect click outside the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar} ref={navRef}>
      {/* Logo */}
      <div className={styles.leftSection}>
        <h2 className={styles.logo}>🏠 Admin Panel</h2>
      </div>

      {/* Hamburger (Mobile Only) */}
      <div className={styles.hamburger} onClick={handleHamburgerToggle}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Center Section - Nav Links */}
      <div
        className={`${styles.centerSection} ${
          menuOpen ? styles.activeMenu : ""
        }`}
      >
        <ul className={styles.navLinks}>
          {/* Dashboard */}
          <li>
            <NavLink
              className={styles.navButton}
              to="/admin"
              onClick={handleNavLinkClick}
            >
              Dashboard
            </NavLink>
          </li>

          {/* Properties Dropdown */}
          <li className={styles.dropdown}>
            <button
              className={styles.navButton}
              onClick={() => toggleDropdown("properties")}
            >
              Properties <FaChevronDown />
            </button>
            {activeDropdown === "properties" && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <NavLink
                    to="/admin/addpropertyform"
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.navLink
                    }
                    onClick={handleNavLinkClick}
                  >
                    Add Property
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/recentlyadded"
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.navLink
                    }
                    onClick={handleNavLinkClick}
                  >
                    Recently Added
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/update"
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : styles.navLink
                    }
                    onClick={handleNavLinkClick}
                  >
                    Update
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Bookings Dropdown */}
          <li className={styles.dropdown}>
            <button
              className={styles.navButton}
              onClick={() => toggleDropdown("bookings")}
            >
              Bookings <FaChevronDown />
            </button>
            {activeDropdown === "bookings" && (
              <ul className={styles.dropdownMenu}>
                <li onClick={handleNavLinkClick}>Recently Sold Out</li>
                <li onClick={handleNavLinkClick}>Booking List</li>
              </ul>
            )}
          </li>

          {/* Staff Dropdown */}
          <li className={styles.dropdown}>
            <button
              className={styles.navButton}
              onClick={() => toggleDropdown("staff")}
            >
              Staff <FaChevronDown />
            </button>
            {activeDropdown === "staff" && (
              <ul className={styles.dropdownMenu}>
                <li onClick={handleNavLinkClick}>Add Staff</li>
                <li onClick={handleNavLinkClick}>Remove Staff</li>
              </ul>
            )}
          </li>

          {/* Users */}
          <li>
            <button className={styles.navButton} onClick={handleNavLinkClick}>
              Users
            </button>
          </li>

          {/* Search (Mobile Only) */}
          <li className={styles.mobileSearch}>
            <button className={styles.searchBtn} onClick={handleSearchClick}>
              <FaSearch /> Search
            </button>
          </li>

          {/* Logout (Mobile Only) */}
          <li className={styles.mobileLogout}>
            <button className={styles.logoutBtn} onClick={handleNavLinkClick}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Right Section (Desktop) */}
      <div className={styles.rightSection}>
        <button className={styles.searchBtn} onClick={handleSearchClick}>
          <FaSearch /> Search
        </button>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
