import React, { useEffect, useState } from "react";
import styles from "./DetailViewCard.module.css";
import {
  FaWifi,
  FaCar,
  FaWater,
  FaCouch,
  FaFan,
  FaUsers,
  FaHeart,
  FaRegHeart, 
} from "react-icons/fa";
import {
  MdSecurity,
  MdOutlineKitchen,
  MdPets,
  MdKingBed,
} from "react-icons/md";
import InitialCard from "../InitialCard/InitialCard";
import { useLocation, useNavigate } from "react-router-dom";
import { propertyapi } from "../../../ApiService/axios";
import AlertCard from "../../AlertCard/AlertCard";
import { useDispatch, useSelector } from "react-redux"; // 🟢 redux
import { addToFavorites, removeFromFavorites } from "../../../Redux/Slicer"; // 🟢 redux actions

const DetailViewCard = () => {
  const { state } = useLocation();
  const { property = {} } = state || {};
  const [propertyData, setPropertyData] = useState(null);
  const [related, setRelated] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMesaage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.properties.favorites); 

  const handleContact = () => {
    const phone = propertyData.owner_phone.replace(/\D/g, "");
    const pageUrl = window.location.href;
    const message = `Hello ${propertyData.owner_name}:
    propertyId${propertyData.property_id}
     I’m interested in your ${propertyData.type_name} for 
     ${propertyData.status_name} in ${propertyData.city}. 
     Here's the link: ${pageUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    if (property?.property_id) fetchPropertyDetails();
  }, [property]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await propertyapi.get("/getDetailsView", {
        params: { property: JSON.stringify(property) },
      });

      const { data, relatedProperties } = response.data;
      setPropertyData(data);
      setRelated(relatedProperties || []);
    } catch (error) {
      console.error("Error fetching details:", error);
      setErrorMesaage(error?.response?.data?.message);
      setAlert(true);
    }
  };

  
  const handleFavoriteClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlert(true);
        setErrorMesaage("Please login to add favorites");
        return;
      }

      const isFavorite = favorites.some(
        (fav) => fav.property_id === propertyData.property_id
      );

      if (isFavorite) {
        const res = await propertyapi.delete("/removeFromFavorites", {
          data: { propertyId: propertyData.property_id },
          headers: { authorization: `Bearer ${token}` },
        });
        dispatch(removeFromFavorites(propertyData.property_id));
        console.log("Removed from favorites:", res.data);
      } else {
        const res = await propertyapi.get("/addToFavourites", {
          params: { property_id: propertyData.property_id },
          headers: { authorization: `Bearer ${token}` },
        });
        dispatch(addToFavorites(propertyData));
        console.log("Added to favorites:", res.data);
      }
    } catch (error) {
      console.error("Error in handleFavoriteClick:", error.response);
    }
  };

  if (!propertyData) return <p>Loading property details...</p>;

  const { type_name, amenities = [] } = propertyData;

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK"];
  const sharingOptions = [
    "Single Sharing",
    "Double Sharing",
    "Triple Sharing",
  ];

  const isFavorite = favorites.some(
    (fav) => fav.property_id === propertyData.property_id
  ); 

  return (
    <main className={styles.container}>
      <div className={styles.imgflex}>
        {propertyData.images?.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:5000/${img.image_url.replace("\\", "/")}`}
            alt={type_name}
          />
        ))}
      </div>

      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h2>{propertyData.title}</h2>
          
          <button
            onClick={handleFavoriteClick}
            className={styles.favoriteButton}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <FaHeart color="red" size={22} />
            ) : (
              <FaRegHeart color="gray" size={22} />
            )}
          </button>
        </div>

        {type_name === "Apartment" && (
          <div className={styles.bhk}>
            {bhkOptions.map((bhk, index) => (
              <p key={index}>{bhk}</p>
            ))}
          </div>
        )}
        {type_name === "PG" && (
          <div className={styles.bhk}>
            {sharingOptions.map((opt, index) => (
              <p key={index}>{opt}</p>
            ))}
          </div>
        )}

        <p><b>Status:</b> {propertyData.status_name}</p>
        <p><b>Price:</b> ₹{propertyData.price}</p>
        <p><b>City:</b> {propertyData.city}</p>
        <p><b>Type:</b> {type_name}</p>
        <p><b>Facing:</b> {propertyData.facing}</p>
        <p><b>BedRooms:</b> {propertyData.bedromms}</p>
        <p><b>BathRooms:</b> {propertyData.bathromms}</p>
        <p><b>Area:</b> {propertyData.area_sqft} sqft</p>
      </div>

      <div className={styles.amenities}>
        {amenities.map((amenity, index) => (
          <div key={index} className={styles.amenity}>
            {amenity.toLowerCase() === "wifi" && <FaWifi />}
            {amenity.toLowerCase() === "parking" && <FaCar />}
            {amenity.toLowerCase() === "security" && <MdSecurity />}
            {amenity.toLowerCase() === "furnished" && <FaCouch />}
            {amenity.toLowerCase() === "petfriendly" && <MdPets />}
            {amenity.toLowerCase().includes("bhk") && <MdKingBed />}
            {amenity.toLowerCase().includes("sharing") && <FaUsers />}
            <span>{amenity}</span>
          </div>
        ))}
        <div className={styles.description}>
          <textarea
            readOnly
            style={{ backgroundColor: "transparent", width: "100%" }}
          >
            {propertyData?.description}
          </textarea>
        </div>
      </div>

      <section className={styles.relatedProperties}>
        <h3>Related Properties</h3>
        {related.length > 0 ? (
          <div className={styles.relatedGrid}>
            <InitialCard related={related} />
          </div>
        ) : (
          <p>No related properties found.</p>
        )}
      </section>

      <div className={styles.buttoncontainer}>
        <button 
        className={styles.contactBtn}
        onClick={handleContact}>Contact</button>
        <button
          onClick={() =>
            navigate("/contact", { state: { propertyId: propertyData.property_id } })
          }
        >
          Book Visit
        </button>
      </div>

      {alert && <AlertCard message={errorMessage} />}
    </main>
  );
};

export default DetailViewCard;
