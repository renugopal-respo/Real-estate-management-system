import React from "react";
import styles from "./DetailViewCard.module.css";
import { FaWifi, FaCar, FaWater, FaCouch, FaFan } from "react-icons/fa";
import { MdSecurity, MdOutlineKitchen, MdPets } from "react-icons/md";
import InitialCard from "../InitialCard/InitialCard";
import { useEffect ,useState} from "react";

const DetailViewCard = ({ data }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(()=>{
    //checklocalstorage and property and amenties with type
    
  },[])

 /* useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when near top (scrollY < 50)
      if (currentScrollY < 50) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  */
  return (
    <main className={styles.container}>
      {/* Image Carousel Section */}
      <div className={styles.imgflex}>
        <img
          src="http://localhost:5000/uploads/house1/Gemini_Generated_Image_470i1o470i1o470i.png"
          alt="Apartment"
        />
        <img
          src="http://localhost:5000/uploads/house1/Gemini_Generated_Image_470i1o470i1o470i.png"
          alt="Apartment"
        />
        <img
          src="http://localhost:5000/uploads/house1/Gemini_Generated_Image_470i1o470i1o470i.png"
          alt="Apartment"
        />
        <img
          src="http://localhost:5000/uploads/house1/Gemini_Generated_Image_470i1o470i1o470i.png"
          alt="Apartment"
        />
      </div>

      {/* Property  Details By Type */}
      <div className={styles.details}>
        <div className={styles.bhk}>
          <p>1 BHK</p>
          <p>2 BHK</p>
          <p>3 BHK</p>
        </div>

        {/* Amenities Grid */}
        <div className={styles.amenities}>
          <div className={styles.amenity}>
            <FaWifi /> <span>Wi-Fi</span>
          </div>
          <div className={styles.amenity}>
            <FaCar /> <span>Parking</span>
          </div>
          <div className={styles.amenity}>
            <FaWater /> <span>Water Supply</span>
          </div>
          <div className={styles.amenity}>
            <MdSecurity /> <span>Security</span>
          </div>
          <div className={styles.amenity}>
            <FaCouch /> <span>Furnished</span>
          </div>
          <div className={styles.amenity}>
            <MdOutlineKitchen /> <span>Modular Kitchen</span>
          </div>
          <div className={styles.amenity}>
            <FaFan /> <span>Air Ventilation</span>
          </div>
          <div className={styles.amenity}>
            <MdPets /> <span>Pet Friendly</span>
          </div>
        </div>
      </div>

      {/* ✅ Related Properties Section */}
      <div className={styles.relatedProperties}>
        <h3>Related Properties</h3>
        <div className={styles.relatedGrid}>
          <InitialCard />
          <InitialCard />
          <InitialCard />
          <InitialCard />
        </div>
      </div>
       <div
      className={`${styles.buttoncontainer} 
      }`}
    >
  <button>Save</button>
  <button>Cancel</button>
</div>

    </main>
  );
};

export default DetailViewCard;
