// // HospitalProfile.js (Refactored for efficiency)

// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
// import axios from "axios";
// import "./HospitalProfile.css";

// const HospitalProfile = ({ hospitalData, onUpdate, onLogout }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Editable states initialized from the prop
//   const [name, setName] = useState(hospitalData.name || "");
//   const [ceoName, setCeoName] = useState(hospitalData.ceoName || "");
//   const [phone, setPhone] = useState(hospitalData.contactDetails?.phone || "");
//   const [email, setEmail] = useState(hospitalData.contactDetails?.email || "");
//   const [street, setStreet] = useState(hospitalData.address?.street || "");
//   const [city, setCity] = useState(hospitalData.address?.city || "");
//   const [state, setState] = useState(hospitalData.address?.state || "");
//   const [pincode, setPincode] = useState(hospitalData.address?.pincode || "");

//   // Password-related states
//   const [currentPasswordInput, setCurrentPasswordInput] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   const [message, setMessage] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   // Use useEffect to update state if props change (e.g., after an update)
//   useEffect(() => {
//     if (hospitalData) {
//       setName(hospitalData.name || "");
//       setCeoName(hospitalData.ceoName || "");
//       setPhone(hospitalData.contactDetails?.phone || "");
//       setEmail(hospitalData.contactDetails?.email || "");
//       setStreet(hospitalData.address?.street || "");
//       setCity(hospitalData.address?.city || "");
//       setState(hospitalData.address?.state || "");
//       setPincode(hospitalData.address?.pincode || "");

//       setCurrentPasswordInput("");
//       setNewPassword("");
//       setConfirmNewPassword("");
//       setMessage("");
//     }
//   }, [hospitalData]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setMessage("Updating...");

//     // Password validation logic
//     if (newPassword || confirmNewPassword) {
//       if (currentPasswordInput !== hospitalData.password) {
//         setMessage("Incorrect current password.");
//         return;
//       }
//       if (newPassword !== confirmNewPassword) {
//         setMessage("New password and confirm password do not match.");
//         return;
//       }
//     }

//     const payload = {
//       _id: hospitalData._id,
//       name,
//       ceoName,
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
//       // Retain other immutable fields
//       userId: hospitalData.userId,
//       certificate: hospitalData.certificate,
//       kmcNumber: hospitalData.kmcNumber,
//       staffDetails: hospitalData.staffDetails,
//       registrationStatus: hospitalData.registrationStatus,
//     };

//     if (newPassword && newPassword === confirmNewPassword) {
//       payload.password = newPassword;
//     } else {
//       payload.password = hospitalData.password;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/${hospitalData._id}`,
//         payload
//       );

//       if (response.status === 200) {
//         setMessage("Profile updated successfully!");
//         setIsEditing(false);
//         if (onUpdate) onUpdate(response.data); // Update parent state with new data
//         setCurrentPasswordInput("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       } else {
//         setMessage("Failed to update profile.");
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err.response || err);
//       setMessage(
//         `Error updating profile: ${
//           err.response?.data?.message || err.message || "Please try again."
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setName(hospitalData.name || "");
//     setCeoName(hospitalData.ceoName || "");
//     setPhone(hospitalData.contactDetails?.phone || "");
//     setEmail(hospitalData.contactDetails?.email || "");
//     setStreet(hospitalData.address?.street || "");
//     setCity(hospitalData.address?.city || "");
//     setState(hospitalData.address?.state || "");
//     setPincode(hospitalData.address?.pincode || "");
//     setCurrentPasswordInput("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//     setIsEditing(false);
//     setMessage("");
//   };

//   if (!hospitalData) {
//     return (
//       <div className="profile-no-data">No hospital profile data available.</div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2 className="profile-title">Hospital Profile</h2>
//       {/* ... (rest of the component JSX is the same as before) */}
//       {!isEditing && (
//         <div className="profile-actions-header">
//           <div
//             className="edit-icon-container"
//             onClick={() => setIsEditing(true)}
//           >
//             <FaEdit className="edit-icon" />
//           </div>
//           <div className="logout-icon-container" onClick={onLogout}>
//             <FaSignOutAlt className="logout-icon" />
//           </div>
//         </div>
//       )}
//       <div className="profile-form-wrapper">
//         <form className="profile-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Hospital ID</label>
//               <input type="text" value={hospitalData._id || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>Name</label>
//               <input type="text" value={hospitalData.name || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>CEO Name</label>
//               <input type="text" value={hospitalData.ceoName || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>KMC Number</label>
//               <input
//                 type="text"
//                 value={hospitalData.kmcNumber || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 value={hospitalData.contactDetails?.phone || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={hospitalData.contactDetails?.email || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>Street</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.street || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.city || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.state || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.pincode || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Registration Status</label>
//               <input
//                 type="text"
//                 value={hospitalData.registrationStatus || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" value="********" disabled />
//             </div>
//             {hospitalData.certificate && (
//               <div className="form-group full-width certificate-display">
//                 <label>Certificate</label>
//                 <img
//                   src={hospitalData.certificate}
//                   alt="Hospital Certificate"
//                   className="certificate-image"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>
//       <div className={`edit-panel ${isEditing ? "open" : ""}`}>
//         <div className="edit-panel-header">
//           <h3>Edit Hospital Profile</h3>
//           <FaTimes className="close-icon" onClick={handleCancel} />
//         </div>
//         <form onSubmit={handleUpdate} className="profile-form edit-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Hospital ID</label>
//               <input type="text" value={hospitalData._id || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>User ID</label>
//               <input type="text" value={hospitalData.userId || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>KMC Number</label>
//               <input
//                 type="text"
//                 value={hospitalData.kmcNumber || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Registration Status</label>
//               <input
//                 type="text"
//                 value={hospitalData.registrationStatus || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Current Password</label>
//               <input
//                 type="password"
//                 value={currentPasswordInput}
//                 onChange={(e) => setCurrentPasswordInput(e.target.value)}
//                 placeholder="Enter current password"
//               />
//             </div>
//             <div className="form-group">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter new password"
//               />
//             </div>
//             <div className="form-group">
//               <label>Confirm New Password</label>
//               <input
//                 type="password"
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//                 placeholder="Confirm new password"
//               />
//             </div>
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>CEO Name</label>
//               <input
//                 type="text"
//                 value={ceoName}
//                 onChange={(e) => setCeoName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>Street</label>
//               <input
//                 type="text"
//                 value={street}
//                 onChange={(e) => setStreet(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input
//                 type="text"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 value={pincode}
//                 onChange={(e) => setPincode(e.target.value)}
//               />
//             </div>
//             {hospitalData.certificate && (
//               <div className="form-group full-width certificate-display">
//                 <label>Certificate</label>
//                 <img
//                   src={hospitalData.certificate}
//                   alt="Hospital Certificate"
//                   className="certificate-image"
//                   disabled
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="profile-actions">
//             <button type="submit" className="save-btn">
//               Save Changes
//             </button>
//             <button type="button" onClick={handleCancel} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </form>
//         {message && <p className="status-message">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default HospitalProfile;

// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
// import axios from "axios";
// import "./HospitalProfile.css";

// // A single state object makes state management cleaner.
// const initialFormData = {
//   name: "",
//   ceoName: "",
//   phone: "",
//   email: "",
//   street: "",
//   city: "",
//   state: "",
//   pincode: "",
// };

// const HospitalProfile = ({ hospitalData, onUpdate, onLogout }) => {
//   // We use a single object for form data, initialized with props
//   const [formData, setFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
//   const [isEditing, setIsEditing] = useState(false);

//   // Password-related states, kept separate as they are not part of the main data
//   const [currentPasswordInput, setCurrentPasswordInput] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   // useEffect to sync local state with props when hospitalData changes
//   useEffect(() => {
//     if (hospitalData) {
//       setFormData({
//         name: hospitalData.name || "",
//         ceoName: hospitalData.ceoName || "",
//         phone: hospitalData.contactDetails?.phone || "",
//         email: hospitalData.contactDetails?.email || "",
//         street: hospitalData.address?.street || "",
//         city: hospitalData.address?.city || "",
//         state: hospitalData.address?.state || "",
//         pincode: hospitalData.address?.pincode || "",
//       });
//       // Also clear password fields and messages
//       resetPasswordFields();
//       setStatusMessage({ text: "", type: "" });
//     }
//   }, [hospitalData]);

//   // Helper function to handle form field changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Helper function to reset password fields
//   const resetPasswordFields = () => {
//     setCurrentPasswordInput("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage({ text: "Updating profile...", type: "info" });

//     // Validate new passwords match before sending to the server
//     if (
//       (newPassword || confirmNewPassword) &&
//       newPassword !== confirmNewPassword
//     ) {
//       setStatusMessage({
//         text: "New password and confirm password do not match.",
//         type: "error",
//       });
//       setLoading(false);
//       return;
//     }

//     // Build the payload with updated data and password changes if they exist
//     const payload = {
//       ...formData,
//       contactDetails: {
//         phone: formData.phone,
//         email: formData.email,
//       },
//       address: {
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//       },
//       // Send password updates securely to the server
//       currentPassword: currentPasswordInput,
//       newPassword: newPassword || null,
//       // Retain other immutable fields
//       _id: hospitalData._id,
//       userId: hospitalData.userId,
//       certificate: hospitalData.certificate,
//       kmcNumber: hospitalData.kmcNumber,
//       staffDetails: hospitalData.staffDetails,
//       registrationStatus: hospitalData.registrationStatus,
//     };

//     // IMPORTANT: The server must handle password validation by comparing the hashed current password.
//     // The client should never know the actual password.

//     try {
//       // NOTE: Replace this with an environment variable for production
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/${hospitalData._id}`,
//         payload
//       );

//       if (response.status === 200) {
//         setStatusMessage({
//           text: "Profile updated successfully!",
//           type: "success",
//         });
//         setIsEditing(false);
//         if (onUpdate) onUpdate(response.data); // Update parent state with new data
//         resetPasswordFields();
//       } else {
//         setStatusMessage({ text: "Failed to update profile.", type: "error" });
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err.response || err);
//       setStatusMessage({
//         text: `Error updating profile: ${
//           err.response?.data?.message || err.message || "Please try again."
//         }`,
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset form data to initial prop values
//     setFormData({
//       name: hospitalData.name || "",
//       ceoName: hospitalData.ceoName || "",
//       phone: hospitalData.contactDetails?.phone || "",
//       email: hospitalData.contactDetails?.email || "",
//       street: hospitalData.address?.street || "",
//       city: hospitalData.address?.city || "",
//       state: hospitalData.address?.state || "",
//       pincode: hospitalData.address?.pincode || "",
//     });
//     resetPasswordFields();
//     setIsEditing(false);
//     setStatusMessage({ text: "", type: "" });
//   };

//   if (!hospitalData) {
//     return (
//       <div className="profile-no-data">No hospital profile data available.</div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2 className="profile-title">Hospital Profile</h2>

//       {!isEditing && (
//         <div className="profile-actions-header">
//           <div
//             className="edit-icon-container"
//             onClick={() => setIsEditing(true)}
//           >
//             <FaEdit className="edit-icon" />
//           </div>
//           <div className="logout-icon-container" onClick={onLogout}>
//             <FaSignOutAlt className="logout-icon" />
//           </div>
//         </div>
//       )}

//       <div className="profile-form-wrapper">
//         <form className="profile-form">
//           <div className="form-grid">
//             <div className="form-group">
//               <label>Hospital ID</label>
//               <input type="text" value={hospitalData._id || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>Name</label>
//               <input type="text" value={hospitalData.name || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>CEO Name</label>
//               <input type="text" value={hospitalData.ceoName || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>KMC Number</label>
//               <input
//                 type="text"
//                 value={hospitalData.kmcNumber || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 value={hospitalData.contactDetails?.phone || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={hospitalData.contactDetails?.email || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>Street</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.street || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.city || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.state || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 value={hospitalData.address?.pincode || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Registration Status</label>
//               <input
//                 type="text"
//                 value={hospitalData.registrationStatus || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" value="********" disabled />
//             </div>
//             {hospitalData.certificate && (
//               <div className="form-group full-width certificate-display">
//                 <label>Certificate</label>
//                 <img
//                   src={hospitalData.certificate}
//                   alt="Hospital Certificate"
//                   className="certificate-image"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className={`edit-panel ${isEditing ? "open" : ""}`}>
//         <div className="edit-panel-header">
//           <h3>Edit Hospital Profile</h3>
//           <FaTimes className="close-icon" onClick={handleCancel} />
//         </div>
//         <form onSubmit={handleUpdate} className="profile-form edit-form">
//           <div className="form-grid">
//             {/* Disabled fields */}
//             <div className="form-group">
//               <label>Hospital ID</label>
//               <input type="text" value={hospitalData._id || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>User ID</label>
//               <input type="text" value={hospitalData.userId || ""} disabled />
//             </div>
//             <div className="form-group">
//               <label>KMC Number</label>
//               <input
//                 type="text"
//                 value={hospitalData.kmcNumber || ""}
//                 disabled
//               />
//             </div>
//             <div className="form-group">
//               <label>Registration Status</label>
//               <input
//                 type="text"
//                 value={hospitalData.registrationStatus || ""}
//                 disabled
//               />
//             </div>

//             {/* Editable fields */}
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>CEO Name</label>
//               <input
//                 type="text"
//                 name="ceoName"
//                 value={formData.ceoName}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>Street</label>
//               <input
//                 type="text"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleFormChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Pincode</label>
//               <input
//                 type="text"
//                 name="pincode"
//                 value={formData.pincode}
//                 onChange={handleFormChange}
//               />
//             </div>

//             {/* Password fields for change */}
//             <div className="form-group full-width">
//               <label>Current Password</label>
//               <input
//                 type="password"
//                 value={currentPasswordInput}
//                 onChange={(e) => setCurrentPasswordInput(e.target.value)}
//                 placeholder="Enter current password"
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter new password"
//               />
//             </div>
//             <div className="form-group full-width">
//               <label>Confirm New Password</label>
//               <input
//                 type="password"
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//                 placeholder="Confirm new password"
//               />
//             </div>

//             {hospitalData.certificate && (
//               <div className="form-group full-width certificate-display">
//                 <label>Certificate</label>
//                 <img
//                   src={hospitalData.certificate}
//                   alt="Hospital Certificate"
//                   className="certificate-image"
//                   disabled
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//           <div className="profile-actions">
//             <button type="submit" className="save-btn" disabled={loading}>
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="cancel-btn"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//         {statusMessage.text && (
//           <p className={`status-message ${statusMessage.type}`}>
//             {statusMessage.text}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HospitalProfile;

import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import "./HospitalProfile.css";

// A single state object makes state management cleaner.
const initialFormData = {
  name: "",
  ceoName: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
};

const HospitalProfile = ({ hospitalData, onUpdate, onLogout }) => {
  // We use a single object for form data, initialized with props
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Password-related states, kept separate as they are not part of the main data
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // useEffect to sync local state with props when hospitalData changes
  useEffect(() => {
    if (hospitalData) {
      setFormData({
        name: hospitalData.name || "",
        ceoName: hospitalData.ceoName || "",
        phone: hospitalData.contactDetails?.phone || "",
        email: hospitalData.contactDetails?.email || "",
        street: hospitalData.address?.street || "",
        city: hospitalData.address?.city || "",
        state: hospitalData.address?.state || "",
        pincode: hospitalData.address?.pincode || "",
      });
      // Also clear password fields and messages
      resetPasswordFields();
      setStatusMessage({ text: "", type: "" });
    }
  }, [hospitalData]);

  // Helper function to handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Helper function to reset password fields
  const resetPasswordFields = () => {
    setCurrentPasswordInput("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ text: "Updating profile...", type: "info" });

    // Validate new passwords match before sending to the server
    if (
      (newPassword || confirmNewPassword) &&
      newPassword !== confirmNewPassword
    ) {
      setStatusMessage({
        text: "New password and confirm password do not match.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    // Build the payload with updated data and password changes if they exist
    const payload = {
      ...formData,
      contactDetails: {
        phone: formData.phone,
        email: formData.email,
      },
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      // Send password updates securely to the server
      currentPassword: currentPasswordInput,
      newPassword: newPassword || null,
      // Retain other immutable fields
      _id: hospitalData._id,
      userId: hospitalData.userId,
      certificate: hospitalData.certificate,
      kmcNumber: hospitalData.kmcNumber,
      staffDetails: hospitalData.staffDetails,
      registrationStatus: hospitalData.registrationStatus,
    };

    // IMPORTANT: The server must handle password validation by comparing the hashed current password.
    // The client should never know the actual password.

    try {
      // NOTE: Replace this with an environment variable for production
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/${hospitalData._id}`,
        payload
      );

      if (response.status === 200) {
        setStatusMessage({
          text: "Profile updated successfully!",
          type: "success",
        });
        setIsEditing(false);
        if (onUpdate) onUpdate(response.data); // Update parent state with new data
        resetPasswordFields();
      } else {
        setStatusMessage({ text: "Failed to update profile.", type: "error" });
      }
    } catch (err) {
      console.error("Error updating profile:", err.response || err);
      setStatusMessage({
        text: `Error updating profile: ${
          err.response?.data?.message || err.message || "Please try again."
        }`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to initial prop values
    setFormData({
      name: hospitalData.name || "",
      ceoName: hospitalData.ceoName || "",
      phone: hospitalData.contactDetails?.phone || "",
      email: hospitalData.contactDetails?.email || "",
      street: hospitalData.address?.street || "",
      city: hospitalData.address?.city || "",
      state: hospitalData.address?.state || "",
      pincode: hospitalData.address?.pincode || "",
    });
    resetPasswordFields();
    setIsEditing(false);
    setStatusMessage({ text: "", type: "" });
  };

  if (!hospitalData) {
    return (
      <div className="hp-profile-no-data">
        No hospital profile data available.
      </div>
    );
  }

  return (
    <div className="hp-profile-container">
      <h2 className="hp-profile-title">Hospital Profile</h2>

      {!isEditing && (
        <div className="hp-profile-actions-header">
          <div
            className="hp-edit-icon-container"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit className="hp-edit-icon" />
          </div>
          <div className="hp-logout-icon-container" onClick={onLogout}>
            <FaSignOutAlt className="hp-logout-icon" />
          </div>
        </div>
      )}

      <div className="hp-profile-form-wrapper">
        <form className="hp-profile-form">
          <div className="hp-form-grid">
            <div className="hp-form-group">
              <label>Hospital ID</label>
              <input type="text" value={hospitalData._id || ""} disabled />
            </div>
            <div className="hp-form-group">
              <label>Name</label>
              <input type="text" value={hospitalData.name || ""} disabled />
            </div>
            <div className="hp-form-group">
              <label>CEO Name</label>
              <input type="text" value={hospitalData.ceoName || ""} disabled />
            </div>
            <div className="hp-form-group">
              <label>KMC Number</label>
              <input
                type="text"
                value={hospitalData.kmcNumber || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Phone</label>
              <input
                type="text"
                value={hospitalData.contactDetails?.phone || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Email</label>
              <input
                type="email"
                value={hospitalData.contactDetails?.email || ""}
                disabled
              />
            </div>
            <div className="hp-form-group full-width">
              <label>Street</label>
              <input
                type="text"
                value={hospitalData.address?.street || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>City</label>
              <input
                type="text"
                value={hospitalData.address?.city || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>State</label>
              <input
                type="text"
                value={hospitalData.address?.state || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Pincode</label>
              <input
                type="text"
                value={hospitalData.address?.pincode || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Registration Status</label>
              <input
                type="text"
                value={hospitalData.registrationStatus || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Password</label>
              <input type="password" value="********" disabled />
            </div>
            {hospitalData.certificate && (
              <div className="hp-form-group full-width hp-certificate-display">
                <label>Certificate</label>
                <img
                  src={hospitalData.certificate}
                  alt="Hospital Certificate"
                  className="hp-certificate-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      <div className={`hp-edit-panel ${isEditing ? "open" : ""}`}>
        <div className="hp-edit-panel-header">
          <h3>Edit Hospital Profile</h3>
          <FaTimes className="hp-close-icon" onClick={handleCancel} />
        </div>
        <form onSubmit={handleUpdate} className="hp-profile-form hp-edit-form">
          <div className="hp-form-grid">
            {/* Disabled fields */}
            <div className="hp-form-group">
              <label>Hospital ID</label>
              <input type="text" value={hospitalData._id || ""} disabled />
            </div>

            <div className="hp-form-group">
              <label>KMC Number</label>
              <input
                type="text"
                value={hospitalData.kmcNumber || ""}
                disabled
              />
            </div>
            <div className="hp-form-group">
              <label>Registration Status</label>
              <input
                type="text"
                value={hospitalData.registrationStatus || ""}
                disabled
              />
            </div>

            {/* Editable fields */}
            <div className="hp-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>CEO Name</label>
              <input
                type="text"
                name="ceoName"
                value={formData.ceoName}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group full-width">
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleFormChange}
              />
            </div>
            <div className="hp-form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleFormChange}
              />
            </div>

            {/* Password fields for change */}
            <div className="hp-form-group full-width">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="hp-form-group full-width">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="hp-form-group full-width">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>

            {hospitalData.certificate && (
              <div className="hp-form-group full-width hp-certificate-display">
                <label>Certificate</label>
                <img
                  src={hospitalData.certificate}
                  alt="Hospital Certificate"
                  className="hp-certificate-image"
                  disabled
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/150x100/eeeeee/aaaaaa?text=No+Image";
                  }}
                />
              </div>
            )}
          </div>
          <div className="hp-profile-actions">
            <button type="submit" className="hp-save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="hp-cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
        {statusMessage.text && (
          <p className={`hp-status-message ${statusMessage.type}`}>
            {statusMessage.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default HospitalProfile;
