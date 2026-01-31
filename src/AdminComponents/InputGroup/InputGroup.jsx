import React, { useState } from 'react';
import styles from './InputGroup.module.css';

const InputGroup = ({ getFilters,title }) => {
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    status: "",
    propertyId: ""
  });
  const newTitle=title || " ";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    getFilters(filters);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filter Properties</h3>

      <div className={styles.filters}>
        {Object.keys(filters).map((key) => (
          key === "date" ? (
            <input
              key={key}
              type="date"
              className={styles.input}
              name={key}
              value={filters[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
            />
          ) : (
            <input
              key={key}
              type="text"
              className={styles.input}
              name={key}
              value={filters[key]}
              onChange={handleChange}
              placeholder={`Search by ${key}`}
            />
          )
        ))}

        <button
          type="submit"
          className={styles.clearBtn}
          onClick={handleClick}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default InputGroup;
