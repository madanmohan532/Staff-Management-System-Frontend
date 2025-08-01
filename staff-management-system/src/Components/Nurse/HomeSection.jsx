import React, { useState, useEffect } from "react";
import {
  FaToggleOn,
  FaToggleOff,
  FaPaperPlane,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./NurseDashboard.css";
import axios from "axios";

const HomeSection = ({ nurseId }) => {
  const [availability, setAvailability] = useState(false);
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [requests, setRequests] = useState([]);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [nurse, setNurse] = useState({});

  const fetchHospitals = async () => {
    await axios
      .get(
        "http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails"
      )
      .then((response) => {
        if (response.status === 200) {
          setAllHospitals(response.data);
        } else {
          console.log("No hospitals found");
        }
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
      });
  };

  const fetchNurseDetails = () => {
    axios
      .get(
        `http://localhost:9999/staff-service/api/nurse//${localStorage.getItem(
          "nurseId"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const results = response.data;

          setAvailability(results.availableStatus);
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const fetchRequestedDetails = () => {
    axios
      .get(
        `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${localStorage.getItem(
          "nurseId"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const results = response.data;
          const schedules = results.filter((schedule) => {
            return schedule.status === "requested";
          });
          setWorkSchedule(schedules);
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    // Fetch data for availability & requests in real implementation
    // axios.get(...).then(r => ...)
    fetchNurseDetails();
    fetchRequestedDetails();
    fetchHospitals();
  }, []);

  const handleToggleAvailability = () => {
    setAvailability(!availability);
    axios
      .put(
        `http://localhost:9999/staff-service/api/nurse/setAvailability/${localStorage.getItem(
          "nurseId"
        )}/${availability}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    // Update backend...
  };

  const handleApplyLeave = () => {
    if (!leaveFrom || !leaveTo) {
      alert("Select both dates.");
      return;
    } else {
      console.log(leaveTo);

      const leaveDetail = {
        from: leaveFrom + "T00:00:00Z",
        to: leaveTo + "T00:00:00Z",
        nurseId: localStorage.getItem("nurseId"),
      };
      axios
        .put(
          `http://localhost:9999/staff-service/api/nurse/applyLeave`,
          leaveDetail
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
      // Update backend...
    }

    // Hit backend for leave application...

    alert("Leave applied successfully!");
    setLeaveFrom("");
    setLeaveTo("");
  };

  const handleAccept = (reqId) => {
    // Accept request backend...
    setRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handleReject = (reqId) => {
    // Reject request backend...
    setRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>
      <div className="quick-actions-grid">
        <div className="availability-card">
          <span>Availability</span>
          <button
            className={availability ? "avail-switch on" : "avail-switch"}
            onClick={handleToggleAvailability}
            aria-label="Toggle availability"
          >
            {availability ? (
              <FaToggleOn size={38} color="#2ecc40" />
            ) : (
              <FaToggleOff size={38} color="#bbb" />
            )}
          </button>
          <span className={availability ? "avail-label on" : "avail-label"}>
            {availability ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="apply-leave-card">
          <span>Apply Leave</span>
          <div className="leave-form">
            <input
              type="date"
              value={leaveFrom}
              onChange={(e) => setLeaveFrom(e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={leaveTo}
              onChange={(e) => setLeaveTo(e.target.value)}
            />
            <button className="submit-btn" onClick={handleApplyLeave}>
              <FaPaperPlane /> Apply
            </button>
          </div>
        </div>
      </div>
      <div className="section-header">
        <h2>Staff Requests</h2>
      </div>
      <div className="requests-list">
        {workSchedule.length === 0 ? (
          <div className="empty-list">No current requests.</div>
        ) : (
          workSchedule.map((req) => (
            <div key={req.id} className="request-card">
              <div>
                <b>From:</b> {new Date(req.from).toLocaleString()}
                <br />
                <b>To:</b> {new Date(req.to).toLocaleString()}
                <br />
                <b>Hospital Id: </b>
                {req.hospitalId}
              </div>
              <div className="request-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(req.id)}
                >
                  <FaCheck /> Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(req.id)}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default HomeSection;
