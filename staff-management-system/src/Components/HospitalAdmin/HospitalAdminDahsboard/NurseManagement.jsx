// import React, { useEffect, useState } from "react";
// import "./NurseManagement.css";
// import axios from "axios";

// const NurseManagement = (props) => {
//   // State to manage modal visibility and selected nurse
//   const [showFloorModal, setShowFloorModal] = useState(false);
//   const [showExtraHoursModal, setShowExtraHoursModal] = useState(false);
//   const [selectedNurse, setSelectedNurse] = useState(null);

//   // State for modal form inputs
//   const [newFloor, setNewFloor] = useState("");
//   const [extraHoursDate, setExtraHoursDate] = useState("");
//   const [extraHoursFrom, setExtraHoursFrom] = useState("");
//   const [extraHoursTo, setExtraHoursTo] = useState("");

//   const [nurses, setNurses] = useState([]);
//   const [id, setId] = useState(props.id);

//   // State for feedback messages and loading
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Helper function to format dates
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const formatTime1 = (timeString) => {
//     if (!timeString) return "";

//     const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//     console.log(formattedDate);

//     return formattedDate;
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const fetchHospitalNurses = async () => {
//     setMessage(""); // Clear previous messages
//     if (!id) return;

//     try {
//       setLoading(true); // Set loading true when fetching data
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${props.id}`
//       );
//       if (response.status === 200) {
//         // Filter nurses to only show those with "accepted" status
//         const acceptedNurses = response.data.filter(
//           (nurse) => nurse.staffRequestStatus === "accepted"
//         );
//         setNurses(acceptedNurses);
//       } else {
//         setMessage("No accepted nurses found.");
//         setNurses([]);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//       setMessage("Failed to fetch nurses. Please try again later.");
//       setNurses([]); // Clear nurses on error
//     } finally {
//       setLoading(false); // Set loading false after fetch completes
//     }
//   };

//   useEffect(() => {
//     fetchHospitalNurses();
//   }, [id]); // Re-fetch when the hospital ID changes

//   const handleRemove = (nurse) => {
//     console.log(nurse);

//     console.log(`Removing nurse with ID: ${nurse.hospitalStaffId}`);
//     if (!nurse) {
//       setMessage("Nurse data is null");
//       return;
//     }
//     const apiUrl = `http://localhost:9999/hospital-service/api/hospital/nurse/removeHospitalNurse`;
//     const params = {
//       hospitalStaffId: nurse.hospitalStaffId,
//       nurseId: nurse.staffId,
//       hospitalId: nurse.hospitalId,
//       from: nurse.requestedFrom,
//       to: nurse.requestedUpto, // Use current time as "to" time

//       curTime:
//         new Date().getFullYear() +
//         "-" +
//         new Date().getMonth() +
//         "-" +
//         new Date().getDate() +
//         "T" +
//         formatTime1(new Date()),
//     };
//     const payload = {
//       hospitalStaffId: nurse.hospitalStaffId,
//       nurseId: nurse.staffId,
//       hospitalId: nurse.hospitalId,
//       from: nurse.requestedFrom,
//       to: nurse.requestedUpto, // Use current time as "to" time

//       curTime:
//         new Date().getFullYear() +
//         "-" +
//         new Date().getMonth() +
//         "-" +
//         new Date().getDate() +
//         "T" +
//         formatTime1(new Date()),
//     };

//     console.log(params);

//     setLoading(true);
//     setMessage("Cancelling floor...");

//     try {
//       const response = axios.put(apiUrl, payload);

//       if (response.status === 200) {
//         setMessage(response.data);
//         console.log(response.data);

//         fetchHospitalNurses();
//       } else if (response.status === 404) {
//         setMessage(response.data);
//       } else {
//         // setMessage("remove operation failed");
//       }
//     } catch (error) {
//       console.error("Error updating floor:", error);
//       setMessage(
//         error.response?.data || "An error occurred while updating the floor."
//       );
//     }
//   };

//   const handleChangeFloor = (nurse) => {
//     setSelectedNurse(nurse);
//     setNewFloor(nurse.floorAssigned || "");
//     setShowFloorModal(true);
//     setMessage("");
//   };

//   const handleRequestExtraHours = (nurse) => {
//     setSelectedNurse(nurse);
//     setExtraHoursDate("");
//     setExtraHoursFrom("");
//     setExtraHoursTo("");
//     setShowExtraHoursModal(true);
//     setMessage("");
//   };

//   const saveFloorChange = async () => {
//     if (!selectedNurse || !newFloor) {
//       setMessage("Please enter a floor number.");
//       return;
//     }

//     const apiUrl = `http://localhost:9999/hospital-service/api/hospital/nurse/assignNurseToFloor`;
//     const params = {
//       floor: newFloor,
//       hospitalStaffId: selectedNurse.hospitalStaffId,
//     };

//     setLoading(true);
//     setMessage("Updating floor...");

//     try {
//       const response = await axios.put(apiUrl, null, { params });

//       if (response.status === 200) {
//         setMessage(response.data);
//         setShowFloorModal(false);
//         fetchHospitalNurses();
//       } else if (response.status === 304) {
//         setMessage(
//           response.data || "Floor could not be updated (Not Modified)."
//         );
//         setShowFloorModal(false);
//       } else {
//         setMessage("Failed to update floor. Unexpected response.");
//       }
//     } catch (error) {
//       console.error("Error updating floor:", error);
//       setMessage(
//         error.response?.data || "An error occurred while updating the floor."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // CORRECTED METHOD FOR REQUESTING EXTRA HOURS
//   const saveExtraHoursRequest = async () => {
//     if (!selectedNurse || !extraHoursDate || !extraHoursFrom || !extraHoursTo) {
//       setMessage(
//         "Please fill in all the date and time fields for extra hours."
//       );
//       return;
//     }

//     // Constructing date-time strings with IST offset (+05:30)
//     // This explicitly tells the backend the timezone, which Instant.parse() expects.

//     const fromDateTime = `${extraHoursDate}T${extraHoursFrom}:00`;
//     const toDateTime = `${extraHoursDate}T${extraHoursTo}:00`;

//     const payload = {
//       staffId: selectedNurse.staffId,
//       date: extraHoursDate, // Still sending date separately if backend needs it
//       from: fromDateTime,
//       to: toDateTime,
//       hospitalId: id,
//     };

//     console.log(payload);

//     setLoading(true);
//     setMessage("Requesting extra hours...");

//     try {
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
//         payload
//       );

//       if (response.status === 200) {
//         setMessage("Extra hours requested successfully!");
//         console.log(response.data);

//         setShowExtraHoursModal(false);
//         fetchHospitalNurses();
//       } else {
//         setMessage("Failed to request extra hours. Unexpected response.");
//       }
//     } catch (error) {
//       console.error("Error requesting extra hours:", error);
//       setMessage(
//         error.response?.data?.message ||
//           "An error occurred while requesting extra hours."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !nurses.length) {
//     return <div className="loading-container">Loading nurses...</div>;
//   }

//   return (
//     <div className="nurse-management">
//       <div className="management-header">
//         <h2>Nurse Management</h2>
//         <div className="stats">
//           <div className="stat-card">
//             <span className="stat-value">{nurses.length}</span>
//             <span className="stat-label">Total Accepted Nurses</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-value">
//               {nurses.filter((n) => n.workingStatus).length}
//             </span>
//             <span className="stat-label">Active</span>
//           </div>
//         </div>
//       </div>

//       {message && (
//         <div
//           className={`feedback-message ${
//             message.includes("Error") ||
//             message.includes("Failed") ||
//             message.includes("not be Updated") ||
//             message.includes("Incorrect")
//               ? "error"
//               : "success"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <div className="nurses-table-container">
//         <table className="nurses-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Assigned Floor</th>
//               <th>Available From</th>
//               <th>Available Upto</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {nurses.length > 0 ? (
//               nurses.map((nurse) => (
//                 <tr key={nurse.id}>
//                   <td>{nurse.hospitalStaffId}</td>
//                   <td>{nurse.floorAssigned || "N/A"}</td>
//                   <td>{`${formatDate(nurse.availableFrom)} - ${formatTime(
//                     nurse.availableFrom
//                   )}`}</td>
//                   <td>{`${formatDate(nurse.availableUpto)} - ${formatTime(
//                     nurse.availableUpto
//                   )}`}</td>
//                   <td>{nurse.workingStatus ? "Working" : "Not Working"}</td>
//                   <td className="actions-cell">
//                     <button
//                       className="action-btn"
//                       onClick={() => handleRequestExtraHours(nurse)}
//                       disabled={loading}
//                     >
//                       Extra Hours
//                     </button>
//                     <button
//                       className="action-btn"
//                       onClick={() => handleChangeFloor(nurse)}
//                       disabled={loading}
//                     >
//                       Change Floor
//                     </button>
//                     <button
//                       className="action-btn remove-btn"
//                       onClick={() => handleRemove(nurse)}
//                       disabled={loading}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="no-nurses-message">
//                   {loading ? "Loading nurses..." : "No accepted nurses found."}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Change Floor Modal */}
//       {showFloorModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Change Floor for {selectedNurse?.hospitalStaffId}</h3>
//             <label>New Floor Number:</label>
//             <input
//               type="text"
//               value={newFloor}
//               onChange={(e) => setNewFloor(e.target.value)}
//               placeholder="Enter floor number"
//               disabled={loading}
//             />
//             <div className="modal-actions">
//               <button
//                 onClick={saveFloorChange}
//                 className="save-btn"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 onClick={() => setShowFloorModal(false)}
//                 className="cancel-btn"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Request Extra Hours Modal */}
//       {showExtraHoursModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Request Extra Hours for {selectedNurse?.hospitalStaffId}</h3>
//             <label>Date:</label>
//             <input
//               type="date"
//               value={extraHoursDate}
//               onChange={(e) => setExtraHoursDate(e.target.value)}
//               disabled={loading}
//             />
//             <label>From Time:</label>
//             <input
//               type="time"
//               value={extraHoursFrom}
//               onChange={(e) => setExtraHoursFrom(e.target.value)}
//               disabled={loading}
//             />
//             <label>To Time:</label>
//             <input
//               type="time"
//               value={extraHoursTo}
//               onChange={(e) => setExtraHoursTo(e.target.value)}
//               disabled={loading}
//             />
//             <div className="modal-actions">
//               <button
//                 onClick={saveExtraHoursRequest}
//                 className="save-btn"
//                 disabled={loading}
//               >
//                 {loading ? "Requesting..." : "Request"}
//               </button>
//               <button
//                 onClick={() => setShowExtraHoursModal(false)}
//                 className="cancel-btn"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NurseManagement;

import React, { useEffect, useState } from "react";
import "./NurseManagement.css";
import axios from "axios";

const NurseManagement = (props) => {
  // State to manage modal visibility and selected nurse
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [showExtraHoursModal, setShowExtraHoursModal] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);

  // State for modal form inputs
  const [newFloor, setNewFloor] = useState("");
  const [extraHoursDate, setExtraHoursDate] = useState("");
  const [extraHoursFrom, setExtraHoursFrom] = useState("");
  const [extraHoursTo, setExtraHoursTo] = useState("");

  const [nurses, setNurses] = useState([]);
  const [id, setId] = useState(props.id);

  // State for feedback messages and loading
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime1 = (timeString) => {
    if (!timeString) return "";
    // Note: The `formatTime1` function is a bit verbose. A more direct approach is used in the handleRemove.
    const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    console.log(formattedDate);
    return formattedDate;
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const fetchHospitalNurses = async () => {
    setMessage(""); // Clear previous messages
    if (!id) return;

    try {
      setLoading(true); // Set loading true when fetching data
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${props.id}`
      );
      if (response.status === 200) {
        // Filter nurses to only show those with "accepted" status
        const acceptedNurses = response.data.filter(
          (nurse) => nurse.staffRequestStatus === "accepted"
        );
        setNurses(acceptedNurses);
      } else {
        setMessage("No accepted nurses found.");
        setNurses([]);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
      setMessage("Failed to fetch nurses. Please try again later.");
      setNurses([]); // Clear nurses on error
    } finally {
      setLoading(false); // Set loading false after fetch completes
    }
  };

  useEffect(() => {
    fetchHospitalNurses();
  }, [id]); // Re-fetch when the hospital ID changes

  // CORRECTED: The handleRemove function now correctly awaits the API call
  const handleRemove = async (nurse) => {
    console.log(`Removing nurse with ID: ${nurse.hospitalStaffId}`);
    if (!nurse) {
      setMessage("Nurse data is null");
      return;
    }

    const apiUrl = `http://localhost:9999/hospital-service/api/hospital/nurse/removeHospitalNurse`;
    // The current time for the API payload
    const curTime = new Date().toISOString();

    const payload = {
      hospitalStaffId: nurse.hospitalStaffId,
      nurseId: nurse.staffId,
      hospitalId: nurse.hospitalId,
      from: nurse.requestedFrom,
      to: nurse.requestedUpto,
      curTime: curTime,
    };

    console.log(payload);

    setLoading(true);
    setMessage("Cancelling floor...");

    try {
      // Correctly await the API call before proceeding
      const response = await axios.put(apiUrl, payload);

      if (response.status === 200) {
        setMessage(response.data);
        console.log(response.data);
        // After a successful removal, re-fetch the nurses to update the UI
        fetchHospitalNurses();
      } else if (response.status === 404) {
        setMessage(response.data);
      } else {
        setMessage("remove operation failed");
      }
    } catch (error) {
      console.error("Error updating floor:", error);
      setMessage(
        error.response?.data || "An error occurred while updating the floor."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangeFloor = (nurse) => {
    setSelectedNurse(nurse);
    setNewFloor(nurse.floorAssigned || "");
    setShowFloorModal(true);
    setMessage("");
  };

  const handleRequestExtraHours = (nurse) => {
    setSelectedNurse(nurse);
    setExtraHoursDate("");
    setExtraHoursFrom("");
    setExtraHoursTo("");
    setShowExtraHoursModal(true);
    setMessage("");
  };

  const saveFloorChange = async () => {
    if (!selectedNurse || !newFloor) {
      setMessage("Please enter a floor number.");
      return;
    }

    const apiUrl = `http://localhost:9999/hospital-service/api/hospital/nurse/assignNurseToFloor`;
    const params = {
      floor: newFloor,
      hospitalStaffId: selectedNurse.hospitalStaffId,
    };

    setLoading(true);
    setMessage("Updating floor...");

    try {
      const response = await axios.put(apiUrl, null, { params });

      if (response.status === 200) {
        setMessage(response.data);
        setShowFloorModal(false);
        fetchHospitalNurses();
      } else if (response.status === 304) {
        setMessage(
          response.data || "Floor could not be updated (Not Modified)."
        );
        setShowFloorModal(false);
      } else {
        setMessage("Failed to update floor. Unexpected response.");
      }
    } catch (error) {
      console.error("Error updating floor:", error);
      setMessage(
        error.response?.data || "An error occurred while updating the floor."
      );
    } finally {
      setLoading(false);
    }
  };

  // CORRECTED METHOD FOR REQUESTING EXTRA HOURS
  const saveExtraHoursRequest = async () => {
    if (!selectedNurse || !extraHoursDate || !extraHoursFrom || !extraHoursTo) {
      setMessage(
        "Please fill in all the date and time fields for extra hours."
      );
      return;
    }

    // Constructing date-time strings with IST offset (+05:30)
    // This explicitly tells the backend the timezone, which Instant.parse() expects.
    const fromDateTime = `${extraHoursDate}T${extraHoursFrom}:00`;
    const toDateTime = `${extraHoursDate}T${extraHoursTo}:00`;

    const payload = {
      staffId: selectedNurse.staffId,
      date: extraHoursDate, // Still sending date separately if backend needs it
      from: fromDateTime,
      to: toDateTime,
      hospitalId: id,
    };

    console.log(payload);

    setLoading(true);
    setMessage("Requesting extra hours...");

    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
        payload
      );

      if (response.status === 200) {
        setMessage("Extra hours requested successfully!");
        console.log(response.data);
        setShowExtraHoursModal(false);
        fetchHospitalNurses();
      } else {
        setMessage("Failed to request extra hours. Unexpected response.");
      }
    } catch (error) {
      console.error("Error requesting extra hours:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred while requesting extra hours."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !nurses.length) {
    return <div className="loading-container">Loading nurses...</div>;
  }

  return (
    <div className="nurse-management">
      <div className="management-header">
        <h2>Nurse Management</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-value">{nurses.length}</span>
            <span className="stat-label">Total Accepted Nurses</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {nurses.filter((n) => n.workingStatus).length}
            </span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`feedback-message ${
            message.includes("Error") ||
            message.includes("Failed") ||
            message.includes("not be Updated") ||
            message.includes("Incorrect")
              ? "error"
              : "success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="nurses-table-container">
        <table className="nurses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Assigned Floor</th>
              <th>Available From</th>
              <th>Available Upto</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {nurses.length > 0 ? (
              nurses.map((nurse) => (
                <tr key={nurse.id}>
                  <td>{nurse.hospitalStaffId}</td>
                  <td>{nurse.floorAssigned || "N/A"}</td>
                  <td>{`${formatDate(nurse.availableFrom)} - ${formatTime(
                    nurse.availableFrom
                  )}`}</td>
                  <td>{`${formatDate(nurse.availableUpto)} - ${formatTime(
                    nurse.availableUpto
                  )}`}</td>
                  <td>{nurse.workingStatus ? "Working" : "Not Working"}</td>
                  <td className="actions-cell">
                    <button
                      className="action-btn"
                      onClick={() => handleRequestExtraHours(nurse)}
                      disabled={loading}
                    >
                      Extra Hours
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleChangeFloor(nurse)}
                      disabled={loading}
                    >
                      Change Floor
                    </button>
                    <button
                      className="action-btn remove-btn"
                      onClick={() => handleRemove(nurse)}
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-nurses-message">
                  {loading ? "Loading nurses..." : "No accepted nurses found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Change Floor Modal */}
      {showFloorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Floor for {selectedNurse?.hospitalStaffId}</h3>
            <label>New Floor Number:</label>
            <input
              type="text"
              value={newFloor}
              onChange={(e) => setNewFloor(e.target.value)}
              placeholder="Enter floor number"
              disabled={loading}
            />
            <div className="modal-actions">
              <button
                onClick={saveFloorChange}
                className="save-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setShowFloorModal(false)}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Extra Hours Modal */}
      {showExtraHoursModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request Extra Hours for {selectedNurse?.hospitalStaffId}</h3>
            <label>Date:</label>
            <input
              type="date"
              value={extraHoursDate}
              onChange={(e) => setExtraHoursDate(e.target.value)}
              disabled={loading}
            />
            <label>From Time:</label>
            <input
              type="time"
              value={extraHoursFrom}
              onChange={(e) => setExtraHoursFrom(e.target.value)}
              disabled={loading}
            />
            <label>To Time:</label>
            <input
              type="time"
              value={extraHoursTo}
              onChange={(e) => setExtraHoursTo(e.target.value)}
              disabled={loading}
            />
            <div className="modal-actions">
              <button
                onClick={saveExtraHoursRequest}
                className="save-btn"
                disabled={loading}
              >
                {loading ? "Requesting..." : "Request"}
              </button>
              <button
                onClick={() => setShowExtraHoursModal(false)}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NurseManagement;
