// AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import "./AdminProfile.css";

const AdminProfile = ({ adminData, onUpdate }) => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [uniqueVerificationId, setUniqueVerificationId] = useState("");

  // State for password fields
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // UI state
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Effect to load admin data when the component mounts or data changes
  useEffect(() => {
    if (adminData) {
      setFirstName(adminData.firstName || "");
      setLastName(adminData.lastName || "");
      setPhone(adminData.contactDetails?.phone || "");
      setEmail(adminData.contactDetails?.email || "");
      setStreet(adminData.address?.street || "");
      setCity(adminData.address?.city || "");
      setState(adminData.address?.state || "");
      setPincode(adminData.address?.pincode || "");
      setUniqueVerificationId(adminData.unique_verification_id || "");

      // Reset editing-related state
      setCurrentPasswordInput("");
      setNewPassword("");
      setConfirmNewPassword("");
      setMessage("");
      setErrors({});
    }
  }, [adminData]);

  // Client-side form validation function
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    // Check for empty fields
    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!phone.trim()) newErrors.phone = "Phone Number is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!street.trim()) newErrors.street = "Street is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required.";

    // Check formats
    if (email.trim() && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (phone.trim() && !phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (pincode.trim() && !pincodeRegex.test(pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }

    // Password-related validations
    if (newPassword || confirmNewPassword) {
      if (!currentPasswordInput) {
        newErrors.currentPasswordInput =
          "Current password is required to change password.";
      }
      if (newPassword !== confirmNewPassword) {
        newErrors.confirmNewPassword =
          "New password and confirm password do not match.";
      }
      if (newPassword.length > 0 && newPassword.length < 8) {
        newErrors.newPassword = "New password must be at least 8 characters.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    // Run client-side validation
    if (!validateForm()) {
      setMessage("Please correct the errors in the form. ❌");
      return;
    }

    // IMPORTANT SECURITY NOTE: In a real-world app, password validation and comparison
    // must be done on the backend. This front-end code only checks if the fields are
    // filled correctly and that the new passwords match. The server is responsible
    // for verifying the `currentPasswordInput` against the hashed password.
    const payload = {
      firstName,
      lastName,
      contactDetails: {
        phone,
        email,
      },
      address: {
        street,
        city,
        state,
        pincode,
      },
    };

    if (newPassword && newPassword === confirmNewPassword) {
      payload.newPassword = newPassword;
      payload.currentPassword = currentPasswordInput; // Send to server for validation
    }

    try {
      const response = await axios.put(
        `http://localhost:9999/admin-service/api/admin/admin/${adminData._id}`,
        payload
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully! ✅");
        setIsEditing(false);
        setCurrentPasswordInput("");
        setNewPassword("");
        setConfirmNewPassword("");
        if (onUpdate) onUpdate(response.data);
      } else {
        setMessage("Failed to update profile. Please check your inputs. ❌");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
      if (error.response?.status === 401) {
        setMessage("Incorrect current password. Please try again. 🔒");
        setErrors({ currentPasswordInput: "Incorrect current password." });
      } else {
        setMessage("Error updating profile. Please try again later. ⚠️");
      }
    }
  };

  const handleCancel = () => {
    // Reset state to original values from adminData
    if (adminData) {
      setFirstName(adminData.firstName || "");
      setLastName(adminData.lastName || "");
      setPhone(adminData.contactDetails?.phone || "");
      setEmail(adminData.contactDetails?.email || "");
      setStreet(adminData.address?.street || "");
      setCity(adminData.address?.city || "");
      setState(adminData.address?.state || "");
      setPincode(adminData.address?.pincode || "");
    }
    // Reset password and UI states
    setCurrentPasswordInput("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsEditing(false);
    setMessage("");
    setErrors({});
  };

  const handleLogout = () => {
    // NOTE: In a real app, this should clear auth tokens and redirect securely.
    localStorage.clear();
    // Using a custom modal instead of alert()
    // alert("Logging out...");
    window.location.href = "/";
  };

  return (
    <div className="admin-profile-card">
      <h2 className="card-title">Admin Profile</h2>

      {!isEditing && (
        <div className="card-header-actions">
          <div
            className="action-icon-wrapper"
            onClick={() => setIsEditing(true)}
            title="Edit Profile"
          >
            <FaEdit className="edit-icon" />
          </div>
          <div
            className="action-icon-wrapper"
            onClick={handleLogout}
            title="Logout"
          >
            <FaSignOutAlt className="logout-icon" />
          </div>
        </div>
      )}

      {/* Main Profile View (Non-editable) */}
      <div className="profile-display">
        <form className="display-form">
          <div className="form-layout-grid">
            <div className="form-field-group">
              <label>First Name</label>
              <input type="text" value={firstName} disabled />
            </div>
            <div className="form-field-group">
              <label>Last Name</label>
              <input type="text" value={lastName} disabled />
            </div>
            <div className="form-field-group">
              <label>Phone</label>
              <input type="text" value={phone} disabled />
            </div>
            <div className="form-field-group">
              <label>Email</label>
              <input type="email" value={email} disabled />
            </div>
            <div className="form-field-group--full-width">
              <label>Street</label>
              <input type="text" value={street} disabled />
            </div>
            <div className="form-field-group">
              <label>City</label>
              <input type="text" value={city} disabled />
            </div>
            <div className="form-field-group">
              <label>State</label>
              <input type="text" value={state} disabled />
            </div>
            <div className="form-field-group">
              <label>Pincode</label>
              <input type="text" value={pincode} disabled />
            </div>
            <div className="form-field-group">
              <label>Password</label>
              <input type="password" value="********" disabled />
            </div>
          </div>
        </form>
      </div>

      {/* Edit Panel (Sliding from Right) */}
      <div
        className={`profile-edit-panel ${
          isEditing ? "profile-edit-panel--open" : ""
        }`}
      >
        <div className="edit-panel-header">
          <h3>Edit Profile</h3>
          <FaTimes
            className="close-icon"
            onClick={handleCancel}
            title="Cancel"
          />
        </div>
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-layout-grid">
            <div className="form-field-group">
              <label>ID</label>
              <input type="text" value={adminData?.id || ""} disabled />
            </div>
            <div className="form-field-group">
              <label>Verification ID</label>
              <input
                type="text"
                value={adminData.uniqueVerificationId}
                disabled
              />
            </div>

            <div className="form-field-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Enter current password"
              />
              {errors.currentPasswordInput && (
                <p className="field-error">{errors.currentPasswordInput}</p>
              )}
            </div>
            <div className="form-field-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <p className="field-error">{errors.newPassword}</p>
              )}
            </div>
            <div className="form-field-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              {errors.confirmNewPassword && (
                <p className="field-error">{errors.confirmNewPassword}</p>
              )}
            </div>

            <div className="form-field-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="field-error">{errors.firstName}</p>
              )}
            </div>
            <div className="form-field-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="field-error">{errors.lastName}</p>
              )}
            </div>
            <div className="form-field-group">
              <label>Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
            <div className="form-field-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className="form-field-group--full-width">
              <label>Street</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              {errors.street && <p className="field-error">{errors.street}</p>}
            </div>
            <div className="form-field-group">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <p className="field-error">{errors.city}</p>}
            </div>
            <div className="form-field-group">
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              {errors.state && <p className="field-error">{errors.state}</p>}
            </div>
            <div className="form-field-group">
              <label>Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              {errors.pincode && (
                <p className="field-error">{errors.pincode}</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">
              Save Changes
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
        {message && <p className="status-alert">{message}</p>}
      </div>
    </div>
  );
};

export default AdminProfile;
