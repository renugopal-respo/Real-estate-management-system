import React, { useContext, useEffect, useState } from "react";
import Filtercontainer from "../../Components/FilterContainer/Filtercontainer";
import styles from './Blog.module.css';
import { PropertyContext } from "../../Contextapi/Propertycontext";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, addProperties } from "../../Redux/Slicer";
import InitialCard from "../../Components/Cardgroup/InitialCard/InitialCard";

const Blog = () => {
  const arr = useContext(PropertyContext);
  const [filtered, setFiltered] = useState({});
  const [initialrender, setInitialrender] = useState(false);
  const page = useSelector(state => state.properties.page);
  const dispatch = useDispatch();
  const properties = useSelector(state => state.properties.properties);

  const handleClick = () => {
    const data = { property_id: 1, type: 'villa' };
    dispatch(addProperties({ data: [data] }));
    if (arr.price !== "") {
      setFiltered({ price: arr.price });
    } else if (arr.propertyType !== "") {
      setFiltered({ ...filtered, propertyType: arr.propertyType });
    } else if (arr.location !== "") {
      setFiltered({ ...filtered, location: arr.location });
    }
    console.log(properties);
    
  };
console.log(page);
  useEffect(() => {
    // initial render
    console.log("heloo")
  }, [initialrender]);

  useEffect(()=>{
    //pagination render
  },[page]);

  return (
    <div className={styles.page}>
      

      <div className={styles.filtercontainer}>
        <Filtercontainer />
        <button type="button" onClick={handleClick}>Click</button>
      </div>

      <main className={styles.main}>
        <InitialCard />
        <InitialCard/>
        {/* Map through properties here */}
      </main>

      <div className={styles.pagination}>
        
        <button onClick={() => dispatch(nextPage())}>Show more</button>
      </div>
    </div>
  );
};

export default Blog;
