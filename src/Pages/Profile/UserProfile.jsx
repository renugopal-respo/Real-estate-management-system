import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import PropertyCard from "../../Components/Cardgroup/InitialCard/InitialCard";
import axios from "axios";
import { getDecodedToken } from "../../utils/Token.js";
import { Navigate, useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [user, setUser] = useState({ username: "", role: "" });
  const [favorites, setFavorites] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const token=getDecodedToken();
      if(!token){
        console.log("Token not Found")
        navigate('/loginform');
      }
      const{id,email}=token;
      try {
        const res = await axios.get(`http://localhost:5000/users/getUserProfile`,{
         params: {
          user_id:id,
          email:email
         }
        });
        setUser({ username: res.data.name, role: res.data.role });
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchUser();
  }, []);
  

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
