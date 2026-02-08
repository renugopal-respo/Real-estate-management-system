import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import PropertyCard from "../../Components/Cardgroup/InitialCard/InitialCard";
import axios from "axios";
import { getToken } from "../../utils/Token.js";
import { useNavigate } from "react-router-dom";
import AlertCard from "../../Components/AlertCard/AlertCard.jsx";
import { useSelector,useDispatch } from "react-redux";
import { removeAllFavorites,addToFavorites } from "../../Redux/Slicer.jsx";
const UserProfile = () => {
  const [user, setUser] = useState({ username: "", role: "" });
  const navigate = useNavigate();
   const[alert,setAlert]=useState(false);
   const  favorites=useSelector((state)=>state.properties.favorites);
   const dispatch=useDispatch();
   let message;
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users/getUserProfile", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
         console.log("response:",res.data);
        setUser({
          username: res.data.name,
          role: res.data.role,
        });
       
        //setFavorites(res.data.favorites || []);
        dispatch(removeAllFavorites());
        dispatch(addToFavorites(res.data.favorites));
        console.log(res.data);
      } 
      catch (err) {
        console.error("Failed to fetch user data:", err.response?.data?.message || err.message);
        if (err.response?.status === 401 || err?.response?.status===403) {         
          message=err.response?.data?.message;
          setAlert(true);
          navigate("/loginform");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className={styles.page}>
      <section className={styles.profileHeader}>
        <div>
          <h2>User Name: {user.username}</h2>
          <p>Role: {user.role}</p>
        </div>
      </section>

      <section className={styles.favoritesSection}>
        <h3>Favorite Properties</h3>
        {favorites.length === 0 ? (
          <p>No favorite properties yet.</p>
        ) : (
          <div className={styles.grid}>
             
              <PropertyCard related={favorites} />
          
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
