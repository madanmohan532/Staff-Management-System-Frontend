// // // import React, { useState, useEffect, useCallback } from "react";
// // // import {
// // //   FaUserInjured,
// // //   FaEdit,
// // //   FaHospital,
// // //   FaCalendarAlt,
// // //   FaStethoscope,
// // //   FaSyncAlt, // New icon for refresh button
// // // } from "react-icons/fa";
// // // import axios from "axios";
// // // import EditPatientModal from "./EditPatientModal";
// // // import "./PatientsSection.css";

// // // const PatientsSection = ({ nurseId }) => {
// // //   const [nurseDetails, setNurseDetails] = useState(null);
// // //   const [patients, setPatients] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [modalPatient, setModalPatient] = useState(null);
// // //   const [currentWorkingHospitalId, setCurrentWorkingHospitalId] =
// // //     useState(null);

// // //   // Helper function to determine the current hospital ID based on working hours
// // //   const getCurrentHospitalId = useCallback((hours) => {
// // //     const now = new Date();
// // //     // Use a more lenient approach: check for any shift on the current day
// // //     const currentDayShift = hours.find((shift) => {
// // //       const fromDate = new Date(shift.from);
// // //       const toDate = new Date(shift.to);
// // //       const isToday =
// // //         fromDate.getDate() === now.getDate() &&
// // //         fromDate.getMonth() === now.getMonth() &&
// // //         fromDate.getFullYear() === now.getFullYear();

// // //       // Return the hospitalId if a shift is found for the current day
// // //       if (isToday) {
// // //         return shift;
// // //       }
// // //       return null;
// // //     });

// // //     return currentDayShift ? currentDayShift.hospitalId : null;
// // //   }, []);

// // //   // Function to fetch patients for a given hospital ID
// // //   const fetchPatientsForHospital = useCallback(async (hospitalIdToFetch) => {
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalIdToFetch}`
// // //       );
// // //       if (res.status === 200) {
// // //         setPatients(res.data || []);
// // //       } else {
// // //         setPatients([]);
// // //         console.log("No patients found for hospital:", hospitalIdToFetch);
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to fetch patients:", error);
// // //       setPatients([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   // Main useEffect to orchestrate data fetching
// // //   useEffect(() => {
// // //     const loadAllData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // 1. Fetch Nurse Details
// // //         const nurseRes = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
// // //         );
// // //         setNurseDetails(nurseRes.data);

// // //         // 2. Fetch Nurse's Working Hours
// // //         const workingHoursRes = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/getWorkingHours/${nurseId}`
// // //         );
// // //         const fetchedWorkingHours = workingHoursRes.data || [];

// // //         // 3. Determine current working hospital ID
// // //         const activeHospitalId = getCurrentHospitalId(fetchedWorkingHours);
// // //         setCurrentWorkingHospitalId(activeHospitalId);

// // //         // 4. Fetch Patients if an active hospital is found
// // //         if (activeHospitalId) {
// // //           await fetchPatientsForHospital(activeHospitalId);
// // //         } else {
// // //           setPatients([]); // No active hospital, so no patients to display
// // //           setLoading(false);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to load dashboard data:", error);
// // //         setNurseDetails(null);
// // //         setPatients([]);
// // //         setCurrentWorkingHospitalId(null);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (nurseId) {
// // //       loadAllData();
// // //     }
// // //   }, [nurseId, getCurrentHospitalId, fetchPatientsForHospital]);

// // //   // Open modal for selected patient
// // //   const openEditModal = (patient) => {
// // //     setModalPatient(patient);
// // //     setIsModalOpen(true);
// // //   };

// // //   // Close modal
// // //   const closeModal = () => {
// // //     setIsModalOpen(false);
// // //     setModalPatient(null);
// // //   };

// // //   // Save updated patient from modal and refresh data
// // //   const savePatientRecord = async (updatedPatient) => {
// // //     try {
// // //       setLoading(true);
// // //       const response = await axios.put(
// // //         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
// // //         updatedPatient
// // //       );

// // //       if (response.status === 200) {
// // //         if (currentWorkingHospitalId) {
// // //           await fetchPatientsForHospital(currentWorkingHospitalId);
// // //         }
// // //         alert("Patient records updated successfully!");
// // //       } else {
// // //         alert("Failed to update records. Please try again.");
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to update patient record", error);
// // //       alert("Failed to update records. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //       closeModal();
// // //     }
// // //   };

// // //   // Render loading state
// // //   if (loading) {
// // //     return (
// // //       <section className="section-card">
// // //         <p className="loading-message">
// // //           <FaSyncAlt className="spin" /> Checking for active shift and loading
// // //           patients...
// // //         </p>
// // //       </section>
// // //     );
// // //   }

// // //   // Render state if nurse details couldn't be loaded
// // //   if (!nurseDetails) {
// // //     return (
// // //       <section className="section-card">
// // //         <p className="error-message">
// // //           Unable to load nurse details. Please try again later.
// // //         </p>
// // //       </section>
// // //     );
// // //   }

// // //   // Render state if nurse is not currently working a shift
// // //   if (!currentWorkingHospitalId) {
// // //     return (
// // //       <section className="section-card patient-section">
// // //         <p className="info-text">
// // //           You are not currently assigned to a hospital for today. Patient
// // //           details will appear here when you have an active shift.
// // //         </p>
// // //       </section>
// // //     );
// // //   }

// // //   // Render the patient list
// // //   return (
// // //     <section className="section-card patient-section" aria-live="polite">
// // //       <div className="section-header">
// // //         <h2>
// // //           <FaUserInjured aria-hidden="true" /> Patient Records
// // //         </h2>
// // //         {currentWorkingHospitalId && (
// // //           <p className="current-hospital-info">
// // //             Displaying patients for Hospital ID:{" "}
// // //             <strong>{currentWorkingHospitalId}</strong>
// // //           </p>
// // //         )}
// // //       </div>

// // //       {patients.length === 0 ? (
// // //         <p className="info-text">
// // //           No patients are assigned to your current hospital shift.
// // //         </p>
// // //       ) : (
// // //         <div className="patients-list" role="list">
// // //           {patients.map((patient) => (
// // //             <article
// // //               key={patient._id || patient.id}
// // //               className="patient-card"
// // //               role="listitem"
// // //               tabIndex={0}
// // //               aria-label={`${patient.firstName} ${patient.lastName} patient card`}
// // //             >
// // //               <div className="patient-header">
// // //                 <strong>
// // //                   {patient.firstName} {patient.lastName}
// // //                 </strong>
// // //                 <button
// // //                   className="edit-records-btn"
// // //                   aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
// // //                   onClick={() => openEditModal(patient)}
// // //                 >
// // //                   <FaEdit /> Edit
// // //                 </button>
// // //               </div>

// // //               <div className="patient-info-row">
// // //                 <FaHospital /> <span>Hospital ID: {patient.hospitalId}</span>
// // //               </div>
// // //               {patient.age && (
// // //                 <div className="patient-info-row">
// // //                   <FaUserInjured /> <span>Age: {patient.age}</span>
// // //                 </div>
// // //               )}
// // //               {patient.diagnosis && (
// // //                 <div className="patient-info-row">
// // //                   <FaStethoscope /> <span>Diagnosis: {patient.diagnosis}</span>
// // //                 </div>
// // //               )}
// // //               <div className="patient-info-row">
// // //                 <FaCalendarAlt />{" "}
// // //                 <span>
// // //                   Admit Date: {new Date(patient.admitDate).toLocaleDateString()}
// // //                 </span>
// // //               </div>
// // //               <div className="patient-info-row">
// // //                 <FaCalendarAlt />{" "}
// // //                 <span>
// // //                   Expected Discharge:{" "}
// // //                   {new Date(patient.expectedDischargeDate).toLocaleDateString()}
// // //                 </span>
// // //               </div>

// // //               <div className="patient-records">
// // //                 <p
// // //                   className="record-display"
// // //                   aria-label="Primary medical reason"
// // //                 >
// // //                   {patient.medicalInformation?.primaryReason ||
// // //                     "No primary medical reason provided."}
// // //                 </p>
// // //               </div>
// // //             </article>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {isModalOpen && modalPatient && (
// // //         <EditPatientModal
// // //           patient={modalPatient}
// // //           nurseId={nurseId}
// // //           onClose={closeModal}
// // //           onSave={savePatientRecord}
// // //         />
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default PatientsSection;

// // import React, { useState, useEffect, useCallback } from "react";
// // import {
// //   FaUserInjured,
// //   FaEdit,
// //   FaHospital,
// //   FaCalendarAlt,
// //   FaStethoscope,
// //   FaSyncAlt, // New icon for refresh button
// // } from "react-icons/fa";
// // import axios from "axios";
// // import EditPatientModal from "./EditPatientModal";
// // import "./PatientsSection.css";

// // const PatientsSection = ({ nurseId }) => {
// //   const [nurseDetails, setNurseDetails] = useState(null);
// //   const [patients, setPatients] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalPatient, setModalPatient] = useState(null);
// //   const [currentWorkingHospitalId, setCurrentWorkingHospitalId] =
// //     useState(null);

// //   // Helper to get IST offset string for consistent parsing
// //   const IST_OFFSET = "+05:30";

// //   // Function to prepare date string for consistent parsing as IST
// //   const prepareDateStringForIST = useCallback((timeString) => {
// //     if (!timeString) return "";
// //     // If the string doesn't contain a timezone offset (Z, +HH:MM, or -HH:MM)
// //     // and it includes a time component 'T', append IST offset.
// //     if (
// //       !timeString.includes("Z") &&
// //       !timeString.includes("+") &&
// //       !timeString.includes("-") &&
// //       timeString.includes("T")
// //     ) {
// //       return timeString + IST_OFFSET;
// //     }
// //     // If it's just a date like "YYYY-MM-DD", append a default time and IST offset
// //     if (
// //       !timeString.includes("Z") &&
// //       !timeString.includes("+") &&
// //       !timeString.includes("-") &&
// //       !timeString.includes("T")
// //     ) {
// //       return timeString + "T00:00:00" + IST_OFFSET;
// //     }
// //     return timeString; // Return as-is if it already has an offset or is not a date-time string
// //   }, []); // useCallback to memoize the function

// //   // Helper function to determine the current hospital ID based on working hours
// //   const getCurrentHospitalId = useCallback(
// //     (hours) => {
// //       const now = new Date();
// //       // Use a more lenient approach: check for any shift on the current day
// //       const currentDayShift = hours.find((shift) => {
// //         // Ensure the shift's 'from' date is parsed consistently as IST
// //         const fromDate = new Date(prepareDateStringForIST(shift.from));
// //         const toDate = new Date(prepareDateStringForIST(shift.to));
// //         console.log(shift.from, shift.to);

// //         console.log(fromDate, toDate);

// //         // Check if the shift's date matches today's date (IST)
// //         const isShiftToday =
// //           fromDate.getDate() === now.getDate() &&
// //           fromDate.getMonth() === now.getMonth() &&
// //           fromDate.getFullYear() === now.getFullYear();

// //         // Additionally, check if the current time falls within the shift's duration
// //         // This makes the "active" check more precise for the current moment.
// //         const isCurrentlyActive = now >= fromDate && now <= toDate;

// //         // Return the hospitalId if a shift is found for the current day AND it's currently active
// //         if (isShiftToday && isCurrentlyActive) {
// //           return shift;
// //         }
// //         return null;
// //       });

// //       console.log(currentDayShift);

// //       return currentDayShift ? currentDayShift.hospitalId : null;
// //     },
// //     [prepareDateStringForIST]
// //   ); // Dependency on prepareDateStringForIST

// //   // Function to fetch patients for a given hospital ID
// //   const fetchPatientsForHospital = useCallback(async (hospitalIdToFetch) => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalIdToFetch}`
// //       );
// //       if (res.status === 200) {
// //         setPatients(res.data || []);
// //         console.log(res.data);
// //       } else {
// //         setPatients([]);
// //         console.log("No patients found for hospital:", hospitalIdToFetch);
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch patients:", error);
// //       setPatients([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []); // No external dependencies needed for this specific function

// //   // Main useEffect to orchestrate data fetching
// //   useEffect(() => {
// //     const loadAllData = async () => {
// //       setLoading(true);
// //       try {
// //         // 1. Fetch Nurse Details
// //         const nurseRes = await axios.get(
// //           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
// //         );
// //         setNurseDetails(nurseRes.data);

// //         // 2. Fetch Nurse's Working Hours (which includes workSchedule)
// //         // Assuming getWorkingHours also returns workSchedule or you need to fetch workSchedule separately
// //         // For robustness, let's fetch workSchedule explicitly here if it's separate from workingHours API
// //         const workScheduleRes = await axios.get(
// //           `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
// //         );
// //         const fetchedWorkSchedule = workScheduleRes.data || [];

// //         // 3. Determine current working hospital ID from workSchedule
// //         // We use workSchedule here as it contains 'accepted'/'confirmed' status
// //         const activeHospitalId = getCurrentHospitalId(fetchedWorkSchedule);
// //         console.log(activeHospitalId);

// //         setCurrentWorkingHospitalId(activeHospitalId);

// //         // 4. Fetch Patients if an active hospital is found
// //         if (activeHospitalId) {
// //           await fetchPatientsForHospital(activeHospitalId);
// //         } else {
// //           setPatients([]); // No active hospital, so no patients to display
// //           setLoading(false); // Stop loading if no active hospital
// //         }
// //       } catch (error) {
// //         console.error("Failed to load PatientsSection data:", error);
// //         setNurseDetails(null);
// //         setPatients([]);
// //         setCurrentWorkingHospitalId(null);
// //         setLoading(false);
// //       }
// //     };

// //     if (nurseId) {
// //       loadAllData();
// //     }
// //   }, [nurseId, getCurrentHospitalId, fetchPatientsForHospital]); // Dependencies for useEffect

// //   // Open modal for selected patient
// //   const openEditModal = (patient) => {
// //     setModalPatient(patient);
// //     setIsModalOpen(true);
// //   };

// //   // Close modal
// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setModalPatient(null);
// //   };

// //   // Save updated patient from modal and refresh data
// //   const savePatientRecord = async (updatedPatient) => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.put(
// //         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
// //         updatedPatient
// //       );

// //       if (response.status === 200) {
// //         if (currentWorkingHospitalId) {
// //           // Re-fetch patients for the current hospital to reflect changes
// //           await fetchPatientsForHospital(currentWorkingHospitalId);
// //         }
// //         alert("Patient records updated successfully!");
// //       } else {
// //         alert("Failed to update records. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Failed to update patient record", error);
// //       alert("Failed to update records. Please try again.");
// //     } finally {
// //       setLoading(false);
// //       closeModal();
// //     }
// //   };

// //   // Render loading state
// //   if (loading) {
// //     return (
// //       <section className="section-card">
// //         <p className="loading-message">
// //           <FaSyncAlt className="spin" /> Checking for active shift and loading
// //           patients...
// //         </p>
// //       </section>
// //     );
// //   }

// //   // Render state if nurse details couldn't be loaded
// //   if (!nurseDetails) {
// //     return (
// //       <section className="section-card">
// //         <p className="error-message">
// //           Unable to load nurse details. Please try again later.
// //         </p>
// //       </section>
// //     );
// //   }

// //   // Render state if nurse is not currently working a shift
// //   if (!currentWorkingHospitalId) {
// //     return (
// //       <section className="section-card patient-section">
// //         <p className="info-text">
// //           You are not currently assigned to a hospital for today, or your shift
// //           is not active. Patient details will appear here when you have an
// //           active shift.
// //         </p>
// //       </section>
// //     );
// //   }

// //   // Render the patient list
// //   return (
// //     <section className="section-card patient-section" aria-live="polite">
// //       <div className="section-header">
// //         <h2>
// //           <FaUserInjured aria-hidden="true" /> Patient Records
// //         </h2>
// //         {currentWorkingHospitalId && (
// //           <p className="current-hospital-info">
// //             Displaying patients for Hospital ID:{" "}
// //             <strong>{currentWorkingHospitalId}</strong>
// //           </p>
// //         )}
// //       </div>

// //       {patients.length === 0 ? (
// //         <p className="info-text">
// //           No patients are assigned to your current hospital shift.
// //         </p>
// //       ) : (
// //         <div className="patients-list" role="list">
// //           {patients.map((patient) => (
// //             <article
// //               key={patient._id || patient.id}
// //               className="patient-card"
// //               role="listitem"
// //               tabIndex={0}
// //               aria-label={`${patient.firstName} ${patient.lastName} patient card`}
// //             >
// //               <div className="patient-header">
// //                 <strong>
// //                   {patient.firstName} {patient.lastName}
// //                 </strong>
// //                 <button
// //                   className="edit-records-btn"
// //                   aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
// //                   onClick={() => openEditModal(patient)}
// //                 >
// //                   <FaEdit /> Edit
// //                 </button>
// //               </div>

// //               <div className="patient-info-row">
// //                 <FaHospital /> <span>Hospital ID: {patient.hospitalId}</span>
// //               </div>
// //               {patient.age && (
// //                 <div className="patient-info-row">
// //                   <FaUserInjured /> <span>Age: {patient.age}</span>
// //                 </div>
// //               )}
// //               {patient.diagnosis && (
// //                 <div className="patient-info-row">
// //                   <FaStethoscope /> <span>Diagnosis: {patient.diagnosis}</span>
// //                 </div>
// //               )}
// //               <div className="patient-info-row">
// //                 <FaCalendarAlt />{" "}
// //                 <span>
// //                   Admit Date:{" "}
// //                   {new Date(
// //                     prepareDateStringForIST(patient.admitDate)
// //                   ).toLocaleDateString()}
// //                 </span>
// //               </div>
// //               <div className="patient-info-row">
// //                 <FaCalendarAlt />{" "}
// //                 <span>
// //                   Expected Discharge:{" "}
// //                   {new Date(
// //                     prepareDateStringForIST(patient.expectedDischargeDate)
// //                   ).toLocaleDateString()}
// //                 </span>
// //               </div>

// //               <div className="patient-records">
// //                 <p
// //                   className="record-display"
// //                   aria-label="Primary medical reason"
// //                 >
// //                   {patient.medicalInformation?.primaryReason ||
// //                     "No primary medical reason provided."}
// //                 </p>
// //               </div>
// //             </article>
// //           ))}
// //         </div>
// //       )}

// //       {isModalOpen && modalPatient && (
// //         <EditPatientModal
// //           patient={modalPatient}
// //           nurseId={nurseId}
// //           onClose={closeModal}
// //           onSave={savePatientRecord}
// //         />
// //       )}
// //     </section>
// //   );
// // };

// // export default PatientsSection;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   FaUserInjured,
//   FaEdit,
//   FaHospital,
//   FaCalendarAlt,
//   FaStethoscope,
//   FaSyncAlt, // New icon for refresh button
// } from "react-icons/fa";
// import axios from "axios";
// import EditPatientModal from "./EditPatientModal";
// import "./PatientsSection.css";

// const PatientsSection = ({ nurseId }) => {
//   const [nurseDetails, setNurseDetails] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPatient, setModalPatient] = useState(null);
//   const [currentWorkingHospitalId, setCurrentWorkingHospitalId] =
//     useState(null);

//   const formatTime = (timeString) => {
//     if (!timeString) return "";

//     const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//     console.log(formattedDate);

//     return formattedDate;
//   };

//   // Removed IST_OFFSET and prepareDateStringForIST as per your request.
//   // Dates will now be parsed directly by new Date().

//   // Helper function to determine the current hospital ID based on working hours
//   const getCurrentHospitalId = useCallback((hours) => {
//     const now = new Date(); // Current time in user's local timezone
//     // Use a more lenient approach: check for any shift on the current day
//     const currentDayShift = hours.find((shift) => {
//       // Parse 'from' and 'to' strings directly.
//       // They will be interpreted as local times based on the user's browser timezone.
//       const fromDate = new Date(shift.from);
//       // fromDate.setHours(fromDate.getHours(), fromDate.getMinutes()); // Adjust for IST if needed
//       const toDate = new Date(shift.to);
//       // toDate.setHours(toDate.getHours() - 5, toDate.getMinutes() - 30); // Adjust for IST if needed

//       console.log(fromDate, toDate);

//       console.log("now" + now);

//       // Check if the shift's date matches today's date (in the user's local timezone)
//       const isShiftToday =
//         fromDate.getDate() === now.getDate() &&
//         fromDate.getMonth() === now.getMonth() &&
//         fromDate.getFullYear() === now.getFullYear();

//       // Additionally, check if the current time falls within the shift's duration
//       // This makes the "active" check more precise for the current moment.
//       const isCurrentlyActive = now >= fromDate && now <= toDate;

//       // Return the hospitalId if a shift is found for the current day AND it's currently active
//       if (isShiftToday && isCurrentlyActive) {
//         return shift;
//       }
//       return null;
//     });

//     console.log(currentDayShift);

//     return currentDayShift ? currentDayShift.hospitalId : null;
//   }, []); // No dependencies related to date string manipulation needed here anymore

//   // Function to fetch patients for a given hospital ID
//   const fetchPatientsForHospital = useCallback(async (hospitalIdToFetch) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalIdToFetch}`
//       );
//       if (res.status === 200) {
//         setPatients(res.data || []);
//       } else {
//         setPatients([]);
//         console.log("No patients found for hospital:", hospitalIdToFetch);
//       }
//     } catch (error) {
//       console.error("Failed to fetch patients:", error);
//       setPatients([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Main useEffect to orchestrate data fetching
//   useEffect(() => {
//     const loadAllData = async () => {
//       setLoading(true);
//       try {
//         // 1. Fetch Nurse Details
//         const nurseRes = await axios.get(
//           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
//         );
//         setNurseDetails(nurseRes.data);

//         // 2. Fetch Nurse's Work Schedule (as it contains 'accepted'/'confirmed' status)
//         const workScheduleRes = await axios.get(
//           `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
//         );
//         const fetchedWorkSchedule = workScheduleRes.data || [];

//         // 3. Determine current working hospital ID from workSchedule
//         const activeHospitalId = getCurrentHospitalId(fetchedWorkSchedule);
//         setCurrentWorkingHospitalId(activeHospitalId);

//         // 4. Fetch Patients if an active hospital is found
//         if (activeHospitalId) {
//           await fetchPatientsForHospital(activeHospitalId);
//         } else {
//           setPatients([]); // No active hospital, so no patients to display
//           setLoading(false); // Stop loading if no active hospital
//         }
//       } catch (error) {
//         console.error("Failed to load PatientsSection data:", error);
//         setNurseDetails(null);
//         setPatients([]);
//         setCurrentWorkingHospitalId(null);
//         setLoading(false);
//       }
//     };

//     if (nurseId) {
//       loadAllData();
//     }
//   }, [nurseId, getCurrentHospitalId, fetchPatientsForHospital]);

//   // Open modal for selected patient
//   const openEditModal = (patient) => {
//     setModalPatient(patient);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalPatient(null);
//   };

//   // Save updated patient from modal and refresh data
//   const savePatientRecord = async (updatedPatient) => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
//         updatedPatient
//       );

//       if (response.status === 200) {
//         if (currentWorkingHospitalId) {
//           // Re-fetch patients for the current hospital to reflect changes
//           await fetchPatientsForHospital(currentWorkingHospitalId);
//         }
//         alert("Patient records updated successfully!");
//       } else {
//         alert("Failed to update records. Please try again.");
//       }
//     } catch (error) {
//       console.error("Failed to update patient record", error);
//       alert("Failed to update records. Please try again.");
//     } finally {
//       setLoading(false);
//       closeModal();
//     }
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <section className="section-card">
//         <p className="loading-message">
//           <FaSyncAlt className="spin" /> Checking for active shift and loading
//           patients...
//         </p>
//       </section>
//     );
//   }

//   // Render state if nurse details couldn't be loaded
//   if (!nurseDetails) {
//     return (
//       <section className="section-card">
//         <p className="error-message">
//           Unable to load nurse details. Please try again later.
//         </p>
//       </section>
//     );
//   }

//   // Render state if nurse is not currently working a shift
//   if (!currentWorkingHospitalId) {
//     return (
//       <section className="section-card patient-section">
//         <p className="info-text">
//           You are not currently assigned to a hospital for today, or your shift
//           is not active. Patient details will appear here when you have an
//           active shift.
//         </p>
//       </section>
//     );
//   }

//   // Render the patient list
//   return (
//     <section className="section-card patient-section" aria-live="polite">
//       <div className="section-header">
//         <h2>
//           <FaUserInjured aria-hidden="true" /> Patient Records
//         </h2>
//         {currentWorkingHospitalId && (
//           <p className="current-hospital-info">
//             Displaying patients for Hospital ID:{" "}
//             <strong>{currentWorkingHospitalId}</strong>
//           </p>
//         )}
//       </div>

//       {patients.length === 0 ? (
//         <p className="info-text">
//           No patients are assigned to your current hospital shift.
//         </p>
//       ) : (
//         <div className="patients-list" role="list">
//           {patients.map((patient) => (
//             <article
//               key={patient._id || patient.id}
//               className="patient-card"
//               role="listitem"
//               tabIndex={0}
//               aria-label={`${patient.firstName} ${patient.lastName} patient card`}
//             >
//               <div className="patient-header">
//                 <strong>
//                   {patient.firstName} {patient.lastName}
//                 </strong>
//                 <button
//                   className="edit-records-btn"
//                   aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
//                   onClick={() => openEditModal(patient)}
//                 >
//                   <FaEdit /> Edit
//                 </button>
//               </div>

//               <div className="patient-info-row">
//                 <FaHospital /> <span>Hospital ID: {patient.hospitalId}</span>
//               </div>
//               {patient.age && (
//                 <div className="patient-info-row">
//                   <FaUserInjured /> <span>Age: {patient.age}</span>
//                 </div>
//               )}
//               {patient.diagnosis && (
//                 <div className="patient-info-row">
//                   <FaStethoscope /> <span>Diagnosis: {patient.diagnosis}</span>
//                 </div>
//               )}
//               <div className="patient-info-row">
//                 <FaCalendarAlt />{" "}
//                 <span>
//                   Admit Date: {new Date(patient.admitDate).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="patient-info-row">
//                 <FaCalendarAlt />{" "}
//                 <span>
//                   Expected Discharge:{" "}
//                   {new Date(patient.expectedDischargeDate).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="patient-records">
//                 <p
//                   className="record-display"
//                   aria-label="Primary medical reason"
//                 >
//                   {patient.medicalInformation?.primaryReason ||
//                     "No primary medical reason provided."}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {isModalOpen && modalPatient && (
//         <EditPatientModal
//           patient={modalPatient}
//           nurseId={nurseId}
//           onClose={closeModal}
//           onSave={savePatientRecord}
//         />
//       )}
//     </section>
//   );
// };

// export default PatientsSection;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   FaUserInjured,
//   FaEdit,
//   FaHospital,
//   FaCalendarAlt,
//   FaStethoscope,
//   FaSyncAlt,
// } from "react-icons/fa";
// import axios from "axios";
// import EditPatientModal from "./EditPatientModal";
// import "./PatientsSection.css";

// const PatientsSection = ({ nurseId }) => {
//   const [nurseDetails, setNurseDetails] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPatient, setModalPatient] = useState(null);
//   const [currentWorkingHospitalId, setCurrentWorkingHospitalId] =
//     useState(null);

//   // Helper function to format time (unchanged)
//   const formatTime = (timeString) => {
//     if (!timeString) return "";
//     const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });
//     return formattedDate;
//   };

//   // REVISED: Helper function to find the currently active hospital ID
//   const getCurrentHospitalId = useCallback((workSchedule) => {
//     const now = new Date();
//     // Use the stored ISO format directly for comparison
//     const activeShift = workSchedule.find((shift) => {
//       const fromDate = new Date(shift.from);
//       const toDate = new Date(shift.to);

//       // Check if the current time falls precisely within the shift's duration
//       return now >= fromDate && now <= toDate;
//     });

//     return activeShift ? activeShift.hospitalId : null;
//   }, []);

//   // Function to fetch patients for a given hospital ID
//   const fetchPatientsForHospital = useCallback(async (hospitalIdToFetch) => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalIdToFetch}`
//       );
//       if (res.status === 200 && res.data) {
//         setPatients(res.data);
//       } else {
//         setPatients([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch patients:", error);
//       setPatients([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Main useEffect to orchestrate data fetching
//   useEffect(() => {
//     const loadAllData = async () => {
//       setLoading(true);
//       try {
//         const nurseRes = await axios.get(
//           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
//         );
//         setNurseDetails(nurseRes.data);

//         const workScheduleRes = await axios.get(
//           `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
//         );
//         const fetchedWorkSchedule = workScheduleRes.data || [];

//         // Determine current working hospital ID from workSchedule
//         const activeHospitalId = getCurrentHospitalId(fetchedWorkSchedule);
//         setCurrentWorkingHospitalId(activeHospitalId);

//         // CONDITIONAL FETCHING: Only fetch patients if an active hospital is found
//         if (activeHospitalId) {
//           await fetchPatientsForHospital(activeHospitalId);
//         } else {
//           setPatients([]);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Failed to load PatientsSection data:", error);
//         setNurseDetails(null);
//         setPatients([]);
//         setCurrentWorkingHospitalId(null);
//         setLoading(false);
//       }
//     };

//     if (nurseId) {
//       loadAllData();
//     }
//   }, [nurseId, getCurrentHospitalId, fetchPatientsForHospital]);

//   // Open modal for selected patient (unchanged)
//   const openEditModal = (patient) => {
//     setModalPatient(patient);
//     setIsModalOpen(true);
//   };

//   // Close modal (unchanged)
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalPatient(null);
//   };

//   // Save updated patient from modal and refresh data (unchanged)
//   const savePatientRecord = async (updatedPatient) => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
//         updatedPatient
//       );

//       if (response.status === 200) {
//         if (currentWorkingHospitalId) {
//           await fetchPatientsForHospital(currentWorkingHospitalId);
//         }
//         alert("Patient records updated successfully!");
//       } else {
//         alert("Failed to update records. Please try again.");
//       }
//     } catch (error) {
//       console.error("Failed to update patient record", error);
//       alert("Failed to update records. Please try again.");
//     } finally {
//       setLoading(false);
//       closeModal();
//     }
//   };

//   // RENDER LOGIC (mostly unchanged, with new messaging)
//   if (loading) {
//     return (
//       <section className="section-card">
//         <p className="loading-message">
//           <FaSyncAlt className="spin" /> Checking for active shift and loading
//           patients...
//         </p>
//       </section>
//     );
//   }

//   if (!nurseDetails) {
//     return (
//       <section className="section-card">
//         <p className="error-message">
//           Unable to load nurse details. Please try again later.
//         </p>
//       </section>
//     );
//   }

//   // The key change in the render logic is this check
//   if (!currentWorkingHospitalId) {
//     return (
//       <section className="section-card patient-section">
//         <p className="info-text">
//           You are not currently assigned to a hospital for a shift. Patient
//           details will appear here when you have an active shift.
//         </p>
//       </section>
//     );
//   }

//   return (
//     <section className="section-card patient-section" aria-live="polite">
//       <div className="section-header">
//         <h2>
//           <FaUserInjured aria-hidden="true" /> Patient Records
//         </h2>
//         {currentWorkingHospitalId && (
//           <p className="current-hospital-info">
//             Displaying patients for Hospital ID:{" "}
//             <strong>{currentWorkingHospitalId}</strong>
//           </p>
//         )}
//       </div>

//       {patients.length === 0 ? (
//         <p className="info-text">
//           No patients are assigned to your current hospital shift.
//         </p>
//       ) : (
//         <div className="patients-list" role="list">
//           {patients.map((patient) => (
//             <article
//               key={patient._id || patient.id}
//               className="patient-card"
//               role="listitem"
//               tabIndex={0}
//               aria-label={`${patient.firstName} ${patient.lastName} patient card`}
//             >
//               <div className="patient-header">
//                 <strong>
//                   {patient.firstName} {patient.lastName}
//                 </strong>
//                 <button
//                   className="edit-records-btn"
//                   aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
//                   onClick={() => openEditModal(patient)}
//                 >
//                   <FaEdit /> Edit
//                 </button>
//               </div>

//               <div className="patient-info-row">
//                 <FaHospital /> <span>Hospital ID: {patient.hospitalId}</span>
//               </div>
//               {patient.age && (
//                 <div className="patient-info-row">
//                   <FaUserInjured /> <span>Age: {patient.age}</span>
//                 </div>
//               )}
//               {patient.diagnosis && (
//                 <div className="patient-info-row">
//                   <FaStethoscope /> <span>Diagnosis: {patient.diagnosis}</span>
//                 </div>
//               )}
//               <div className="patient-info-row">
//                 <FaCalendarAlt />{" "}
//                 <span>
//                   Admit Date: {new Date(patient.admitDate).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="patient-info-row">
//                 <FaCalendarAlt />{" "}
//                 <span>
//                   Expected Discharge:{" "}
//                   {new Date(patient.expectedDischargeDate).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="patient-records">
//                 <p
//                   className="record-display"
//                   aria-label="Primary medical reason"
//                 >
//                   {patient.medicalInformation?.primaryReason ||
//                     "No primary medical reason provided."}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {isModalOpen && modalPatient && (
//         <EditPatientModal
//           patient={modalPatient}
//           nurseId={nurseId}
//           onClose={closeModal}
//           onSave={savePatientRecord}
//         />
//       )}
//     </section>
//   );
// };

// export default PatientsSection;

import React, { useState, useEffect, useCallback } from "react";
import {
  FaUserInjured,
  FaEdit,
  FaHospital,
  FaCalendarAlt,
  FaStethoscope,
  FaSyncAlt,
} from "react-icons/fa";
import axios from "axios";
import EditPatientModal from "./EditPatientModal";
import "./PatientsSection.css";

const PatientsSection = ({ nurseId }) => {
  const [nurseDetails, setNurseDetails] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPatient, setModalPatient] = useState(null);
  const [currentWorkingHospitalId, setCurrentWorkingHospitalId] =
    useState(null);

  // Helper function to format time (unchanged)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const formattedDate = new Date(timeString).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formattedDate;
  };

  // REVISED: Helper function to find the currently active and accepted hospital ID
  const getCurrentHospitalId = useCallback((workSchedule) => {
    const now = new Date();
    // Find a shift that is both currently active AND has a status of 'accepted'.
    const activeShift = workSchedule.find((shift) => {
      const fromDate = new Date(shift.from);
      const toDate = new Date(shift.to);

      // Check if the current time falls within the shift's duration
      // AND if the shift's status is "accepted"
      return now >= fromDate && now <= toDate && shift.status === "accepted";
    });

    return activeShift ? activeShift.hospitalId : null;
  }, []);

  // Function to fetch patients for a given hospital ID
  const fetchPatientsForHospital = useCallback(async (hospitalIdToFetch) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalIdToFetch}`
      );
      if (res.status === 200 && res.data) {
        setPatients(res.data);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Main useEffect to orchestrate data fetching
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      try {
        const nurseRes = await axios.get(
          `http://localhost:9999/staff-service/api/nurse/${nurseId}`
        );
        setNurseDetails(nurseRes.data);

        const workScheduleRes = await axios.get(
          `http://localhost:9999/staff-service/api/nurse/getWorkSchedule/${nurseId}`
        );
        const fetchedWorkSchedule = workScheduleRes.data || [];

        // Determine current working hospital ID from workSchedule
        const activeHospitalId = getCurrentHospitalId(fetchedWorkSchedule);
        setCurrentWorkingHospitalId(activeHospitalId);

        // CONDITIONAL FETCHING: Only fetch patients if an active and accepted hospital is found
        if (activeHospitalId) {
          await fetchPatientsForHospital(activeHospitalId);
        } else {
          setPatients([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load PatientsSection data:", error);
        setNurseDetails(null);
        setPatients([]);
        setCurrentWorkingHospitalId(null);
        setLoading(false);
      }
    };

    if (nurseId) {
      loadAllData();
    }
  }, [nurseId, getCurrentHospitalId, fetchPatientsForHospital]);

  // Open modal for selected patient (unchanged)
  const openEditModal = (patient) => {
    setModalPatient(patient);
    setIsModalOpen(true);
  };

  // Close modal (unchanged)
  const closeModal = () => {
    setIsModalOpen(false);
    setModalPatient(null);
  };

  // Save updated patient from modal and refresh data (unchanged)
  const savePatientRecord = async (updatedPatient) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
        updatedPatient
      );

      if (response.status === 200) {
        if (currentWorkingHospitalId) {
          await fetchPatientsForHospital(currentWorkingHospitalId);
        }
        alert("Patient records updated successfully!");
      } else {
        alert("Failed to update records. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update patient record", error);
      alert("Failed to update records. Please try again.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  // RENDER LOGIC (mostly unchanged, with new messaging)
  if (loading) {
    return (
      <section className="section-card">
        <p className="loading-message">
          <FaSyncAlt className="spin" /> Checking for active shift and loading
          patients...
        </p>
      </section>
    );
  }

  if (!nurseDetails) {
    return (
      <section className="section-card">
        <p className="error-message">
          Unable to load nurse details. Please try again later.
        </p>
      </section>
    );
  }

  // The key change in the render logic is this check
  if (!currentWorkingHospitalId) {
    return (
      <section className="section-card patient-section">
        <p className="info-text">
          You are not currently assigned to an active, accepted shift. Patient
          details will appear here when you have one.
        </p>
      </section>
    );
  }

  return (
    <section className="section-card patient-section" aria-live="polite">
      <div className="section-header">
        <h2>
          <FaUserInjured aria-hidden="true" /> Patient Records
        </h2>
        {currentWorkingHospitalId && (
          <p className="current-hospital-info">
            Displaying patients for Hospital ID:{" "}
            <strong>{currentWorkingHospitalId}</strong>
          </p>
        )}
      </div>

      {patients.length === 0 ? (
        <p className="info-text">
          No patients are assigned to your current hospital shift.
        </p>
      ) : (
        <div className="patients-list" role="list">
          {patients.map((patient) => (
            <article
              key={patient._id || patient.id}
              className="patient-card"
              role="listitem"
              tabIndex={0}
              aria-label={`${patient.firstName} ${patient.lastName} patient card`}
            >
              <div className="patient-header">
                <strong>
                  {patient.firstName} {patient.lastName}
                </strong>
                <button
                  className="edit-records-btn"
                  aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
                  onClick={() => openEditModal(patient)}
                >
                  <FaEdit /> Edit
                </button>
              </div>

              <div className="patient-info-row">
                <FaHospital /> <span>Hospital ID: {patient.hospitalId}</span>
              </div>
              {patient.age && (
                <div className="patient-info-row">
                  <FaUserInjured /> <span>Age: {patient.age}</span>
                </div>
              )}
              {patient.diagnosis && (
                <div className="patient-info-row">
                  <FaStethoscope /> <span>Diagnosis: {patient.diagnosis}</span>
                </div>
              )}
              <div className="patient-info-row">
                <FaCalendarAlt />{" "}
                <span>
                  Admit Date: {new Date(patient.admitDate).toLocaleDateString()}
                </span>
              </div>
              <div className="patient-info-row">
                <FaCalendarAlt />{" "}
                <span>
                  Expected Discharge:{" "}
                  {new Date(patient.expectedDischargeDate).toLocaleDateString()}
                </span>
              </div>

              <div className="patient-records">
                <p
                  className="record-display"
                  aria-label="Primary medical reason"
                >
                  {patient.medicalInformation?.primaryReason ||
                    "No primary medical reason provided."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && modalPatient && (
        <EditPatientModal
          patient={modalPatient}
          nurseId={nurseId}
          onClose={closeModal}
          onSave={savePatientRecord}
        />
      )}
    </section>
  );
};

export default PatientsSection;
