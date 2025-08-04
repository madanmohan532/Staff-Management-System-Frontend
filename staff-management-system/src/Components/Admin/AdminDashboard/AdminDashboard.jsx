import React, { use, useEffect, useState } from "react";
import "./AdminDashboard.css";
import RegistrationApproval from "../RegistrationApproval/RegistrationApproval";
import Hospital from "../Hospitals/Hospital";
import Nurse from "../Nurses/Nurse";
import AttendanceReport from "../AttendanceReport/AttendanceReport";
import {
  FaHospital,
  FaUserNurse,
  FaClipboardList,
  FaHome,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";
import axios, { all } from "axios";
import { useLocation, useNavigate } from "react-router";
import NurseWorkSchedule from "../AttendanceReport/NurseWorkSchedule";

const AdminDashboard = () => {
  const location = useLocation();
  const [activeView, setActiveView] = useState("dashboard");
  const [activeHospitals, setActiveHospitals] = useState(0);
  const [activeNurses, setActiveNurses] = useState(0);
  const [nursesWorking, setNursesWorking] = useState(0);
  const [users, setUsers] = useState([]);
  const [allNurses, setAllNurses] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [loggedInUser, setLoggedInUser] = useState({});

  const navigate = useNavigate();

  const [registrationCount, setRegistrationCount] = useState(0);

  localStorage.setItem("email", userEmail);

  const fetchLoggedInUser = async () => {
    await axios
      .get(
        `http://localhost:9999/admin-service/api/admin/admin/admin/${userEmail}`
      )
      .then((response) => {
        if (response.status === 200) {
          setLoggedInUser(response.data);
          setRegistrationCount(
            response.data.approvedRegistrationIds?.length || 0
          );
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  const fetchNurses = async () => {
    await axios
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
  };

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

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:9999/admin-service/api/admin/admin/users")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        } else if (response.status === 204) {
          console.log("No users found");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetchUsers();
    fetchNurses();
    fetchHospitals();
  }, []);

  useEffect(() => {
    setNursesWorking(
      allNurses.filter((nurse) => nurse.currentWorkingStatus).length
    );
  }, [allNurses]);

  useEffect(() => {
    setActiveHospitals(
      users.filter((user) => user.role === "hospital staff").length
    );
    setActiveNurses(users.filter((user) => user.role === "nurse").length);
  }, [users]);

  const handleHospitalClick = () => {
    // navigate("hospitals");
  };

  const handleNurseClick = () => {
    // navigate("/nurses");
  };

  const handleWorkinDayClick = () => {
    // navigate("/attendance");
  };

  const renderView = () => {
    switch (activeView) {
      case "registrations":
        return (
          // In your AdminDashboard.jsx or wherever you're using RegistrationApproval
          <RegistrationApproval
            pendingHospitals={() => {
              // Check what this contains
              return allHospitals.filter(
                (hospital) => hospital.registrationStatus === "pending"
              );
            }}
            pendingNurses={() => {
              // Check what this contains
              return allNurses.filter(
                (nurse) => nurse.registrationStatus === "pending"
              );
            }}
          />
        );
      case "hospitals":
        return <Hospital />;
      case "nurses":
        return <Nurse />;
      case "attendance":
        return <NurseWorkSchedule />;
      default:
        return (
          <div className="dashboard-welcome">
            <h2>Hello {loggedInUser.firstName} , Welcome to Admin Dashboard</h2>
            <div className="dashboard-stats" onClick={handleHospitalClick}>
              <div className="stat-card">
                <FaHospital className="stat-icon" />
                <h3>Active Hospitals</h3>
                <p className="stat-number">{activeHospitals}</p>
              </div>
              <div className="stat-card" onClick={handleNurseClick}>
                <FaUserNurse className="stat-icon" />
                <h3>Active Nurses</h3>
                <p className="stat-number">{activeNurses}</p>
              </div>
              <div className="stat-card" onClick={handleWorkinDayClick}>
                <FaCalendarAlt className="stat-icon" />
                <h3>Nurses Working Today</h3>
                <p className="stat-number">{nursesWorking}</p>
              </div>
              <div className="stat-card">
                <MdAppRegistration className="stat-icon" />
                <h3>Registration Approved by Me</h3>
                <p className="stat-number">{registrationCount}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Staff Management Admin</h1>
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
          >
            <FaHome /> Dashboard
          </button>
          <button
            className={`nav-btn ${
              activeView === "registrations" ? "active" : ""
            }`}
            onClick={() => setActiveView("registrations")}
          >
            <FaClipboardList /> Approvals
          </button>
          <button
            className={`nav-btn ${activeView === "hospitals" ? "active" : ""}`}
            onClick={() => setActiveView("hospitals")}
          >
            <FaHospital /> Hospitals
          </button>
          <button
            className={`nav-btn ${activeView === "nurses" ? "active" : ""}`}
            onClick={() => setActiveView("nurses")}
          >
            <FaUserNurse /> Nurses
          </button>
          <button
            className={`nav-btn ${activeView === "attendance" ? "active" : ""}`}
            onClick={() => setActiveView("attendance")}
          >
            <FaClipboardList /> Attendance
          </button>
        </div>
      </div>

      <div className="admin-content">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;
