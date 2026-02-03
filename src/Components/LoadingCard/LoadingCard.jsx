import React from 'react';
import styles from './LoadingCard.module.css';

const LoadingCard = ({ message = 'Loading...', height = '120px', width = '100%' }) => {
  return (
    <div className={styles.container}>
        <div className={styles.card}>
      <div className={styles.spinner} aria-label="Loading"></div>
      <div className={styles.message}>please wait...</div>
    </div> </div>
    
  );
};

export default LoadingCard;
