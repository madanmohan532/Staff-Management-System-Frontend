// // // import React, { useState, useEffect } from "react";
// // // import { FaClock } from "react-icons/fa";
// // // import "./NurseDashboard.css";
// // // import axios from "axios";

// // // const AttendanceSection = ({ nurseId }) => {
// // //   const [clockedIn, setClockedIn] = useState(false);
// // //   const [clockInTime, setClockInTime] = useState(null);
// // //   const [attendance, setAttendance] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch attendance on mount
// // //     // axios.get(...).then(r=>setAttendance(r.data))
// // //   }, []);

// // //   const handleClockIn = () => {
// // //     setClockedIn(true);
// // //     setClockInTime(new Date().toISOString());
// // //     // Backend POST...
// // //   };

// // //   const handleClockOut = () => {
// // //     setClockedIn(false);
// // //     setClockInTime(null);
// // //     // Backend POST...
// // //     // Refresh attendance data
// // //   };

// // //   return (
// // //     <section className="section-card">
// // //       <div className="section-header">
// // //         <h2>Attendance</h2>
// // //       </div>
// // //       <div className="clock-actions">
// // //         {!clockedIn ? (
// // //           <button className="clock-btn in" onClick={handleClockIn}>
// // //             <FaClock /> Clock In
// // //           </button>
// // //         ) : (
// // //           <button className="clock-btn out" onClick={handleClockOut}>
// // //             <FaClock /> Clock Out
// // //           </button>
// // //         )}
// // //         {clockInTime && (
// // //           <span className="clocked-text">
// // //             Clocked in at {new Date(clockInTime).toLocaleTimeString()}
// // //           </span>
// // //         )}
// // //       </div>
// // //       <h3>Attendance History</h3>
// // //       <table className="attendance-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Date</th>
// // //             <th>Clock In</th>
// // //             <th>Clock Out</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {attendance.length === 0 ? (
// // //             <tr>
// // //               <td colSpan={3}>No attendance yet</td>
// // //             </tr>
// // //           ) : (
// // //             attendance.map((row) => (
// // //               <tr key={row.id}>
// // //                 <td>{new Date(row.date).toLocaleDateString()}</td>
// // //                 <td>
// // //                   {row.clockIn
// // //                     ? new Date(row.clockIn).toLocaleTimeString()
// // //                     : "-"}
// // //                 </td>
// // //                 <td>
// // //                   {row.clockOut
// // //                     ? new Date(row.clockOut).toLocaleTimeString()
// // //                     : "-"}
// // //                 </td>
// // //               </tr>
// // //             ))
// // //           )}
// // //         </tbody>
// // //       </table>
// // //     </section>
// // //   );
// // // };

// // // export default AttendanceSection;

// // // import React, { useState, useEffect } from "react";
// // // import { FaCalendarAlt, FaClock } from "react-icons/fa";
// // // import axios from "axios";
// // // import "./AttendanceSection.css";

// // // const AttendanceSection = ({ nurseId }) => {
// // //   const [clockedIn, setClockedIn] = useState(false);
// // //   const [clockInTime, setClockInTime] = useState(null);
// // //   const [workingHours, setWorkingHours] = useState([]);
// // //   const [workSchedule, setWorkSchedule] = useState([]);

// // //   // UI state for filters
// // //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
// // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

// // //   const months = [
// // //     { value: 1, label: "January" },
// // //     { value: 2, label: "February" },
// // //     { value: 3, label: "March" },
// // //     { value: 4, label: "April" },
// // //     { value: 5, label: "May" },
// // //     { value: 6, label: "June" },
// // //     { value: 7, label: "July" },
// // //     { value: 8, label: "August" },
// // //     { value: 9, label: "September" },
// // //     { value: 10, label: "October" },
// // //     { value: 11, label: "November" },
// // //     { value: 12, label: "December" },
// // //   ];

// // //   // Fetch workingHours and workSchedule on mount
// // //   useEffect(() => {
// // //     fetchWorkingHours();
// // //     fetchWorkSchedule();
// // //   }, []);

// // //   const fetchWorkingHours = () => {
// // //     axios
// // //       .get(
// // //         `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
// // //       )
// // //       .then((res) => {
// // //         if (res.status === 200) {
// // //           console.log(res.data);

// // //           setWorkingHours(res.data);
// // //         }
// // //       })
// // //       .catch((err) => console.error("Error fetching working hours:", err));
// // //   };

// // //   const fetchWorkSchedule = () => {
// // //     axios
// // //       .get(
// // //         `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
// // //       )
// // //       .then((res) => {
// // //         if (res.status === 200) {
// // //           setWorkSchedule(res.data || []);
// // //         }
// // //       })
// // //       .catch((err) => console.error("Error fetching work schedule:", err));
// // //   };

// // //   // Helpers to filter data by month and year
// // //   const filterByMonthYear = (list) => {
// // //     return list.filter((item) => {
// // //       const date = new Date(item.date); // item.date assumed ISO string
// // //       return (
// // //         date.getFullYear() === Number(selectedYear) &&
// // //         date.getMonth() + 1 === Number(selectedMonth)
// // //       );
// // //     });
// // //   };

// // //   const filteredWorkingHours = filterByMonthYear(workingHours);
// // //   const filteredWorkSchedule = filterByMonthYear(workSchedule);

// // //   // Format time nicely in IST
// // //   const formatTime = (isoString) => {
// // //     if (!isoString) return "-";
// // //     return new Date(isoString).toLocaleTimeString("en-IN", {
// // //       timeZone: "Asia/Kolkata",
// // //     });
// // //   };
// // //   // Format date nicely in IST
// // //   const formatDate = (isoString) => {
// // //     if (!isoString) return "-";
// // //     return new Date(isoString).toLocaleDateString("en-IN", {
// // //       timeZone: "Asia/Kolkata",
// // //     });
// // //   };

// // //   // Clock in/out handlers: Implement your backend calls here
// // //   const handleClockIn = () => {
// // //     setClockedIn(true);
// // //     const now = new Date().toISOString();
// // //     setClockInTime(now);
// // //     // TODO: call backend to register clock-in
// // //   };
// // //   const handleClockOut = () => {
// // //     setClockedIn(false);
// // //     setClockInTime(null);
// // //     // TODO: call backend to register clock-out and refresh data
// // //   };

// // //   return (
// // //     <section className="section-card attendance-section">
// // //       <div className="section-header">
// // //         <h2>
// // //           <FaClock /> Attendance
// // //         </h2>
// // //       </div>

// // //       <div className="clock-actions">
// // //         {!clockedIn ? (
// // //           <button className="clock-btn in" onClick={handleClockIn}>
// // //             <FaClock /> Clock In
// // //           </button>
// // //         ) : (
// // //           <button className="clock-btn out" onClick={handleClockOut}>
// // //             <FaClock /> Clock Out
// // //           </button>
// // //         )}
// // //         {clockInTime && (
// // //           <span className="clocked-text">
// // //             Clocked in at {formatTime(clockInTime)}
// // //           </span>
// // //         )}
// // //       </div>

// // //       <div className="filter-row">
// // //         <label>
// // //           Month:{" "}
// // //           <select
// // //             value={selectedMonth}
// // //             onChange={(e) => setSelectedMonth(Number(e.target.value))}
// // //           >
// // //             {months.map((m) => (
// // //               <option key={m.value} value={m.value}>
// // //                 {m.label}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </label>

// // //         <label>
// // //           Year:{" "}
// // //           <select
// // //             value={selectedYear}
// // //             onChange={(e) => setSelectedYear(Number(e.target.value))}
// // //           >
// // //             {Array.from(
// // //               { length: 5 },
// // //               (_, i) => new Date().getFullYear() - i
// // //             ).map((year) => (
// // //               <option key={year} value={year}>
// // //                 {year}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </label>
// // //       </div>

// // //       <h3>Working Hours</h3>
// // //       <table className="attendance-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Date</th>
// // //             <th>From</th>
// // //             <th>To</th>
// // //             <th>Hospital ID</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredWorkingHours.length === 0 ? (
// // //             <tr>
// // //               <td colSpan={4} className="empty-list">
// // //                 No working hours for selected month/year.
// // //               </td>
// // //             </tr>
// // //           ) : (
// // //             filteredWorkingHours.map((item, idx) => (
// // //               <tr key={idx}>
// // //                 <td>{formatDate(item.date)}</td>
// // //                 <td>{formatTime(item.from)}</td>
// // //                 <td>{formatTime(item.to)}</td>
// // //                 <td>{item.hospitalId}</td>
// // //               </tr>
// // //             ))
// // //           )}
// // //         </tbody>
// // //       </table>

// // //       <h3>Work Schedule</h3>
// // //       <table className="attendance-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Date</th>
// // //             <th>From</th>
// // //             <th>To</th>
// // //             <th>Hospital ID</th>
// // //             <th>Status</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {filteredWorkSchedule.length === 0 ? (
// // //             <tr>
// // //               <td colSpan={5} className="empty-list">
// // //                 No scheduled work for selected month/year.
// // //               </td>
// // //             </tr>
// // //           ) : (
// // //             filteredWorkSchedule.map((item, idx) => (
// // //               <tr key={idx}>
// // //                 <td>{formatDate(item.date)}</td>
// // //                 <td>{formatTime(item.from)}</td>
// // //                 <td>{formatTime(item.to)}</td>
// // //                 <td>{item.hospitalId}</td>
// // //                 <td className={`status ${item.status.toLowerCase()}`}>
// // //                   {item.status}
// // //                 </td>
// // //               </tr>
// // //             ))
// // //           )}
// // //         </tbody>
// // //       </table>
// // //     </section>
// // //   );
// // // };

// // // export default AttendanceSection;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./AttendanceCalendar.css"; // You’ll create CSS for calendar styling

// // const AttendanceSection = ({ nurseId }) => {
// //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
// //   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Zero-based: Jan=0

// //   const [workingHours, setWorkingHours] = useState([]); // worked shifts
// //   const [workSchedule, setWorkSchedule] = useState([]); // assigned shifts (with status)
// //   const [today] = useState(new Date());

// //   // Fetch data on mount and on month/year change
// //   useEffect(() => {
// //     fetchWorkingHours();
// //     fetchWorkSchedule();
// //   }, [selectedYear, selectedMonth]);

// //   const fetchWorkingHours = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
// //       );
// //       if (res.status === 200) setWorkingHours(res.data || []);
// //     } catch (err) {
// //       console.error("Error fetching working hours", err);
// //     }
// //   };

// //   const fetchWorkSchedule = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
// //       );
// //       if (res.status === 200) setWorkSchedule(res.data || []);
// //     } catch (err) {
// //       console.error("Error fetching work schedule", err);
// //     }
// //   };

// //   // Utility: get number days in month
// //   const getDaysInMonth = (year, month) =>
// //     new Date(year, month + 1, 0).getDate();

// //   // Helper: Check if date matches shift day (date part only)
// //   const isSameDay = (date1, date2) =>
// //     date1.getFullYear() === date2.getFullYear() &&
// //     date1.getMonth() === date2.getMonth() &&
// //     date1.getDate() === date2.getDate();

// //   // Get all days for calendar (simple month grid)
// //   const totalDays = getDaysInMonth(selectedYear, selectedMonth);
// //   const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

// //   // Convert iso strings to Date objects for filtering
// //   const parseDate = (isostr) => (isostr ? new Date(isostr) : null);

// //   // Find working hours / schedules for given day
// //   const getWorkingShiftsForDay = (day) => {
// //     const dateObj = new Date(selectedYear, selectedMonth, day);

// //     return workingHours.filter((shift) => {
// //       const shiftDate = new Date(shift.date);
// //       return isSameDay(shiftDate, dateObj);
// //     });
// //   };

// //   const getScheduledShiftsForDay = (day) => {
// //     const dateObj = new Date(selectedYear, selectedMonth, day);

// //     return workSchedule.filter((shift) => {
// //       const shiftDate = new Date(shift.date);
// //       return isSameDay(shiftDate, dateObj) && shift.status === "accepted";
// //     });
// //   };

// //   // Check if a current shift is ongoing for this day and current time is within from-to span
// //   const isShiftOngoingNow = (shift) => {
// //     const now = new Date();

// //     if (!shift.from || !shift.to) return false;

// //     const shiftFrom = new Date(shift.from);
// //     const shiftTo = new Date(shift.to);

// //     return now >= shiftFrom && now <= shiftTo;
// //   };

// //   // Format time (to hour-min, India timezone)
// //   const formatTime = (isoString) => {
// //     if (!isoString) return "-";
// //     return new Date(isoString).toLocaleTimeString("en-IN", {
// //       timeZone: "Asia/Kolkata",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   // Handler for month/year change
// //   const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));
// //   const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

// //   // Years options
// //   const years = Array.from(
// //     { length: 5 },
// //     (_, i) => new Date().getFullYear() - i
// //   );

// //   // Optionally if you have hospital details mapping (hospitalId => name)
// //   // Here, a dummy example (replace with actual logic or props)
// //   const hospitalNames = {
// //     hosp1: "City Hospital",
// //     hosp2: "Green Valley Hospital",
// //     // fill as per your data
// //   };

// //   return (
// //     <section className="attendance-calendar-section">
// //       <h2>Attendance Calendar</h2>

// //       <div className="filters">
// //         <label>
// //           Month:{" "}
// //           <select value={selectedMonth} onChange={handleMonthChange}>
// //             {[
// //               "January",
// //               "February",
// //               "March",
// //               "April",
// //               "May",
// //               "June",
// //               "July",
// //               "August",
// //               "September",
// //               "October",
// //               "November",
// //               "December",
// //             ].map((m, i) => (
// //               <option key={i} value={i}>
// //                 {m}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //         <label>
// //           Year:{" "}
// //           <select value={selectedYear} onChange={handleYearChange}>
// //             {years.map((y) => (
// //               <option key={y} value={y}>
// //                 {y}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //       </div>

// //       <div className="calendar-grid">
// //         {daysArray.map((day) => {
// //           const workedShifts = getWorkingShiftsForDay(day);
// //           const scheduledShifts = getScheduledShiftsForDay(day);

// //           // Determine classes for day cell:
// //           // Priority: ongoing shift > worked day > upcoming accepted schedule
// //           const isOngoing =
// //             workedShifts.some(isShiftOngoingNow) ||
// //             scheduledShifts.some(isShiftOngoingNow);
// //           const workedToday = workedShifts.length > 0;
// //           const scheduledToday = scheduledShifts.length > 0;

// //           let dayClass = "calendar-day";
// //           if (isOngoing) dayClass += " ongoing-shift";
// //           else if (workedToday) dayClass += " worked-day";
// //           else if (scheduledToday) dayClass += " scheduled-day";

// //           return (
// //             <div key={day} className={dayClass} title={`Day ${day}`}>
// //               <div className="date-number">{day}</div>

// //               {/* Show worked shifts */}
// //               {workedShifts.map((shift, idx) => (
// //                 <div key={"w-" + idx} className="shift-badge worked-shift">
// //                   {/* If you have hospital name mapping, use it here */}
// //                   {hospitalNames[shift.hospitalId] || shift.hospitalId}{" "}
// //                   <small>
// //                     {formatTime(shift.from)} - {formatTime(shift.to)}
// //                   </small>
// //                 </div>
// //               ))}

// //               {/* Show accepted scheduled shifts if no worked shifts (future) */}
// //               {workedShifts.length === 0 &&
// //                 scheduledShifts.map((shift, idx) => (
// //                   <div key={"s-" + idx} className="shift-badge scheduled-shift">
// //                     {hospitalNames[shift.hospitalId] || shift.hospitalId}{" "}
// //                     <small>
// //                       {formatTime(shift.from)} - {formatTime(shift.to)}
// //                     </small>
// //                   </div>
// //                 ))}

// //               {/* Highlight ongoing shift badge */}
// //               {(isOngoing && (
// //                 <div className="ongoing-indicator">Ongoing Shift</div>
// //               )) ||
// //                 null}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </section>
// //   );
// // };

// // export default AttendanceSection;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const NurseAttendanceCalendar = ({ nurseId }) => {
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch attendance data when month/year changes
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
//         );
//         console.log(response.data);

//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching attendance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, [nurseId, selectedMonth, selectedYear]);

//   // Generate days for the selected month
//   const getDaysInMonth = (year, month) =>
//     new Date(year, month + 1, 0).getDate();
//   const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

//   // Create blank cells for days before the 1st of the month
//   const blankDays = Array(firstDayOfMonth).fill(null);
//   const daysInMonth = Array.from(
//     { length: getDaysInMonth(selectedYear, selectedMonth) },
//     (_, i) => i + 1
//   );

//   // Format time display
//   const formatTime = (timeString) => {
//     if (!timeString) return "";
//     const time = new Date(timeString);
//     return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   // Get attendance status for a specific day
//   const getDayStatus = (day) => {
//     const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(
//       2,
//       "0"
//     )}-${String(day).padStart(2, "0")}`;
//     const dayData = attendanceData.find((item) => item.date === dateStr);

//     if (!dayData) return null;

//     return {
//       status: dayData.status,
//       hours:
//         dayData.status === "Present"
//           ? `${formatTime(dayData.clockIn)} - ${formatTime(dayData.clockOut)}`
//           : dayData.status,
//     };
//   };

//   // Month names for dropdown
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Years for dropdown (current year and 4 previous)
//   const years = Array.from(
//     { length: 5 },
//     (_, i) => new Date().getFullYear() - i
//   );

//   return (
//     <div className="nurse-attendance-calendar">
//       <div className="nurse-header">
//         <h2>Sarah Johnson</h2>
//         <div className="nurse-meta">
//           <span>ID: NUR-2045 | Senior Nurse</span>
//           <span>Department: Nursing | Joined: Jan 15, 2020</span>
//         </div>
//         <div className="status-badge active">Active</div>
//       </div>

//       <div className="calendar-controls">
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(Number(e.target.value))}
//         >
//           {months.map((month, index) => (
//             <option key={month} value={index}>
//               {month}
//             </option>
//           ))}
//         </select>
//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(Number(e.target.value))}
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="calendar-grid">
//         {/* Day headers */}
//         <div className="day-header">Sun</div>
//         <div className="day-header">Mon</div>
//         <div className="day-header">Tue</div>
//         <div className="day-header">Wed</div>
//         <div className="day-header">Thu</div>
//         <div className="day-header">Fri</div>
//         <div className="day-header">Sat</div>

//         {/* Blank days for calendar alignment */}
//         {blankDays.map((_, index) => (
//           <div key={`blank-${index}`} className="calendar-day empty"></div>
//         ))}

//         {/* Calendar days */}
//         {daysInMonth.map((day) => {
//           const dayStatus = getDayStatus(day);
//           const isToday =
//             new Date().getDate() === day &&
//             new Date().getMonth() === selectedMonth &&
//             new Date().getFullYear() === selectedYear;

//           return (
//             <div
//               key={day}
//               className={`calendar-day ${dayStatus?.status?.toLowerCase()} ${
//                 isToday ? "today" : ""
//               }`}
//             >
//               <div className="day-number">{day}</div>
//               {dayStatus && (
//                 <div className="day-status">
//                   {dayStatus.status === "Present" ? (
//                     <>
//                       <span>Present</span>
//                       <small>{dayStatus.hours}</small>
//                     </>
//                   ) : (
//                     <span>{dayStatus.status}</span>
//                   )}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {loading && <div className="loading-indicator">Loading...</div>}

//       <style jsx>{`
//         .nurse-attendance-calendar {
//           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 20px;
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }

//         .nurse-header {
//           margin-bottom: 20px;
//           padding-bottom: 15px;
//           border-bottom: 1px solid #eee;
//         }

//         .nurse-header h2 {
//           margin: 0 0 5px 0;
//           color: #2c3e50;
//         }

//         .nurse-meta {
//           display: flex;
//           flex-direction: column;
//           gap: 3px;
//           color: #7f8c8d;
//           font-size: 14px;
//           margin-bottom: 10px;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 10px;
//           border-radius: 12px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .status-badge.active {
//           background-color: #d4edda;
//           color: #155724;
//         }

//         .calendar-controls {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//         }

//         .calendar-controls select {
//           padding: 8px 12px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           background: white;
//         }

//         .calendar-grid {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           gap: 8px;
//         }

//         .day-header {
//           text-align: center;
//           font-weight: bold;
//           padding: 8px;
//           color: #2c3e50;
//           background: #f8f9fa;
//           border-radius: 4px;
//         }

//         .calendar-day {
//           min-height: 80px;
//           padding: 8px;
//           border: 1px solid #eee;
//           border-radius: 4px;
//           position: relative;
//         }

//         .calendar-day.empty {
//           background: transparent;
//           border: none;
//         }

//         .calendar-day.today {
//           border: 2px solid #3498db;
//         }

//         .day-number {
//           font-weight: bold;
//           margin-bottom: 5px;
//         }

//         .day-status {
//           font-size: 12px;
//         }

//         .day-status small {
//           display: block;
//           color: #7f8c8d;
//         }

//         .calendar-day.present {
//           background-color: #d4edda;
//         }

//         .calendar-day.holiday {
//           background-color: #f8d7da;
//         }

//         .calendar-day.leave {
//           background-color: #fff3cd;
//         }

//         .loading-indicator {
//           text-align: center;
//           padding: 20px;
//           color: #7f8c8d;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NurseAttendanceCalendar;

import React, { useState, useEffect } from "react";
import axios from "axios";

const NurseAttendanceCalendar = ({ nurseId }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [workingHours, setWorkingHours] = useState([]);
  const [workSchedule, setWorkSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  // Fetch data when month/year or nurseId changes

  const fetchNurseDetails = () => {
    axios
      .get(
        `http://localhost:9999/staff-service/api/nurse//${localStorage.getItem(
          "nurseId"
        )}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const results = response.data;

          setLoggedInUser(response.data);
        } else {
          console.log("No user found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [hoursRes, scheduleRes] = await Promise.all([
          axios.get(
            `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
          ),
          axios.get(
            `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
          ),
        ]);

        setWorkingHours(hoursRes.data || []);
        setWorkSchedule(scheduleRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nurseId, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchNurseDetails();
  }, []);

  // Generate days for the selected month
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  // Create blank cells for days before the 1st of the month
  const blankDays = Array(firstDayOfMonth).fill(null);
  const daysInMonth = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1
  );

  // Format time display (IST timezone)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return new Date(timeString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Get data for a specific day
  // const getDayData = (day) => {
  //   const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(
  //     2,
  //     "0"
  //   )}-${String(day).padStart(2, "0")}`;

  //   // Find worked hours
  //   const worked = workingHours.find((item) => item.date.startsWith(dateStr));

  //   // Find scheduled shifts (only accepted/confirmed)
  //   const scheduled = workSchedule.filter(
  //     (item) =>
  //       item.date.startsWith(dateStr) &&
  //       (item.status === "accepted" || item.status === "confirmed")
  //   );

  //   return {
  //     worked,
  //     scheduled,
  //     isToday: dateStr === new Date().toISOString().split("T")[0],
  //   };
  // };

  const getDayData = (day) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    // Today's date string for comparison
    const todayStr = new Date().toISOString().split("T")[0];

    // Find worked hours
    const worked = workingHours.find((item) => item.date.startsWith(dateStr));

    // Find scheduled shifts (only accepted/confirmed and date >= today)
    const scheduled = workSchedule.filter(
      (item) =>
        item.date.startsWith(dateStr) &&
        (item.status === "accepted" || item.status === "confirmed") &&
        item.date >= todayStr // <-- Only future or today schedules
    );

    return {
      worked,
      scheduled,
      isToday: dateStr === todayStr,
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

  // Years for dropdown (current year and 4 previous)
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  // Hospital ID to name mapping (customize as needed)
  const hospitalNames = {
    hosp001: "Main Hospital",
    hosp002: "City Clinic",
  };

  return (
    <div className="nurse-attendance-calendar">
      <div className="nurse-header">
        <h2>{loggedInUser.firstName}</h2>
        <div className="nurse-meta">
          <span>
            ID: {loggedInUser._id} | Specialised In : {loggedInUser.skills}
          </span>
        </div>
        <div className="status-badge active">Active</div>
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
                  <small>
                    {hospitalNames[worked.hospitalId] || worked.hospitalId}
                  </small>
                </div>
              ) : hasSchedule ? (
                scheduled.map((shift, idx) => (
                  <div key={`shift-${idx}`} className="day-status">
                    <span>Scheduled ({shift.status})</span>
                    <small>
                      {formatTime(shift.from)} - {formatTime(shift.to)}
                    </small>
                    <small>
                      {hospitalNames[shift.hospitalId] || shift.hospitalId}
                    </small>
                  </div>
                ))
              ) : (
                <div className="day-status">
                  <span>No Data</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && <div className="loading-indicator">Loading...</div>}

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

      <style jsx>{`
        .nurse-attendance-calendar {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nurse-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .nurse-header h2 {
          margin: 0 0 5px 0;
          color: #2c3e50;
        }

        .nurse-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
          color: #7f8c8d;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.active {
          background-color: #d4edda;
          color: #155724;
        }

        .calendar-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .calendar-controls select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .day-header {
          text-align: center;
          font-weight: bold;
          padding: 8px;
          color: #2c3e50;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .calendar-day {
          min-height: 100px;
          padding: 8px;
          border: 1px solid #eee;
          border-radius: 4px;
          position: relative;
          background: #f9f9f9;
        }

        .calendar-day.empty {
          background: transparent;
          border: none;
        }

        .calendar-day.today {
          border: 2px solid #3498db;
        }

        .calendar-day.worked {
          background-color: #d4edda;
        }

        .calendar-day.scheduled {
          background-color: #fff3cd;
        }

        .day-number {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .day-status {
          font-size: 12px;
        }

        .day-status span {
          display: block;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .day-status small {
          display: block;
          color: #555;
          font-size: 11px;
        }

        .loading-indicator {
          text-align: center;
          padding: 20px;
          color: #7f8c8d;
        }

        .legend {
          display: flex;
          gap: 15px;
          margin-top: 20px;
          justify-content: center;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }

        .legend-color {
          width: 15px;
          height: 15px;
          border-radius: 3px;
        }

        .legend-color.worked {
          background-color: #d4edda;
        }

        .legend-color.scheduled {
          background-color: #fff3cd;
        }

        .legend-color.today {
          background-color: #3498db;
        }
      `}</style>
    </div>
  );
};

export default NurseAttendanceCalendar;
