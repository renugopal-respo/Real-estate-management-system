import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import PropertyCard from "../../Components/Cardgroup/InitialCard/InitialCard";
 // Assume user ID stored in localStorage
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({ username: "", role: "" });
  const [favorites, setFavorites] = useState([]);

 /* useEffect(() => {
    // Fetch user info (example API)
    const fetchUser = async () => {
      const userId = getUser("userid"); // from localStorage
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser({ username: res.data.name, role: res.data.role });
        setFavorites(res.data.favorites || []); // array of favorite properties
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUser();
  }, []);
  */

  return (
    <div className={styles.page}>
      <section className={styles.profileHeader}>
        <div>
          <h2>User Name:{user.username}</h2>
          <p>Role: {user.role}</p>
        </div>
      </section>

      <section className={styles.favoritesSection}>
        <h3>Favorite Properties</h3>
        {favorites.length === 0 ? (
          <p>No favorite properties yet.</p>
        ) : (
          <div className={styles.grid}>
            {favorites.map((property, index) => (
              <PropertyCard key={index} data={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
