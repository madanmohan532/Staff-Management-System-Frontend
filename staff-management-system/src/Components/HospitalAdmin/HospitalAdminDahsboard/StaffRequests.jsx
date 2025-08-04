// import React, { useEffect, useState } from "react";
// import "./StaffRequests.css";
// import axios from "axios";

// const StaffRequests = () => {
//   const [searchDate, setSearchDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedNurse, setSelectedNurse] = useState(null);
//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [requestedNurses, setRequestedNurses] = useState([]);
//   const [nurses, setNurses] = useState([]);
//   const [id, setId] = useState(localStorage.getItem("hospitalId"));

//   const fetchHospitalNurses = async () => {
//     console.log("i am here");

//     if (!id) return;
//     console.log("i am here");

//     try {
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${localStorage.getItem(
//           "hospitalId"
//         )}`
//       );
//       if (response.status === 200) {
//         const allNurses = response.data;
//         setNurses(allNurses);
//         // setNurses(response.data);
//         const requestedNurses = allNurses.filter((nurse) => {
//           console.log(nurse);
//           console.log(nurse.staffRequestStatus);

//           return nurse.staffRequestStatus === "requested";
//         });
//         console.log(requestedNurses);

//         setRequestedNurses(requestedNurses);
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   const fetchAvailableHospitalNurses = async (detail) => {
//     console.log("i am here");

//     if (!id) return;
//     console.log("i am here");

//     try {
//       const response = await axios.post(
//         `http://localhost:9999/hospital-service/api/hospital/getNurseDetails`,
//         detail
//       );
//       if (response.status === 200) {
//         setSearchResults(response.data);
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   const submitRequest = async (detail) => {
//     console.log(detail);

//     console.log("i am here");

//     console.log("i am here");

//     try {
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
//         detail
//       );
//       if (response.status === 200) {
//         // setSearchResults(response.data);

//         fetchHospitalNurses();
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHospitalNurses();

//     console.log(requestedNurses);
//   }, []);

//   const handleSearch = () => {
//     if (searchDate === null || startTime === null || endTime === null) {
//       alert("proide");
//       return;
//     }

//     console.log(endTime);
//     console.log(startTime);
//     console.log(searchDate);

//     const detail = {
//       date: searchDate,
//       from: searchDate + "T" + startTime + ":00Z",
//       to: searchDate + "T" + endTime + ":00Z",
//     };

//     fetchAvailableHospitalNurses(detail);
//   };
//   console.log(requestedNurses);

//   const handleRequest = (nurse) => {
//     // const newRequest = {
//     //   staffId: nurse._id,
//     //   date: searchDate,
//     //   specialty: nurse.specialty,
//     //   date: searchDate,
//     //   time: `${startTime}-${endTime}`,
//     //   status: "Pending",
//     // };

//     if (!searchDate || !startTime || !endTime) {
//       return alert("provide all the details");
//     }

//     const newRequest = {
//       staffId: nurse._id,
//       date: searchDate,
//       from: searchDate + "T" + startTime + ":00Z",
//       to: searchDate + "T" + endTime + ":00Z",
//       hospitalId: localStorage.getItem("hospitalId"),
//     };

//     submitRequest(newRequest);

//     setShowRequestModal(false);
//   };

//   const handleCancelRequest = async (cancelDetail) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:9999/hospital-service/api/hospital/cancelSingleNurseRequest`,
//         cancelDetail
//       );
//       if (response.status === 200) {
//         // setSearchResults(response.data);

//         console.log(response.data);

//         fetchHospitalNurses();
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   const cancelRequest = (nurse) => {
//     const cancelDetail = {
//       staffId: nurse.staffId,
//       date: new Date(nurse.requestedFrom).toLocaleDateString(),
//       from: nurse.requestedFrom,
//       to: nurse.requestedUpto,
//       hospitalId: nurse.hospitalId,
//     };

//     console.log(cancelDetail);

//     handleCancelRequest(cancelDetail);
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
//                   <strong>Specialty:</strong> {nurse.skills[0]}
//                 </p>
//                 <p>
//                   <strong>Experience: </strong>
//                   {nurse.yearOfExperience}
//                 </p>
//                 <p>
//                   <strong>Contact</strong>
//                   {nurse.contactDetails.phone}
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

//       <div className="requested-staff">
//         <h3>Requested Staff</h3>
//         <table className="requests-table">
//           <thead>
//             <tr>
//               <th>Hospital Staff</th>
//               <th>Specialty</th>
//               <th>Date</th>
//               <th>Start</th>
//               <th>End</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requestedNurses.map((nurse) => (
//               <tr key={nurse.id}>
//                 <td>{nurse.hospitalStaffId || "N/A"}</td>
//                 <td>{nurse.staffId}</td>
//                 <td>{new Date(nurse.requestedFrom).toLocaleDateString()}</td>
//                 <td>{new Date(nurse.requestedFrom).toLocaleTimeString()}</td>
//                 <td>
//                   <span>
//                     {new Date(nurse.requestedUpto).toLocaleTimeString()}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="cancel-btn"
//                     onClick={() => cancelRequest(nurse)}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showRequestModal && selectedNurse && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Confirm Staff Request</h3>
//             <div className="request-details">
//               <p>
//                 <strong>Nurse:</strong> {selectedNurse.firstName}
//               </p>
//               <p>
//                 <strong>Specialty:</strong>{" "}
//                 {selectedNurse.skills[0] +
//                   ", " +
//                   selectedNurse.skills[1] +
//                   " , " +
//                   selectedNurse.skills[2]}
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
//     </div>
//   );
// };

// export default StaffRequests;

import React, { useEffect, useState } from "react";
import "./StaffRequests.css";
import axios from "axios";

const StaffRequests = () => {
  const [searchDate, setSearchDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestedNurses, setRequestedNurses] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [id, setId] = useState(localStorage.getItem("hospitalId"));

  // Modal state for validation message
  const [showValidationModal, setShowValidationModal] = useState(false);

  const fetchHospitalNurses = async () => {
    if (!id) return;

    try {
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${id}`
      );
      if (response.status === 200) {
        const allNurses = response.data;
        setNurses(allNurses);
        const requested = allNurses.filter(
          (nurse) => nurse.staffRequestStatus === "requested"
        );
        setRequestedNurses(requested);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const fetchAvailableHospitalNurses = async (detail) => {
    if (!id) return;

    try {
      const response = await axios.post(
        `http://localhost:9999/hospital-service/api/hospital/getNurseDetails`,
        detail
      );
      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const submitRequest = async (detail) => {
    console.log(detail);

    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/requestSingleNurse`,
        detail
      );
      if (response.status === 200) {
        fetchHospitalNurses();
      }
    } catch (error) {
      console.error("Error submitting nurse request:", error);
    }
  };

  useEffect(() => {
    fetchHospitalNurses();
  }, []);

  // Validate search inputs before calling API
  const handleSearch = () => {
    if (!searchDate || !startTime || !endTime) {
      setShowValidationModal(true);
      return;
    }

    const detail = {
      date: searchDate,
      from: `${searchDate}T${startTime}:00Z`,
      to: `${searchDate}T${endTime}:00Z`,
    };

    fetchAvailableHospitalNurses(detail);
  };

  const handleRequest = (nurse) => {
    console.log(searchDate + "search date");
    console.log(startTime);

    const newRequest = {
      staffId: nurse._id,
      date: searchDate,
      from: `${searchDate}T${startTime}:00Z`,
      to: `${searchDate}T${endTime}:00Z`,
      hospitalId: id,
    };

    console.log(searchDate);
    console.log(startTime);

    submitRequest(newRequest);
    setShowRequestModal(false);
  };

  const handleCancelRequest = async (cancelDetail) => {
    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/cancelSingleNurseRequest`,
        cancelDetail
      );
      if (response.status === 200) {
        fetchHospitalNurses();
      }
    } catch (error) {
      console.error("Error cancelling nurse request:", error);
    }
  };

  const cancelRequest = (nurse) => {
    const cancelDetail = {
      staffId: nurse.staffId,
      date: new Date(nurse.requestedFrom).toLocaleDateString(),
      from: nurse.requestedFrom,
      to: nurse.requestedUpto,
      hospitalId: nurse.hospitalId,
    };

    handleCancelRequest(cancelDetail);
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
          <button className="search-btn" onClick={handleSearch}>
            Search Available Nurses
          </button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Available Nurses</h3>
          <div className="nurse-cards">
            {searchResults.map((nurse) => (
              <div key={nurse.id} className="nurse-card">
                <h4>{nurse.firstName}</h4>
                <p>
                  <strong>Specialty:</strong> {nurse.skills.join(", ")}
                </p>
                <p>
                  <strong>Experience: </strong>
                  {nurse.yearOfExperience}
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
      )}

      <div className="requested-staff">
        <h3>Requested Staff</h3>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Hospital Staff</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedNurses.map((nurse) => (
              <tr key={nurse.id}>
                <td>{nurse.hospitalStaffId || "N/A"}</td>
                <td>{nurse.staffId}</td>
                <td>{new Date(nurse.requestedFrom).toLocaleDateString()}</td>
                <td>{new Date(nurse.requestedFrom).toLocaleTimeString()}</td>
                <td>{new Date(nurse.requestedUpto).toLocaleTimeString()}</td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelRequest(nurse)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Validation Error</h3>
            <p>
              Please provide Date, Start Time, and End Time before searching.
            </p>
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
