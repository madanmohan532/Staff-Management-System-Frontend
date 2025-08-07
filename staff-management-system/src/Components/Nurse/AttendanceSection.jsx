import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./AttendanceSection.css"; // Assuming a dedicated CSS file for this component

const AttendanceSection = ({ nurseId }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workingHours, setWorkingHours] = useState([]);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allHospitals, setAllHospitals] = useState([]);

  // Fetch nurse details, working hours, work schedule, and hospital data
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const [nurseRes, hoursRes, scheduleRes, hospitalsRes] =
          await Promise.all([
            axios.get(
              `http://localhost:9999/staff-service/api/nurse/${nurseId}`
            ),
            axios.get(
              `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
            ),
            axios.get(
              `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
            ),
            axios.get(
              "http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails"
            ),
          ]);

        setLoggedInUser(nurseRes.data || null);
        setWorkingHours(hoursRes.data || []);
        setWorkSchedule(scheduleRes.data || []);
        setAllHospitals(hospitalsRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (nurseId) {
      loadAllData();
    }
  }, [nurseId, selectedMonth, selectedYear]);

  // Memoize hospital name map for efficiency
  const hospitalNameMap = useMemo(() => {
    const map = {};
    allHospitals.forEach((hospital) => {
      map[hospital._id] = hospital.name;
    });
    return map;
  }, [allHospitals]);

  // Generate days for the selected month
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const blankDays = Array(firstDayOfMonth).fill(null);
  const daysInMonth = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );

  // Format time display (IST timezone)
  const formatTime = (timeString) => {
    if (!timeString) return "";

    const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    console.log(formattedDate);

    return formattedDate;
  };

  // Get data for a specific day
  const getDayData = (day) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    const worked = workingHours.find((item) => item.from.startsWith(dateStr));

    const scheduled = workSchedule.filter(
      (item) =>
        item.from.startsWith(dateStr) &&
        (item.status === "accepted" || item.status === "confirmed")
    );

    // Check if the current day is today for highlighting
    const today = new Date();
    const isToday =
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear();

    return {
      worked,
      scheduled,
      isToday,
    };
  };

  // Month names for dropdown
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

  // Years for dropdown (from 20 years ago to the current year)
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 20; // You can adjust this range
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  if (loading) {
    return <div className="loading-indicator">Loading calendar data...</div>;
  }

  return (
    <div className="nurse-attendance-calendar">
      <div className="nurse-header">
        <h2>{loggedInUser?.firstName || "Nurse"}</h2>
        <div className="nurse-meta">
          <span>
            ID: {loggedInUser?._id || "N/A"} | Specialised In :{" "}
            {loggedInUser?.skills?.join(", ") || "N/A"}
          </span>
        </div>
        <div className="status-badge active">
          {loggedInUser.availableStatus ? "Available" : "Unavailable"}
        </div>
      </div>

      <div className="calendar-controls">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="calendar-grid">
        {/* Day headers */}
        <div className="day-header">Sun</div>
        <div className="day-header">Mon</div>
        <div className="day-header">Tue</div>
        <div className="day-header">Wed</div>
        <div className="day-header">Thu</div>
        <div className="day-header">Fri</div>
        <div className="day-header">Sat</div>

        {/* Blank days for calendar alignment */}
        {blankDays.map((_, index) => (
          <div key={`blank-${index}`} className="calendar-day empty"></div>
        ))}

        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const { worked, scheduled, isToday } = getDayData(day);
          const hasSchedule = scheduled.length > 0;
          const hasWorked = !!worked;

          return (
            <div
              key={day}
              className={`calendar-day ${isToday ? "today" : ""} ${
                hasWorked ? "worked" : hasSchedule ? "scheduled" : ""
              }`}
            >
              <div className="day-number">{day}</div>

              {hasWorked ? (
                <div className="day-status">
                  <span>Present</span>
                  <small>
                    {formatTime(worked.from)} - {formatTime(worked.to)}
                  </small>
                  <small className="hospital-name">
                    {hospitalNameMap[worked.hospitalId] || "N/A"}
                  </small>
                </div>
              ) : hasSchedule ? (
                scheduled.map((shift, idx) => (
                  <div key={`shift-${idx}`} className="day-status">
                    <span>Scheduled ({shift.status})</span>
                    <small>
                      {formatTime(shift.from)} - {formatTime(shift.to)}
                    </small>
                    <small className="hospital-name">
                      {hospitalNameMap[shift.hospitalId] || "N/A"}
                    </small>
                  </div>
                ))
              ) : (
                <div className="day-status">
                  <span>No Shift</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-color worked"></div>
          <span>Worked Day</span>
        </div>
        <div className="legend-item">
          <div className="legend-color scheduled"></div>
          <span>Scheduled Shift</span>
        </div>
        <div className="legend-item">
          <div className="legend-color today"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;
