// import React, { useEffect, useState } from "react";
// import "./AcceptedStaff.css";
// import axios from "axios";

// const AcceptedStaff = () => {
//   const [acceptedNurses, setAcceptedNurses] = useState([]);
//   const [nurses, setNurses] = useState([]);
//   const [showFloorModal, setShowFloorModal] = useState(false);
//   const [selectedNurse, setSelectedNurse] = useState(null);
//   const [floor, setFloor] = useState("");

//   const handleFloorAssignment = (nurse) => {
//     axios
//       .put(
//         `http://localhost:9999/hospital-service/api/hospital/nurse/assignNurseToFloor?floor=${floor}&hospitalStaffId=${nurse.hospitalStaffId}`
//       )
//       .then((response) => {
//         console.log(response);
//         fetchHospitalNurses;
//       });
//     console.log(floor);

//     console.log(nurse);
//   };

//   const fetchHospitalNurses = async () => {
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
//         const acceptedNurses = allNurses.filter((nurse) => {
//           console.log(nurse);
//           console.log(nurse.staffRequestStatus);

//           return nurse.staffRequestStatus === "accepted";
//         });
//         console.log(acceptedNurses);

//         setAcceptedNurses(acceptedNurses);
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHospitalNurses();
//   }, []);

//   const assignFloor = (nurse) => {
//     setSelectedNurse(nurse);

//     setShowFloorModal(true);
//   };

//   const saveFloorAssignment = () => {
//     handleFloorAssignment(selectedNurse);
//     setShowFloorModal(false);
//   };

//   return (
//     <div className="accepted-staff">
//       <h2>Accepted Staff Assignments</h2>

//       <div className="accepted-table-container">
//         <table className="accepted-table">
//           <thead>
//             <tr>
//               <th>Hospital Staff Id</th>
//               <th>Specialty</th>
//               <th>Date</th>
//               <th>Start</th>
//               <th>End</th>

//               <th>Assigned Floor</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {acceptedNurses.map((nurse) => (
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
//                 <td>{nurse.floorAssigned || "Not assigned"}</td>
//                 <td>
//                   <button
//                     className="assign-btn"
//                     onClick={() => assignFloor(nurse)}
//                   >
//                     {nurse.floorAssigned ? "Change Floor" : "Assign Floor"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showFloorModal && selectedNurse && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Assign Floor to {selectedNurse.name}</h3>
//             <div className="form-group">
//               <label>Select Floor</label>
//               <select value={floor} onChange={(e) => setFloor(e.target.value)}>
//                 <option value="">Select a floor</option>
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((f) => (
//                   <option key={f} value={f}>
//                     Floor {f}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="modal-actions">
//               <button
//                 className="save-btn"
//                 onClick={saveFloorAssignment}
//                 disabled={!floor}
//               >
//                 Save Assignment
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setShowFloorModal(false)}
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

// export default AcceptedStaff;

import React, { useEffect, useState } from "react";
import "./AcceptedStaff.css";
import axios from "axios";

const AcceptedStaff = () => {
  const [acceptedNurses, setAcceptedNurses] = useState([]);
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [floor, setFloor] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHospitalNurses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${localStorage.getItem(
          "hospitalId"
        )}`
      );

      if (response.status === 200) {
        const accepted = response.data.filter(
          (nurse) => nurse.staffRequestStatus === "accepted"
        );
        setAcceptedNurses(accepted);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFloorAssignment = async (nurse) => {
    if (!floor) return;

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:9999/hospital-service/api/hospital/nurse/assignNurseToFloor?floor=${floor}&hospitalStaffId=${nurse.hospitalStaffId}`
      );

      if (response.status === 200) {
        // Update local state immediately for instant feedback
        setAcceptedNurses((prev) =>
          prev.map((n) =>
            n.hospitalStaffId === nurse.hospitalStaffId
              ? { ...n, floorAssigned: floor }
              : n
          )
        );

        // Refresh data from server to ensure consistency
        await fetchHospitalNurses();
      }
    } catch (error) {
      console.error("Error assigning floor:", error);
      alert("Failed to update floor assignment");
    } finally {
      setLoading(false);
      setShowFloorModal(false);
    }
  };

  useEffect(() => {
    fetchHospitalNurses();
  }, []);

  const assignFloor = (nurse) => {
    setSelectedNurse(nurse);
    setFloor(nurse.floorAssigned || "");
    setShowFloorModal(true);
  };

  return (
    <div className="accepted-staff">
      <div className="header-container">
        <h2>Accepted Staff Assignments</h2>
        <button
          className="refresh-btn"
          onClick={fetchHospitalNurses}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="accepted-table-container">
        <table className="accepted-table">
          <thead>
            <tr>
              <th>Hospital Staff Id</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Assigned Floor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {acceptedNurses.length > 0 ? (
              acceptedNurses.map((nurse) => (
                <tr key={nurse.hospitalStaffId}>
                  <td>{nurse.hospitalStaffId || "N/A"}</td>
                  <td>{nurse.specialty || nurse.staffId || "N/A"}</td>
                  <td>{new Date(nurse.requestedFrom).toLocaleDateString()}</td>
                  <td>{new Date(nurse.requestedFrom).toLocaleTimeString()}</td>
                  <td>{new Date(nurse.requestedUpto).toLocaleTimeString()}</td>
                  <td>{nurse.floorAssigned || "Not assigned"}</td>
                  <td>
                    <button
                      className="assign-btn"
                      onClick={() => assignFloor(nurse)}
                      disabled={loading}
                    >
                      {loading &&
                      selectedNurse?.hospitalStaffId === nurse.hospitalStaffId
                        ? "Updating..."
                        : nurse.floorAssigned
                        ? "Change Floor"
                        : "Assign Floor"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  {loading ? "Loading..." : "No accepted staff found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showFloorModal && selectedNurse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Assign Floor to {selectedNurse.name}</h3>
            <div className="form-group">
              <label>Select Floor</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                disabled={loading}
              >
                <option value="">Select a floor</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((f) => (
                  <option key={f} value={f}>
                    Floor {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={() => handleFloorAssignment(selectedNurse)}
                disabled={!floor || loading}
              >
                {loading ? "Saving..." : "Save Assignment"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowFloorModal(false)}
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

export default AcceptedStaff;
