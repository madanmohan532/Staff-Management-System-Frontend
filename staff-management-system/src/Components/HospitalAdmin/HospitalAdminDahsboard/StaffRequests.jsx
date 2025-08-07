// import React, { useEffect, useState } from "react";
// import "./StaffRequests.css";
// import axios from "axios";

// import RequestedStaff from "./RequestedStaff";

// const StaffRequests = () => {
//   const [searchDate, setSearchDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedNurse, setSelectedNurse] = useState(null);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [requestedNurses, setRequestedNurses] = useState([]);
//   const [id] = useState(localStorage.getItem("hospitalId"));

//   // State for the dynamic validation modal
//   const [showValidationModal, setShowValidationModal] = useState(false);
//   const [validationMessage, setValidationMessage] = useState("");

//   const fetchHospitalNurses = async () => {
//     if (!id) return;

//     try {
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${id}`
//       );
//       if (response.status === 200) {
//         const allNurses = response.data;
//         const requested = allNurses.filter(
//           (nurse) => nurse.staffRequestStatus === "requested"
//         );
//         setRequestedNurses(requested);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   const fetchAvailableHospitalNurses = async (detail) => {
//     if (!id) return;

//     try {
//       const response = await axios.post(
//         `http://localhost:9999/hospital-service/api/hospital/getNurseDetails`,
//         detail
//       );
//       if (response.status === 200) {
//         setSearchResults(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   const submitRequest = async (detail) => {
//     // try {
//     //   const response = await axios.put(
//     //     `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
//     //     detail
//     //   );
//     //   if (response.status === 200) {
//     //     fetchHospitalNurses(); // Refresh the requested list after a successful request
//     //   }
//     // } catch (error) {
//     //   console.error("Error submitting nurse request:", error);
//     // }

//     console.log(detail);
//   };

//   const handleCancelRequest = async (cancelDetail) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/cancelSingleNurseRequest`,
//         cancelDetail
//       );
//       if (response.status === 200) {
//         fetchHospitalNurses(); // Refresh the requested list after cancellation
//       }
//     } catch (error) {
//       console.error("Error cancelling nurse request:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHospitalNurses();
//   }, []);

//   const formatDateTime = (date, time) => `${date}T${time}:00`;

//   const handleSearch = () => {
//     if (!searchDate || !startTime || !endTime) {
//       setValidationMessage("Please provide a date, start time, and end time.");
//       setShowValidationModal(true);
//       return;
//     }

//     if (startTime === endTime) {
//       setValidationMessage("Start time and end time cannot be the same.");
//       setShowValidationModal(true);
//       return;
//     }

//     const detail = {
//       date: searchDate,
//       from: formatDateTime(searchDate, startTime),
//       to: formatDateTime(searchDate, endTime),
//     };

//     fetchAvailableHospitalNurses(detail);
//   };

//   const handleRequest = (nurse) => {
//     const newRequest = {
//       staffId: nurse._id,
//       date: searchDate,
//       from: formatDateTime(searchDate, startTime),
//       to: formatDateTime(searchDate, endTime),
//       hospitalId: id,
//     };

//     submitRequest(newRequest);
//     setShowRequestModal(false);
//   };

//   return (
//     <div className="staff-requests">
//       <h2>Request Additional Staff</h2>

//       <div className="search-section">
//         <div className="search-form">
//           <div className="form-group">
//             <label>Date</label>
//             <input
//               type="date"
//               value={searchDate}
//               onChange={(e) => setSearchDate(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>Start Time</label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label>End Time</label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//             />
//           </div>
//           <button className="search-btn" onClick={handleSearch}>
//             Search Available Nurses
//           </button>
//         </div>
//       </div>

//       {searchResults.length > 0 && (
//         <div className="search-results">
//           <h3>Available Nurses</h3>
//           <div className="nurse-cards">
//             {searchResults.map((nurse) => (
//               <div key={nurse.id} className="nurse-card">
//                 <h4>{nurse.firstName}</h4>
//                 <p>
//                   <strong>Specialty:</strong> {nurse.skills.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Experience: </strong>
//                   {nurse.yearOfExperience}
//                 </p>
//                 <p>
//                   <strong>Contact:</strong> {nurse.contactDetails.phone}
//                 </p>
//                 <p>
//                   <strong>About:</strong> {nurse.selfDescription}
//                 </p>
//                 <button
//                   className="request-btn"
//                   onClick={() => {
//                     setSelectedNurse(nurse);
//                     setShowRequestModal(true);
//                   }}
//                 >
//                   Request This Nurse
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <RequestedStaff
//         requestedNurses={requestedNurses}
//         onCancelRequest={handleCancelRequest}
//       />

//       {/* Request Confirmation Modal */}
//       {showRequestModal && selectedNurse && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Confirm Staff Request</h3>
//             <div className="request-details">
//               <p>
//                 <strong>Nurse:</strong> {selectedNurse.firstName}
//               </p>
//               <p>
//                 <strong>Specialty:</strong> {selectedNurse.skills.join(", ")}
//               </p>
//               <p>
//                 <strong>Date:</strong> {searchDate}
//               </p>
//               <p>
//                 <strong>Time:</strong> {startTime} - {endTime}
//               </p>
//             </div>
//             <div className="modal-actions">
//               <button
//                 className="confirm-btn"
//                 onClick={() => handleRequest(selectedNurse)}
//               >
//                 Confirm Request
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setShowRequestModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Dynamic Validation Modal */}
//       {showValidationModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Validation Error</h3>
//             <p>{validationMessage}</p>
//             <div className="modal-actions">
//               <button
//                 className="confirm-btn"
//                 onClick={() => setShowValidationModal(false)}
//               >
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StaffRequests;

import React, { useEffect, useState, useCallback } from "react";
import "./StaffRequests.css";
import axios from "axios";

import RequestedStaff from "./RequestedStaff";

const StaffRequests = () => {
  const [searchDate, setSearchDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [searchText, setSearchText] = useState(""); // New state for text search
  const [allNurses, setAllNurses] = useState([]); // State to hold all nurses
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestedNurses, setRequestedNurses] = useState([]);
  const [id] = useState(localStorage.getItem("hospitalId"));

  // State for the dynamic validation modal
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper function to check if a nurse is working during a specific shift
  const isNurseAvailable = useCallback((nurse, date, from, to) => {
    const requestedShiftStart = new Date(`${date}T${from}:00`);
    const requestedShiftEnd = new Date(`${date}T${to}:00`);

    if (!nurse.workSchedule || nurse.workSchedule.length === 0) {
      return true; // No work schedule means they are available
    }

    // Check if the requested shift overlaps with any existing work schedule
    const hasOverlap = nurse.workSchedule.some((schedule) => {
      const existingShiftStart = new Date(schedule.from);
      const existingShiftEnd = new Date(schedule.to);

      return (
        requestedShiftStart < existingShiftEnd &&
        requestedShiftEnd > existingShiftStart
      );
    });

    return !hasOverlap;
  }, []);

  // Fetch all nurses on component load
  useEffect(() => {
    const fetchAllNurses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
        );
        if (response.status === 200) {
          setAllNurses(response.data);
          // console.log("Fetched all nurses:", response.data); // For debugging
        }
      } catch (error) {
        console.error("Error fetching all nurses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNurses();
  }, []);

  // const fetchNurses = async () => {
  //   await axios
  //     .get("http://localhost:9999/admin-service/api/admin/nurse/nurseDetails")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setAllNurses(response.data);
  //       } else {
  //         console.log("No nurses found");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching nurses:", error);
  //     });
  // };

  const fetchHospitalNurses = async () => {
    if (!id) return;

    try {
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${id}`
      );
      if (response.status === 200) {
        const allNurses = response.data;
        const requested = allNurses.filter(
          (nurse) => nurse.staffRequestStatus === "requested"
        );
        setRequestedNurses(requested);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const submitRequest = async (detail) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
        detail
      );
      if (response.status === 200) {
        fetchHospitalNurses(); // Refresh the requested list after a successful request
      }
    } catch (error) {
      console.error("Error submitting nurse request:", error);
    }
  };

  const handleCancelRequest = async (cancelDetail) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/cancelSingleNurseRequest`,
        cancelDetail
      );
      if (response.status === 200) {
        fetchHospitalNurses(); // Refresh the requested list after cancellation
      }
    } catch (error) {
      console.error("Error cancelling nurse request:", error);
    }
  };

  useEffect(() => {
    fetchHospitalNurses();
  }, []);

  // const handleSearch = () => {
  //   if (!searchDate || !startTime || !endTime) {
  //     setValidationMessage("Please provide a date, start time, and end time.");
  //     setShowValidationModal(true);
  //     return;
  //   }

  //   // Filter nurses based on availability
  //   const availableNurses = allNurses.filter((nurse) =>
  //     isNurseAvailable(nurse, searchDate, startTime, endTime)
  //   );

  //   // Further filter based on text search
  //   const filteredNurses = availableNurses.filter((nurse) => {
  //     const searchLower = searchText.toLowerCase();
  //     return (
  //       nurse.firstName.toLowerCase().includes(searchLower) ||
  //       nurse.lastName.toLowerCase().includes(searchLower) ||
  //       nurse.skills.some((skill) =>
  //         skill.toLowerCase().includes(searchLower)
  //       ) ||
  //       String(nurse.yearOfExperience).includes(searchLower) || // Search by experience
  //       nurse.selfDescription.toLowerCase().includes(searchLower)
  //     );
  //   });

  //   setSearchResults(filteredNurses);
  // };
  const handleSearch = () => {
    if (!searchDate || !startTime || !endTime) {
      setValidationMessage("Please provide a date, start time, and end time.");
      setShowValidationModal(true);
      return;
    }

    console.log("Searching for:", {
      searchDate,
      startTime,
      endTime,
      searchText,
    });

    const availableNurses = allNurses.filter((nurse) =>
      isNurseAvailable(nurse, searchDate, startTime, endTime)
    );

    console.log("Available nurses after date/time filter:", availableNurses);

    const filteredNurses = availableNurses.filter((nurse) => {
      const searchLower = searchText.toLowerCase();
      const matches =
        nurse.firstName?.toLowerCase().includes(searchLower) ||
        nurse.lastName?.toLowerCase().includes(searchLower) ||
        nurse.skills.some((skill) =>
          skill.toLowerCase().includes(searchLower)
        ) ||
        String(nurse.yearOfExperience).includes(searchLower) ||
        nurse.selfDescription.toLowerCase().includes(searchLower);
      return matches;
    });

    console.log("Nurses after text filter:", filteredNurses);

    setSearchResults(filteredNurses);
  };
  const handleRequest = (nurse) => {
    const newRequest = {
      staffId: nurse._id,
      date: searchDate,
      from: `${searchDate}T${startTime}:00`,
      to: `${searchDate}T${endTime}:00`,
      hospitalId: id,
    };

    submitRequest(newRequest);
    setShowRequestModal(false);
  };

  return (
    <div className="staff-requests">
      <h2>Request Additional Staff</h2>

      <div className="search-section">
        <div className="search-form">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          {/* New search bar for text input */}
          <div className="form-group search-bar-group">
            <label>Search by Skills/Experience</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="e.g., 'ICU', 'pediatric', '5 years'"
            />
          </div>
          <button className="search-btn" onClick={handleSearch}>
            Search Available Nurses
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Loading all nurse data...</div>
      ) : (
        searchResults.length > 0 && (
          <div className="search-results">
            <h3>Available Nurses</h3>
            <div className="nurse-cards">
              {searchResults.map((nurse) => (
                <div key={nurse._id} className="nurse-card">
                  <h4>
                    {nurse.firstName} {nurse.lastName}
                  </h4>
                  <p>
                    <strong>Specialty:</strong> {nurse.skills.join(", ")}
                  </p>
                  <p>
                    <strong>Experience: </strong>
                    {nurse.yearOfExperience} years
                  </p>
                  <p>
                    <strong>Contact:</strong> {nurse.contactDetails.phone}
                  </p>
                  <p>
                    <strong>About:</strong> {nurse.selfDescription}
                  </p>
                  <button
                    className="request-btn"
                    onClick={() => {
                      setSelectedNurse(nurse);
                      setShowRequestModal(true);
                    }}
                  >
                    Request This Nurse
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      <RequestedStaff
        requestedNurses={requestedNurses}
        onCancelRequest={handleCancelRequest}
      />

      {/* Request Confirmation Modal */}
      {showRequestModal && selectedNurse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Staff Request</h3>
            <div className="request-details">
              <p>
                <strong>Nurse:</strong> {selectedNurse.firstName}
              </p>
              <p>
                <strong>Specialty:</strong> {selectedNurse.skills.join(", ")}
              </p>
              <p>
                <strong>Date:</strong> {searchDate}
              </p>
              <p>
                <strong>Time:</strong> {startTime} - {endTime}
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => handleRequest(selectedNurse)}
              >
                Confirm Request
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Validation Modal */}
      {showValidationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Validation Error</h3>
            <p>{validationMessage}</p>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() => setShowValidationModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffRequests;
