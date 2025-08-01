// // RequestStaff.js
// import React, { useState } from "react";
// import { FaSearch, FaCalendarAlt, FaClock, FaUserPlus } from "react-icons/fa";
// import axios from "axios";
// import "./RequestStaff.css";

// const RequestStaff = ({ hospitalId, onRequestSubmit }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [date, setDate] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [availableNurses, setAvailableNurses] = useState([]);
//   const [selectedNurses, setSelectedNurses] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9999/nurse-service/api/nurse/available`,
//         {
//           params: {
//             date,
//             fromTime,
//             toTime,
//             specialty: specialty || undefined,
//             name: searchTerm || undefined,
//           },
//         }
//       );
//       setAvailableNurses(response.data);
//     } catch (error) {
//       console.error("Error searching nurses:", error);
//     }
//   };

//   const handleSelectNurse = (nurse) => {
//     setSelectedNurses([...selectedNurses, nurse]);
//     setAvailableNurses(availableNurses.filter((n) => n._id !== nurse._id));
//   };

//   const handleRemoveNurse = (nurseId) => {
//     const nurseToRemove = selectedNurses.find((n) => n._id === nurseId);
//     if (nurseToRemove) {
//       setAvailableNurses([...availableNurses, nurseToRemove]);
//       setSelectedNurses(selectedNurses.filter((n) => n._id !== nurseId));
//     }
//   };

//   const handleSubmitRequest = async () => {
//     try {
//       await axios.post(
//         `http://localhost:9999/hospital-service/api/hospital/requestStaff`,
//         {
//           hospitalId,
//           nurseIds: selectedNurses.map((n) => n._id),
//           date,
//           fromTime,
//           toTime,
//         }
//       );
//       onRequestSubmit();
//     } catch (error) {
//       console.error("Error submitting request:", error);
//     }
//   };

//   return (
//     <div className="request-staff-container">
//       <div className="request-filters">
//         <div className="search-container">
//           <FaSearch className="search-icon" />
//           <input
//             type="search"
//             placeholder="Search staff by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//           >
//             <option value="">All Specialties</option>
//             <option value="ICU">ICU</option>
//             <option value="Pediatrics">Pediatrics</option>
//             <option value="Surgery">Surgery</option>
//           </select>
//         </div>

//         <div className="date-time-group">
//           <div className="filter-item">
//             <FaCalendarAlt className="filter-icon" />
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//           <div className="filter-item">
//             <FaClock className="filter-icon" />
//             <input
//               type="time"
//               value={fromTime}
//               onChange={(e) => setFromTime(e.target.value)}
//             />
//           </div>
//           <div className="filter-item">
//             <FaClock className="filter-icon" />
//             <input
//               type="time"
//               value={toTime}
//               onChange={(e) => setToTime(e.target.value)}
//             />
//           </div>
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       </div>

//       <div className="nurse-selection">
//         <div className="available-nurses">
//           <h3>Available Nurses</h3>
//           {availableNurses.length > 0 ? (
//             <ul>
//               {availableNurses.map((nurse) => (
//                 <li key={nurse._id}>
//                   {nurse.name} - {nurse.specialty}
//                   <button onClick={() => handleSelectNurse(nurse)}>
//                     <FaUserPlus /> Select
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No nurses available matching your criteria</p>
//           )}
//         </div>

//         <div className="selected-nurses">
//           <h3>Selected Nurses</h3>
//           {selectedNurses.length > 0 ? (
//             <>
//               <ul>
//                 {selectedNurses.map((nurse) => (
//                   <li key={nurse._id}>
//                     {nurse.name} - {nurse.specialty}
//                     <button onClick={() => handleRemoveNurse(nurse._id)}>
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 className="submit-request"
//                 onClick={handleSubmitRequest}
//                 disabled={!date || !fromTime || !toTime}
//               >
//                 Submit Request
//               </button>
//             </>
//           ) : (
//             <p>No nurses selected</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestStaff;

import React, { useState } from "react";
import "../HospitalAdminDahsboard/RequestStaff.css";

const RequestStaffTab = () => {
  const [searchDate, setSearchDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Sample available nurses data
  const availableNurses = [
    {
      id: 1,
      name: "Alex Morgan",
      specialty: "Emergency",
      experience: "5 years",
      rating: 4.8,
      availableDates: ["2023-06-15", "2023-06-16", "2023-06-20"],
      availableTimes: ["08:00-16:00", "16:00-24:00"],
    },
    {
      id: 2,
      name: "Taylor Swift",
      specialty: "Pediatrics",
      experience: "3 years",
      rating: 4.5,
      availableDates: ["2023-06-15", "2023-06-18"],
      availableTimes: ["08:00-16:00"],
    },
    {
      id: 3,
      name: "Jamie Lee",
      specialty: "ICU",
      experience: "7 years",
      rating: 4.9,
      availableDates: ["2023-06-16", "2023-06-17"],
      availableTimes: ["16:00-24:00", "00:00-08:00"],
    },
  ];

  const handleSearch = () => {
    if (!searchDate || !fromTime || !toTime) {
      alert("Please fill all search fields");
      return;
    }

    const results = availableNurses.filter(
      (nurse) =>
        nurse.availableDates.includes(searchDate) &&
        nurse.availableTimes.some((time) => {
          const [nurseFrom, nurseTo] = time.split("-");
          return (
            (fromTime >= nurseFrom && fromTime < nurseTo) ||
            (toTime > nurseFrom && toTime <= nurseTo) ||
            (fromTime <= nurseFrom && toTime >= nurseTo)
          );
        })
    );

    setSearchResults(results);
  };

  const handleCardClick = (nurse) => {
    setSelectedNurse(nurse);
    setShowDetails(true);
  };

  const handleRequest = () => {
    alert(`Request sent for ${selectedNurse.name}`);
    setShowDetails(false);
  };

  return (
    <div className="request-staff-tab">
      <h2>Request Additional Staff</h2>

      <div className="search-container">
        <div className="search-field">
          <label htmlFor="searchDate">Date</label>
          <input
            type="date"
            id="searchDate"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="fromTime">From Time</label>
          <input
            type="time"
            id="fromTime"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="toTime">To Time</label>
          <input
            type="time"
            id="toTime"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </div>

        <button className="search-btn" onClick={handleSearch}>
          Search Available Nurses
        </button>
      </div>

      <div className="results-container">
        {searchResults.length > 0 ? (
          <div className="nurse-cards">
            {searchResults.map((nurse) => (
              <div
                key={nurse.id}
                className="nurse-card"
                onClick={() => handleCardClick(nurse)}
              >
                <h3>{nurse.name}</h3>
                <p>
                  <strong>Specialty:</strong> {nurse.specialty}
                </p>
                <p>
                  <strong>Experience:</strong> {nurse.experience}
                </p>
                <p>
                  <strong>Rating:</strong> {nurse.rating}/5
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            No available nurses found. Try different search criteria.
          </p>
        )}
      </div>

      {showDetails && selectedNurse && (
        <div className="nurse-details-modal">
          <div className="modal-content">
            <h3>{selectedNurse.name}</h3>
            <div className="details-grid">
              <div>
                <p>
                  <strong>Specialty:</strong> {selectedNurse.specialty}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedNurse.experience}
                </p>
              </div>
              <div>
                <p>
                  <strong>Rating:</strong> {selectedNurse.rating}/5
                </p>
                <p>
                  <strong>Available Times:</strong>{" "}
                  {selectedNurse.availableTimes.join(", ")}
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="request-btn" onClick={handleRequest}>
                Request This Nurse
              </button>
              <button
                className="close-btn"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestStaffTab;
