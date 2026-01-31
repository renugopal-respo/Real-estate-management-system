import React, { useState,useRef } from "react";
import axios from "axios";
import styles from "../AddPropertyForm/AddPropertyForm.module.css";

const AddPropertyForm = () => {
  const fileInputRef = useRef(null);
  const [emptyState,setEmptyState]=useState({
    ownerName: "",
    ownerContact: "",
    ownerEmail: "",
    propertyTitle: "",
    propertyType: "",
    addressLine: "",
    price: 0,
    location: "",
    description: "",
    bedrooms: 0,
    bathrooms: 0,
    area_sqft: 0,
    land_area: 0,
    land_unit: 0,
    road_access: false,
    bhk_type: "",
    status: "",
    amenities: {
      wifi: false,
      CarParking: false,
      furnished: false,
      petFriendly: false,
      security: false,
      '2BHK':false,
      '3BHK':false,
       RoadAcces:false,
       Garden:false,
       Gym:false,

    },
    images: [],
  })
  const [formData, setFormData] = useState(emptyState);

  const [status, setStatus] = useState({ loading: false, message: "", error: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [name]: checked },
    });
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files),
    });
  };
   const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });
   
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "amenities") data.append("amenities", JSON.stringify(value));
        else if (key === "images") value.forEach((img) => data.append("images", img));
        else data.append(key, value);
      });

      const res = await axios.post("http://localhost:5000/admin/addProperties", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus({ loading: false, message: "Property added successfully!", error: false });
      console.log("Server response:", res.data);
      setFormData(emptyState);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus({...status,
        message:err.response.data.message,
        error:true,
        loading:false})
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Add New Property</h2>

        {status.message && (
          <p className={status.error ? styles.error : styles.success}>{status.message}</p>
        )}

        {/* Owner Details */}
        <section className={styles.section}>
          <h3>Owner Details</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Contact Number</label>
              <input
                type="text"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className={styles.section}>
          <h3>Property Details</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Title</label>
              <input
                type="text"
                name="propertyTitle"
                value={formData.propertyTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Address Line</label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className={styles.field}>
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className={styles.field}>
              <label>Area (sqft)</label>
              <input
                type="number"
                name="area_sqft"
                value={formData.area_sqft}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className={styles.field}>
              <label>Land Area</label>
              <input
                type="number"
                step="0.01"
                name="land_area"
                value={formData.land_area}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Land Unit</label>
              <select
                name="land_unit"
                value={formData.land_unit}
                onChange={handleChange}
              >
                <option value="">Select Unit</option>
                <option value="SQFT">SQFT</option>
                <option value="CENT">CENT</option>
                <option value="ACRE">ACRE</option>
              </select>
            </div>

            

            <div className={styles.field}>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className={styles.section}>
          <h3>Amenities</h3>
          <div className={styles.amenities}>
            {Object.keys(formData.amenities).map((amenity) => (
              <label key={amenity} className={styles.checkbox}>
                <input
                  type="checkbox"
                  name={amenity}
                  checked={formData.amenities[amenity]}
                  onChange={handleAmenityChange}
                />
                {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
              </label>
            ))}
          </div>
        </section>
         {/* Images Section */}
        <section className={styles.section}>
          <h3>Property Images</h3>
          <div className={styles.field}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </div>

          {/* ✅ Preview Grid */}
          {formData.images.length > 0 && (
            <div className={styles.previewGrid}>
              {formData.images.map((img, index) => (
                <div key={index} className={styles.previewItem}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      
        <button type="submit" className={styles.submitBtn} disabled={status.loading}>
          {status.loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyForm;
