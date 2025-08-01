import axios from "axios";
import React, { useEffect, useState } from "react";

const WorkingNurseDetails = ({ nurses }) => {
  if (!nurses || nurses.length === 0) {
    return <div className="no-data">No working nurses at this time.</div>;
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
    });

    // For example, update state if you have setNurses or setEnrichedNurses:
    setEnrichedNurses(result);
  }, [allNurses, nurses]);

  return (
    <div className="details-table">
      <h2>Working Nurses</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
            <th>Floor Assigned</th>
            <th>Shift Start</th>
            <th>Shift End</th>
            {/* Add Actions header here if you want nurse-specific actions */}
          </tr>
        </thead>
        <tbody>
          {enrichedNurses.map((nurse) => (
            <tr key={nurse.id}>
              <td>{nurse.hospitalStaffId}</td>
              <td>{nurse.fullDetails?.firstName || "N/A"}</td>
              <td>{nurse.fullDetails?.skills[0] || "N/A"}</td>
              <td>{nurse.fullDetails?.yearOfExperience || "N/A"}</td>
              <td>{nurse.floorAssigned || "N/A"}</td>
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
              {/* Uncomment below if you want an action button, e.g., to mark inactive */}
              {/*
              <td>
                <button
                  className="some-action-btn"
                  onClick={() => someHandler(nurse.id)}
                >
                  Some Action
                </button>
              </td>
              */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkingNurseDetails;
