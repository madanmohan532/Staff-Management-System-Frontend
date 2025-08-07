import React, { useEffect, useState, useMemo } from "react";
import {
  FaHome,
  FaCalendarCheck,
  FaUserInjured,
  FaUserCircle,
  FaTachometerAlt,
  FaClock,
} from "react-icons/fa";
import HomeSection from "./HomeSection";
import AttendanceSection from "./AttendanceSection";
import PatientsSection from "./PatientsSection";
import NurseProfile from "./NurseProfile";
import "./NurseDashboard.css";
import axios from "axios";

const NurseDashboard = () => {
  const [currentTab, setCurrentTab] = useState("dashboard-overview");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [workingHours, setWorkingHours] = useState([]); // Added for working hours display
  const [allHospitals, setAllHospitals] = useState([]);
  const [loadingDashboardData, setLoadingDashboardData] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // For working hours filter
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // For working hours filter

  const fetchLoggedInUser = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.warn(
          "User email not found in localStorage. Redirecting to login."
        );
        // Optionally redirect to login page
        // window.location.href = "/login";
        return null;
      }

      const response = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/getNurse/${userEmail}`
      );

      if (response.status === 200 && response.data) {
        setLoggedInUser(response.data);
        localStorage.setItem("nurseId", response.data._id);
        return response.data;
      } else {
        console.log("No user found with the provided email.");
        setLoggedInUser(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoggedInUser(null);
      return null;
    }
  };

  const fetchWorkSchedule = async (nurseId) => {
    if (!nurseId) return [];
    try {
      const response = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching work schedule:", error);
      return [];
    }
  };

  const fetchWorkingHours = async (nurseId) => {
    if (!nurseId) return [];
    try {
      const response = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching working hours:", error);
      return [];
    }
  };

  const fetchAllHospitals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails"
      );
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching all hospitals:", error);
      return [];
    }
  };

  // Function to load all initial dashboard data
  const loadDashboardInitialData = async () => {
    setLoadingDashboardData(true);
    const nurse = await fetchLoggedInUser();
    if (nurse?._id) {
      const [schedule, hours, hospitals] = await Promise.all([
        fetchWorkSchedule(nurse._id),
        fetchWorkingHours(nurse._id),
        fetchAllHospitals(),
      ]);
      setWorkSchedule(schedule);
      setWorkingHours(hours);
      setAllHospitals(hospitals);
    }
    setLoadingDashboardData(false);
  };

  useEffect(() => {
    loadDashboardInitialData();
  }, []); // Run once on component mount for initial dashboard data

  const hospitalNameMap = useMemo(() => {
    const map = {};
    allHospitals.forEach((hospital) => {
      map[hospital._id] = hospital.name;
    });
    return map;
  }, [allHospitals]);

  // Filters and sorts upcoming shifts
  const getSortedShifts = (schedules) => {
    const now = new Date();
    return schedules
      .filter(
        (shift) =>
          (shift.status === "accepted" || shift.status === "confirmed") &&
          new Date(shift.to) > now
      )
      .sort((a, b) => new Date(a.from) - new Date(b.from));
  };

  const sortedShifts = useMemo(
    () => getSortedShifts(workSchedule),
    [workSchedule]
  );
  const mostUpcomingShift = sortedShifts.length > 0 ? sortedShifts[0] : null;
  const otherShifts = sortedShifts.slice(1);

  // --- API Call for Clock-In ---
  const handleClockIn = async (shift) => {
    if (!loggedInUser || !loggedInUser._id) {
      alert("Nurse not logged in. Cannot clock in.");
      return;
    }

    const now = new Date();
    // Format the current local time to "YYYY-MM-DDTHH:mm" to match existing data format
    const localClockInTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Construct the payload for the ClockInRequest DTO
    const payload = {
      nurseId: loggedInUser._id, // The ID of the logged-in nurse
      date: shift.date, // The date of the scheduled shift (e.g., "2025-08-06")
      clockInTime: localClockInTime, // Send local time string without 'Z'
      to: shift.to, // The scheduled end time of the shift
      hospitalId: shift.hospitalId, // The hospital ID for this shift
    };

    console.log(shift);

    console.log(payload);

    try {
      const response = await axios.post(
        "http://localhost:9999/staff-service/api/nurse/clockIn",
        payload
      );

      if (response.status === 200) {
        alert("Clock-in successful!");
        // After successful clock-in, re-fetch data to update the dashboard
        // This will move the shift from workSchedule to workingHours
        loadDashboardInitialData();
      } else {
        alert(`Clock-in failed: ${response.data}`);
      }
    } catch (error) {
      console.error("Error during clock-in:", error);
      alert("Error during clock-in. Please try again.");
    }
  };

  const handleClockOut = (shift) => {
    console.log(`Clocking OUT for shift: ${shift._id}`);
    alert(`Clocked OUT for shift ${shift._id}! (Placeholder)`);
    // Implement actual API call for clock-out here
  };

  // Checks if a shift is within the active clocking window
  const isShiftActiveForClocking = (shift) => {
    if (!shift || !shift.from || !shift.to) return false;
    const now = new Date();
    const fromTime = new Date(shift.from); // Parsed as local time
    const toTime = new Date(shift.to); // Parsed as local time

    // Create a 30-minute buffer window around the shift times
    const clockInWindowStart = new Date(fromTime.getTime() - 30 * 60 * 1000);
    const clockOutWindowEnd = new Date(toTime.getTime() + 30 * 60 * 1000);

    return now >= clockInWindowStart && now <= clockOutWindowEnd;
  };

  const formatShiftTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString); // Parsed as local time if no 'Z'
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatShiftDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString); // Parsed as local time if no 'Z'
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract unique years from workingHours data for the filter dropdown
  const availableYears = useMemo(() => {
    const years = new Set();
    // Add years from workSchedule as well, in case no workingHours yet
    workSchedule.forEach((shift) => {
      years.add(new Date(shift.from).getFullYear());
    });
    workingHours.forEach((shift) => {
      years.add(new Date(shift.from).getFullYear());
    });
    // Ensure current year is always an option if no data exists
    years.add(new Date().getFullYear());
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  }, [workingHours, workSchedule]);

  // Filter working hours based on selected month and year
  const filteredWorkingHours = useMemo(() => {
    return workingHours.filter((shift) => {
      const shiftDate = new Date(shift.from);
      return (
        shiftDate.getFullYear() === selectedYear &&
        shiftDate.getMonth() + 1 === selectedMonth
      );
    });
  }, [workingHours, selectedYear, selectedMonth]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const menu = [
    {
      value: "dashboard-overview",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    { value: "home", label: "Home", icon: <FaHome /> },
    { value: "attendance", label: "Attendance", icon: <FaCalendarCheck /> },
    { value: "patients", label: "Patients", icon: <FaUserInjured /> },
    { value: "profile", label: "Profile", icon: <FaUserCircle /> },
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
        {loadingDashboardData ? (
          <div className="dashboard-loading-message">
            Loading dashboard data...
          </div>
        ) : (
          <>
            {currentTab === "dashboard-overview" && (
              <div className="dashboard-overview-section">
                <h1 className="welcome-greeting">
                  Hello, {loggedInUser?.firstName || "Nurse"}!
                </h1>
                <p className="dashboard-intro">
                  Here's a quick overview of your upcoming shifts.
                </p>
                {mostUpcomingShift ? (
                  <div className="upcoming-shift-card">
                    <h3>Your Next Shift</h3>
                    <div className="shift-details">
                      <p>
                        <strong>Hospital:</strong>{" "}
                        {hospitalNameMap[mostUpcomingShift.hospitalId] ||
                          mostUpcomingShift.hospitalId}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {formatShiftDate(mostUpcomingShift.from)}
                      </p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {formatShiftTime(mostUpcomingShift.from)} -{" "}
                        {formatShiftTime(mostUpcomingShift.to)}
                      </p>
                    </div>
                    {/* {isShiftActiveForClocking(mostUpcomingShift) ? (
                      <div className="clock-actions">
                        <div className="clockIn">
                          <button
                            className="clock-btn clock-in"
                            onClick={() => handleClockIn(mostUpcomingShift)}
                          >
                            <FaClock /> Clock In
                          </button>
                      
                        </div>

                        <div className="clockOut">
                          <button
                            className="clock-btn clock-out"
                            onClick={() => handleClockOut(mostUpcomingShift)}
                          >
                            <FaClock /> Clock Out
                          </button>
                     
                        </div>
                      </div>
                    ) : (
                      <p className="clock-info">
                        Clock in/out options will appear closer to your shift
                        time.
                      </p>
                    )} */}
                  </div>
                ) : (
                  <div className="no-upcoming-shifts">
                    <p>You have no upcoming accepted shifts.</p>
                  </div>
                )}

                {otherShifts.length > 0 && (
                  <div className="other-shifts-section">
                    <h3>Other Upcoming Shifts</h3>
                    <div className="other-shifts-list">
                      {otherShifts.map((shift, index) => (
                        <div key={index} className="other-shift-item">
                          <p>
                            <strong>Hospital:</strong>{" "}
                            {hospitalNameMap[shift.hospitalId] ||
                              shift.hospitalId}
                          </p>
                          <p>
                            <strong>Date:</strong> {formatShiftDate(shift.from)}
                          </p>
                          <p>
                            <strong>Time:</strong> {formatShiftTime(shift.from)}{" "}
                            - {formatShiftTime(shift.to)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentTab === "home" && <HomeSection nurseData={loggedInUser} />}
            {currentTab === "attendance" && (
              <AttendanceSection nurseId={loggedInUser?._id} />
            )}
            {currentTab === "patients" && (
              <PatientsSection nurseId={loggedInUser?._id} />
            )}
            {currentTab === "profile" && (
              <NurseProfile
                nurseData={loggedInUser}
                onUpdate={setLoggedInUser}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default NurseDashboard;
