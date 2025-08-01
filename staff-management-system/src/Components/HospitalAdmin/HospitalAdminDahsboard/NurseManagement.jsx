import React, { useEffect, useState } from "react";
import "./NurseManagement.css";
import axios from "axios";

const NurseManagement = (props) => {
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showFloorModal, setShowFloorModal] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [extension, setExtension] = useState("");
  const [floor, setFloor] = useState("");
  const [nurses, setNurses] = useState([]);
  const [id, setId] = useState(props.id);

  const fetchHospitalNurses = async () => {
    console.log("i am here");

    if (!id) return;
    console.log("i am here");

    try {
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${props.id}`
      );
      if (response.status === 200) {
        setNurses(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  useEffect(() => {
    fetchHospitalNurses();
  }, [id]);

  const handleRemove = (i) => {
    console.log(i);

    // axios
    //   .put(
    //     "http://localhost:9999/hospital-service/api/hospital/nurse/updateHospitalNurse",
    //     {
    //       id: i,
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     fetchHospitalNurses();
    //   });
  };

  const handleExtensionRequest = (nurse) => {
    setSelectedNurse(nurse);
    setExtension(nurse.extension);
    setShowExtensionModal(true);
  };

  const handleFloorAssignment = (nurse) => {
    // axios
    //   .put(
    //     "http://localhost:9999/hospital-service/api/hospital/nurse/assignNurseToFloor",
    //     {
    //       floor: nurse.floorAssigned,
    //       id: nurse.id,
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });

    console.log(nurse);
  };

  const saveExtension = () => {
    setNurses(
      nurses.map((n) =>
        n.id === selectedNurse.id ? { ...n, extension: extension } : n
      )
    );
    setShowExtensionModal(false);
  };

  const saveFloor = () => {
    setNurses(
      nurses.map((n) =>
        n.id === selectedNurse.id ? { ...n, floor: floor } : n
      )
    );
    setShowFloorModal(false);
  };

  return (
    <div className="nurse-management">
      <div className="management-header">
        <h2>Nurse Management</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-value">{nurses.length}</span>
            <span className="stat-label">Total Nurses</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {nurses.filter((n) => n.workingStatus).length}
            </span>
            <span className="stat-label">Active</span>
          </div>
        </div>
      </div>

      <div className="nurses-table-container">
        <table className="nurses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned Floor</th>
              <th>Available From</th>
              <th>Available Upto</th>

              <th>Status</th>

              <th style={({ justifySelf: "center" }, { alignSelf: "center" })}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse) => (
              <tr key={nurse.id}>
                <td>{nurse.hospitalStaffId}</td>
                <td>{nurse.floorAssigned}</td>
                <td>{nurse.availableFrom}</td>
                <td>{nurse.availableUpto}</td>
                <td>{nurse.workingStatus ? "Yes" : "No"}</td>

                <td className="actions-cell">
                  <button
                    className="action-btn remove-btn"
                    onClick={() => handleRemove(nurse)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseManagement;
