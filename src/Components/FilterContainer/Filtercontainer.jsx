import React from 'react'
import FilterButtongroup from '../FilterButtongroup/FilterButtongroup'
import Buttongroup from '../ButtonGroups/Buttongroup'
import styles from './Filtercontainer.module.css'
const Filtercontainer = () => {
    
  return (
    <div >
      <div className={styles.Buttongroup}>
            <Buttongroup/>
      </div>
       
        <FilterButtongroup/>   
    </div>
  )
}

export default Filtercontainer