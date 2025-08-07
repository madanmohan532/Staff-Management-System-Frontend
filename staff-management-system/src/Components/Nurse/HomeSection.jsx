import React, { useState, useEffect } from "react";
import {
  FaToggleOn,
  FaToggleOff,
  FaPaperPlane,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./HomeSection.css";
import axios from "axios";

const HomeSection = ({ nurseData }) => {
  const [availability, setAvailability] = useState(false);
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [workSchedule, setWorkSchedule] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const currentNurseId = localStorage.getItem("nurseId");

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails"
      );
      if (response.status === 200) {
        setAllHospitals(response.data);
      } else {
        console.log("No hospitals found");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const fetchNurseDetails = async () => {
    if (!currentNurseId) return;
    try {
      const response = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/${currentNurseId}`
      );
      if (response.status === 200) {
        setAvailability(response.data.availableStatus);
      } else {
        console.log("No nurse found");
      }
    } catch (error) {
      console.error("Error fetching nurse:", error);
    }
  };

  const fetchRequestedDetails = async () => {
    if (!currentNurseId) return;
    try {
      const response = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${currentNurseId}`
      );
      if (response.status === 200) {
        const schedules = response.data.filter((schedule) => {
          return schedule.status === "requested";
        });
        setWorkSchedule(schedules);
      } else {
        console.log("No work schedule found");
      }
    } catch (error) {
      console.error("Error fetching work schedule:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchNurseDetails();
      await fetchRequestedDetails();
      await fetchHospitals();
      setLoading(false);
    };
    fetchData();
  }, [currentNurseId]);

  const handleToggleAvailability = async () => {
    // 1. Correctly toggle the state first
    const newAvailability = !availability;
    setAvailability(newAvailability);
    setMessage(""); // Clear any previous messages

    try {
      // 2. Make the API call with the NEW availability value
      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/setAvailability/${currentNurseId}/${newAvailability}`
      );
      if (response.status === 200) {
        setMessage(
          `Availability set to ${
            newAvailability ? "Available" : "Unavailable"
          }.`
        );
      } else {
        // If the API call fails, revert the state to the old value
        setMessage("Failed to update availability. Please try again.");
        setAvailability(availability);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      setMessage("Error updating availability. Please try again.");
      setAvailability(availability);
    }
  };

  const handleApplyLeave = async () => {
    // ... (This function is unchanged, as it was working correctly)
    if (!leaveFrom || !leaveTo) {
      setMessage("Select both dates.");
      return;
    } else {
      setMessage("");
      try {
        setLoading(true);
        const leaveDetail = {
          from: leaveFrom,
          to: leaveTo,
          nurseId: currentNurseId,
        };
        const response = await axios.put(
          `http://localhost:9999/staff-service/api/nurse/applyLeave`,
          leaveDetail
        );
        if (response.status === 200) {
          setMessage("Leave applied successfully!");
          setLeaveFrom("");
          setLeaveTo("");
        } else {
          setMessage("Failed to apply leave.");
        }
      } catch (error) {
        console.error("Error applying leave:", error);
        setMessage("Error applying leave.");
      } finally {
        setLoading(false);
      }
    }

    console.log(leaveFrom, leaveTo);
  };

  const handleAccept = async (req) => {
    // ... (This function is unchanged, as it was working correctly)
    setMessage("");
    try {
      setLoading(true);
      const payload = { ...req, status: "accepted", nurseId: currentNurseId };
      console.log(payload);

      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/responseToHospitalRequest`,
        payload
      );
      if (response.status === 200) {
        console.log(response.data);

        setMessage("Request accepted successfully!");
        fetchRequestedDetails();
      } else {
        setMessage("Failed to accept request.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      setMessage("Error accepting request.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (req) => {
    // ... (This function is unchanged, as it was working correctly)
    setMessage("");
    console.log(req);

    try {
      setLoading(true);
      const payload = { ...req, status: "rejected", nurseId: currentNurseId };
      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/rejectToHospitalRequest`,
        payload
      );
      if (response.status === 200) {
        console.log(response.data);

        setMessage("Request rejected successfully!");
        fetchRequestedDetails();
      } else {
        setMessage("Failed to reject request.");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      setMessage("Error rejecting request.");
    } finally {
      setLoading(false);
    }
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
                  onClick={() => handleAccept(req)}
                >
                  <FaCheck /> Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(req)}
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
