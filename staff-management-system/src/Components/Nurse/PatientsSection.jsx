import React, { useState, useEffect } from "react";
import { FaUserInjured, FaSave } from "react-icons/fa";
import "./NurseDashboard.css";
import axios from "axios";

const PatientsSection = ({ nurseId }) => {
  const [records, setRecords] = useState("");
  const [isWorkTime, setIsWorkTime] = useState(true); // Toggle in real project

  const handleSave = () => {
    // Save to backend...
    alert("Patient records saved!");
    setRecords("");
  };

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>
          <FaUserInjured /> Patient Records
        </h2>
      </div>
      {!isWorkTime ? (
        <p>You can update patient records only in your scheduled work time.</p>
      ) : (
        <>
          <textarea
            className="patients-textarea"
            placeholder="Enter patient records..."
            value={records}
            onChange={(e) => setRecords(e.target.value)}
          />
          <button className="save-records-btn" onClick={handleSave}>
            <FaSave /> Save
          </button>
        </>
      )}
    </section>
  );
};

export default PatientsSection;
