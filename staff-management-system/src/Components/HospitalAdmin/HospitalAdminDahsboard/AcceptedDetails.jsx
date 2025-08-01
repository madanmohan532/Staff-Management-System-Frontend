import axios from "axios";
import React, { useEffect, useState } from "react";

const AcceptedDetails = ({ nurses, onAcceptNurse, onAssignNurse }) => {
  const [selectedFloors, setSelectedFloors] = useState({});

  if (!nurses || nurses.length === 0) {
    return <div className="no-data">No accepted nurses at this time.</div>;
  }

  const [allNurses, setAllNurses] = useState([]);
  const [enrichedNurses, setEnrichedNurses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/admin-service/api/admin/nurse/nurseDetails")
      .then((response) => {
        if (response.status === 200) {
          setAllNurses(response.data);
        } else {
          console.log("No nurses found");
        }
      })
      .catch((error) => {
        console.error("Error fetching nurses:", error);
      });
  }, []);

  useEffect(() => {
    if (!allNurses || !nurses) return;

    const result = nurses.map((nurse) => {
      const fullNurse = allNurses.find((n) => n._id === nurse.staffId);
      return {
        ...nurse,
        fullDetails: fullNurse || null, // attach full nurse details or null if not found
      };
    }, []);

    // For example, update state if you have setNurses or setEnrichedNurses:
    setEnrichedNurses(result);
  }, [allNurses, nurses]);

  const handleFloorChange = (nurseId, floor) => {
    setSelectedFloors((prev) => ({ ...prev, [nurseId]: floor }));
  };

  return (
    <div className="details-table">
      <h2>Accepted Nurses</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Requested Start</th>
            <th>Reqeusted End</th>
            <th>Assign to Floor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrichedNurses.map((nurse) => (
            <tr key={nurse.id}>
              <td>{nurse.hospitalStaffId}</td>
              <td>{nurse.fullDetails?.firstName || "N/A"}</td>
              <td>{nurse.fullDetails?.skills[0] || "N/A"}</td>
              <td>{nurse.staffRequestStatus}</td>
              <td>{nurse.fullDetails?.yearOfExperience}</td>
              <td>
                {nurse.requestedFrom
                  ? new Date(nurse.requestedFrom).toLocaleDateString() +
                    " " +
                    new Date(nurse.requestedFrom).toLocaleTimeString()
                  : "N/A"}
              </td>
              <td>
                {/* Display working since date if available, formatted */}
                {nurse.requestedUpto
                  ? new Date(nurse.requestedUpto).toLocaleDateString() +
                    " " +
                    new Date(nurse.requestedUpto).toLocaleTimeString()
                  : "N/A"}
              </td>
              <td>
                <select
                  value={selectedFloors[nurse.id] || ""}
                  onChange={(e) => handleFloorChange(nurse.id, e.target.value)}
                >
                  <option value="">Select Floor</option>
                  <option value="1">Floor 1</option>
                  <option value="2">Floor 2</option>
                  <option value="3">Floor 3</option>
                  <option value="4">Floor 4</option>
                  <option value="5">Floor 5</option>
                </select>
              </td>
              <td>
                <button
                  className="assign-btn"
                  onClick={() =>
                    onAssignNurse(nurse.id, selectedFloors[nurse.id])
                  }
                  disabled={!selectedFloors[nurse.id]}
                >
                  Assign
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => onAcceptNurse(nurse.id)}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptedDetails;
