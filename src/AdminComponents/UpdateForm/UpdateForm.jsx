import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./UpdateForm.module.css";
import { useLocation ,useNavigate} from "react-router-dom";

const UpdateForm = () => {
  const location = useLocation();
  const propertyId = location.state.propertyId;
  const fileInputRef = useRef(null);
  const navigate=useNavigate();
  // ---------- INITIAL FORM STATE ----------
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    type_name: "",
    addressline: "",
    price: "",
    city: "",
    description: "",
    bedromms: "",
    bathromms: "",
    area_sqft: "",
    land_area: "",
    land_unit: "",
    road_acces: false,
    status_name: "",
    amenities: {
      wifi: false,
      parking: false,
      furnished: false,
      petFriendly: false,
      security: false,
      "2BHK": false,
      "3BHK": false,
      RoadAcces: false,
      Garden: false,
      Gym: false,
      road_access: false,
    },
    images: [],
    newImages: [],
  });

  const [status, setStatus] = useState({ loading: false, message: "", error: false });

  // ---------- FETCH EXISTING PROPERTY ----------
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/getPropertyForUpdate`, {
          params: { propertyId },
        });

        const data = res.data;

        const amenitiesState = {
          wifi: false,
          parking: false,
          furnished: false,
          petFriendly: false,
          security: false,
          "2BHK": false,
          "3BHK": false,
          RoadAcces: false,
          Garden: false,
          Gym: false,
          road_access: false,
        };

        data.amenities.forEach((a) => {
          if (a.amenties_name && amenitiesState.hasOwnProperty(a.amenties_name)) {
            amenitiesState[a.amenties_name] = true;
          }
        });

        setFormData({
          user_id:data.property.user_id || "",
          name: data.property.name || "",
          phone: data.property.phone || "",
          email: data.property.email || "",
          title: data.property.title || "",
          type_name: data.property.type_name || "",
          addressline: data.property.addressline || "",
          price: data.property.price || "",
          city: data.property.city || "",
          description: data.property.description || "",
          bedromms: data.property.bedromms || "",
          bathromms: data.property.bathromms || "",
          area_sqft: data.property.area_sqft || "",
          land_area: data.property.land_area || "",
          land_unit: data.property.land_unit || "",
          road_acces: data.property.road_acces === 1,
          status_name: data.property.status_name || "",
          amenities: amenitiesState,
          images: data.images || [],
          newImages: [],
        });

        console.log("Fetched property data:", data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      }
    };
    fetchProperty();
  }, [propertyId]);

  // ---------- HANDLE CHANGES ----------
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

  // ---------- IMAGE HANDLERS ----------
  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, newImages: [...formData.newImages, ...files] });
  };

  const handleRemoveExistingImage = async (index) => {
    const imageToRemove = formData.images[index];
    if (!imageToRemove) return;

    try {
      const res = await axios.delete("http://localhost:5000/admin/deletePropertyImage", {
        data: {
          propertyId,
          image_url: imageToRemove.image_url,
        },
      });

      if (res.status === 200) {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: updatedImages });
        console.log("Image removed successfully:", imageToRemove.image_url);
      } else {
        console.warn("Unexpected response:", res.status);
      }
    } catch (err) {
      console.error("Error removing image:", err.response?.data || err.message);
      alert("Failed to remove image. Please try again.");
    }
  };

  const handleRemoveNewImage = (index) => {
    const updated = [...formData.newImages];
    updated.splice(index, 1);
    setFormData({ ...formData, newImages: updated });
    if (fileInputRef.current && updated.length === 0) fileInputRef.current.value = "";
  };

  // ---------- SUBMIT FORM ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "", error: false });

    try {
      const newdata = new FormData();
      const newAmenties = [];

      formData.newImages.forEach((img) => formData.images.push(img));

      Object.keys(formData.amenities).forEach((key) => {
        if (formData.amenities[key] === true) newAmenties.push(key);
      });

      newdata.append("propertyId", propertyId);

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "amenities") newdata.append("amenities", JSON.stringify(newAmenties));
        else if (key === "images") value.forEach((img) => newdata.append("images", img));
        else newdata.append(key, value);
      });

      await axios.put(`http://localhost:5000/admin/updateProperty/`, newdata);

      setStatus({ loading: false, message: "Property updated successfully!", error: false });
      setTimeout(()=>{
        navigate(-1);
      },3000);
    } catch (err) {
      console.error("Update failed:", err);
      setStatus({
        loading: false,
        message: "Failed to update property. Please try again.",
        error: true,
      });
    }
  };

  // ---------- UI ----------
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Update Property</h2>

        {status.message && (
          <p className={status.error ? styles.error : styles.success}>{status.message}</p>
        )}

        {/* ======= Owner Details ======= */}
        <section className={styles.section}>
          <h3>Owner Details</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Owner Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>Contact Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* ======= Property Details ======= */}
        <section className={styles.section}>
          <h3>Property Details</h3>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className={styles.field}>
              <label>Type</label>
              <select name="type_name" value={formData.type_name} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Address Line</label>
              <input type="text" name="addressline" value={formData.addressline} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Bedrooms</label>
              <input type="number" name="bedromms" value={formData.bedromms} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Bathrooms</label>
              <input type="number" name="bathromms" value={formData.bathromms} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Area (sqft)</label>
              <input type="number" name="area_sqft" value={formData.area_sqft} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Land Area</label>
              <input type="number" name="land_area" value={formData.land_area} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label>Land Unit</label>
              <select name="land_unit" value={formData.land_unit} onChange={handleChange}>
                <option value="">Select</option>
                <option value="SQFT">SQFT</option>
                <option value="CENT">CENT</option>
                <option value="ACRE">ACRE</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Status</label>
              <select name="status_name" value={formData.status_name} onChange={handleChange}>
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

        {/* ======= Amenities ======= */}
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

        {/* ======= Existing Images ======= */}
        <section className={styles.section}>
          <h3>Existing Images</h3>
          <div className={styles.imageGrid}>
            {formData.images.length > 0 ? (
              formData.images.map((img, idx) => (
                <div key={idx} className={styles.imagePreview}>
                  <img src={`http://localhost:5000/${img.image_url}`} alt={`Property ${idx}`} />
                  <button
                    type="button"
                    className={styles.imgRemoveButon}
                    onClick={() => handleRemoveExistingImage(idx)}
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
          </div>
        </section>

        {/* ======= Add New Images ======= */}
        <section className={styles.section}>
          <h3>Add New Images</h3>
          <div className={styles.field}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleNewImageUpload}
              ref={fileInputRef}
            />
            {formData.newImages.length > 0 && (
              <ul className={styles.previewList}>
                {formData.newImages.map((val, idx) => (
                  <li key={idx}>
                    <span>{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveNewImage(idx)}>
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ======= Submit Button ======= */}
        <button type="submit" className={styles.submitBtn} disabled={status.loading}>
          {status.loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
