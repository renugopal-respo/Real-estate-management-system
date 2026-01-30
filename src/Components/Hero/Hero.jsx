import React from "react";
import styles from "./Hero.module.css";
import heroImg from "../../assets/hero-banner.png";

const Hero = () => {
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
        <button className={styles.heroBtn}>View Properties</button>
      </div>
    </section>
  );
};

export default Hero;
