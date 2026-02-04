import React from "react";
import Select from "react-select";
import styles from "./InputGroup.module.css";

const InputGroup = ({ title = "Input Group", filters = {}, setFilters, onClick }) => {
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
    if (onClick) onClick();
  };

  
  const statusOptions = Array.isArray(filters.statusOptions)
    ? filters.statusOptions.map((s) => ({ label: s, value: s }))
    : [];

  const typeOptions = Array.isArray(filters.typeOptions)
    ? filters.typeOptions.map((t) => ({ label: t, value: t }))
    : [];

  const propertyStatusOptions = Array.isArray(filters.propertyStatusOptions)
    ? filters.propertyStatusOptions.map((p) => ({ label: p, value: p }))
    : [];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title || "Filter Properties"}</h3>

      <div className={styles.filters}>
        {/*  Date Input (only if applicable) */}
        {"date" in filters && (
          <input
            type="date"
            className={styles.input}
            name="date"
            value={filters.date || ""}
            onChange={handleChange}
            placeholder="Select date (From)"
          />
        )}

        {/* Location Input */}
        {"location" in filters && (
          <input
            type="text"
            className={styles.input}
            name="location"
            value={filters.location || ""}
            onChange={handleChange}
            placeholder="Search by location"
          />
        )}

        {/* Conditional Status Dropdown */}
        {statusOptions.length > 0 && (
          <Select
            className={styles.select}
            name="status"
            placeholder="Select status"
            options={statusOptions}
            value={
              statusOptions.find((opt) => opt.value === filters.status) || null
            }
            onChange={(selected) => handleSelectChange("status", selected)}
          />
        )}

        {/*  Conditional Type Dropdown */}
        {typeOptions.length > 0 && (
          <Select
            className={styles.select}
            name="type"
            placeholder="Select property type"
            options={typeOptions}
            value={
              typeOptions.find((opt) => opt.value === filters.type) || null
            }
            onChange={(selected) => handleSelectChange("type", selected)}
          />
        )}

        {/*  Conditional Property Status Dropdown */}
        {propertyStatusOptions.length > 0 && (
          <Select
            className={styles.select}
            name="propertyStatus"
            placeholder="Select property status"
            options={propertyStatusOptions}
            value={
              propertyStatusOptions.find(
                (opt) => opt.value === filters.propertyStatus
              ) || null
            }
            onChange={(selected) => handleSelectChange("propertyStatus", selected)}
          />
        )}

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
