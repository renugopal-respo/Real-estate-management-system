import React, { useState } from "react";
import styles from "./InitialCard.module.css";
import { FaArrowRight, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { normalizeImageURL } from "../../../utils/normalizeImagePath";
import {getToken, IsLoggedIn,JwtDecode} from '../../../utils/Token.js'
import { jwtDecode } from "jwt-decode";
import { propertyapi } from "../../../ApiService/axios.js";
import { useNavigate } from "react-router-dom";
import AlertCard from "../../AlertCard/AlertCard.jsx";
const InitialCard = ({ properties = [] }) => {
  const [favorites, setFavorites] = useState({});
  const [alert,setAlert]=useState(false);
  const navigate=useNavigate();
  
  const handleFavoriteClick = async(propertyId) => {
    const decoded=jwtDecode()||'';
    const userId=decoded.user_id;
    if(decoded){
       try {
        const res=await propertyapi.get('/addToFavorites',{
          params:{
            user_id:userId,
            property_id:propertyId
          }
        })
        console.log("Response:",res?.data);
       } catch (error) {
          setAlert(true);
       }
    }
    else{
      navigate('/loginform');
    }

    setFavorites((prev) => ({
      ...prev,
      [propertyId]: !prev[propertyId],
    }));
  };

  const handleShareClick = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.type_name || "Property",
        text: `Check out this property in ${item.city}`,
        url: window.location.href,
      });
    } else {
      alert("Sharing is not supported on this browser");
    }
  };

  return (
    <div className={styles.container}>
      {properties.map((item, index) => {
        const isFavorite = favorites[item.property_id] || false;
        const imageSrc = normalizeImageURL(item.image_url);

        return (
          <div key={index} className={styles.card}>
            <div className={styles.img}>
              <img src={imageSrc} alt={item.type_name || "Property"} />
            </div>

            <div className={styles.detailcontainer}>
              <p className={styles.propertytype}>{item.type_name}</p>
              <p className={styles.location}>{item.city}</p>
              <p className={styles.price}>${item.price}</p>
            </div>

            <div className={styles.cardbuttoncontainer}>
              <button className={styles.cardbutton}>
                See Details <FaArrowRight />
              </button>

              <div className={styles.iconGroup}>
                <button
                  className={styles.share}
                  onClick={() => handleShareClick(item)}
                >
                  <FaShareAlt className={styles.FaShareIcon} />
                </button>

                <button
                  className={styles.fav}
                  onClick={() => handleFavoriteClick(item.property_id)}
                >
                  {isFavorite ? (
                    <FaHeart className={styles.FaHeartFilled} />
                  ) : (
                    <FaRegHeart className={styles.FaHeartEmpty} />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {alert && <AlertCard/>}
    </div>
  );
};

export default InitialCard;
