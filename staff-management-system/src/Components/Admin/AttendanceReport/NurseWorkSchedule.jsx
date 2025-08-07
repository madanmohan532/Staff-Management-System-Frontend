import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./NurseWorkSchedule.css";

const DetailsModal = ({ nurse, hospital, onClose }) => {
  if (!nurse || !hospital) return null;

  return (
    <div className="modal-overlay">
           {" "}
      <div className="modal-content">
               {" "}
        <button className="modal-close-btn" onClick={onClose}>
                    &times;        {" "}
        </button>
                <h2 className="modal-title">Details for {nurse.nurseId}</h2>   
           {" "}
        <div className="modal-details-grid">
                   {" "}
          <div className="detail-card">
                        <h3 className="detail-card-title">Nurse Details</h3>   
                   {" "}
            <p>
                            <strong>Name:</strong> {nurse.name}           {" "}
            </p>
                       {" "}
            <p>
                            <strong>Phone:</strong>{" "}
              {nurse.contactDetails?.phone || "N/A"}           {" "}
            </p>
                       {" "}
            <p>
                            <strong>Email:</strong>{" "}
              {nurse.contactDetails?.email || "N/A"}           {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="detail-card">
                        <h3 className="detail-card-title">Hospital Details</h3> 
                     {" "}
            <p>
                            <strong>Hospital ID:</strong> {hospital._id}       
                 {" "}
            </p>
                       {" "}
            <p>
                            <strong>Phone:</strong>{" "}
              {hospital.contactDetails?.phone || "N/A"}           {" "}
            </p>
                       {" "}
            <p>
                            <strong>Email:</strong>{" "}
              {hospital.contactDetails?.email || "N/A"}           {" "}
            </p>
                       {" "}
            <p>
                            <strong>KMC Number:</strong>{" "}
              {hospital.kmcNumber || "N/A"}           {" "}
            </p>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </div>
  );
};

const NurseWorkSchedule = () => {
  const [allNurses, setAllNurses] = useState([]);
  const [allWorkingHours, setAllWorkingHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [staffIdSearchTerm, setStaffIdSearchTerm] = useState("");
  const [reportData, setReportData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [selectedHospitalDetails, setSelectedHospitalDetails] = useState(null);
  const reportRef = useRef();

  const fetchNurses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
      );
      if (response.status === 200) {
        setAllNurses(response.data);
      } else {
        console.log("No nurses found");
        setAllNurses([]);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
      setError("Failed to fetch nurse data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitalDetails = async (hospitalId) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails`
      );
      const hospital = response.data.find((h) => h._id === hospitalId);
      setSelectedHospitalDetails(hospital);
    } catch (error) {
      console.error("Error fetching hospital details:", error);
      setSelectedHospitalDetails(null);
    }
  };

  const processWorkingHours = (nurses) => {
    const hours = [];
    nurses.forEach((nurse) => {
      const nurseId = nurse._id;
      const workingHours = nurse.workingHours || [];
      const workSchedule = nurse.workSchedule || [];

      [...workingHours, ...workSchedule].forEach((hour) => {
        hours.push({
          nurseId,
          date: hour.date,
          from: hour.from,
          to: hour.to,
          hospitalId: hour.hospitalId,
          status: hour.status || "not-specified",
          nurseDetails: {
            name: `${nurse.firstName} ${nurse.lastName}`,
            contactDetails: nurse.contactDetails,
          },
        });
      });
    });
    setAllWorkingHours(hours);
  };

  const handleCardClick = (hour) => {
    setSelectedCardDetails(hour);
    fetchHospitalDetails(hour.hospitalId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardDetails(null);
    setSelectedHospitalDetails(null);
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  useEffect(() => {
    if (allNurses.length > 0) {
      processWorkingHours(allNurses);
    }
  }, [allNurses]);

  const generateReport = () => {
    if (!allNurses || allNurses.length === 0) {
      alert("No nurse data available to generate a report.");
      return;
    }
    const report = allNurses.map((nurse) => {
      const totalHoursWorked = (nurse.workingHours || []).reduce(
        (total, work) => {
          const from = new Date(work.from);
          const to = new Date(work.to);
          const duration = (to - from) / (1000 * 60 * 60);
          return total + duration;
        },
        0
      );
      const scheduledHours = (nurse.workSchedule || []).reduce(
        (total, schedule) => {
          const from = new Date(schedule.from);
          const to = new Date(schedule.to);
          const duration = (to - from) / (1000 * 60 * 60);
          return total + duration;
        },
        0
      );
      const totalLeaves = (nurse.leaveDetails || []).length;
      const rejectedRequests = (nurse.workSchedule || []).filter(
        (schedule) => schedule.status === "rejected"
      ).length;
      return {
        nurseId: nurse._id,
        name: `${nurse.firstName} ${nurse.lastName}`,
        totalHoursWorked: totalHoursWorked.toFixed(2),
        scheduledHours: scheduledHours.toFixed(2),
        totalLeaves,
        rejectedRequests,
      };
    });
    setReportData(report);
  };

  const downloadReportPdf = async () => {
    if (!reportData) {
      alert("Please generate a report first.");
      return;
    }
    const input = reportRef.current;
    if (!input) {
      console.error("Report container not found.");
      return;
    }
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("nurse_activity_report.pdf");
  };

  const filteredWorkingHours = allWorkingHours.filter((hour) => {
    const isMatchingStaffId = staffIdSearchTerm
      ? hour.nurseId.toLowerCase().includes(staffIdSearchTerm.toLowerCase())
      : true;

    // --- CORRECTED DATE COMPARISON LOGIC ---
    const isMatchingDate = selectedDate
      ? new Date(hour.from).toDateString() === selectedDate.toDateString()
      : true;
    // ----------------------------------------

    return isMatchingStaffId && isMatchingDate;
  });

  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <div className="loading-container">Loading nurse schedules...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="schedule-container">
            <h1 className="schedule-title">Nurse Work Schedule</h1>     {" "}
      <div className="filter-container">
               {" "}
        <div className="filter-group">
                   {" "}
          <label htmlFor="staffId-search" className="filter-label">
                        Search Staff ID:          {" "}
          </label>
                   {" "}
          <input
            id="staffId-search"
            type="text"
            value={staffIdSearchTerm}
            onChange={(e) => setStaffIdSearchTerm(e.target.value)}
            placeholder="e.g. staff001"
            className="filter-input"
          />
                 {" "}
        </div>
               {" "}
        <div className="filter-group">
                   {" "}
          <label htmlFor="date-picker" className="filter-label">
                        Select Date:          {" "}
          </label>
                   {" "}
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select a date"
            className="filter-input"
          />
                 {" "}
        </div>
               {" "}
        <div className="filter-group button-group">
                   {" "}
          <button onClick={generateReport} className="generate-report-btn">
                        Generate Report          {" "}
          </button>
                   {" "}
          <button onClick={downloadReportPdf} className="download-pdf-btn">
                        Download PDF          {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </div>
           {" "}
      {reportData && (
        <div className="report-container" ref={reportRef}>
                    <h2 className="report-title">Nurse Activity Report</h2>     
             {" "}
          <table className="report-table">
                       {" "}
            <thead>
                           {" "}
              <tr>
                                <th>Name</th>               {" "}
                <th>Total Worked Hours</th>               {" "}
                <th>Scheduled Hours</th>                <th>Total Leaves</th>   
                            <th>Rejected Requests</th>             {" "}
              </tr>
                         {" "}
            </thead>
                       {" "}
            <tbody>
                           {" "}
              {reportData.map((reportItem) => (
                <tr key={reportItem.nurseId}>
                                    <td>{reportItem.name}</td>                 {" "}
                  <td>{reportItem.totalHoursWorked} hrs</td>                 {" "}
                  <td>{reportItem.scheduledHours} hrs</td>                 {" "}
                  <td>{reportItem.totalLeaves}</td>                 {" "}
                  <td>{reportItem.rejectedRequests}</td>               {" "}
                </tr>
              ))}
                         {" "}
            </tbody>
                     {" "}
          </table>
                 {" "}
        </div>
      )}
           {" "}
      <div className="schedule-grid">
               {" "}
        {filteredWorkingHours.length > 0 ? (
          filteredWorkingHours.map((hour, index) => (
            <div
              key={index}
              className="schedule-card"
              onClick={() => handleCardClick(hour)}
            >
                           {" "}
              <div className="card-header">
                                <span className="nurse-id">{hour.nurseId}</span>
                               {" "}
                <span
                  className={`status-badge status-${hour.status.toLowerCase()}`}
                >
                                    {hour.status}               {" "}
                </span>
                             {" "}
              </div>
                           {" "}
              <div className="card-body">
                               {" "}
                <div className="card-item">
                                    <strong>Date:</strong> {hour.date}         
                       {" "}
                </div>
                               {" "}
                <div className="card-item">
                                    <strong>From:</strong>{" "}
                  {formatTime(hour.from)}               {" "}
                </div>
                               {" "}
                <div className="card-item">
                                    <strong>To:</strong> {formatTime(hour.to)} 
                               {" "}
                </div>
                               {" "}
                <div className="card-item">
                                    <strong>Hospital:</strong> {hour.hospitalId}
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
          ))
        ) : (
          <div className="no-data-message">
                        No working hours found for the selected filters.        
             {" "}
          </div>
        )}
             {" "}
      </div>
           {" "}
      {isModalOpen && (
        <DetailsModal
          nurse={selectedCardDetails?.nurseDetails}
          hospital={selectedHospitalDetails}
          onClose={closeModal}
        />
      )}
         {" "}
    </div>
  );
};

export default NurseWorkSchedule;
