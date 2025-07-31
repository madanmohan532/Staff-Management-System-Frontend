import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./EditHospitalModal.css";

const EditHospitalModal = ({ hospital, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    ceoName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    kmcNumber: "",
    certificate: null,
    password: "",
    phone: "",
    email: "",
    staffDetails: "",
  });

  useEffect(() => {
    if (hospital) {
      setFormData({
        name: hospital.name || "",
        ceoName: hospital.ceoName || "",
        street: hospital.address?.street || "",
        city: hospital.address?.city || "",
        state: hospital.address?.state || "",
        pincode: hospital.address?.pincode || "",
        kmcNumber: hospital.kmcNumber || "",
        certificate: null, // file upload handled separately
        password: hospital.password || "",
        phone: hospital.contactDetails?.phone || "",
        email: hospital.contactDetails?.email || "",
        staffDetails: (hospital.staffDetails || []).join(", "),
      });
    }
  }, [hospital]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData((prev) => ({ ...prev, certificate: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...hospital,
      name: formData.name,
      ceoName: formData.ceoName,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      kmcNumber: formData.kmcNumber,
      password: formData.password,
      contactDetails: {
        phone: formData.phone,
        email: formData.email,
      },
      staffDetails: formData.staffDetails
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      // You may want to handle certificate upload separately
    };

    onSave(updated);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Edit Hospital</h2>
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <FiX size={24} />
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name<span className="required">*</span>:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Hospital Name"
            />
          </label>

          <label>
            CEO Name:
            <input
              type="text"
              name="ceoName"
              value={formData.ceoName}
              onChange={handleChange}
              placeholder="CEO Name"
            />
          </label>

          <fieldset>
            <legend>Address</legend>
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />
            </label>
            <label>
              Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </label>
          </fieldset>

          <label>
            KMC Number:
            <input
              type="text"
              name="kmcNumber"
              value={formData.kmcNumber}
              onChange={handleChange}
              placeholder="KMC Number"
            />
          </label>

          <label>
            Certificate (upload new):
            <input type="file" name="certificate" onChange={handleChange} />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </label>

          <fieldset>
            <legend>Contact Details</legend>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </label>
          </fieldset>

          <label>
            Staff Details (comma-separated IDs):
            <input
              type="text"
              name="staffDetails"
              value={formData.staffDetails}
              onChange={handleChange}
              placeholder="staff001, staff002, ..."
            />
          </label>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHospitalModal;
