import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import "./NurseDashboard.css";
import axios from "axios";

const AttendanceSection = ({ nurseId }) => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch attendance on mount
    // axios.get(...).then(r=>setAttendance(r.data))
  }, []);

  const handleClockIn = () => {
    setClockedIn(true);
    setClockInTime(new Date().toISOString());
    // Backend POST...
  };

  const handleClockOut = () => {
    setClockedIn(false);
    setClockInTime(null);
    // Backend POST...
    // Refresh attendance data
  };

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Attendance</h2>
      </div>
      <div className="clock-actions">
        {!clockedIn ? (
          <button className="clock-btn in" onClick={handleClockIn}>
            <FaClock /> Clock In
          </button>
        ) : (
          <button className="clock-btn out" onClick={handleClockOut}>
            <FaClock /> Clock Out
          </button>
        )}
        {clockInTime && (
          <span className="clocked-text">
            Clocked in at {new Date(clockInTime).toLocaleTimeString()}
          </span>
        )}
      </div>
      <h3>Attendance History</h3>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan={3}>No attendance yet</td>
            </tr>
          ) : (
            attendance.map((row) => (
              <tr key={row.id}>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>
                  {row.clockIn
                    ? new Date(row.clockIn).toLocaleTimeString()
                    : "-"}
                </td>
                <td>
                  {row.clockOut
                    ? new Date(row.clockOut).toLocaleTimeString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default AttendanceSection;
