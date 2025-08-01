import React, { useState, useEffect } from "react";
import axios from "axios";

const HospitalAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // default tab
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [loggedInUser, setLoggedInUser] = useState({});
  const [nurses, setNurses] = useState([]);

  // Derived states
  const workingNurses = nurses.filter((n) => n.workingStatus === true);
  const requestedNurses = nurses.filter(
    (n) => n.staffRequestStatus === "requested"
  );
  const acceptedNurses = nurses.filter(
    (n) => n.staffRequestStatus === "accepted"
  );

  // Fetch hospital admin user
  const fetchLoggedInUser = async () => {
    if (!userEmail) return;
    try {
      const res = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
      );
      if (res.status === 200) setLoggedInUser(res.data);
    } catch (error) {
      console.error("Error fetching hospital user", error);
    }
  };

  // Fetch nurses associated with hospital
  const fetchNurses = async () => {
    if (!loggedInUser._id) return;
    try {
      const res = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
      );
      if (res.status === 200) setNurses(res.data);
    } catch (error) {
      console.error("Error fetching nurses", error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, [userEmail]);
  useEffect(() => {
    if (loggedInUser._id) fetchNurses();
  }, [loggedInUser]);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "1rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav style={navStyle}>
        {["dashboard", "requestStaff", "manageStaff"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={activeTab === tab ? activeNavButtonStyle : navButtonStyle}
          >
            {tab === "dashboard"
              ? "Dashboard"
              : tab === "requestStaff"
              ? "Request Staff"
              : "Manage Staff"}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ padding: "1rem" }}>
        {activeTab === "dashboard" && (
          <div style={summaryContainerStyle}>
            <StatCard
              icon="👩‍⚕️"
              label="Working Nurses"
              count={workingNurses.length}
            />
            <StatCard
              icon="🕒"
              label="Requested Nurses"
              count={requestedNurses.length}
            />
            <StatCard
              icon="✅"
              label="Accepted Nurses"
              count={acceptedNurses.length}
            />
          </div>
        )}

        {activeTab === "requestStaff" && (
          <section style={{ maxWidth: 600, margin: "auto" }}>
            <h2>Request Staff</h2>
            <input
              type="search"
              placeholder="Search Nurses..."
              style={inputStyle}
            />
            <div style={dateTimeContainerStyle}>
              <label>
                Date:
                <input type="date" style={inputStyle} />
              </label>
              <label>
                From Time:
                <input type="time" style={inputStyle} />
              </label>
              <label>
                To Time:
                <input type="time" style={inputStyle} />
              </label>
            </div>
            {/* Future: add request staff functionality here */}
          </section>
        )}

        {activeTab === "manageStaff" && (
          <section>
            <h2>Staff Management</h2>
            <p>Manage staff records and actions here.</p>
            {/* Future: add staff management component/list here */}
          </section>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, count }) => (
  <div style={statCardStyle}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
    <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
      {label}
    </div>
    <div style={{ fontSize: 28, color: "#4a1dbb" }}>{count}</div>
  </div>
);

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
};
const navButtonStyle = {
  padding: "0.5rem 1.2rem",
  fontSize: "1rem",
  cursor: "pointer",
  backgroundColor: "#eee",
  border: "2px solid #4a1dbb",
  borderRadius: 6,
  color: "#4a1dbb",
  fontWeight: 600,
};
const activeNavButtonStyle = {
  ...navButtonStyle,
  backgroundColor: "#4a1dbb",
  color: "white",
  fontWeight: 700,
};

const summaryContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "3rem",
  flexWrap: "wrap",
};

const statCardStyle = {
  minWidth: 140,
  backgroundColor: "#f4f0ff",
  borderRadius: 12,
  textAlign: "center",
  padding: "1rem 1.5rem",
  boxShadow: "0 2px 8px rgba(74,29,187,0.15)",
  userSelect: "none",
};

const inputStyle = {
  marginTop: 8,
  marginLeft: 8,
  padding: "0.3rem 0.6rem",
  borderRadius: 5,
  border: "1px solid #ccc",
};

const dateTimeContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
  gap: "1rem",
  flexWrap: "wrap",
};

export default HospitalAdminDashboard;
