import React from "react";
import styles from "./About.module.css";
import aboutImg from "../../assets/house.png"; // change path if needed

const About = () => {
  return (
    <section className={styles.aboutPage}>
      {/* Top Hero Section */}
      <div className={styles.aboutHero}>
        <div className={styles.heroText}>
          <h1>About RealEstateHub</h1>
          <p>
            We’re committed to helping you find your perfect home — whether it’s
            a cozy apartment or a luxury villa. Our mission is to make property
            buying and renting transparent, easy, and accessible to everyone.
          </p>
        </div>
        <div className={styles.heroImage}>
          <img src={aboutImg} alt="About RealEstateHub" />
        </div>
      </div>

      {/* Vision, Mission, Values */}
      <div className={styles.infoSection}>
        <h2>Who We Are</h2>
        <p className={styles.introText}>
          RealEstateHub is a modern real-estate platform that connects buyers,
          sellers, and agents with verified listings, data insights, and
          trustworthy support. We believe finding a home should be exciting, not
          stressful.
        </p>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Our Vision</h3>
            <p>
              To revolutionize the real estate industry with technology,
              reliability, and trust — making every home search a seamless
              journey.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Our Mission</h3>
            <p>
              To provide users with verified listings, expert guidance, and
              transparent property insights across all major cities.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Our Focus</h3>
            <p>
              Quality service, honest communication, and ensuring every client
              finds a home that matches their lifestyle and budget.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Team Section */}
      <div className={styles.teamSection}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>Ravi Kumar</h4>
            <p>Founder & CEO</p>
          </div>
          <div className={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>Anita Sharma</h4>
            <p>Lead Property Consultant</p>
          </div>
          <div className={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h4>Arun Prakash</h4>
            <p>Marketing Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
