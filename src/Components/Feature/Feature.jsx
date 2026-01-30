import React from "react";
import styles from "./Feature.module.css";
import handShake from "../../assets/service-3.png";
import house from "../../assets/service-1.png";
import money from "../../assets/service-2.png";

const Feature = () => {
  return (
    <section className={styles.features}>
      <h2>Why Choose Us?</h2>

      <div className={styles.featureContainer}>
        <div className={styles.featureCard}>
          <img src={house} alt="Verified Properties" />
          <div>
            <h3>Verified Properties</h3>
            <p>Every property is verified for authenticity and safety.</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <img src={money} alt="Wide Selection" />
          <div>
            <h3>Wide Selection</h3>
            <p>From luxury villas to cozy apartments — we’ve got it all.</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <img src={handShake} alt="Trusted Agents" />
          <div>
            <h3>Trusted Agents</h3>
            <p>Work with experienced agents who understand your needs.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
