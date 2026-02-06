import React, { useEffect, useState } from "react";
import { propertyapi } from "../../ApiService/axios";
import PropertyFilterGroup from "../../Components/FilterConTest/FilterContainerTest";
import styles from "./Blog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProperties, addToFavorites, deleteProperties } from'../../Redux/Slicer.jsx';
import InitialCard from "../../Components/Cardgroup/InitialCard/InitialCard";
import LoadingCard from '../../Components/LoadingCard/LoadingCard'
import AlertCard from '../../Components/AlertCard/AlertCard'
const Blog = () => {
  const [filtered, setFiltered] = useState({}); 
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // per-page count
  const [totalPages, setTotalPages] = useState(3); 
  const[lodaing,setLoading]=useState(false);
  const[error,setError]=useState(false);
  let errorMessage;
  let status='';
  let type='';
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.properties);
  console.log("From redux:",properties);
  const fetchProperties=async()=>{
    setLoading(true);
    
    try {
      if(filtered.propertyType==='ALL'){
        type='';
        status='';
      }
       if(filtered.propertyType==='BUY'
        ||filtered.propertyType==='RENT'
        ||filtered.propertyType==="SALE"){

           status=filtered.propertyType;
        }

        else{
          type=filtered.propertyType;
        }
      let filters={type:type,
        status:status,
        city:filtered.location,
        price:filtered.price};
      const res=await propertyapi.get('/getPropertiesForCard',{
      params:{
        filters:JSON.stringify(filters),
        page:page
      }
    });
   //console.log(res?.data?.properties);
   const flatProperties = res.data.properties.map(item=>item);
   const favorites=res?.data?.favorites || [];
   console.log("faltted properties:",flatProperties);
   console.log("Favorites:",favorites);
   dispatch(addProperties(flatProperties)); 
   dispatch(addToFavorites(favorites));
    } catch (error) {
       console.log(error);
       setError(true);
       errorMessage=error?.response?.data?.message;
    }
    finally{
      setLoading(false);
    }
  }
  const handleFilterChange = (filterData) => {
    setFiltered(filterData);
    setPage(1);
    console.log("Received filter data:", filterData);
    //set page to 1 and update redux []
  };

  
  useEffect(() => {
     fetchProperties();
  }, [page]);

  
  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.page}>
    
      <div className={styles.filtercontainer}>
        <PropertyFilterGroup onSubmit={handleFilterChange} />
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
      
      {error && <AlertCard message={errorMessage}/>}
    </div>
  );
};

export default Blog;
