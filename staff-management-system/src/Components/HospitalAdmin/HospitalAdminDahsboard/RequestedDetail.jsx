import React, { useEffect } from "react";

const RequestedDetails = ({ nurses, onCancelRequest }) => {
  if (nurses.length === 0) {
    return <div className="no-data">No requested nurses at this time.</div>;
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

  return (
    <div className="details-table">
      <h2>Requested Nurses</h2>
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
                <button
                  className="cancel-btn"
                  onClick={() => onCancelRequest(nurse.id)}
                >
                  Cancel Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestedDetails;
