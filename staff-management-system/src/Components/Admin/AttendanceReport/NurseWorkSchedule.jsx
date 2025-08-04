// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import "./NurseWorkSchedule.css"; // We'll create this CSS file for styling

// // // // const NurseWorkSchedule = () => {
// // // //   const [allNurses, setAllNurses] = useState([]);
// // // //   const [allWorkingHours, setAllWorkingHours] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedStaffId, setSelectedStaffId] = useState("");
// // // //   const [selectedDate, setSelectedDate] = useState("");

// // // //   const fetchNurses = async () => {
// // // //     try {
// // // //       const response = await axios.get(
// // // //         "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
// // // //       );
// // // //       if (response.status === 200) {
// // // //         setAllNurses(response.data);
// // // //       } else {
// // // //         console.log("No nurses found");
// // // //         setAllNurses([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching nurses:", error);
// // // //       setError("Failed to fetch nurse data.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const processWorkingHours = (nurses) => {
// // // //     const hours = [];
// // // //     nurses.forEach((nurse) => {
// // // //       const nurseId = nurse._id;
// // // //       // Use both workingHours and workSchedule for a comprehensive list
// // // //       const workingHours = nurse.workingHours || [];
// // // //       const workSchedule = nurse.workSchedule || [];

// // // //       [...workingHours, ...workSchedule].forEach((hour) => {
// // // //         // Correcting the 'date' field to match the original doc
// // // //         const dateKey =
// // // //           hour.date ||
// // // //           (hour.from ? new Date(hour.from).toISOString().split("T")[0] : null);

// // // //         if (dateKey) {
// // // //           hours.push({
// // // //             nurseId,
// // // //             date: dateKey,
// // // //             from: hour.from,
// // // //             to: hour.to,
// // // //             hospitalId: hour.hospitalId,
// // // //             status: hour.status || "not-specified", // 'status' might not exist in workingHours
// // // //           });
// // // //         }
// // // //       });
// // // //     });
// // // //     setAllWorkingHours(hours);
// // // //   };

// // // //   // Fetch data on component mount
// // // //   useEffect(() => {
// // // //     fetchNurses();
// // // //   }, []);

// // // //   // Process working hours whenever allNurses changes
// // // //   useEffect(() => {
// // // //     if (allNurses.length > 0) {
// // // //       processWorkingHours(allNurses);
// // // //     }
// // // //   }, [allNurses]);

// // // //   // Filter working hours based on user input
// // // //   const filteredWorkingHours = allWorkingHours.filter((hour) => {
// // // //     const isMatchingStaffId = selectedStaffId
// // // //       ? hour.nurseId === selectedStaffId
// // // //       : true;
// // // //     const isMatchingDate = selectedDate ? hour.date === selectedDate : true;
// // // //     return isMatchingStaffId && isMatchingDate;
// // // //   });

// // // //   const uniqueNurseIds = [...new Set(allNurses.map((nurse) => nurse._id))];
// // // //   const uniqueDates = [
// // // //     ...new Set(allWorkingHours.map((hour) => hour.date)),
// // // //   ].sort();

// // // //   // Helper to format date and time for better display
// // // //   const formatDateTime = (isoString) => {
// // // //     if (!isoString) return "N/A";
// // // //     const date = new Date(isoString);
// // // //     return date.toLocaleString();
// // // //   };

// // // //   if (loading) {
// // // //     return <div className="loading-container">Loading nurse schedules...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div className="error-container">{error}</div>;
// // // //   }

// // // //   return (
// // // //     <div className="schedule-container">
// // // //       <h1 className="schedule-title">Nurse Work Schedule</h1>

// // // //       <div className="filter-container">
// // // //         <div className="filter-group">
// // // //           <label htmlFor="staffId-select" className="filter-label">
// // // //             Filter by Staff ID:
// // // //           </label>
// // // //           <select
// // // //             id="staffId-select"
// // // //             value={selectedStaffId}
// // // //             onChange={(e) => setSelectedStaffId(e.target.value)}
// // // //             className="filter-select"
// // // //           >
// // // //             <option value="">All Staff</option>
// // // //             {uniqueNurseIds.map((id) => (
// // // //               <option key={id} value={id}>
// // // //                 {id}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>

// // // //         <div className="filter-group">
// // // //           <label htmlFor="date-select" className="filter-label">
// // // //             Filter by Date:
// // // //           </label>
// // // //           <select
// // // //             id="date-select"
// // // //             value={selectedDate}
// // // //             onChange={(e) => setSelectedDate(e.target.value)}
// // // //             className="filter-select"
// // // //           >
// // // //             <option value="">All Dates</option>
// // // //             {uniqueDates.map((date) => (
// // // //               <option key={date} value={date}>
// // // //                 {date}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //       </div>

// // // //       <div className="schedule-grid">
// // // //         {filteredWorkingHours.length > 0 ? (
// // // //           filteredWorkingHours.map((hour, index) => (
// // // //             <div key={index} className="schedule-card">
// // // //               <div className="card-header">
// // // //                 <span className="nurse-id">{hour.nurseId}</span>
// // // //                 <span
// // // //                   className={`status-badge status-${hour.status.toLowerCase()}`}
// // // //                 >
// // // //                   {hour.status}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="card-body">
// // // //                 <div className="card-item">
// // // //                   <strong>Date:</strong> {hour.date}
// // // //                 </div>
// // // //                 <div className="card-item">
// // // //                   <strong>From:</strong> {formatDateTime(hour.from)}
// // // //                 </div>
// // // //                 <div className="card-item">
// // // //                   <strong>To:</strong> {formatDateTime(hour.to)}
// // // //                 </div>
// // // //                 <div className="card-item">
// // // //                   <strong>Hospital:</strong> {hour.hospitalId}
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))
// // // //         ) : (
// // // //           <div className="no-data-message">
// // // //             No working hours found for the selected filters.
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NurseWorkSchedule;

// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css"; // Import the date picker's CSS

// // // import "./NurseWorkSchedule.css";

// // // const NurseWorkSchedule = () => {
// // //   const [allNurses, setAllNurses] = useState([]);
// // //   const [allWorkingHours, setAllWorkingHours] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // CHANGED: date is now a Date object, not a string
// // //   const [selectedDate, setSelectedDate] = useState(null);

// // //   // CHANGED: search term is a string
// // //   const [staffIdSearchTerm, setStaffIdSearchTerm] = useState("");

// // //   const fetchNurses = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
// // //       );
// // //       if (response.status === 200) {
// // //         setAllNurses(response.data);
// // //       } else {
// // //         console.log("No nurses found");
// // //         setAllNurses([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching nurses:", error);
// // //       setError("Failed to fetch nurse data.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const processWorkingHours = (nurses) => {
// // //     const hours = [];
// // //     nurses.forEach((nurse) => {
// // //       const nurseId = nurse._id;
// // //       const workingHours = nurse.workingHours || [];
// // //       const workSchedule = nurse.workSchedule || [];

// // //       [...workingHours, ...workSchedule].forEach((hour) => {
// // //         const dateKey =
// // //           hour.date ||
// // //           (hour.from ? new Date(hour.from).toISOString().split("T")[0] : null);

// // //         if (dateKey) {
// // //           hours.push({
// // //             nurseId,
// // //             date: dateKey,
// // //             from: hour.from,
// // //             to: hour.to,
// // //             hospitalId: hour.hospitalId,
// // //             status: hour.status || "not-specified",
// // //           });
// // //         }
// // //       });
// // //     });
// // //     setAllWorkingHours(hours);
// // //   };

// // //   useEffect(() => {
// // //     fetchNurses();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (allNurses.length > 0) {
// // //       processWorkingHours(allNurses);
// // //     }
// // //   }, [allNurses]);

// // //   // CHANGED: The filtering logic now uses the Date object and a search term.
// // //   const filteredWorkingHours = allWorkingHours.filter((hour) => {
// // //     const isMatchingStaffId = staffIdSearchTerm
// // //       ? hour.nurseId.toLowerCase().includes(staffIdSearchTerm.toLowerCase())
// // //       : true;

// // //     const isMatchingDate = selectedDate
// // //       ? hour.date === selectedDate.toISOString().split("T")[0]
// // //       : true;

// // //     return isMatchingStaffId && isMatchingDate;
// // //   });

// // //   const formatDateTime = (isoString) => {
// // //     if (!isoString) return "N/A";
// // //     const date = new Date(isoString);
// // //     return date.toLocaleString();
// // //   };

// // //   if (loading) {
// // //     return <div className="loading-container">Loading nurse schedules...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="error-container">{error}</div>;
// // //   }

// // //   return (
// // //     <div className="schedule-container">
// // //       <h1 className="schedule-title">Nurse Work Schedule</h1>

// // //       <div className="filter-container">
// // //         {/* CHANGED: Staff ID is now a search input */}
// // //         <div className="filter-group">
// // //           <label htmlFor="staffId-search" className="filter-label">
// // //             Search Staff ID:
// // //           </label>
// // //           <input
// // //             id="staffId-search"
// // //             type="text"
// // //             value={staffIdSearchTerm}
// // //             onChange={(e) => setStaffIdSearchTerm(e.target.value)}
// // //             placeholder="e.g. staff001"
// // //             className="filter-input"
// // //           />
// // //         </div>

// // //         {/* CHANGED: Date filter is now a calendar date picker */}
// // //         <div className="filter-group">
// // //           <label htmlFor="date-picker" className="filter-label">
// // //             Select Date:
// // //           </label>
// // //           <DatePicker
// // //             id="date-picker"
// // //             selected={selectedDate}
// // //             onChange={(date) => setSelectedDate(date)}
// // //             dateFormat="yyyy-MM-dd"
// // //             isClearable
// // //             placeholderText="Select a date"
// // //             className="filter-input"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="schedule-grid">
// // //         {filteredWorkingHours.length > 0 ? (
// // //           filteredWorkingHours.map((hour, index) => (
// // //             <div key={index} className="schedule-card">
// // //               <div className="card-header">
// // //                 <span className="nurse-id">{hour.nurseId}</span>
// // //                 <span
// // //                   className={`status-badge status-${hour.status.toLowerCase()}`}
// // //                 >
// // //                   {hour.status}
// // //                 </span>
// // //               </div>
// // //               <div className="card-body">
// // //                 <div className="card-item">
// // //                   <strong>Date:</strong> {hour.date}
// // //                 </div>
// // //                 <div className="card-item">
// // //                   <strong>From:</strong> {formatDateTime(hour.from)}
// // //                 </div>
// // //                 <div className="card-item">
// // //                   <strong>To:</strong> {formatDateTime(hour.to)}
// // //                 </div>
// // //                 <div className="card-item">
// // //                   <strong>Hospital:</strong> {hour.hospitalId}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="no-data-message">
// // //             No working hours found for the selected filters.
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NurseWorkSchedule;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // import "./NurseWorkSchedule.css";

// // const NurseWorkSchedule = () => {
// //   const [allNurses, setAllNurses] = useState([]);
// //   const [allWorkingHours, setAllWorkingHours] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedDate, setSelectedDate] = useState(null);
// //   const [staffIdSearchTerm, setStaffIdSearchTerm] = useState("");

// //   // NEW STATE: To store the generated report
// //   const [reportData, setReportData] = useState(null);

// //   const fetchNurses = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
// //       );
// //       if (response.status === 200) {
// //         setAllNurses(response.data);
// //       } else {
// //         console.log("No nurses found");
// //         setAllNurses([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching nurses:", error);
// //       setError("Failed to fetch nurse data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const processWorkingHours = (nurses) => {
// //     const hours = [];
// //     nurses.forEach((nurse) => {
// //       const nurseId = nurse._id;
// //       const workingHours = nurse.workingHours || [];
// //       const workSchedule = nurse.workSchedule || [];

// //       [...workingHours, ...workSchedule].forEach((hour) => {
// //         const dateKey =
// //           hour.date ||
// //           (hour.from ? new Date(hour.from).toISOString().split("T")[0] : null);

// //         if (dateKey) {
// //           hours.push({
// //             nurseId,
// //             date: dateKey,
// //             from: hour.from,
// //             to: hour.to,
// //             hospitalId: hour.hospitalId,
// //             status: hour.status || "not-specified",
// //           });
// //         }
// //       });
// //     });
// //     setAllWorkingHours(hours);
// //   };

// //   useEffect(() => {
// //     fetchNurses();
// //   }, []);

// //   useEffect(() => {
// //     if (allNurses.length > 0) {
// //       processWorkingHours(allNurses);
// //     }
// //   }, [allNurses]);

// //   // NEW FUNCTION: To calculate and generate the report
// //   const generateReport = () => {
// //     if (!allNurses || allNurses.length === 0) {
// //       alert("No nurse data available to generate a report.");
// //       return;
// //     }

// //     const report = allNurses.map((nurse) => {
// //       // Calculate total worked hours
// //       const totalHoursWorked = (nurse.workingHours || []).reduce(
// //         (total, work) => {
// //           const from = new Date(work.from);
// //           const to = new Date(work.to);
// //           const duration = (to - from) / (1000 * 60 * 60); // Duration in hours
// //           return total + duration;
// //         },
// //         0
// //       );

// //       // Calculate total scheduled hours
// //       const scheduledHours = (nurse.workSchedule || []).reduce(
// //         (total, schedule) => {
// //           const from = new Date(schedule.from);
// //           const to = new Date(schedule.to);
// //           const duration = (to - from) / (1000 * 60 * 60); // Duration in hours
// //           return total + duration;
// //         },
// //         0
// //       );

// //       // Count total leaves
// //       const totalLeaves = (nurse.leaveDetails || []).length;

// //       // Count rejected requests
// //       const rejectedRequests = (nurse.workSchedule || []).filter(
// //         (schedule) => schedule.status === "rejected"
// //       ).length;

// //       return {
// //         nurseId: nurse._id,
// //         name: `${nurse.firstName} ${nurse.lastName}`,
// //         totalHoursWorked: totalHoursWorked.toFixed(2),
// //         scheduledHours: scheduledHours.toFixed(2),
// //         totalLeaves,
// //         rejectedRequests,
// //       };
// //     });

// //     setReportData(report);
// //   };

// //   const filteredWorkingHours = allWorkingHours.filter((hour) => {
// //     const isMatchingStaffId = staffIdSearchTerm
// //       ? hour.nurseId.toLowerCase().includes(staffIdSearchTerm.toLowerCase())
// //       : true;

// //     const isMatchingDate = selectedDate
// //       ? hour.date === selectedDate.toISOString().split("T")[0]
// //       : true;

// //     return isMatchingStaffId && isMatchingDate;
// //   });

// //   const formatDateTime = (isoString) => {
// //     if (!isoString) return "N/A";
// //     const date = new Date(isoString);
// //     return date.toLocaleString();
// //   };

// //   if (loading) {
// //     return <div className="loading-container">Loading nurse schedules...</div>;
// //   }

// //   if (error) {
// //     return <div className="error-container">{error}</div>;
// //   }

// //   return (
// //     <div className="schedule-container">
// //       <h1 className="schedule-title">Nurse Work Schedule</h1>

// //       <div className="filter-container">
// //         <div className="filter-group">
// //           <label htmlFor="staffId-search" className="filter-label">
// //             Search Staff ID:
// //           </label>
// //           <input
// //             id="staffId-search"
// //             type="text"
// //             value={staffIdSearchTerm}
// //             onChange={(e) => setStaffIdSearchTerm(e.target.value)}
// //             placeholder="e.g. staff001"
// //             className="filter-input"
// //           />
// //         </div>

// //         <div className="filter-group">
// //           <label htmlFor="date-picker" className="filter-label">
// //             Select Date:
// //           </label>
// //           <DatePicker
// //             id="date-picker"
// //             selected={selectedDate}
// //             onChange={(date) => setSelectedDate(date)}
// //             dateFormat="yyyy-MM-dd"
// //             isClearable
// //             placeholderText="Select a date"
// //             className="filter-input"
// //           />
// //         </div>

// //         {/* NEW BUTTON: To generate the report */}
// //         <div className="filter-group">
// //           <button onClick={generateReport} className="generate-report-btn">
// //             Generate Report
// //           </button>
// //         </div>
// //       </div>

// //       {/* NEW SECTION: To display the report */}
// //       {reportData && (
// //         <div className="report-container">
// //           <h2 className="report-title">Nurse Activity Report</h2>
// //           <table className="report-table">
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Total Worked Hours</th>
// //                 <th>Scheduled Hours</th>
// //                 <th>Total Leaves</th>
// //                 <th>Rejected Requests</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {reportData.map((reportItem) => (
// //                 <tr key={reportItem.nurseId}>
// //                   <td>{reportItem.name}</td>
// //                   <td>{reportItem.totalHoursWorked} hrs</td>
// //                   <td>{reportItem.scheduledHours} hrs</td>
// //                   <td>{reportItem.totalLeaves}</td>
// //                   <td>{reportItem.rejectedRequests}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Existing schedule display */}
// //       <div className="schedule-grid">
// //         {filteredWorkingHours.length > 0 ? (
// //           filteredWorkingHours.map((hour, index) => (
// //             <div key={index} className="schedule-card">
// //               <div className="card-header">
// //                 <span className="nurse-id">{hour.nurseId}</span>
// //                 <span
// //                   className={`status-badge status-${hour.status.toLowerCase()}`}
// //                 >
// //                   {hour.status}
// //                 </span>
// //               </div>
// //               <div className="card-body">
// //                 <div className="card-item">
// //                   <strong>Date:</strong> {hour.date}
// //                 </div>
// //                 <div className="card-item">
// //                   <strong>From:</strong> {formatDateTime(hour.from)}
// //                 </div>
// //                 <div className="card-item">
// //                   <strong>To:</strong> {formatDateTime(hour.to)}
// //                 </div>
// //                 <div className="card-item">
// //                   <strong>Hospital:</strong> {hour.hospitalId}
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="no-data-message">
// //             No working hours found for the selected filters.
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NurseWorkSchedule;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // IMPORT NEW LIBRARIES
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// import "./NurseWorkSchedule.css";

// const NurseWorkSchedule = () => {
//   const [allNurses, setAllNurses] = useState([]);
//   const [allWorkingHours, setAllWorkingHours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [staffIdSearchTerm, setStaffIdSearchTerm] = useState("");
//   const [reportData, setReportData] = useState(null);

//   // NEW: Ref to reference the report container element
//   const reportRef = useRef();

//   const fetchNurses = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
//       );
//       if (response.status === 200) {
//         setAllNurses(response.data);
//       } else {
//         console.log("No nurses found");
//         setAllNurses([]);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//       setError("Failed to fetch nurse data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processWorkingHours = (nurses) => {
//     const hours = [];
//     nurses.forEach((nurse) => {
//       const nurseId = nurse._id;
//       const workingHours = nurse.workingHours || [];
//       const workSchedule = nurse.workSchedule || [];

//       [...workingHours, ...workSchedule].forEach((hour) => {
//         const dateKey =
//           hour.date ||
//           (hour.from ? new Date(hour.from).toISOString().split("T")[0] : null);

//         if (dateKey) {
//           hours.push({
//             nurseId,
//             date: dateKey,
//             from: hour.from,
//             to: hour.to,
//             hospitalId: hour.hospitalId,
//             status: hour.status || "not-specified",
//           });
//         }
//       });
//     });
//     setAllWorkingHours(hours);
//   };

//   useEffect(() => {
//     fetchNurses();
//   }, []);

//   useEffect(() => {
//     if (allNurses.length > 0) {
//       processWorkingHours(allNurses);
//     }
//   }, [allNurses]);

//   const generateReport = () => {
//     if (!allNurses || allNurses.length === 0) {
//       alert("No nurse data available to generate a report.");
//       return;
//     }

//     const report = allNurses.map((nurse) => {
//       const totalHoursWorked = (nurse.workingHours || []).reduce(
//         (total, work) => {
//           const from = new Date(work.from);
//           const to = new Date(work.to);
//           const duration = (to - from) / (1000 * 60 * 60);
//           return total + duration;
//         },
//         0
//       );

//       const scheduledHours = (nurse.workSchedule || []).reduce(
//         (total, schedule) => {
//           const from = new Date(schedule.from);
//           const to = new Date(schedule.to);
//           const duration = (to - from) / (1000 * 60 * 60);
//           return total + duration;
//         },
//         0
//       );

//       const totalLeaves = (nurse.leaveDetails || []).length;

//       const rejectedRequests = (nurse.workSchedule || []).filter(
//         (schedule) => schedule.status === "rejected"
//       ).length;

//       return {
//         nurseId: nurse._id,
//         name: `${nurse.firstName} ${nurse.lastName}`,
//         totalHoursWorked: totalHoursWorked.toFixed(2),
//         scheduledHours: scheduledHours.toFixed(2),
//         totalLeaves,
//         rejectedRequests,
//       };
//     });

//     setReportData(report);
//   };

//   // NEW FUNCTION: To handle the PDF download
//   const downloadReportPdf = async () => {
//     if (!reportData) {
//       alert("Please generate a report first.");
//       return;
//     }

//     const input = reportRef.current;
//     if (!input) {
//       console.error("Report container not found.");
//       return;
//     }

//     // Convert the HTML element to a canvas
//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");

//     // Create a new PDF document
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     // Add the image to the PDF
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//     // Save the PDF
//     pdf.save("nurse_activity_report.pdf");
//   };

//   const filteredWorkingHours = allWorkingHours.filter((hour) => {
//     const isMatchingStaffId = staffIdSearchTerm
//       ? hour.nurseId.toLowerCase().includes(staffIdSearchTerm.toLowerCase())
//       : true;

//     const isMatchingDate = selectedDate
//       ? hour.date === selectedDate.toISOString().split("T")[0]
//       : true;

//     return isMatchingStaffId && isMatchingDate;
//   });

//   const formatDateTime = (isoString) => {
//     if (!isoString) return "N/A";
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   if (loading) {
//     return <div className="loading-container">Loading nurse schedules...</div>;
//   }

//   if (error) {
//     return <div className="error-container">{error}</div>;
//   }

//   return (
//     <div className="schedule-container">
//       <h1 className="schedule-title">Nurse Work Schedule</h1>

//       <div className="filter-container">
//         <div className="filter-group">
//           <label htmlFor="staffId-search" className="filter-label">
//             Search Staff ID:
//           </label>
//           <input
//             id="staffId-search"
//             type="text"
//             value={staffIdSearchTerm}
//             onChange={(e) => setStaffIdSearchTerm(e.target.value)}
//             placeholder="e.g. staff001"
//             className="filter-input"
//           />
//         </div>

//         <div className="filter-group">
//           <label htmlFor="date-picker" className="filter-label">
//             Select Date:
//           </label>
//           <DatePicker
//             id="date-picker"
//             selected={selectedDate}
//             onChange={(date) => setSelectedDate(date)}
//             dateFormat="yyyy-MM-dd"
//             isClearable
//             placeholderText="Select a date"
//             className="filter-input"
//           />
//         </div>

//         <div className="filter-group button-group">
//           <button onClick={generateReport} className="generate-report-btn">
//             Generate Report
//           </button>

//           {/* NEW BUTTON: To download the PDF */}
//           <button onClick={downloadReportPdf} className="download-pdf-btn">
//             Download PDF
//           </button>
//         </div>
//       </div>

//       {reportData && (
//         // NEW: Add a ref to the report container
//         <div className="report-container" ref={reportRef}>
//           <h2 className="report-title">Nurse Activity Report</h2>
//           <table className="report-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Total Worked Hours</th>
//                 <th>Scheduled Hours</th>
//                 <th>Total Leaves</th>
//                 <th>Rejected Requests</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((reportItem) => (
//                 <tr key={reportItem.nurseId}>
//                   <td>{reportItem.name}</td>
//                   <td>{reportItem.totalHoursWorked} hrs</td>
//                   <td>{reportItem.scheduledHours} hrs</td>
//                   <td>{reportItem.totalLeaves}</td>
//                   <td>{reportItem.rejectedRequests}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="schedule-grid">
//         {filteredWorkingHours.length > 0 ? (
//           filteredWorkingHours.map((hour, index) => (
//             <div key={index} className="schedule-card">
//               <div className="card-header">
//                 <span className="nurse-id">{hour.nurseId}</span>
//                 <span
//                   className={`status-badge status-${hour.status.toLowerCase()}`}
//                 >
//                   {hour.status}
//                 </span>
//               </div>
//               <div className="card-body">
//                 <div className="card-item">
//                   <strong>Date:</strong> {hour.date}
//                 </div>
//                 <div className="card-item">
//                   <strong>From:</strong> {formatDateTime(hour.from)}
//                 </div>
//                 <div className="card-item">
//                   <strong>To:</strong> {formatDateTime(hour.to)}
//                 </div>
//                 <div className="card-item">
//                   <strong>Hospital:</strong> {hour.hospitalId}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-data-message">
//             No working hours found for the selected filters.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NurseWorkSchedule;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./NurseWorkSchedule.css";

// Separate Modal Component
const DetailsModal = ({ nurse, hospital, onClose }) => {
  if (!nurse || !hospital) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Details for {nurse.nurseId}</h2>

        <div className="modal-details-grid">
          <div className="detail-card">
            <h3 className="detail-card-title">Nurse Details</h3>
            <p>
              <strong>Name:</strong> {nurse.name}
            </p>
            <p>
              <strong>Phone:</strong> {nurse.contactDetails?.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {nurse.contactDetails?.email || "N/A"}
            </p>
          </div>

          <div className="detail-card">
            <h3 className="detail-card-title">Hospital Details</h3>
            <p>
              <strong>Hospital ID:</strong> {hospital._id}
            </p>
            <p>
              <strong>Phone:</strong> {hospital.contactDetails?.phone || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {hospital.contactDetails?.email || "N/A"}
            </p>
            <p>
              <strong>KMC Number:</strong> {hospital.kmcNumber || "N/A"}
            </p>
          </div>
        </div>
      </div>
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

  // NEW STATE for modal
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

  // NEW FUNCTION: Fetch hospital details
  const fetchHospitalDetails = async (hospitalId) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails`
      );
      // Assuming the API returns an array and we need to find the specific one
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
        const dateKey =
          hour.date ||
          (hour.from ? new Date(hour.from).toISOString().split("T")[0] : null);

        if (dateKey) {
          hours.push({
            nurseId,
            date: dateKey,
            from: hour.from,
            to: hour.to,
            hospitalId: hour.hospitalId,
            status: hour.status || "not-specified",
            nurseDetails: {
              name: `${nurse.firstName} ${nurse.lastName}`,
              contactDetails: nurse.contactDetails,
              // Other nurse details you want to show in the modal
            },
          });
        }
      });
    });
    setAllWorkingHours(hours);
  };

  // NEW FUNCTION: Handles click on a schedule card
  const handleCardClick = (hour) => {
    setSelectedCardDetails(hour);
    fetchHospitalDetails(hour.hospitalId);
    setIsModalOpen(true);
  };

  // NEW FUNCTION: Closes the modal
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
    // ... (logic remains the same as before)
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
    // ... (logic remains the same as before)
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
    const isMatchingDate = selectedDate
      ? hour.date === selectedDate.toISOString().split("T")[0]
      : true;
    return isMatchingStaffId && isMatchingDate;
  });

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="loading-container">Loading nurse schedules...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Nurse Work Schedule</h1>
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="staffId-search" className="filter-label">
            Search Staff ID:
          </label>
          <input
            id="staffId-search"
            type="text"
            value={staffIdSearchTerm}
            onChange={(e) => setStaffIdSearchTerm(e.target.value)}
            placeholder="e.g. staff001"
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="date-picker" className="filter-label">
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            isClearable
            placeholderText="Select a date"
            className="filter-input"
          />
        </div>
        <div className="filter-group button-group">
          <button onClick={generateReport} className="generate-report-btn">
            Generate Report
          </button>
          <button onClick={downloadReportPdf} className="download-pdf-btn">
            Download PDF
          </button>
        </div>
      </div>
      {reportData && (
        <div className="report-container" ref={reportRef}>
          <h2 className="report-title">Nurse Activity Report</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Worked Hours</th>
                <th>Scheduled Hours</th>
                <th>Total Leaves</th>
                <th>Rejected Requests</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((reportItem) => (
                <tr key={reportItem.nurseId}>
                  <td>{reportItem.name}</td>
                  <td>{reportItem.totalHoursWorked} hrs</td>
                  <td>{reportItem.scheduledHours} hrs</td>
                  <td>{reportItem.totalLeaves}</td>
                  <td>{reportItem.rejectedRequests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="schedule-grid">
        {filteredWorkingHours.length > 0 ? (
          filteredWorkingHours.map((hour, index) => (
            // NEW: Add onClick handler and pointer cursor
            <div
              key={index}
              className="schedule-card"
              onClick={() => handleCardClick(hour)}
            >
              <div className="card-header">
                <span className="nurse-id">{hour.nurseId}</span>
                <span
                  className={`status-badge status-${hour.status.toLowerCase()}`}
                >
                  {hour.status}
                </span>
              </div>
              <div className="card-body">
                <div className="card-item">
                  <strong>Date:</strong> {hour.date}
                </div>
                <div className="card-item">
                  <strong>From:</strong> {formatDateTime(hour.from)}
                </div>
                <div className="card-item">
                  <strong>To:</strong> {formatDateTime(hour.to)}
                </div>
                <div className="card-item">
                  <strong>Hospital:</strong> {hour.hospitalId}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">
            No working hours found for the selected filters.
          </div>
        )}
      </div>
      {/* NEW: Render the modal when it's open */}
      {isModalOpen && (
        <DetailsModal
          nurse={selectedCardDetails?.nurseDetails}
          hospital={selectedHospitalDetails}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default NurseWorkSchedule;
