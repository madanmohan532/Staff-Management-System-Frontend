import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserInjured, FaUserMd, FaSyncAlt } from "react-icons/fa";
import "../DashboardWidgets/DashboardWidget.css"; // We'll create this CSS file

const DashboardWidgets = ({ hospitalId }) => {
  const [patientCount, setPatientCount] = useState(0);
  const [nursesWorkingToday, setNursesWorkingToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to check if a nurse is currently working a shift based on their work schedule
  const checkIfNurseIsWorkingToday = (workSchedule) => {
    const now = new Date();
    // Assuming the work schedule's `from` and `to` are ISO strings with a local time component
    // If they were UTC, the backend should send them with a 'Z' suffix.
    // The previous manual subtraction logic is not needed here if the backend is consistently
    // sending and receiving local time strings as discussed.
    return workSchedule.some((shift) => {
      const shiftDate = new Date(shift.from);
      const isToday =
        shiftDate.getFullYear() === now.getFullYear() &&
        shiftDate.getMonth() === now.getMonth() &&
        shiftDate.getDate() === now.getDate();

      const fromTime = new Date(shift.from);
      const toTime = new Date(shift.to);

      // Simple check to see if current time falls within the shift
      const isCurrentlyActive = now >= fromTime && now <= toTime;

      return isToday && isCurrentlyActive;
    });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch patient count
        const patientsRes = await axios.get(
          `http://localhost:9999/patient-service/api/patient/all/${hospitalId}`
        );
        setPatientCount(patientsRes.data?.length || 0);
        console.log("Fetched Patient Count:", patientsRes.data?.length);

        // 2. Fetch all nurses to check their schedules
        const nursesRes = await axios.get(
          `http://localhost:9999/staff-service/api/nurse/all`
        );
        const allNurses = nursesRes.data || [];
        console.log("Fetched All Nurses:", allNurses.length);

        let workingNursesCount = 0;
        // This is a simplified approach. A dedicated backend endpoint for this would be more efficient.
        for (const nurse of allNurses) {
          // Assuming each nurse object has a workSchedule array.
          // This API call needs to be modified if workSchedule is not part of the nurse object.
          // If the work schedule is not included, a new API call to get a specific nurse's work schedule
          // would be needed, which is inefficient. Let's assume for this implementation that
          // the `/nurse/all` endpoint returns the full nurse object including `workSchedule`.
          if (
            nurse.workSchedule &&
            checkIfNurseIsWorkingToday(nurse.workSchedule)
          ) {
            workingNursesCount++;
          }
        }
        setNursesWorkingToday(workingNursesCount);
        console.log("Nurses Working Today:", workingNursesCount);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchDashboardData();
    }
  }, [hospitalId]);

  if (loading) {
    return (
      <div className="dashboard-widgets-container loading">
        <FaSyncAlt className="spin" />
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-widgets-container error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-widgets-container">
      <div className="widget-card patients-widget">
        <FaUserInjured size={40} className="widget-icon" />
        <div className="widget-info">
          <h3>Total Patients</h3>
          <span>{patientCount}</span>
        </div>
      </div>

      <div className="widget-card nurses-widget">
        <FaUserMd size={40} className="widget-icon" />
        <div className="widget-info">
          <h3>Nurses Working Today</h3>
          <span>{nursesWorkingToday}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
