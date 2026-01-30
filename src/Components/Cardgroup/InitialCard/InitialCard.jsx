import React, { useState } from "react";
import styles from "./InitialCard.module.css";
import { FaArrowRight, FaHeart, FaRegHeart } from "react-icons/fa"; // ✅ added FaRegHeart (outline)

const InitialCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite); // toggle state
  };

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          src="http://localhost:5000/uploads/house1/Gemini_Generated_Image_470i1o470i1o470i.png"
          alt="house"
        />
      </div>

      <div className={styles.detailcontainer}>
        <p className={styles.propertytype}>Apartment</p>
        <p className={styles.location}>Chennai</p>
        <p className={styles.price}>$2000</p>
      </div>

      <div className={styles.cardbuttoncontainer}>
        <button className={styles.cardbutton}>
          See Details <FaArrowRight />
        </button>

        {/* ✅ Favorite button toggle */}
        <button className={styles.fav} onClick={handleFavoriteClick}>
          {isFavorite ? (
            <FaHeart className={styles.FaHeartFilled} />
          ) : (
            <FaRegHeart className={styles.FaHeartEmpty} />
          )}
        </button>
      </div>
    </div>
  );
};

export default InitialCard;
