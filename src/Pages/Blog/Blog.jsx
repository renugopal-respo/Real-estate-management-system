import React, { useEffect, useState } from "react";
import PropertyFilterGroup from "../../Components/FilterConTest/FilterContainerTest";
import styles from "./Blog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProperties } from "../../Redux/Slicer";
import InitialCard from "../../Components/Cardgroup/InitialCard/InitialCard";

const Blog = () => {
  const [filtered, setFiltered] = useState({}); 
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // per-page count
  const [totalPages, setTotalPages] = useState(3); 
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.properties);
  console.log("Inside blog page");
  
  const handleFilterChange = (filterData) => {
    setFiltered(filterData);
    console.log("Received filter data:", filterData);
  };

  
  useEffect(() => {
    console.log(`Fetching data for page ${page} with filters:`, filtered);
    
  }, [page, filtered, dispatch]);

  
  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.page}>
    
      <div className={styles.filtercontainer}>
        <PropertyFilterGroup onFilterChange={handleFilterChange} />
      </div>

      
      <main className={styles.main}>
        <InitialCard />
        <InitialCard />
        
      </main>

      
      <div className={styles.pagination}>
        {true ? (
          <button onClick={handleShowMore} className={styles.showMoreBtn}>
            Show More
          </button>
        ) : (
          <p className={styles.endText}>You’ve reached the end</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
