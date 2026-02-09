import React, { useState } from 'react'
import styles from './Alert.module.css'
import { FaExclamationCircle } from 'react-icons/fa'
const AlertCard = ({message='Error'}) => {
  const[close,setClose]=useState(true);
  const handleClose=(e)=>{
    e.preventDefault();
    setClose(prev=>!prev);
  }
  return (
     <div className={styles.container}>
      { close && 
       <div className={styles.card}>
           <div className={styles.icon} aria-label="Loading">
            <FaExclamationCircle style={{fontSize:'2rem' ,color:"rgba(198, 0, 0, 0.95)"}}/>
            </div>
           <div className={styles.message}>{message}</div>
           <button className={styles.closeBtn} 
           onClick={handleClose}>
            close
            </button>
         </div> 
         }
            
         </div> 
         
  )
}

export default AlertCard