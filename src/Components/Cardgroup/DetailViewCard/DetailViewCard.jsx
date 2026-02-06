import React, { useEffect, useState } from "react";
import styles from "./DetailViewCard.module.css";
import {
  FaWifi,
  FaCar,
  FaWater,
  FaCouch,
  FaFan,
  FaUsers,
} from "react-icons/fa";
import {
  MdSecurity,
  MdOutlineKitchen,
  MdPets,
  MdKingBed,
} from "react-icons/md";
import InitialCard from "../InitialCard/InitialCard";
import { useLocation } from "react-router-dom";
import { propertyapi } from "../../../ApiService/axios";
import AlertCard from "../../AlertCard/AlertCard";

const DetailViewCard = () => {
  const { state } = useLocation();
  const { property = {} } = state || {};
  const [propertyData, setPropertyData] = useState(null);
  const [related, setRelated] = useState([]);
  const [alert, setAlert] = useState(false);

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
      console.log(response.data);
      setRelated(relatedProperties || []);
    } catch (error) {
      console.error("Error fetching details:", error);
      setAlert(true);
    }
  };

  if (!propertyData) return <p>Loading property details...</p>;

  const { type_name, amenities = [] } = propertyData;

  const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", ];
  const sharingOptions = ["Single Sharing", "Double Sharing", "Triple Sharing"];

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
        <h2>{propertyData.title}</h2>
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
        <p><b>Area:</b> {propertyData.area_sqft} sqft</p>
        <p><b>Owner:</b> {propertyData.owner_name} ({propertyData.owner_phone})</p>
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
      </div>

    
      <section className={styles.relatedProperties}>
        <h3>Related Properties</h3>
        {related.length >= 0 ? (
          <div className={styles.relatedGrid}>
            <InitialCard related={related}/>
          </div>
        ) : (
          <p>No related properties found.</p>
        )}
      </section>

      
      <div className={styles.buttoncontainer}>
        <button>Save</button>
        <button>Cancel</button>
      </div>

      {alert && <AlertCard />}
    </main>
  );
};

export default DetailViewCard;
