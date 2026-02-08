import React from "react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/hero-banner.png";
import { Navigate,useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate=useNavigate();
  return (
    <section className={styles.hero}>
      <div className={styles.heroImage}>
        <img src={heroImg} alt="Dream Home" />
      </div>

      <div className={styles.heroContent}>
        <h1>Find Your Perfect Home</h1>
        <p>
          Explore exclusive listings with comfort, luxury, and locations that suit your lifestyle.
        </p>
        <div className={styles.buttoncontainer}>

            <button className={styles.heroBtnForAddProperty}
          onClick={()=>navigate('/contactformforaddproperty')}>
          Add Properties
        </button>

         <button className={styles.heroBtn}
        onClick={()=>navigate('/blog')}>
          View Properties
          </button>
        </div>
       

      </div>
    </section>
  );
};

export default Hero;
