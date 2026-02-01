import React from "react";
import Select from "react-select";
import styles from "./InputGroup.module.css";

const InputGroup = ({ title, filters, setFilters, onClick }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFilters((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  // Convert arrays into react-select option objects
  const statusOptions = filters.status.map((s) => ({ label: s, value: s }));
  const typeOptions = filters.type.map((t) => ({ label: t, value: t }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title || "Filter Properties"}</h3>

      <div className={styles.filters}>
        {/* Date Input */}
        <input
          type="date"
          className={styles.input}
          name="date"
          value={filters.date}
          onChange={handleChange}
          placeholder="Select date"
        />

        {/* Location Input */}
        <input
          type="text"
          className={styles.input}
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Search by location"
        />

        {/* Status Dropdown */}
        <Select
          className={styles.select}
          name="status"
          placeholder="Select status"
          options={statusOptions}
          value={statusOptions.find((opt) => opt.value === filters.status_name) || null}
          onChange={(selected) => handleSelectChange("status_name", selected)}
        />

        {/* Type Dropdown */}
        <Select
          className={styles.select}
          name="type"
          placeholder="Select property type"
          options={typeOptions}
          value={typeOptions.find((opt) => opt.value === filters.type_name) || null}
          onChange={(selected) => handleSelectChange("type_name", selected)}
        />

        <button
          type="submit"
          className={styles.clearBtn}
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputGroup;
