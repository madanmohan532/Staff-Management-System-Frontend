// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AttendanceReport = () => {
//   const [nurses, setNurses] = useState([]);
//   const [filteredNurses, setFilteredNurses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filter states
//   const [selectedNurseId, setSelectedNurseId] = useState("");
//   const [filterDate, setFilterDate] = useState("");

//   useEffect(() => {
//     // Fetch all nurses with working hours from backend
//     const fetchNurses = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           "http://localhost:9999/staff-service/api/nurses"
//         ); // Example endpoint
//         if (res.status === 200) {
//           setNurses(res.data);
//           setFilteredNurses(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch nurses", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNurses();
//   }, []);

//   // Filter nurses on employee and date change
//   useEffect(() => {
//     let filtered = [...nurses];

//     // Filter by nurse if selected
//     if (selectedNurseId) {
//       filtered = filtered.filter((n) => n.id === selectedNurseId);
//     }

//     // Filter working hours based on date
//     if (filterDate) {
//       filtered = filtered
//         .map((n) => {
//           const filteredWorkingHours = n.workingHours?.filter((wh) => {
//             const whDate = new Date(wh.date).toISOString().split("T")[0];
//             return whDate === filterDate;
//           });
//           return { ...n, workingHours: filteredWorkingHours || [] };
//         })
//         .filter((n) => n.workingHours && n.workingHours.length > 0);
//     }

//     setFilteredNurses(filtered);
//   }, [selectedNurseId, filterDate, nurses]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <section>
//       <h2>Admin Attendance Report</h2>

//       {/* Filters */}
//       <div
//         style={{
//           marginBottom: "1rem",
//           display: "flex",
//           gap: "1rem",
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <label>
//             Filter by Nurse:
//             <select
//               value={selectedNurseId}
//               onChange={(e) => setSelectedNurseId(e.target.value)}
//               style={{ marginLeft: "0.5rem" }}
//             >
//               <option value="">All Nurses</option>
//               {nurses.map((nurse) => (
//                 <option key={nurse.id} value={nurse.id}>
//                   {nurse.firstName} {nurse.lastName}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>

//         <div>
//           <label>
//             Filter by Date:
//             <input
//               type="date"
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)}
//               style={{ marginLeft: "0.5rem" }}
//             />
//           </label>
//         </div>

//         {/* Clear Filters button */}
//         {(selectedNurseId || filterDate) && (
//           <button
//             onClick={() => {
//               setSelectedNurseId("");
//               setFilterDate("");
//             }}
//           >
//             Clear Filters
//           </button>
//         )}
//       </div>

//       {/* Nurse Attendance Table */}
//       {filteredNurses.length === 0 ? (
//         <p>No attendance records found for selected filters.</p>
//       ) : (
//         filteredNurses.map((nurse) => (
//           <div
//             key={nurse.id}
//             style={{
//               marginBottom: "1.5rem",
//               border: "1px solid #ccc",
//               padding: "1rem",
//               borderRadius: "8px",
//             }}
//           >
//             <h3>
//               {nurse.firstName} {nurse.lastName}
//             </h3>
//             {!nurse.workingHours || nurse.workingHours.length === 0 ? (
//               <p>No working hours recorded</p>
//             ) : (
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th
//                       style={{
//                         borderBottom: "1px solid #999",
//                         padding: "0.5rem",
//                         textAlign: "left",
//                       }}
//                     >
//                       Date
//                     </th>
//                     <th
//                       style={{
//                         borderBottom: "1px solid #999",
//                         padding: "0.5rem",
//                         textAlign: "left",
//                       }}
//                     >
//                       From
//                     </th>
//                     <th
//                       style={{
//                         borderBottom: "1px solid #999",
//                         padding: "0.5rem",
//                         textAlign: "left",
//                       }}
//                     >
//                       To
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {nurse.workingHours.map((wh, idx) => (
//                     <tr key={idx}>
//                       <td
//                         style={{
//                           padding: "0.5rem",
//                           borderBottom: "1px solid #eee",
//                         }}
//                       >
//                         {new Date(wh.date).toLocaleDateString()}
//                       </td>
//                       <td
//                         style={{
//                           padding: "0.5rem",
//                           borderBottom: "1px solid #eee",
//                         }}
//                       >
//                         {wh.from}
//                       </td>
//                       <td
//                         style={{
//                           padding: "0.5rem",
//                           borderBottom: "1px solid #eee",
//                         }}
//                       >
//                         {wh.to}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         ))
//       )}
//     </section>
//   );
// };

// export default AttendanceReport;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const dateRanges = [
//   { label: "Today", value: "today" },
//   { label: "This Week", value: "this_week" },
//   { label: "This Month", value: "this_month" },
//   { label: "Custom", value: "custom" },
// ];

// const AttendanceReport = () => {
//   const [nurses, setNurses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [staffFilter, setStaffFilter] = useState(""); // matches ID or name
//   const [dateRange, setDateRange] = useState("today"); // default to today
//   const [customDate, setCustomDate] = useState(""); // only if custom selected
//   const [allNurses, setAllNurses] = useState({});
//   const [filteredNurses, setFilteredNurses] = useState([]);

//   const fetchNurses = async () => {
//     await axios
//       .get("http://localhost:9999/admin-service/api/admin/nurse/nurseDetails")
//       .then((response) => {
//         if (response.status === 200) {
//           setAllNurses(response.data);

//           const result = response.data;

//           const filteredData = result.filter((nurse) => {
//             if (nurse.workingHours.length > 0) return nurse.workingHours;
//           });

//           console.log(filteredData);
//           setFilteredNurses(filteredData);

//           setLoading(false);
//         } else {
//           console.log("No nurses found");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching nurses:", error);
//       });
//   };

//   useEffect(() => {
//     fetchNurses();
//   }, []);

//   useEffect(() => {
//     if (!nurses.length) {
//       setFilteredNurses([]);
//       return;
//     }

//     // Helper: check if workingHours contains date in filter period
//     const isDateInRange = (dateString, range) => {
//       const date = new Date(dateString);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       if (range === "today") {
//         return date.toDateString() === today.toDateString();
//       } else if (range === "this_week") {
//         // Get startOfWeek (Sunday)
//         const startOfWeek = new Date(today);
//         startOfWeek.setDate(today.getDate() - today.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return date >= startOfWeek && date <= endOfWeek;
//       } else if (range === "this_month") {
//         return (
//           date.getFullYear() === today.getFullYear() &&
//           date.getMonth() === today.getMonth()
//         );
//       } else if (range === "custom" && customDate) {
//         const filterDate = new Date(customDate);
//         console.log(filterDate);

//         return date.toDateString() === filterDate.toDateString();
//       }
//       return false; // fallback
//     };

//     // Filter nurses based on staffFilter (id or name), dateRange/customDate, and department
//     let result = nurses;

//     if (staffFilter.trim()) {
//       const filterStr = staffFilter.toLowerCase();
//       result = result.filter(
//         (n) =>
//           (n.id && n.id.toLowerCase().includes(filterStr)) ||
//           (n.firstName && n.firstName.toLowerCase().includes(filterStr)) ||
//           (n.lastName && n.lastName.toLowerCase().includes(filterStr))
//       );
//     }

//     // Filter working hours by date range
//     result = result
//       .map((n) => {
//         const filteredWorkingHours = (n.workingHours || []).filter((wh) =>
//           isDateInRange(wh.date, dateRange)
//         );
//         return { ...n, workingHours: filteredWorkingHours };
//       })
//       .filter((n) => n.workingHours.length > 0);

//     setFilteredNurses(result);
//   }, [staffFilter, dateRange, customDate, nurses]);

//   if (loading) return <p>Loading nurse attendance...</p>;

//   return (
//     <section style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
//       <h2>Admin Attendance Report</h2>

//       {/* Filters */}
//       <div
//         style={{
//           display: "flex",
//           gap: "1rem",
//           flexWrap: "wrap",
//           marginBottom: 20,
//           alignItems: "flex-end",
//         }}
//       >
//         <div style={{ flex: 1, minWidth: 200 }}>
//           <label htmlFor="staffFilter">Staff ID/Name</label>
//           <input
//             id="staffFilter"
//             type="text"
//             placeholder="Enter ID or name"
//             value={staffFilter}
//             onChange={(e) => setStaffFilter(e.target.value)}
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>

//         <div style={{ minWidth: 160 }}>
//           <label htmlFor="dateRange">Date Range</label>
//           <select
//             id="dateRange"
//             value={dateRange}
//             onChange={(e) => setDateRange(e.target.value)}
//             style={{ width: "100%", padding: "8px" }}
//           >
//             {dateRanges.map(({ label, value }) => (
//               <option key={value} value={value}>
//                 {label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {dateRange === "custom" && (
//           <div style={{ minWidth: 160 }}>
//             <label htmlFor="customDate">Select Date</label>
//             <input
//               id="customDate"
//               type="date"
//               value={customDate}
//               onChange={(e) => setCustomDate(e.target.value)}
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </div>
//         )}
//       </div>

//       {/* Attendance Results */}
//       {filteredNurses.length === 0 ? (
//         <p>No attendance records found.</p>
//       ) : (
//         filteredNurses.map((nurse) => (
//           <div
//             key={nurse.id}
//             style={{
//               marginBottom: 20,
//               border: "1px solid #ccc",
//               padding: 16,
//               borderRadius: 8,
//               backgroundColor: "#fafafa",
//             }}
//           >
//             <h3>
//               {nurse.firstName} {nurse.lastName}{" "}
//               {nurse.department && (
//                 <span style={{ fontSize: "0.9rem", color: "#666" }}>
//                   ({nurse.department})
//                 </span>
//               )}
//             </h3>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: 8,
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th
//                     style={{
//                       borderBottom: "1px solid #777",
//                       padding: "8px",
//                       textAlign: "left",
//                     }}
//                   >
//                     Date
//                   </th>
//                   <th
//                     style={{
//                       borderBottom: "1px solid #777",
//                       padding: "8px",
//                       textAlign: "left",
//                     }}
//                   >
//                     From
//                   </th>
//                   <th
//                     style={{
//                       borderBottom: "1px solid #777",
//                       padding: "8px",
//                       textAlign: "left",
//                     }}
//                   >
//                     To
//                   </th>
//                   <th
//                     style={{
//                       borderBottom: "1px solid #777",
//                       padding: "8px",
//                       textAlign: "left",
//                     }}
//                   >
//                     Hospital Id
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {nurse.workingHours.map((wh, idx) => (
//                   <tr key={idx}>
//                     <td
//                       style={{
//                         padding: "8px",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {new Date(wh.date).toLocaleDateString()}
//                     </td>
//                     <td
//                       style={{
//                         padding: "8px",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {wh.from}
//                     </td>
//                     <td
//                       style={{
//                         padding: "8px",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {wh.to}
//                     </td>
//                     <td
//                       style={{
//                         padding: "8px",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {wh.hospitalId}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))
//       )}
//     </section>
//   );
// };

// export default AttendanceReport;

import React, { useState, useEffect, useMemo, require } from "react";

import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import calendar CSS
import enUS from "date-fns/locale/en-US";
// Setup the localizer for react-big-calendar
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AttendanceReport = ({ nurseId }) => {
  const [allNurses, setAllNurses] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffFilter, setStaffFilter] = useState(""); // Filter by ID or name

  // Fetch initial nurse data from the API
  useEffect(() => {
    const fetchNurses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:9999/admin-service/api/admin/nurse/nurseDetails/${nurseId}`
        );
        if (response.status === 200 && response.data) {
          // IMPORTANT: Map database fields (snake_case) to component fields (camelCase)
          const result = response.data;
          const formattedNurses = result.map((nurse) => ({
            id: nurse._id,
            firstName: nurse.first_name,
            lastName: nurse.last_name,
            department: nurse.department, // Assuming department might exist
            workingHours: nurse.working_hours.map((wh) => ({
              date: wh.date,
              // Handle the nested '$date' object from your JSON
              from: new Date(wh.from.$date),
              to: new Date(wh.to.$date),
              hospitalId: wh.hospital_id,
            })),
          }));
          setAllNurses(formattedNurses);
        } else {
          console.log("No nurses found");
          setAllNurses([]);
        }
      } catch (error) {
        console.error("Error fetching nurses:", error);
        setAllNurses([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  // This hook filters nurses and transforms their working hours into calendar events
  useEffect(() => {
    let filteredNurses = allNurses;

    // Apply the staff filter if it's not empty
    if (staffFilter.trim()) {
      const filterStr = staffFilter.toLowerCase();
      filteredNurses = allNurses.filter(
        (n) =>
          (n.id && n.id.toLowerCase().includes(filterStr)) ||
          (n.firstName && n.firstName.toLowerCase().includes(filterStr)) ||
          (n.lastName && n.lastName.toLowerCase().includes(filterStr))
      );
    }

    // Transform the filtered nurse data into events for the calendar
    const events = filteredNurses.flatMap((nurse) =>
      (nurse.workingHours || []).map((wh) => ({
        title: `${nurse.firstName} ${nurse.lastName} (Hospital: ${wh.hospitalId})`,
        start: wh.from, // This is already a Date object
        end: wh.to, // This is already a Date object
        resource: nurse, // Store original nurse data if needed
      }))
    );

    setCalendarEvents(events);
  }, [staffFilter, allNurses]); // Re-run when filter or data changes

  if (loading) return <p>Loading nurse attendance...</p>;

  return (
    <section
      style={{ height: "90vh", maxWidth: 1200, margin: "auto", padding: 20 }}
    >
      <h2>Admin Attendance Report 📅</h2>

      {/* Filter by Staff */}
      <div style={{ marginBottom: 20, maxWidth: 300 }}>
        <label htmlFor="staffFilter">Filter by Staff ID/Name</label>
        <input
          id="staffFilter"
          type="text"
          placeholder="Enter ID or name"
          value={staffFilter}
          onChange={(e) => setStaffFilter(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {/* Calendar View */}
      {calendarEvents.length === 0 && !loading ? (
        <p>No attendance records found for the selected filter.</p>
      ) : (
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={["month", "week", "day"]} // Allow user to switch views
          tooltipAccessor={(event) =>
            `Nurse: ${event.resource.firstName} ${
              event.resource.lastName
            }\nHospital: ${
              event.resource.workingHours.find((wh) => wh.from === event.start)
                ?.hospitalId
            }`
          }
        />
      )}
    </section>
  );
};

export default AttendanceReport;
