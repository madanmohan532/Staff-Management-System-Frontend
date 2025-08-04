import React, { use, useEffect, useState } from "react";
import { FaHome, FaCalendarCheck, FaUserInjured } from "react-icons/fa";
import HomeSection from "./HomeSection";
import AttendanceSection from "./AttendanceSection";
import PatientsSection from "./PatientsSection";
import "./NurseDashboard.css";
import axios from "axios";

const NurseDashboard = ({ nurseId }) => {
  const [currentTab, setCurrentTab] = useState("home");

  const [loggedInUser, setLoggedInUser] = useState({});

  const fetchLoggedInUser = async () => {
    await axios
      .get(
        `http://localhost:9999/staff-service/api/nurse/getNurse/${localStorage.getItem(
          "userEmail"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          setLoggedInUser(response.data);
          localStorage.setItem("nurseId", response.data._id);
          console.log(response.data);
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  // Navbar menu: update as needed
  const menu = [
    { value: "home", label: "Home", icon: <FaHome /> },
    { value: "attendance", label: "Attendance", icon: <FaCalendarCheck /> },
    { value: "patients", label: "Patients", icon: <FaUserInjured /> },
  ];

  return (
    <div className="nurse-dashboard-outer">
      <nav className="nurse-navbar">
        <div className="dashboard-title">Nurse Dashboard</div>
        <ul>
          {menu.map((item) => (
            <li
              key={item.value}
              className={currentTab === item.value ? "active" : ""}
              onClick={() => setCurrentTab(item.value)}
            >
              <span className="menu-icon">{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <main className="nurse-dashboard-main">
        {currentTab === "home" && <HomeSection nurseId={loggedInUser._id} />}
        {currentTab === "attendance" && (
          <AttendanceSection nurseId={loggedInUser._id} />
        )}
        {currentTab === "patients" && (
          <PatientsSection
            nurseId={loggedInUser._id}
            hospitalId={loggedInUser.hospitalId}
          />
        )}
      </main>
    </div>
  );
};

export default NurseDashboard;
