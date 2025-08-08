// // // import React, { useState, useMemo, useEffect } from "react";
// // // import axios from "axios";
// // // import {
// // //   PieChart,
// // //   Pie,
// // //   Cell,
// // //   ResponsiveContainer,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   Legend,
// // //   CartesianGrid,
// // // } from "recharts";
// // // import { ChevronDown, Crown } from "lucide-react";
// // // import {
// // //   format,
// // //   getMonth,
// // //   getYear,
// // //   getDaysInMonth,
// // //   getDate,
// // //   differenceInHours,
// // //   startOfMonth,
// // //   endOfMonth,
// // //   isWithinInterval,
// // //   isSameDay,
// // // } from "date-fns";

// // // // Import the CSS file
// // // import "./AttendanceReport.css";

// // // // --- HELPER FUNCTIONS & CONSTANTS ---
// // // const calculateHours = (from, to) => {
// // //   if (!from || !to) return 0;
// // //   return differenceInHours(new Date(to), new Date(from));
// // // };

// // // const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - 2 + i);
// // // const months = Array.from({ length: 12 }, (_, i) => ({
// // //   value: i,
// // //   name: format(new Date(0, i), "MMMM"),
// // // }));

// // // // --- REUSABLE UI & CHART COMPONENTS ---

// // // const DashboardCard = ({ title, value }) => (
// // //   <div className="dashboard-card">
// // //     <h4 className="dashboard-card-title">{title}</h4>
// // //     <p className="dashboard-card-value">{value}</p>
// // //   </div>
// // // );

// // // const ShiftStatusChart = ({ data }) => (
// // //   <ResponsiveContainer width="100%" height={300}>
// // //     <PieChart>
// // //       <Pie
// // //         data={data}
// // //         cx="50%"
// // //         cy="50%"
// // //         innerRadius={60}
// // //         outerRadius={100}
// // //         fill="#8884d8"
// // //         dataKey="value"
// // //         paddingAngle={5}
// // //       >
// // //         {data.map((entry, index) => (
// // //           <Cell key={`cell-${index}`} fill={entry.color} />
// // //         ))}
// // //       </Pie>
// // //       <Tooltip />
// // //       <Legend />
// // //     </PieChart>
// // //   </ResponsiveContainer>
// // // );

// // // const DayWiseShiftChart = ({ data }) => (
// // //   <div style={{ marginTop: "1rem" }}>
// // //     {data.length > 0 ? (
// // //       <ResponsiveContainer width="100%" height={300}>
// // //         <BarChart
// // //           data={data}
// // //           layout="vertical"
// // //           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
// // //         >
// // //           <CartesianGrid strokeDasharray="3 3" />
// // //           <XAxis type="number" />
// // //           <YAxis dataKey="name" type="category" width={80} />
// // //           <Tooltip formatter={(value) => `${value} hours`} />
// // //           <Bar dataKey="hours" fill="#82ca9d" name="Hours Worked" />
// // //         </BarChart>
// // //       </ResponsiveContainer>
// // //     ) : (
// // //       <p style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem 0" }}>
// // //         No nurses worked on this day.
// // //       </p>
// // //     )}
// // //   </div>
// // // );

// // // const ConsolidatedDailyReportGrid = ({ nurses, dates }) => {
// // //   const getColorClass = (hours) => {
// // //     if (hours === 0) return "hours-none";
// // //     if (hours > 0 && hours <= 4) return "hours-low";
// // //     if (hours > 4 && hours <= 8) return "hours-medium";
// // //     return "hours-high";
// // //   };

// // //   return (
// // //     <div className="table-container">
// // //       <table className="report-table">
// // //         <thead>
// // //           <tr>
// // //             <th className="nurse-name-cell">Nurse</th>
// // //             {dates.map((day) => (
// // //               <th key={day}>{day}</th>
// // //             ))}
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {nurses.map((nurse) => (
// // //             <tr key={nurse._id}>
// // //               <td className="nurse-name-cell">
// // //                 {nurse.firstName} {nurse.lastName}
// // //               </td>
// // //               {nurse.dailyHours.map((hours, index) => (
// // //                 <td
// // //                   key={index}
// // //                   className={`hours-cell ${getColorClass(hours)}`}
// // //                   title={hours > 0 ? `${hours.toFixed(1)} hrs` : "No work"}
// // //                 >
// // //                   {hours > 0 ? hours.toFixed(1) : "-"}
// // //                 </td>
// // //               ))}
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // };

// // // // --- MAIN ATTENDANCE REPORT COMPONENT ---

// // // const AttendanceReport = () => {
// // //   const [staffData, setStaffData] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const today = new Date();
// // //   const [selectedNurseId, setSelectedNurseId] = useState("all");
// // //   const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
// // //   const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
// // //   const [selectedYear, setSelectedYear] = useState(today.getFullYear());

// // //   useEffect(() => {
// // //     const fetchNurses = async () => {
// // //       setIsLoading(true);
// // //       setError(null);
// // //       try {
// // //         const response = await axios.get(
// // //           "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
// // //         );
// // //         if (response.status === 200 && Array.isArray(response.data)) {
// // //           const validNurses = response.data.filter(
// // //             (nurse) => nurse.firstName && nurse.lastName
// // //           );
// // //           setStaffData(validNurses);
// // //         } else {
// // //           console.log("API did not return a valid array of nurses");
// // //           setError("Could not fetch nurse data.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching nurses:", error);
// // //         setError("Failed to fetch nurse data. Please check the console.");
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchNurses();
// // //   }, []);

// // //   const {
// // //     dashboardStats,
// // //     shiftStatusData,
// // //     dayWiseChartData,
// // //     consolidatedDailyData,
// // //     mostActiveNurse,
// // //   } = useMemo(() => {
// // //     if (staffData.length === 0) {
// // //       return {
// // //         dashboardStats: {
// // //           requests: 0,
// // //           accepted: 0,
// // //           rejected: 0,
// // //           hoursThisMonth: "0.0",
// // //         },
// // //         shiftStatusData: [],
// // //         dayWiseChartData: [],
// // //         consolidatedDailyData: { nurses: [], dates: [] },
// // //         mostActiveNurse: null,
// // //       };
// // //     }

// // //     // 1. Filter staff data for dashboard cards
// // //     const filteredStaffDataForCards =
// // //       selectedNurseId === "all"
// // //         ? staffData
// // //         : staffData.filter((s) => s._id === selectedNurseId);

// // //     const allShifts = filteredStaffDataForCards.flatMap(
// // //       (s) => s.workSchedule || []
// // //     );
// // //     const acceptedShifts = allShifts.filter((s) => s.status === "accepted");
// // //     const currentMonthInterval = {
// // //       start: startOfMonth(today),
// // //       end: endOfMonth(today),
// // //     };
// // //     const hoursThisMonth = acceptedShifts
// // //       .filter((s) => isWithinInterval(new Date(s.date), currentMonthInterval))
// // //       .reduce(
// // //         (total, shift) => total + calculateHours(shift.from, shift.to),
// // //         0
// // //       );

// // //     const dashboardStats = {
// // //       requests: allShifts.length,
// // //       accepted: acceptedShifts.length,
// // //       rejected: allShifts.filter((s) => s.status === "rejected").length,
// // //       hoursThisMonth: hoursThisMonth.toFixed(1),
// // //     };

// // //     // 2. Data for Shift Status Pie Chart (based on same filter)
// // //     const statusCounts = allShifts.reduce((acc, shift) => {
// // //       acc[shift.status] = (acc[shift.status] || 0) + 1;
// // //       return acc;
// // //     }, {});
// // //     const SHIFT_COLORS = {
// // //       accepted: "#22c55e",
// // //       rejected: "#ef4444",
// // //       requested: "#facc15",
// // //       cancelled: "#6b7280",
// // //       removed: "#9ca3af",
// // //     };
// // //     const shiftStatusData = Object.keys(statusCounts).map((status) => ({
// // //       name: status.charAt(0).toUpperCase() + status.slice(1),
// // //       value: statusCounts[status],
// // //       color: SHIFT_COLORS[status] || "#a8a29e",
// // //     }));

// // //     // 3. Data for Day-wise Shift Chart (based on same filter)
// // //     const dayWiseDate = new Date(selectedDate);
// // //     const dayWiseChartData = filteredStaffDataForCards
// // //       .map((nurse) => {
// // //         const hoursOnDay = (nurse.workSchedule || [])
// // //           .filter(
// // //             (s) =>
// // //               s.status === "accepted" &&
// // //               isSameDay(new Date(s.date), dayWiseDate)
// // //           )
// // //           .reduce(
// // //             (total, shift) => total + calculateHours(shift.from, shift.to),
// // //             0
// // //           );
// // //         return { name: nurse.firstName, hours: hoursOnDay };
// // //       })
// // //       .filter((item) => item.hours > 0);

// // //     // 4. Data for Consolidated Report (always shows all nurses)
// // //     const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
// // //     const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
// // //     const nursesWithHours = staffData.map((nurse) => {
// // //       const dailyHours = new Array(daysInMonth).fill(0);
// // //       (nurse.workSchedule || [])
// // //         .filter(
// // //           (s) =>
// // //             s.status === "accepted" &&
// // //             getMonth(new Date(s.date)) === selectedMonth &&
// // //             getYear(new Date(s.date)) === selectedYear
// // //         )
// // //         .forEach((shift) => {
// // //           const day = getDate(new Date(shift.date));
// // //           dailyHours[day - 1] += calculateHours(shift.from, shift.to);
// // //         });
// // //       return { ...nurse, dailyHours };
// // //     });
// // //     const consolidatedDailyData = { nurses: nursesWithHours, dates };

// // //     // 5. Find Most Active Nurse (always calculated from all staff for the current month)
// // //     const hoursByNurse = staffData.map((nurse) => {
// // //       const monthlyHours = (nurse.workSchedule || [])
// // //         .filter(
// // //           (s) =>
// // //             s.status === "accepted" &&
// // //             isWithinInterval(new Date(s.date), currentMonthInterval)
// // //         )
// // //         .reduce(
// // //           (total, shift) => total + calculateHours(shift.from, shift.to),
// // //           0
// // //         );
// // //       return {
// // //         name: `${nurse.firstName} ${nurse.lastName}`,
// // //         hours: monthlyHours,
// // //       };
// // //     });
// // //     let mostActiveNurse = null;
// // //     if (hoursByNurse.length > 0) {
// // //       const topPerformer = hoursByNurse.reduce((max, nurse) =>
// // //         nurse.hours > max.hours ? nurse : max
// // //       );
// // //       if (topPerformer.hours > 0) {
// // //         mostActiveNurse = topPerformer;
// // //       }
// // //     }

// // //     return {
// // //       dashboardStats,
// // //       shiftStatusData,
// // //       dayWiseChartData,
// // //       consolidatedDailyData,
// // //       mostActiveNurse,
// // //     };
// // //   }, [staffData, selectedNurseId, selectedDate, selectedMonth, selectedYear]);

// // //   if (isLoading) {
// // //     return (
// // //       <div className="report-container">
// // //         <p>Loading nurse data...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="report-container">
// // //         <p style={{ color: "red" }}>{error}</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="report-container">
// // //       <div className="report-wrapper">
// // //         <h1 className="report-header">Admin Attendance Report</h1>

// // //         <div className="card-header-flex">
// // //           <h2 className="card-title" style={{ marginBottom: 0 }}>
// // //             {selectedNurseId === "all"
// // //               ? "Overall Stats"
// // //               : `Stats for ${
// // //                   staffData.find((s) => s._id === selectedNurseId)?.firstName
// // //                 }`}
// // //           </h2>
// // //           <div className="select-wrapper">
// // //             <select
// // //               className="filter-select"
// // //               value={selectedNurseId}
// // //               onChange={(e) => setSelectedNurseId(e.target.value)}
// // //             >
// // //               <option value="all">All Nurses</option>
// // //               {staffData.map((nurse) => (
// // //                 <option key={nurse._id} value={nurse._id}>
// // //                   {nurse.firstName} {nurse.lastName}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //             <div className="select-arrow">
// // //               <ChevronDown size={16} />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="dashboard-grid">
// // //           <DashboardCard
// // //             title="Total Requests"
// // //             value={dashboardStats.requests}
// // //           />
// // //           <DashboardCard
// // //             title="Shifts Accepted"
// // //             value={dashboardStats.accepted}
// // //           />
// // //           <DashboardCard
// // //             title="Shifts Rejected"
// // //             value={dashboardStats.rejected}
// // //           />
// // //           <DashboardCard
// // //             title={`Hours This Month (${format(today, "MMMM")})`}
// // //             value={dashboardStats.hoursThisMonth}
// // //           />
// // //         </div>

// // //         <div className="main-grid">
// // //           <div className="card card-padded">
// // //             <h3 className="card-title">Request Status Breakdown</h3>
// // //             <ShiftStatusChart data={shiftStatusData} />
// // //           </div>
// // //           <div className="card most-active-card">
// // //             <h3 className="card-title">Most Active This Month</h3>
// // //             {mostActiveNurse ? (
// // //               <>
// // //                 <Crown size={64} color="#f59e0b" />
// // //                 <p className="most-active-name">{mostActiveNurse.name}</p>
// // //                 <p className="most-active-hours">
// // //                   {mostActiveNurse.hours.toFixed(1)}{" "}
// // //                   <span className="most-active-hours-label">hours</span>
// // //                 </p>
// // //                 <p className="most-active-date-label">
// // //                   in {format(today, "MMMM yyyy")}
// // //                 </p>
// // //               </>
// // //             ) : (
// // //               <p style={{ textAlign: "center", color: "#6b7280" }}>
// // //                 No work recorded this month.
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>

// // //         <div className="card card-padded">
// // //           <div className="card-header-flex">
// // //             <h3 className="card-title">Day-wise Shifts</h3>
// // //             <input
// // //               type="date"
// // //               value={selectedDate}
// // //               onChange={(e) => setSelectedDate(e.target.value)}
// // //               className="filter-date"
// // //             />
// // //           </div>
// // //           <DayWiseShiftChart data={dayWiseChartData} />
// // //         </div>

// // //         <div className="card card-padded">
// // //           <div className="card-header-flex">
// // //             <h3 className="card-title">Consolidated Monthly Report</h3>
// // //             <div className="date-filter-controls">
// // //               <select
// // //                 className="filter-select"
// // //                 value={selectedMonth}
// // //                 onChange={(e) => setSelectedMonth(Number(e.target.value))}
// // //               >
// // //                 {months.map((m) => (
// // //                   <option key={m.value} value={m.value}>
// // //                     {m.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <select
// // //                 className="filter-select"
// // //                 value={selectedYear}
// // //                 onChange={(e) => setSelectedYear(Number(e.target.value))}
// // //               >
// // //                 {years.map((y) => (
// // //                   <option key={y} value={y}>
// // //                     {y}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //           </div>
// // //           <ConsolidatedDailyReportGrid {...consolidatedDailyData} />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AttendanceReport;

// // import React, { useState, useMemo, useEffect } from "react";
// // import axios from "axios";
// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   Legend,
// //   CartesianGrid,
// // } from "recharts";
// // import { ChevronDown, Crown } from "lucide-react";
// // import {
// //   format,
// //   getMonth,
// //   getYear,
// //   getDaysInMonth,
// //   getDate,
// //   differenceInHours,
// //   startOfMonth,
// //   endOfMonth,
// //   isWithinInterval,
// //   isSameDay,
// // } from "date-fns";

// // // Import the CSS file
// // import "./AttendanceReport.css";

// // // --- HELPER FUNCTIONS & CONSTANTS ---
// // const calculateHours = (from, to) => {
// //   if (!from || !to) return 0;
// //   return differenceInHours(new Date(to), new Date(from));
// // };

// // const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - 2 + i);
// // // Add "All Months" option to the months array
// // const months = [
// //   { value: "all", name: "All Months" },
// //   ...Array.from({ length: 12 }, (_, i) => ({
// //     value: i,
// //     name: format(new Date(0, i), "MMMM"),
// //   })),
// // ];

// // // --- REUSABLE UI & CHART COMPONENTS ---

// // const DashboardCard = ({ title, value }) => (
// //   <div className="dashboard-card">
// //     <h4 className="dashboard-card-title">{title}</h4>
// //     <p className="dashboard-card-value">{value}</p>
// //   </div>
// // );

// // const ShiftStatusChart = ({ data }) => (
// //   <ResponsiveContainer width="100%" height={300}>
// //     <PieChart>
// //       <Pie
// //         data={data}
// //         cx="50%"
// //         cy="50%"
// //         innerRadius={60}
// //         outerRadius={100}
// //         fill="#8884d8"
// //         dataKey="value"
// //         paddingAngle={5}
// //       >
// //         {data.map((entry, index) => (
// //           <Cell key={`cell-${index}`} fill={entry.color} />
// //         ))}
// //       </Pie>
// //       <Tooltip />
// //       <Legend />
// //     </PieChart>
// //   </ResponsiveContainer>
// // );

// // const DayWiseShiftChart = ({ data }) => (
// //   <div style={{ marginTop: "1rem" }}>
// //     {data.length > 0 ? (
// //       <ResponsiveContainer width="100%" height={300}>
// //         <BarChart
// //           data={data}
// //           layout="vertical"
// //           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis type="number" />
// //           <YAxis dataKey="name" type="category" width={80} />
// //           <Tooltip formatter={(value) => `${value} hours`} />
// //           <Bar dataKey="hours" fill="#82ca9d" name="Hours Worked" />
// //         </BarChart>
// //       </ResponsiveContainer>
// //     ) : (
// //       <p style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem 0" }}>
// //         No nurses worked on this day.
// //       </p>
// //     )}
// //   </div>
// // );

// // // NEW: Component to display the consolidated monthly/daily bar chart
// // const ConsolidatedMonthlyChart = ({ data, view }) => (
// //   <div style={{ marginTop: "1rem" }}>
// //     <ResponsiveContainer width="100%" height={300}>
// //       <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="label" />
// //         <YAxis />
// //         <Tooltip formatter={(value) => `${value.toFixed(1)} hours`} />
// //         <Legend />
// //         <Bar
// //           dataKey="hours"
// //           fill="#4f46e5"
// //           name={`Total Hours Worked by ${view}`}
// //         />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   </div>
// // );

// // // --- MAIN ATTENDANCE REPORT COMPONENT ---

// // const AttendanceReport = () => {
// //   const [staffData, setStaffData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const today = new Date();
// //   const [selectedNurseId, setSelectedNurseId] = useState("all");
// //   const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
// //   const [selectedMonth, setSelectedMonth] = useState("all"); // Default to "all"
// //   const [selectedYear, setSelectedYear] = useState(today.getFullYear());

// //   useEffect(() => {
// //     const fetchNurses = async () => {
// //       setIsLoading(true);
// //       setError(null);
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
// //         );
// //         if (response.status === 200 && Array.isArray(response.data)) {
// //           const validNurses = response.data.filter(
// //             (nurse) => nurse.firstName && nurse.lastName
// //           );
// //           setStaffData(validNurses);
// //         } else {
// //           console.log("API did not return a valid array of nurses");
// //           setError("Could not fetch nurse data.");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching nurses:", error);
// //         setError("Failed to fetch nurse data. Please check the console.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchNurses();
// //   }, []);

// //   const {
// //     dashboardStats,
// //     shiftStatusData,
// //     dayWiseChartData,
// //     consolidatedChartData,
// //     mostActiveNurse,
// //   } = useMemo(() => {
// //     if (staffData.length === 0) {
// //       return {
// //         dashboardStats: {
// //           requests: 0,
// //           accepted: 0,
// //           rejected: 0,
// //           hoursThisMonth: "0.0",
// //         },
// //         shiftStatusData: [],
// //         dayWiseChartData: [],
// //         consolidatedChartData: { data: [], view: "Month" },
// //         mostActiveNurse: null,
// //       };
// //     }

// //     // --- Calculations for filterable cards and charts ---
// //     const filteredStaffDataForCards =
// //       selectedNurseId === "all"
// //         ? staffData
// //         : staffData.filter((s) => s._id === selectedNurseId);

// //     const allShifts = filteredStaffDataForCards.flatMap(
// //       (s) => s.workSchedule || []
// //     );
// //     const acceptedShifts = allShifts.filter((s) => s.status === "accepted");
// //     const currentMonthInterval = {
// //       start: startOfMonth(today),
// //       end: endOfMonth(today),
// //     };
// //     const hoursThisMonth = acceptedShifts
// //       .filter((s) => isWithinInterval(new Date(s.date), currentMonthInterval))
// //       .reduce(
// //         (total, shift) => total + calculateHours(shift.from, shift.to),
// //         0
// //       );

// //     const dashboardStats = {
// //       requests: allShifts.length,
// //       accepted: acceptedShifts.length,
// //       rejected: allShifts.filter((s) => s.status === "rejected").length,
// //       hoursThisMonth: hoursThisMonth.toFixed(1),
// //     };

// //     const statusCounts = allShifts.reduce((acc, shift) => {
// //       acc[shift.status] = (acc[shift.status] || 0) + 1;
// //       return acc;
// //     }, {});
// //     const SHIFT_COLORS = {
// //       accepted: "#22c55e",
// //       rejected: "#ef4444",
// //       requested: "#facc15",
// //       cancelled: "#6b7280",
// //       removed: "#9ca3af",
// //     };
// //     const shiftStatusData = Object.keys(statusCounts).map((status) => ({
// //       name: status.charAt(0).toUpperCase() + status.slice(1),
// //       value: statusCounts[status],
// //       color: SHIFT_COLORS[status] || "#a8a29e",
// //     }));

// //     const dayWiseDate = new Date(selectedDate);
// //     const dayWiseChartData = filteredStaffDataForCards
// //       .map((nurse) => {
// //         const hoursOnDay = (nurse.workSchedule || [])
// //           .filter(
// //             (s) =>
// //               s.status === "accepted" &&
// //               isSameDay(new Date(s.date), dayWiseDate)
// //           )
// //           .reduce(
// //             (total, shift) => total + calculateHours(shift.from, shift.to),
// //             0
// //           );
// //         return { name: nurse.firstName, hours: hoursOnDay };
// //       })
// //       .filter((item) => item.hours > 0);

// //     // --- NEW: Logic for the Consolidated Bar Chart ---
// //     let consolidatedChartData = {};
// //     const allAcceptedShifts = staffData
// //       .flatMap((s) => s.workSchedule || [])
// //       .filter((s) => s.status === "accepted");

// //     if (selectedMonth === "all") {
// //       // Yearly view: aggregate hours by month
// //       const monthlyHours = Array.from({ length: 12 }, (_, i) => ({
// //         label: format(new Date(0, i), "MMM"),
// //         hours: 0,
// //       }));
// //       allAcceptedShifts
// //         .filter((s) => getYear(new Date(s.date)) === selectedYear)
// //         .forEach((s) => {
// //           const monthIndex = getMonth(new Date(s.date));
// //           monthlyHours[monthIndex].hours += calculateHours(s.from, s.to);
// //         });
// //       consolidatedChartData = { data: monthlyHours, view: "Month" };
// //     } else {
// //       // Daily view: aggregate hours by day for the selected month
// //       const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
// //       const dailyHours = Array.from({ length: daysInMonth }, (_, i) => ({
// //         label: `${i + 1}`,
// //         hours: 0,
// //       }));
// //       allAcceptedShifts
// //         .filter(
// //           (s) =>
// //             getYear(new Date(s.date)) === selectedYear &&
// //             getMonth(new Date(s.date)) === selectedMonth
// //         )
// //         .forEach((s) => {
// //           const dayIndex = getDate(new Date(s.date)) - 1;
// //           dailyHours[dayIndex].hours += calculateHours(s.from, s.to);
// //         });
// //       consolidatedChartData = { data: dailyHours, view: "Day" };
// //     }

// //     // --- Most Active Nurse (calculation remains the same) ---
// //     const hoursByNurse = staffData.map((nurse) => {
// //       const monthlyHours = (nurse.workSchedule || [])
// //         .filter(
// //           (s) =>
// //             s.status === "accepted" &&
// //             isWithinInterval(new Date(s.date), currentMonthInterval)
// //         )
// //         .reduce(
// //           (total, shift) => total + calculateHours(shift.from, shift.to),
// //           0
// //         );
// //       return {
// //         name: `${nurse.firstName} ${nurse.lastName}`,
// //         hours: monthlyHours,
// //       };
// //     });
// //     let mostActiveNurse = null;
// //     if (hoursByNurse.length > 0) {
// //       const topPerformer = hoursByNurse.reduce((max, nurse) =>
// //         nurse.hours > max.hours ? nurse : max
// //       );
// //       if (topPerformer.hours > 0) {
// //         mostActiveNurse = topPerformer;
// //       }
// //     }

// //     return {
// //       dashboardStats,
// //       shiftStatusData,
// //       dayWiseChartData,
// //       consolidatedChartData,
// //       mostActiveNurse,
// //     };
// //   }, [staffData, selectedNurseId, selectedDate, selectedMonth, selectedYear]);

// //   if (isLoading) {
// //     return (
// //       <div className="report-container">
// //         <p>Loading nurse data...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="report-container">
// //         <p style={{ color: "red" }}>{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="report-container">
// //       <div className="report-wrapper">
// //         <h1 className="report-header">Admin Attendance Report</h1>

// //         <div className="card-header-flex">
// //           <h2 className="card-title" style={{ marginBottom: 0 }}>
// //             {selectedNurseId === "all"
// //               ? "Overall Stats"
// //               : `Stats for ${
// //                   staffData.find((s) => s._id === selectedNurseId)?.firstName
// //                 }`}
// //           </h2>
// //           <div className="select-wrapper">
// //             <select
// //               className="filter-select"
// //               value={selectedNurseId}
// //               onChange={(e) => setSelectedNurseId(e.target.value)}
// //             >
// //               <option value="all">All Nurses</option>
// //               {staffData.map((nurse) => (
// //                 <option key={nurse._id} value={nurse._id}>
// //                   {nurse.firstName} {nurse.lastName}
// //                 </option>
// //               ))}
// //             </select>
// //             <div className="select-arrow">
// //               <ChevronDown size={16} />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="dashboard-grid">
// //           <DashboardCard
// //             title="Total Requests"
// //             value={dashboardStats.requests}
// //           />
// //           <DashboardCard
// //             title="Shifts Accepted"
// //             value={dashboardStats.accepted}
// //           />
// //           <DashboardCard
// //             title="Shifts Rejected"
// //             value={dashboardStats.rejected}
// //           />
// //           <DashboardCard
// //             title={`Hours This Month (${format(today, "MMMM")})`}
// //             value={dashboardStats.hoursThisMonth}
// //           />
// //         </div>

// //         <div className="main-grid">
// //           <div className="card card-padded">
// //             <h3 className="card-title">Request Status Breakdown</h3>
// //             <ShiftStatusChart data={shiftStatusData} />
// //           </div>
// //           <div className="card most-active-card">
// //             <h3 className="card-title">Most Active This Month</h3>
// //             {mostActiveNurse ? (
// //               <>
// //                 <Crown size={64} color="#f59e0b" />
// //                 <p className="most-active-name">{mostActiveNurse.name}</p>
// //                 <p className="most-active-hours">
// //                   {mostActiveNurse.hours.toFixed(1)}{" "}
// //                   <span className="most-active-hours-label">hours</span>
// //                 </p>
// //                 <p className="most-active-date-label">
// //                   in {format(today, "MMMM yyyy")}
// //                 </p>
// //               </>
// //             ) : (
// //               <p style={{ textAlign: "center", color: "#6b7280" }}>
// //                 No work recorded this month.
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         <div className="card card-padded">
// //           <div className="card-header-flex">
// //             <h3 className="card-title">Day-wise Shifts</h3>
// //             <input
// //               type="date"
// //               value={selectedDate}
// //               onChange={(e) => setSelectedDate(e.target.value)}
// //               className="filter-date"
// //             />
// //           </div>
// //           <DayWiseShiftChart data={dayWiseChartData} />
// //         </div>

// //         <div className="card card-padded">
// //           <div className="card-header-flex">
// //             <h3 className="card-title">Consolidated Workload Report</h3>
// //             <div className="date-filter-controls">
// //               <select
// //                 className="filter-select"
// //                 value={selectedMonth}
// //                 onChange={(e) => setSelectedMonth(e.target.value)}
// //               >
// //                 {months.map((m) => (
// //                   <option key={m.value} value={m.value}>
// //                     {m.name}
// //                   </option>
// //                 ))}
// //               </select>
// //               <select
// //                 className="filter-select"
// //                 value={selectedYear}
// //                 onChange={(e) => setSelectedYear(Number(e.target.value))}
// //               >
// //                 {years.map((y) => (
// //                   <option key={y} value={y}>
// //                     {y}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>
// //           <ConsolidatedMonthlyChart
// //             data={consolidatedChartData.data}
// //             view={consolidatedChartData.view}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AttendanceReport;

// import React, { useState, useMemo, useEffect } from "react";
// import axios from "axios";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
// } from "recharts";
// import { ChevronDown, Crown } from "lucide-react";
// import {
//   format,
//   getMonth,
//   getYear,
//   getDaysInMonth,
//   getDate,
//   differenceInHours,
//   startOfMonth,
//   endOfMonth,
//   isWithinInterval,
//   isSameDay,
// } from "date-fns";

// // Import the CSS file
// import "./AttendanceReport.css";

// // --- HELPER FUNCTIONS & CONSTANTS ---
// const calculateHours = (from, to) => {
//   if (!from || !to) return 0;
//   return differenceInHours(new Date(to), new Date(from));
// };

// const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - 2 + i);
// // Add "All Months" option to the months array
// const months = [
//   { value: "all", name: "All Months" },
//   ...Array.from({ length: 12 }, (_, i) => ({
//     value: i,
//     name: format(new Date(0, i), "MMMM"),
//   })),
// ];

// // --- REUSABLE UI & CHART COMPONENTS ---

// const DashboardCard = ({ title, value }) => (
//   <div className="dashboard-card">
//     <h4 className="dashboard-card-title">{title}</h4>
//     <p className="dashboard-card-value">{value}</p>
//   </div>
// );

// const ShiftStatusChart = ({ data }) => (
//   <ResponsiveContainer width="100%" height={300}>
//     <PieChart>
//       <Pie
//         data={data}
//         cx="50%"
//         cy="50%"
//         innerRadius={60}
//         outerRadius={100}
//         fill="#8884d8"
//         dataKey="value"
//         paddingAngle={5}
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={entry.color} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   </ResponsiveContainer>
// );

// const DayWiseShiftChart = ({ data }) => (
//   <div style={{ marginTop: "1rem" }}>
//     {data.length > 0 ? (
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={data}
//           layout="vertical"
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis type="number" />
//           <YAxis dataKey="name" type="category" width={80} />
//           <Tooltip formatter={(value) => `${value} hours`} />
//           <Bar dataKey="hours" fill="#82ca9d" name="Hours Worked" />
//         </BarChart>
//       </ResponsiveContainer>
//     ) : (
//       <p style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem 0" }}>
//         No nurses worked on this day.
//       </p>
//     )}
//   </div>
// );

// // NEW: Component to display the consolidated monthly/daily bar chart
// const ConsolidatedMonthlyChart = ({ data, view }) => (
//   <div style={{ marginTop: "1rem" }}>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="label" />
//         <YAxis />
//         <Tooltip formatter={(value) => `${value.toFixed(1)} hours`} />
//         <Legend />
//         <Bar
//           dataKey="hours"
//           fill="#4f46e5"
//           name={`Total Hours Worked by ${view}`}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// );

// // --- MAIN ATTENDANCE REPORT COMPONENT ---

// const AttendanceReport = () => {
//   const [staffData, setStaffData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const today = new Date();
//   const [selectedNurseId, setSelectedNurseId] = useState("all");
//   const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
//   const [selectedMonth, setSelectedMonth] = useState("all"); // Default to "all"
//   const [selectedYear, setSelectedYear] = useState(today.getFullYear());

//   useEffect(() => {
//     const fetchNurses = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
//         );
//         if (response.status === 200 && Array.isArray(response.data)) {
//           const validNurses = response.data.filter(
//             (nurse) => nurse.firstName && nurse.lastName
//           );
//           setStaffData(validNurses);
//         } else {
//           console.log("API did not return a valid array of nurses");
//           setError("Could not fetch nurse data.");
//         }
//       } catch (error) {
//         console.error("Error fetching nurses:", error);
//         setError("Failed to fetch nurse data. Please check the console.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNurses();
//   }, []);

//   const {
//     dashboardStats,
//     shiftStatusData,
//     dayWiseChartData,
//     consolidatedChartData,
//     mostActiveNurse,
//   } = useMemo(() => {
//     if (staffData.length === 0) {
//       return {
//         dashboardStats: {
//           requests: 0,
//           accepted: 0,
//           rejected: 0,
//           hoursThisMonth: "0.0",
//         },
//         shiftStatusData: [],
//         dayWiseChartData: [],
//         consolidatedChartData: { data: [], view: "Month" },
//         mostActiveNurse: null,
//       };
//     }

//     // --- Calculations for filterable cards and charts ---
//     const filteredStaffDataForCards =
//       selectedNurseId === "all"
//         ? staffData
//         : staffData.filter((s) => s._id === selectedNurseId);

//     const allShifts = filteredStaffDataForCards.flatMap(
//       (s) => s.workSchedule || []
//     );
//     const acceptedShifts = allShifts.filter((s) => s.status === "accepted");
//     const currentMonthInterval = {
//       start: startOfMonth(today),
//       end: endOfMonth(today),
//     };
//     const hoursThisMonth = acceptedShifts
//       .filter((s) => isWithinInterval(new Date(s.date), currentMonthInterval))
//       .reduce(
//         (total, shift) => total + calculateHours(shift.from, shift.to),
//         0
//       );

//     const dashboardStats = {
//       requests: allShifts.length,
//       accepted: acceptedShifts.length,
//       rejected: allShifts.filter((s) => s.status === "rejected").length,
//       hoursThisMonth: hoursThisMonth.toFixed(1),
//     };

//     const statusCounts = allShifts.reduce((acc, shift) => {
//       acc[shift.status] = (acc[shift.status] || 0) + 1;
//       return acc;
//     }, {});
//     const SHIFT_COLORS = {
//       accepted: "#22c55e",
//       rejected: "#ef4444",
//       requested: "#facc15",
//       cancelled: "#6b7280",
//       removed: "#9ca3af",
//     };
//     const shiftStatusData = Object.keys(statusCounts).map((status) => ({
//       name: status.charAt(0).toUpperCase() + status.slice(1),
//       value: statusCounts[status],
//       color: SHIFT_COLORS[status] || "#a8a29e",
//     }));

//     const dayWiseDate = new Date(selectedDate);
//     const dayWiseChartData = filteredStaffDataForCards
//       .map((nurse) => {
//         const hoursOnDay = (nurse.workSchedule || [])
//           .filter(
//             (s) =>
//               s.status === "accepted" &&
//               isSameDay(new Date(s.date), dayWiseDate)
//           )
//           .reduce(
//             (total, shift) => total + calculateHours(shift.from, shift.to),
//             0
//           );
//         return { name: nurse.firstName, hours: hoursOnDay };
//       })
//       .filter((item) => item.hours > 0);

//     // --- Logic for the Consolidated Bar Chart ---
//     let consolidatedChartData = {};
//     const allAcceptedShifts = staffData
//       .flatMap((s) => s.workSchedule || [])
//       .filter((s) => s.status === "accepted");

//     if (selectedMonth === "all") {
//       // Yearly view: aggregate hours by month
//       const monthlyHours = Array.from({ length: 12 }, (_, i) => ({
//         label: format(new Date(0, i), "MMM"),
//         hours: 0,
//       }));
//       allAcceptedShifts
//         .filter((s) => getYear(new Date(s.date)) === selectedYear)
//         .forEach((s) => {
//           const monthIndex = getMonth(new Date(s.date));
//           monthlyHours[monthIndex].hours += calculateHours(s.from, s.to);
//         });
//       consolidatedChartData = { data: monthlyHours, view: "Month" };
//     } else {
//       // Daily view: aggregate hours by day for the selected month
//       const numericMonth = Number(selectedMonth); // <<< FIX IS HERE
//       const daysInMonth = getDaysInMonth(new Date(selectedYear, numericMonth));
//       const dailyHours = Array.from({ length: daysInMonth }, (_, i) => ({
//         label: `${i + 1}`,
//         hours: 0,
//       }));
//       allAcceptedShifts
//         .filter(
//           (s) =>
//             getYear(new Date(s.date)) === selectedYear &&
//             getMonth(new Date(s.date)) === numericMonth
//         )
//         .forEach((s) => {
//           const dayIndex = getDate(new Date(s.date)) - 1;
//           dailyHours[dayIndex].hours += calculateHours(s.from, s.to);
//         });
//       consolidatedChartData = { data: dailyHours, view: "Day" };
//     }

//     // --- Most Active Nurse (calculation remains the same) ---
//     const hoursByNurse = staffData.map((nurse) => {
//       const monthlyHours = (nurse.workSchedule || [])
//         .filter(
//           (s) =>
//             s.status === "accepted" &&
//             isWithinInterval(new Date(s.date), currentMonthInterval)
//         )
//         .reduce(
//           (total, shift) => total + calculateHours(shift.from, shift.to),
//           0
//         );
//       return {
//         name: `${nurse.firstName} ${nurse.lastName}`,
//         hours: monthlyHours,
//       };
//     });
//     let mostActiveNurse = null;
//     if (hoursByNurse.length > 0) {
//       const topPerformer = hoursByNurse.reduce((max, nurse) =>
//         nurse.hours > max.hours ? nurse : max
//       );
//       if (topPerformer.hours > 0) {
//         mostActiveNurse = topPerformer;
//       }
//     }

//     return {
//       dashboardStats,
//       shiftStatusData,
//       dayWiseChartData,
//       consolidatedChartData,
//       mostActiveNurse,
//     };
//   }, [staffData, selectedNurseId, selectedDate, selectedMonth, selectedYear]);

//   if (isLoading) {
//     return (
//       <div className="report-container">
//         <p>Loading nurse data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="report-container">
//         <p style={{ color: "red" }}>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="report-container">
//       <div className="report-wrapper">
//         <h1 className="report-header">Admin Attendance Report</h1>

//         <div className="card-header-flex">
//           <h2 className="card-title" style={{ marginBottom: 0 }}>
//             {selectedNurseId === "all"
//               ? "Overall Stats"
//               : `Stats for ${
//                   staffData.find((s) => s._id === selectedNurseId)?.firstName
//                 }`}
//           </h2>
//           <div className="select-wrapper">
//             <select
//               className="filter-select"
//               value={selectedNurseId}
//               onChange={(e) => setSelectedNurseId(e.target.value)}
//             >
//               <option value="all">All Nurses</option>
//               {staffData.map((nurse) => (
//                 <option key={nurse._id} value={nurse._id}>
//                   {nurse.firstName} {nurse.lastName}
//                 </option>
//               ))}
//             </select>
//             <div className="select-arrow">
//               <ChevronDown size={16} />
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-grid">
//           <DashboardCard
//             title="Total Requests"
//             value={dashboardStats.requests}
//           />
//           <DashboardCard
//             title="Shifts Accepted"
//             value={dashboardStats.accepted}
//           />
//           <DashboardCard
//             title="Shifts Rejected"
//             value={dashboardStats.rejected}
//           />
//           <DashboardCard
//             title={`Hours This Month (${format(today, "MMMM")})`}
//             value={dashboardStats.hoursThisMonth}
//           />
//         </div>

//         <div className="main-grid">
//           <div className="card card-padded">
//             <h3 className="card-title">Request Status Breakdown</h3>
//             <ShiftStatusChart data={shiftStatusData} />
//           </div>
//           <div className="card most-active-card">
//             <h3 className="card-title">Most Active This Month</h3>
//             {mostActiveNurse ? (
//               <>
//                 <Crown size={64} color="#f59e0b" />
//                 <p className="most-active-name">{mostActiveNurse.name}</p>
//                 <p className="most-active-hours">
//                   {mostActiveNurse.hours.toFixed(1)}{" "}
//                   <span className="most-active-hours-label">hours</span>
//                 </p>
//                 <p className="most-active-date-label">
//                   in {format(today, "MMMM yyyy")}
//                 </p>
//               </>
//             ) : (
//               <p style={{ textAlign: "center", color: "#6b7280" }}>
//                 No work recorded this month.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="card card-padded">
//           <div className="card-header-flex">
//             <h3 className="card-title">Day-wise Shifts</h3>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="filter-date"
//             />
//           </div>
//           <DayWiseShiftChart data={dayWiseChartData} />
//         </div>

//         <div className="card card-padded">
//           <div className="card-header-flex">
//             <h3 className="card-title">Consolidated Workload Report</h3>
//             <div className="date-filter-controls">
//               <select
//                 className="filter-select"
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//               >
//                 {months.map((m) => (
//                   <option key={m.value} value={m.value}>
//                     {m.name}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 className="filter-select"
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(Number(e.target.value))}
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <ConsolidatedMonthlyChart
//             data={consolidatedChartData.data}
//             view={consolidatedChartData.view}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceReport;

import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChevronDown, Crown } from "lucide-react";
import {
  format,
  getMonth,
  getYear,
  getDaysInMonth,
  getDate,
  differenceInHours,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  isSameDay,
  startOfDay, // Import startOfDay for accurate date comparison
} from "date-fns";

// Import the CSS file
import "./AttendanceReport.css";

// --- HELPER FUNCTIONS & CONSTANTS ---
const calculateHours = (from, to) => {
  if (!from || !to) return 0;
  return differenceInHours(new Date(to), new Date(from));
};

const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - 2 + i);
// Add "All Months" option to the months array
const months = [
  { value: "all", name: "All Months" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: i,
    name: format(new Date(0, i), "MMMM"),
  })),
];

// --- REUSABLE UI & CHART COMPONENTS ---

const DashboardCard = ({ title, value }) => (
  <div className="dashboard-card">
    <h4 className="dashboard-card-title">{title}</h4>
    <p className="dashboard-card-value">{value}</p>
  </div>
);

const ShiftStatusChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={5}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const DayWiseShiftChart = ({ data }) => (
  <div style={{ marginTop: "1rem" }}>
    {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip formatter={(value) => `${value} hours`} />
          <Bar dataKey="hours" fill="#82ca9d" name="Hours Worked" />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p style={{ textAlign: "center", color: "#6b7280", padding: "2.5rem 0" }}>
        No nurses worked on this day.
      </p>
    )}
  </div>
);

const ConsolidatedMonthlyChart = ({ data, view }) => (
  <div style={{ marginTop: "1rem" }}>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip formatter={(value) => `${value.toFixed(1)} hours`} />
        <Legend />
        <Bar
          dataKey="hours"
          fill="#4f46e5"
          name={`Total Hours Worked by ${view}`}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- MAIN ATTENDANCE REPORT COMPONENT ---

const AttendanceReport = () => {
  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = startOfDay(new Date()); // Use startOfDay to compare dates accurately
  const [selectedNurseId, setSelectedNurseId] = useState("all");
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  useEffect(() => {
    const fetchNurses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
        );
        if (response.status === 200 && Array.isArray(response.data)) {
          const validNurses = response.data.filter(
            (nurse) => nurse.firstName && nurse.lastName
          );
          setStaffData(validNurses);
        } else {
          console.log("API did not return a valid array of nurses");
          setError("Could not fetch nurse data.");
        }
      } catch (error) {
        console.error("Error fetching nurses:", error);
        setError("Failed to fetch nurse data. Please check the console.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNurses();
  }, []);

  const {
    dashboardStats,
    shiftStatusData,
    dayWiseChartData,
    consolidatedChartData,
    mostActiveNurse,
  } = useMemo(() => {
    if (staffData.length === 0) {
      return {
        dashboardStats: {
          requests: 0,
          accepted: 0,
          rejected: 0,
          hoursThisMonth: "0.0",
        },
        shiftStatusData: [],
        dayWiseChartData: [],
        consolidatedChartData: { data: [], view: "Month" },
        mostActiveNurse: null,
      };
    }

    const filteredStaffDataForCards =
      selectedNurseId === "all"
        ? staffData
        : staffData.filter((s) => s._id === selectedNurseId);

    const allShifts = filteredStaffDataForCards.flatMap(
      (s) => s.workSchedule || []
    );
    const acceptedShifts = allShifts.filter((s) => s.status === "accepted");
    const currentMonthInterval = {
      start: startOfMonth(today),
      end: endOfMonth(today),
    };

    // UPDATED: Only include hours from past or present shifts
    const hoursThisMonth = acceptedShifts
      .filter(
        (s) =>
          isWithinInterval(new Date(s.date), currentMonthInterval) &&
          new Date(s.date) <= today
      )
      .reduce(
        (total, shift) => total + calculateHours(shift.from, shift.to),
        0
      );

    const dashboardStats = {
      requests: allShifts.length,
      accepted: acceptedShifts.length,
      rejected: allShifts.filter((s) => s.status === "rejected").length,
      hoursThisMonth: hoursThisMonth.toFixed(1),
    };

    const statusCounts = allShifts.reduce((acc, shift) => {
      acc[shift.status] = (acc[shift.status] || 0) + 1;
      return acc;
    }, {});
    const SHIFT_COLORS = {
      accepted: "#22c55e",
      rejected: "#ef4444",
      requested: "#facc15",
      cancelled: "#6b7280",
      removed: "#9ca3af",
    };
    const shiftStatusData = Object.keys(statusCounts).map((status) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: statusCounts[status],
      color: SHIFT_COLORS[status] || "#a8a29e",
    }));

    const dayWiseDate = new Date(selectedDate);
    const dayWiseChartData = filteredStaffDataForCards
      .map((nurse) => {
        const hoursOnDay = (nurse.workSchedule || [])
          // UPDATED: Only calculate hours if the selected date is not in the future
          .filter(
            (s) =>
              s.status === "accepted" &&
              isSameDay(new Date(s.date), dayWiseDate) &&
              dayWiseDate <= today
          )
          .reduce(
            (total, shift) => total + calculateHours(shift.from, shift.to),
            0
          );
        return { name: nurse.firstName, hours: hoursOnDay };
      })
      .filter((item) => item.hours > 0);

    let consolidatedChartData = {};
    const allAcceptedShifts = staffData
      .flatMap((s) => s.workSchedule || [])
      .filter((s) => s.status === "accepted");

    if (selectedMonth === "all") {
      const monthlyHours = Array.from({ length: 12 }, (_, i) => ({
        label: format(new Date(0, i), "MMM"),
        hours: 0,
      }));
      allAcceptedShifts
        // UPDATED: Only include shifts from the past/present
        .filter(
          (s) =>
            getYear(new Date(s.date)) === selectedYear &&
            new Date(s.date) <= today
        )
        .forEach((s) => {
          const monthIndex = getMonth(new Date(s.date));
          monthlyHours[monthIndex].hours += calculateHours(s.from, s.to);
        });
      consolidatedChartData = { data: monthlyHours, view: "Month" };
    } else {
      const numericMonth = Number(selectedMonth);
      const daysInMonth = getDaysInMonth(new Date(selectedYear, numericMonth));
      const dailyHours = Array.from({ length: daysInMonth }, (_, i) => ({
        label: `${i + 1}`,
        hours: 0,
      }));
      allAcceptedShifts
        // UPDATED: Only include shifts from the past/present
        .filter(
          (s) =>
            getYear(new Date(s.date)) === selectedYear &&
            getMonth(new Date(s.date)) === numericMonth &&
            new Date(s.date) <= today
        )
        .forEach((s) => {
          const dayIndex = getDate(new Date(s.date)) - 1;
          dailyHours[dayIndex].hours += calculateHours(s.from, s.to);
        });
      consolidatedChartData = { data: dailyHours, view: "Day" };
    }

    const hoursByNurse = staffData.map((nurse) => {
      const monthlyHours = (nurse.workSchedule || [])
        // UPDATED: Only include shifts from the past/present
        .filter(
          (s) =>
            s.status === "accepted" &&
            isWithinInterval(new Date(s.date), currentMonthInterval) &&
            new Date(s.date) <= today
        )
        .reduce(
          (total, shift) => total + calculateHours(shift.from, shift.to),
          0
        );
      return {
        name: `${nurse.firstName} ${nurse.lastName}`,
        hours: monthlyHours,
      };
    });
    let mostActiveNurse = null;
    if (hoursByNurse.length > 0) {
      const topPerformer = hoursByNurse.reduce((max, nurse) =>
        nurse.hours > max.hours ? nurse : max
      );
      if (topPerformer.hours > 0) {
        mostActiveNurse = topPerformer;
      }
    }

    return {
      dashboardStats,
      shiftStatusData,
      dayWiseChartData,
      consolidatedChartData,
      mostActiveNurse,
    };
  }, [
    staffData,
    selectedNurseId,
    selectedDate,
    selectedMonth,
    selectedYear,
    today,
  ]);

  if (isLoading) {
    return (
      <div className="report-container">
        <p>Loading nurse data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="report-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="report-wrapper">
        <h1 className="report-header">Nurse Attendance Report</h1>

        <div className="card-header-flex">
          <h2 className="card-title" style={{ marginBottom: 0 }}>
            {selectedNurseId === "all"
              ? "Overall Stats"
              : `Stats for ${
                  staffData.find((s) => s._id === selectedNurseId)?.firstName
                }`}
          </h2>
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={selectedNurseId}
              onChange={(e) => setSelectedNurseId(e.target.value)}
            >
              <option value="all">All Nurses</option>
              {staffData.map((nurse) => (
                <option key={nurse._id} value={nurse._id}>
                  {nurse.firstName} {nurse.lastName}
                </option>
              ))}
            </select>
            <div className="select-arrow">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <DashboardCard
            title="Total Requests"
            value={dashboardStats.requests}
          />
          <DashboardCard
            title="Shifts Accepted"
            value={dashboardStats.accepted}
          />
          <DashboardCard
            title="Shifts Rejected"
            value={dashboardStats.rejected}
          />
          <DashboardCard
            title={`Hours This Month (${format(today, "MMMM")})`}
            value={dashboardStats.hoursThisMonth}
          />
        </div>

        <div className="main-grid">
          <div className="card card-padded">
            <h3 className="card-title">Request Status Breakdown</h3>
            <ShiftStatusChart data={shiftStatusData} />
          </div>
          <div className="card most-active-card">
            <h3 className="card-title">Most Active This Month</h3>
            {mostActiveNurse ? (
              <>
                <Crown size={64} color="#f59e0b" />
                <p className="most-active-name">{mostActiveNurse.name}</p>
                <p className="most-active-hours">
                  {mostActiveNurse.hours.toFixed(1)}{" "}
                  <span className="most-active-hours-label">hours</span>
                </p>
                <p className="most-active-date-label">
                  in {format(today, "MMMM yyyy")}
                </p>
              </>
            ) : (
              <p style={{ textAlign: "center", color: "#6b7280" }}>
                No work recorded this month.
              </p>
            )}
          </div>
        </div>

        <div className="card card-padded">
          <div className="card-header-flex">
            <h3 className="card-title">Day-wise Shifts</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-date"
            />
          </div>
          <DayWiseShiftChart data={dayWiseChartData} />
        </div>

        <div className="card card-padded">
          <div className="card-header-flex">
            <h3 className="card-title">Consolidated Workload Report</h3>
            <div className="date-filter-controls">
              <select
                className="filter-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.name}
                  </option>
                ))}
              </select>
              <select
                className="filter-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ConsolidatedMonthlyChart
            data={consolidatedChartData.data}
            view={consolidatedChartData.view}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
