import React, { useState } from "react";
import styles from "./InitialCard.module.css";
import { FaArrowRight, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { normalizeImageURL } from "../../../utils/normalizeImagePath";
import { getDecodedToken } from "../../../utils/Token.js";
import { propertyapi } from "../../../ApiService/axios.js";
import { useNavigate } from "react-router-dom";
import AlertCard from "../../AlertCard/AlertCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites,removeAllFavorites } from "../../../Redux/Slicer.jsx"

const InitialCard = ({related=[]}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let properties = useSelector((state) => state.properties.properties);
  const favorites = useSelector((state) => state.properties.favorites);
  if(related.length>0){
    properties=related;
  }
  const [alert, setAlert] = useState(false);

  const handleFavoriteClick = async (property) => {
    const decoded = getDecodedToken || "";
    const userId = decoded?.user_id;

    if (!userId) {      
      navigate("/loginform");
      return;
    }

    try {
      if(favorites.includes(property.property_id)){
        const res=await propertyapi.delete('/removeFromFavorites',{
          data:{user_id:userId,
            property_id:property.property_id
          }
        })
        const{propertyId}=res.data.propertyId;
        dispatch(removeFromFavorites(propertyId));

      }
      else{
         const res = await propertyapi.get("/addToFavorites", {
        params: { user_id: userId, property_id: property.property_id },
      });
      const{favorites}=res.data.favorites;
       dispatch(removeAllFavorites())
       dispatch(addToFavorites(favorites)) 
      }
        
    }catch(error){
       console.log("error:",error?.response);
    }
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
  const handleDetailsClick=(property)=>{
    navigate(`/detailview`,{state:
     { property:property}
    });
  }
  return (
    <div className={styles.container}>
      {properties.map((item, index) => {
        const isFavorite = favorites.some(
          (fav) => fav.property_id === item.property_id
        );
        const imageSrc = normalizeImageURL(item.image_url);

        return (
          <div key={index} className={styles.card}>
            <div className={styles.img}>
              <img src={imageSrc} alt={item.type_name || "Property"} />
            </div>

            <div className={styles.detailcontainer}>
              <p className={styles.propertytype}>{item.type_name}</p>
              <p>{item.status_name}</p>
              <p className={styles.location}>{item.city}</p>
              <p className={styles.price}>${item.price}</p>
            </div>

            <div className={styles.cardbuttoncontainer}>
              <button className={styles.cardbutton} 
              onClick={()=>handleDetailsClick(item)}>
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
                  onClick={() => handleFavoriteClick(item,index)}
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
      {alert && <AlertCard />}
    </div>
  );
};

export default InitialCard;
