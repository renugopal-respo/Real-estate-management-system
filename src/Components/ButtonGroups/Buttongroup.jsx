import { useContext, useEffect, useState } from "react";
import styles from "./Buttongroup.module.css";
import { PropertyContext } from "../../Contextapi/Propertycontext";

const Buttongroup = () => {
  const { properties = [], setPropertyType, propertyType } = useContext(PropertyContext);
  const [isActive, setIsActive] = useState(0);

  // 🔹 Default to “ALL” on first load
  useEffect(() => {
    if (properties.length > 0) {
      setIsActive(0);
      setPropertyType("ALL");
      console.log("Initialized default type → ALL");
    }
  }, [properties, setPropertyType]);

  const handleClick = (index) => {
    const selectedType = properties[index];
    setIsActive(index);
    setPropertyType(selectedType);
    console.log("Selected type:", selectedType);
  };

  return (
    <div className={styles.container}>
      {properties.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          className={index === isActive ? styles.isActive : styles.notActive}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Buttongroup;
