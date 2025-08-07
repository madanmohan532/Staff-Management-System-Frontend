// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTimes, FaSignOutAlt, FaKey } from "react-icons/fa"; // Added FaKey
// import axios from "axios";
// import ChangePasswordModal from "./ChangePasswordModal"; // Import the new modal
// import "./NurseProfile.css"; // Dedicated CSS for Nurse Profile

// const NurseProfile = ({ nurseData, onUpdate }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [street, setStreet] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [skills, setSkills] = useState("");
//   const [yearOfExperience, setYearOfExperience] = useState("");
//   const [selfDescription, setSelfDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false); // New state for password modal

//   useEffect(() => {
//     if (nurseData) {
//       setFirstName(nurseData.firstName || "");
//       setLastName(nurseData.lastName || "");
//       setPhone(nurseData.contactDetails?.phone || "");
//       setEmail(nurseData.contactDetails?.email || "");
//       setStreet(nurseData.address?.street || "");
//       setCity(nurseData.address?.city || "");
//       setState(nurseData.address?.state || "");
//       setPincode(nurseData.address?.pincode || "");
//       setSkills(nurseData.skills?.join(", ") || "");
//       setYearOfExperience(nurseData.yearOfExperience || "");
//       setSelfDescription(nurseData.selfDescription || "");

//       setMessage("");
//     }
//   }, [nurseData]);

//   // Effect to control body scrolling - Important for modal
//   useEffect(() => {
//     if (isEditing || showPasswordModal) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     // Cleanup function
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isEditing, showPasswordModal]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setMessage("Updating...");

//     const payload = {
//       firstName,
//       lastName,
//       contactDetails: {
//         phone,
//         email,
//       },
//       address: {
//         street,
//         city,
//         state,
//         pincode,
//       },
//       skills: skills
//         .split(",")
//         .map((s) => s.trim())
//         .filter((s) => s),
//       yearOfExperience: Number(yearOfExperience),
//       selfDescription,
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:9999/staff-service/api/nurse/updateNurse/${nurseData._id}`,
//         payload
//       );

//       if (response.status === 200) {
//         setMessage("Profile updated successfully!");
//         setIsEditing(false);
//         if (onUpdate) onUpdate(response.data);
//       } else {
//         setMessage("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error.response?.data || error);
//       setMessage("Error updating profile. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     // Revert to original data
//     setFirstName(nurseData.firstName || "");
//     setLastName(nurseData.lastName || "");
//     setPhone(nurseData.contactDetails?.phone || "");
//     setEmail(nurseData.contactDetails?.email || "");
//     setStreet(nurseData.address?.street || "");
//     setCity(nurseData.address?.city || "");
//     setState(nurseData.address?.state || "");
//     setPincode(nurseData.address?.pincode || "");
//     setSkills(nurseData.skills?.join(", ") || "");
//     setYearOfExperience(nurseData.yearOfExperience || "");
//     setSelfDescription(nurseData.selfDescription || "");

//     setIsEditing(false);
//     setMessage("");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("nurseId");
//     window.location.href = "/login"; // Adjust this to your login route
//   };

//   const handlePasswordChangeSuccess = (msg) => {
//     setMessage(msg); // Display success message from password modal
//     setShowPasswordModal(false);
//   };

//   if (!nurseData) {
//     return (
//       <div className="profile-container">
//         <h2 className="profile-title">Nurse Profile</h2>
//         <p className="loading-message">Loading nurse profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2 className="profile-title">Nurse Profile</h2>

//       {/* Action icons (Edit and Logout) */}
//       {!isEditing && (
//         <div className="profile-actions-header">
//           <div
//             className="edit-icon-container"
//             onClick={() => setIsEditing(true)}
//             aria-label="Edit Profile"
//             tabIndex="0"
//             role="button"
//           >
//             <FaEdit className="edit-icon" />
//           </div>
//           <div
//             className="logout-icon-container"
//             onClick={handleLogout}
//             aria-label="Logout"
//             tabIndex="0"
//             role="button"
//           >
//             <FaSignOutAlt className="logout-icon" />
//           </div>
//         </div>
//       )}

//       {/* Main Profile View (Non-editable) */}
//       <div className="profile-form-wrapper">
//         <form className="profile-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>First Name</label>
//               <input type="text" value={firstName} disabled />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input type="text" value={lastName} disabled />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input type="text" value={phone} disabled />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input type="email" value={email} disabled />
//             </div>
//             <div className="form-group full-width">
//               <label>Skills</label>
//               <input type="text" value={skills} disabled />
//             </div>
//             <div className="form-group">
//               <label>Years of Experience</label>
//               <input type="text" value={yearOfExperience} disabled />
//             </div>
//             <div className="form-group full-width">
//               <label>Self Description</label>
//               <textarea value={selfDescription} disabled rows="3"></textarea>
//             </div>
//             <div className="form-group full-width">
//               <label>Street</label>
//               <input type="text" value={street} disabled />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input type="text" value={city} disabled />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input type="text" value={state} disabled />
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input type="text" value={pincode} disabled />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" value="********" disabled />
//             </div>
//           </div>
//           {/* New Change Password Button */}
//           <div className="change-password-btn-container">
//             <button
//               type="button"
//               className="change-password-btn"
//               onClick={() => setShowPasswordModal(true)}
//             >
//               <FaKey className="icon-left" /> Change Password
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Edit Panel (Modal) */}
//       <div className={`edit-panel ${isEditing ? "open" : ""}`}>
//         <div className="edit-panel-content">
//           <div className="edit-panel-header">
//             <h3>Edit Profile</h3>
//             <FaTimes
//               className="close-icon"
//               onClick={handleCancel}
//               aria-label="Close edit panel"
//               role="button"
//               tabIndex="0"
//             />
//           </div>
//           <form onSubmit={handleUpdate} className="profile-form edit-form">
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Nurse ID</label>
//                 <input type="text" value={nurseData?._id || ""} disabled />
//               </div>
//               <div className="form-group">
//                 <label>Hospital ID</label>
//                 <input
//                   type="text"
//                   value={nurseData?.hospitalId || ""}
//                   disabled
//                 />
//               </div>
//               <div className="form-group">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Phone</label>
//                 <input
//                   type="text"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="form-group full-width">
//                 <label>Skills (comma-separated)</label>
//                 <input
//                   type="text"
//                   value={skills}
//                   onChange={(e) => setSkills(e.target.value)}
//                   placeholder="e.g., ICU, Pediatrics, ER"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Years of Experience</label>
//                 <input
//                   type="number"
//                   value={yearOfExperience}
//                   onChange={(e) => setYearOfExperience(e.target.value)}
//                 />
//               </div>
//               <div className="form-group full-width">
//                 <label>Self Description</label>
//                 <textarea
//                   value={selfDescription}
//                   onChange={(e) => setSelfDescription(e.target.value)}
//                   rows="4"
//                 ></textarea>
//               </div>
//               <div className="form-group full-width">
//                 <label>Street</label>
//                 <input
//                   type="text"
//                   value={street}
//                   onChange={(e) => setStreet(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>City</label>
//                 <input
//                   type="text"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>State</label>
//                 <input
//                   type="text"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Pincode</label>
//                 <input
//                   type="text"
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="profile-actions">
//               <button type="submit" className="save-btn">
//                 Save Changes
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="cancel-btn"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//           {message && <p className="status-message">{message}</p>}
//         </div>
//       </div>

//       {/* Render ChangePasswordModal */}
//       {showPasswordModal && nurseData && (
//         <ChangePasswordModal
//           nurseId={nurseData._id}
//           onClose={() => setShowPasswordModal(false)}
//           onPasswordChangeSuccess={handlePasswordChangeSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default NurseProfile;

import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaSignOutAlt, FaKey } from "react-icons/fa";
import axios from "axios";
import ChangePasswordModal from "./ChangePasswordModal";
import "./NurseProfile.css";

const NurseProfile = ({ nurseData, onUpdate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [skills, setSkills] = useState("");
  const [yearOfExperience, setYearOfExperience] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (nurseData) {
      setFirstName(nurseData.firstName || "");
      setLastName(nurseData.lastName || "");
      setPhone(nurseData.contactDetails?.phone || "");
      setEmail(nurseData.contactDetails?.email || "");
      setStreet(nurseData.address?.street || "");
      setCity(nurseData.address?.city || "");
      setState(nurseData.address?.state || "");
      setPincode(nurseData.address?.pincode || "");
      setSkills(nurseData.skills?.join(", ") || "");
      setYearOfExperience(nurseData.yearOfExperience || "");
      setSelfDescription(nurseData.selfDescription || "");

      setMessage("");
    }
  }, [nurseData]);

  useEffect(() => {
    if (isEditing || showPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isEditing, showPasswordModal]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("Updating...");

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
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      yearOfExperience: Number(yearOfExperience),
      selfDescription,
    };

    try {
      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/updateNurse/${nurseData._id}`,
        payload
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        if (onUpdate) onUpdate(response.data);
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      setMessage("Error updating profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setFirstName(nurseData.firstName || "");
    setLastName(nurseData.lastName || "");
    setPhone(nurseData.contactDetails?.phone || "");
    setEmail(nurseData.contactDetails?.email || "");
    setStreet(nurseData.address?.street || "");
    setCity(nurseData.address?.city || "");
    setState(nurseData.address?.state || "");
    setPincode(nurseData.address?.pincode || "");
    setSkills(nurseData.skills?.join(", ") || "");
    setYearOfExperience(nurseData.yearOfExperience || "");
    setSelfDescription(nurseData.selfDescription || "");

    setIsEditing(false);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("nurseId");
    window.location.href = "/login";
  };

  const handlePasswordChangeSuccess = (msg) => {
    setMessage(msg);
    setShowPasswordModal(false);
  };

  if (!nurseData) {
    return (
      <div className="nurse-profile">
        <h2 className="nurse-profile__title">Nurse Profile</h2>
        <p className="nurse-profile__loading-message">
          Loading nurse profile...
        </p>
      </div>
    );
  }

  return (
    <div className="nurse-profile">
      <h2 className="nurse-profile__title">Nurse Profile</h2>

      {!isEditing && (
        <div className="nurse-profile__actions-header">
          <div
            className="nurse-profile__icon-container"
            onClick={() => setIsEditing(true)}
            aria-label="Edit Profile"
            tabIndex="0"
            role="button"
          >
            <FaEdit className="nurse-profile__edit-icon" />
          </div>
          <div
            className="nurse-profile__icon-container"
            onClick={handleLogout}
            aria-label="Logout"
            tabIndex="0"
            role="button"
          >
            <FaSignOutAlt className="nurse-profile__logout-icon" />
          </div>
        </div>
      )}

      <div className="nurse-profile__form-wrapper">
        <form className="nurse-profile__form">
          <div className="nurse-profile__form-grid">
            <div className="nurse-profile__form-group">
              <label>First Name</label>
              <input type="text" value={firstName} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Last Name</label>
              <input type="text" value={lastName} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Phone</label>
              <input type="text" value={phone} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Email</label>
              <input type="email" value={email} disabled />
            </div>
            <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
              <label>Skills</label>
              <input type="text" value={skills} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Years of Experience</label>
              <input type="text" value={yearOfExperience} disabled />
            </div>
            <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
              <label>Self Description</label>
              <textarea value={selfDescription} disabled rows="3"></textarea>
            </div>
            <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
              <label>Street</label>
              <input type="text" value={street} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>City</label>
              <input type="text" value={city} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>State</label>
              <input type="text" value={state} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Pincode</label>
              <input type="text" value={pincode} disabled />
            </div>
            <div className="nurse-profile__form-group">
              <label>Password</label>
              <input type="password" value="********" disabled />
            </div>
          </div>
          <div className="nurse-profile__change-password-btn-container">
            <button
              type="button"
              className="nurse-profile__change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              <FaKey className="icon-left" /> Change Password
            </button>
          </div>
        </form>
      </div>

      <div
        className={`nurse-profile__edit-panel ${
          isEditing ? "nurse-profile__edit-panel--open" : ""
        }`}
      >
        <div className="nurse-profile__edit-panel-content">
          <div className="nurse-profile__edit-panel-header">
            <h3>Edit Profile</h3>
            <FaTimes
              className="nurse-profile__close-icon"
              onClick={handleCancel}
              aria-label="Close edit panel"
              role="button"
              tabIndex="0"
            />
          </div>
          <form
            onSubmit={handleUpdate}
            className="nurse-profile__form nurse-profile__edit-form"
          >
            <div className="nurse-profile__form-grid">
              <div className="nurse-profile__form-group">
                <label>Nurse ID</label>
                <input type="text" value={nurseData?._id || ""} disabled />
              </div>
              <div className="nurse-profile__form-group">
                <label>Hospital ID</label>
                <input
                  type="text"
                  value={nurseData?.hospitalId || ""}
                  disabled
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., ICU, Pediatrics, ER"
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  value={yearOfExperience}
                  onChange={(e) => setYearOfExperience(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
                <label>Self Description</label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <div className="nurse-profile__form-group nurse-profile__form-group--full-width">
                <label>Street</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="nurse-profile__form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            <div className="nurse-profile__profile-actions">
              <button type="submit" className="nurse-profile__save-btn">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="nurse-profile__cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
          {message && (
            <p className="nurse-profile__status-message">{message}</p>
          )}
        </div>
      </div>

      {showPasswordModal && nurseData && (
        <ChangePasswordModal
          nurseId={nurseData._id}
          onClose={() => setShowPasswordModal(false)}
          onPasswordChangeSuccess={handlePasswordChangeSuccess}
        />
      )}
    </div>
  );
};

export default NurseProfile;
