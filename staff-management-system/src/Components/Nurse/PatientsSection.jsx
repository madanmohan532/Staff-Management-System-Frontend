// // // // import React, { useState, useEffect } from "react";
// // // // import { FaUserInjured, FaSave } from "react-icons/fa";
// // // // import "./NurseDashboard.css";
// // // // import axios from "axios";

// // // // const PatientsSection = ({ nurseId }) => {
// // // //   const [records, setRecords] = useState("");
// // // //   const [isWorkTime, setIsWorkTime] = useState(true); // Toggle in real project

// // // //   const handleSave = () => {
// // // //     // Save to backend...
// // // //     alert("Patient records saved!");
// // // //     setRecords("");
// // // //   };

// // // //   return (
// // // //     <section className="section-card">
// // // //       <div className="section-header">
// // // //         <h2>
// // // //           <FaUserInjured /> Patient Records
// // // //         </h2>
// // // //       </div>
// // // //       {!isWorkTime ? (
// // // //         <p>You can update patient records only in your scheduled work time.</p>
// // // //       ) : (
// // // //         <>
// // // //           <textarea
// // // //             className="patients-textarea"
// // // //             placeholder="Enter patient records..."
// // // //             value={records}
// // // //             onChange={(e) => setRecords(e.target.value)}
// // // //           />
// // // //           <button className="save-records-btn" onClick={handleSave}>
// // // //             <FaSave /> Save
// // // //           </button>
// // // //         </>
// // // //       )}
// // // //     </section>
// // // //   );
// // // // };

// // // // export default PatientsSection;

// // // import React, { useState, useEffect } from "react";
// // // import { FaUserInjured, FaSave, FaEdit } from "react-icons/fa";
// // // import axios from "axios";
// // // import "../Nurse/PatientsSection.css";

// // // const PatientsSection = ({ nurseId }) => {
// // //   const [nurseDetails, setNurseDetails] = useState(null); // includes hospitalId & workingHours
// // //   const [isWorkingNow, setIsWorkingNow] = useState(false);
// // //   const [patients, setPatients] = useState([]);
// // //   const [editingPatientId, setEditingPatientId] = useState(null);
// // //   const [patientRecordsEdit, setPatientRecordsEdit] = useState({}); // key: patientId, value: editable text
// // //   const [loading, setLoading] = useState(true);

// // //   // Helper: Check if current date/time is within any of nurse's working hours for hospital
// // //   const checkIfWorkingNow = (workingHours) => {
// // //     const now = new Date();

// // //     if (!workingHours || workingHours.length === 0) return false;

// // //     return workingHours.some((wh) => {
// // //       const workDate = new Date(wh.date);
// // //       // Check if work date matches today
// // //       if (
// // //         workDate.getFullYear() === now.getFullYear() &&
// // //         workDate.getMonth() === now.getMonth() &&
// // //         workDate.getDate() === now.getDate()
// // //       ) {
// // //         const fromTime = new Date(wh.from);
// // //         const toTime = new Date(wh.to);
// // //         // Check if current time is between from and to
// // //         return now >= fromTime && now <= toTime;
// // //       }
// // //       return false;
// // //     });
// // //   };

// // //   // Fetch nurse details and determine working status
// // //   useEffect(() => {
// // //     const fetchNurseDetails = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
// // //         );
// // //         if (res.status === 200) {
// // //           setNurseDetails(res.data);
// // //           const workingNow = checkIfWorkingNow(res.data.workingHours);
// // //           setIsWorkingNow(true);

// // //           if (workingNow && res.data.hospitalId) {
// // //             // Fetch patients assigned to this hospital related to nurse
// // //             await fetchPatients(res.data.hospitalId);
// // //           } else {
// // //             setPatients([]);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch nurse details", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     const fetchPatients = async (hospitalId) => {
// // //       try {
// // //         const res = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalId}`
// // //         );
// // //         if (res.status === 200) {
// // //           //   // Assuming backend returns array of patient objects assigned to nurse in that hospital
// // //           //   const patientsWithHospital = res.data.filter(
// // //           //     (p) => p.hospitalId === hospitalId
// // //           //   );
// // //           //   setPatients(patientsWithHospital);
// // //           //   // initialize patientRecordsEdit with existing patient notes or empty string
// // //           //   const initRecords = {};
// // //           //   patientsWithHospital.forEach((p) => {
// // //           //     initRecords[p.id] = p.records || "";
// // //           //   });
// // //           //   setPatientRecordsEdit(initRecords);
// // //           // } else {
// // //           //   setPatients([]);
// // //           console.log(res.data);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch patients", error);
// // //         setPatients([]);
// // //       }
// // //     };

// // //     fetchNurseDetails();
// // //   }, [nurseId]);

// // //   // Handle Edit click - opens textarea for that patient
// // //   const handleEditClick = (patientId) => {
// // //     setEditingPatientId(patientId);
// // //   };

// // //   // Handle textarea change for patient record
// // //   const handleRecordChange = (patientId, value) => {
// // //     setPatientRecordsEdit((prev) => ({
// // //       ...prev,
// // //       [patientId]: value,
// // //     }));
// // //   };

// // //   // Handle Save - send updated record to backend, then close edit mode
// // //   const handleSave = async (patientId) => {
// // //     try {
// // //       const updatedRecord = patientRecordsEdit[patientId];
// // //       // Example request body - adjust keys as per your Patient entity/backend API
// // //       const payload = {
// // //         id: patientId,
// // //         records: updatedRecord,
// // //       };
// // //       await axios.put(
// // //         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
// // //         payload
// // //       );

// // //       alert("Patient records saved successfully!");

// // //       // Close editing
// // //       setEditingPatientId(null);

// // //       // Optionally refetch patients to reflect latest data
// // //       // (or update patients state locally)
// // //     } catch (error) {
// // //       console.error("Failed to save patient record:", error);
// // //       alert("Failed to save records. Please try again.");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <section className="section-card">
// // //         <p>Loading patient records...</p>
// // //       </section>
// // //     );
// // //   }

// // //   if (!nurseDetails) {
// // //     return (
// // //       <section className="section-card">
// // //         <p>Unable to load nurse details. Please try again later.</p>
// // //       </section>
// // //     );
// // //   }

// // //   return (
// // //     <section className="section-card patient-section">
// // //       <div className="section-header">
// // //         <h2>
// // //           <FaUserInjured /> Patient Records
// // //         </h2>
// // //       </div>

// // //       {!isWorkingNow ? (
// // //         <p className="info-text">
// // //           You can update patient records only during your scheduled working
// // //           hours at your hospital.
// // //         </p>
// // //       ) : patients.length === 0 ? (
// // //         <p className="info-text">
// // //           No patients assigned to your hospital currently.
// // //         </p>
// // //       ) : (
// // //         <div className="patients-list">
// // //           {patients.map((patient) => (
// // //             <div key={patient.id} className="patient-card">
// // //               <div className="patient-info">
// // //                 <strong>
// // //                   {patient.firstName} {patient.lastName}
// // //                 </strong>
// // //                 <span>Hospital ID: {patient.hospitalId}</span>
// // //                 {patient.age && <span>Age: {patient.age}</span>}
// // //                 {patient.diagnosis && (
// // //                   <span>Diagnosis: {patient.diagnosis}</span>
// // //                 )}
// // //               </div>

// // //               <div className="patient-records">
// // //                 {editingPatientId === patient.id ? (
// // //                   <>
// // //                     <textarea
// // //                       className="patient-textarea"
// // //                       value={patientRecordsEdit[patient.id]}
// // //                       onChange={(e) =>
// // //                         handleRecordChange(patient.id, e.target.value)
// // //                       }
// // //                     />
// // //                     <button
// // //                       className="save-records-btn"
// // //                       onClick={() => handleSave(patient.id)}
// // //                     >
// // //                       <FaSave /> Save
// // //                     </button>
// // //                     <button
// // //                       className="cancel-edit-btn"
// // //                       onClick={() => setEditingPatientId(null)}
// // //                     >
// // //                       Cancel
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <p className="record-display">
// // //                       {patientRecordsEdit[patient.id]}
// // //                     </p>
// // //                     <button
// // //                       className="edit-records-btn"
// // //                       onClick={() => handleEditClick(patient.id)}
// // //                     >
// // //                       <FaEdit /> Edit
// // //                     </button>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default PatientsSection;

// // // import React, { useState, useEffect } from "react";
// // // import { FaUserInjured, FaSave, FaEdit, FaTimes } from "react-icons/fa";
// // // import axios from "axios";
// // // import "../Nurse/PatientsSection.css";

// // // const Modal = ({ children, onClose }) => {
// // //   // Simple modal using fixed position and backdrop
// // //   return (
// // //     <>
// // //       <div className="modal-overlay" onClick={onClose} />
// // //       <div className="modal-content">
// // //         <button className="modal-close-btn" onClick={onClose}>
// // //           <FaTimes />
// // //         </button>
// // //         {children}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // const PatientsSection = ({ nurseId }) => {
// // //   const [nurseDetails, setNurseDetails] = useState(null);
// // //   const [isWorkingNow, setIsWorkingNow] = useState(false);
// // //   const [patients, setPatients] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const [isModalOpen, setIsModalOpen] = useState(false);
// // //   const [modalPatient, setModalPatient] = useState(null); // patient object in modal
// // //   const [editRecords, setEditRecords] = useState("");

// // //   const checkIfWorkingNow = (workingHours) => {
// // //     // const now = new Date();
// // //     // if (!workingHours || workingHours.length === 0) return false;
// // //     // return workingHours.some((wh) => {
// // //     //   const workDate = new Date(wh.date);
// // //     //   if (
// // //     //     workDate.getFullYear() === now.getFullYear() &&
// // //     //     workDate.getMonth() === now.getMonth() &&
// // //     //     workDate.getDate() === now.getDate()
// // //     //   ) {
// // //     //     const fromTime = new Date(wh.from);
// // //     //     const toTime = new Date(wh.to);
// // //     //     return now >= fromTime && now <= toTime;
// // //     //   }
// // //     //   return false;
// // //     // });
// // //     return true;
// // //   };

// // //   useEffect(() => {
// // //     const fetchNurseDetails = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/${nurseId}`
// // //         );
// // //         if (res.status === 200) {
// // //           setNurseDetails(res.data);
// // //           const workingNow = checkIfWorkingNow(res.data.workingHours);
// // //           setIsWorkingNow(workingNow);
// // //           if (workingNow && res.data.hospitalId) {
// // //             await fetchPatients(res.data.hospitalId);
// // //             console.log(res.data.hospitalId);
// // //           } else {
// // //             setPatients([]);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch nurse details", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     const fetchPatients = async (hospitalId) => {
// // //       try {
// // //         const res = await axios.get(
// // //           `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalId}`
// // //         );
// // //         if (res.status === 200) {
// // //           setPatients(res.data);
// // //         } else {
// // //           setPatients([]);
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch patients", error);
// // //         setPatients([]);
// // //       }
// // //     };

// // //     fetchNurseDetails();
// // //   }, []);

// // //   // Open modal and initialize records
// // //   const openEditModal = (patient) => {
// // //     setModalPatient(patient);
// // //     setEditRecords(patient.medicalInformation?.primaryReason || "");
// // //     setIsModalOpen(true);
// // //   };

// // //   // Close modal
// // //   const closeModal = () => {
// // //     setIsModalOpen(false);
// // //     setModalPatient(null);
// // //     setEditRecords("");
// // //   };

// // //   // Save updated patient record
// // //   const savePatientRecord = async () => {
// // //     if (!modalPatient) return;
// // //     try {
// // //       // Prepare payload; extend this object with other editable fields as needed
// // //       const updatedPatient = {
// // //         ...modalPatient,
// // //         medicalInformation: {
// // //           ...modalPatient.medicalInformation,
// // //           primaryReason: editRecords,
// // //         },
// // //       };
// // //       await axios.put(
// // //         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
// // //         updatedPatient
// // //       );

// // //       // Update patients list locally for immediate UI update
// // //       setPatients((prev) =>
// // //         prev.map((p) => (p.id === modalPatient.id ? updatedPatient : p))
// // //       );

// // //       alert("Patient records updated successfully!");
// // //       closeModal();
// // //     } catch (error) {
// // //       console.error("Failed to update patient record", error);
// // //       alert("Failed to update records. Please try again.");
// // //     }
// // //   };

// // //   if (loading)
// // //     return (
// // //       <section className="section-card">
// // //         <p>Loading patient records...</p>
// // //       </section>
// // //     );

// // //   if (!nurseDetails)
// // //     return (
// // //       <section className="section-card">
// // //         <p>Unable to load nurse details.</p>
// // //       </section>
// // //     );

// // //   return (
// // //     <section className="section-card patient-section">
// // //       <div className="section-header">
// // //         <h2>
// // //           <FaUserInjured /> Patient Records
// // //         </h2>
// // //       </div>

// // //       {!isWorkingNow ? (
// // //         <p className="info-text">
// // //           You can update patient records only during your scheduled working
// // //           hours at your hospital.
// // //         </p>
// // //       ) : patients.length === 0 ? (
// // //         <p className="info-text">
// // //           No patients assigned to your hospital currently.
// // //         </p>
// // //       ) : (
// // //         <div className="patients-list">
// // //           {patients.map((patient) => (
// // //             <div key={patient.id} className="patient-card">
// // //               <div className="patient-info">
// // //                 <strong>
// // //                   {patient.firstName} {patient.lastName}
// // //                 </strong>
// // //                 <span>Hospital ID: {patient.hospitalId}</span>
// // //                 {patient.age && <span>Age: {patient.age}</span>}
// // //                 {patient.diagnosis && (
// // //                   <span>Diagnosis: {patient.diagnosis}</span>
// // //                 )}
// // //               </div>

// // //               <div className="patient-records">
// // //                 <p className="record-display">
// // //                   {patient.medicalInformation?.primaryReason ||
// // //                     "No records yet."}
// // //                 </p>
// // //                 <button
// // //                   className="edit-records-btn"
// // //                   onClick={() => openEditModal(patient)}
// // //                 >
// // //                   <FaEdit /> Edit
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {isModalOpen && (
// // //         <Modal onClose={closeModal}>
// // //           <h3>Update Patient Record</h3>
// // //           <p>
// // //             <strong>
// // //               {modalPatient.firstName} {modalPatient.lastName}
// // //             </strong>
// // //           </p>
// // //           <textarea
// // //             className="patient-textarea"
// // //             rows={6}
// // //             value={editRecords}
// // //             onChange={(e) => setEditRecords(e.target.value)}
// // //           />
// // //           <div className="modal-buttons">
// // //             <button className="save-records-btn" onClick={savePatientRecord}>
// // //               <FaSave /> Update
// // //             </button>
// // //             <button className="cancel-edit-btn" onClick={closeModal}>
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </Modal>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default PatientsSection;

// // import React, { useState, useEffect } from "react";
// // import { FaUserInjured, FaSave, FaEdit, FaTimes } from "react-icons/fa";
// // import axios from "axios";
// // import "./PatientsSection.css"; // Make sure this path matches your project structure

// // const Modal = ({ children, onClose }) => {
// //   return (
// //     <>
// //       <div className="modal-overlay" onClick={onClose} />
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <button
// //           className="modal-close-btn"
// //           onClick={onClose}
// //           aria-label="Close modal"
// //         >
// //           <FaTimes />
// //         </button>
// //         {children}
// //       </div>
// //     </>
// //   );
// // };

// // const PatientsSection = ({ nurseId }) => {
// //   const [nurseDetails, setNurseDetails] = useState(null);
// //   const [patients, setPatients] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [loggedInUser, setLoggedInUser] = useState({});

// //   // Modal and edit states
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [modalPatient, setModalPatient] = useState(null);
// //   const [editRecords, setEditRecords] = useState("");

// //   const fetchNurseDetails = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(
// //         `http://localhost:9999/staff-service/api/nurse/${nurseId}`
// //       );
// //       if (res.status === 200) {
// //         setNurseDetails(res.data);
// //         console.log(res.data);
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch nurse details", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNurseDetails();
// //   }, [nurseId]);

// //   useEffect(() => {
// //     axios
// //       .get(
// //         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/hosp001`
// //       )
// //       .then((res) => {
// //         console.log(res.data);

// //         setPatients(res.data);
// //       })
// //       .catch((err) => console.log(err));
// //   }, [nurseDetails]);

// //   const openEditModal = (patient) => {
// //     setModalPatient(patient);
// //     setEditRecords(patient.medicalInformation?.primaryReason || "");
// //     setIsModalOpen(true);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setModalPatient(null);
// //     setEditRecords("");
// //   };

// //   const savePatientRecord = async () => {
// //     if (!modalPatient) return;
// //     try {
// //       const updatedPatient = {
// //         ...modalPatient,
// //         medicalInformation: {
// //           ...modalPatient.medicalInformation,
// //           primaryReason: editRecords.trim(),
// //         },
// //       };

// //       await axios.put(
// //         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
// //         updatedPatient
// //       );

// //       setPatients((prev) =>
// //         prev.map((p) => (p.id === modalPatient.id ? updatedPatient : p))
// //       );

// //       alert("Patient records updated successfully!");
// //       closeModal();
// //     } catch (error) {
// //       console.error("Failed to update patient record", error);
// //       alert("Failed to update records. Please try again.");
// //     }
// //   };

// //   if (loading)
// //     return (
// //       <section className="section-card">
// //         <p>Loading patient records...</p>
// //       </section>
// //     );

// //   if (!nurseDetails)
// //     return (
// //       <section className="section-card">
// //         <p>Unable to load nurse details.</p>
// //       </section>
// //     );

// //   return (
// //     <section className="section-card patient-section" aria-live="polite">
// //       <div className="section-header">
// //         <h2>
// //           <FaUserInjured aria-hidden="true" /> Patient Records
// //         </h2>
// //       </div>

// //       {patients.length === 0 ? (
// //         <p className="info-text">
// //           No patients assigned to your hospital currently.
// //         </p>
// //       ) : (
// //         <div className="patients-list" role="list">
// //           {patients.map((patient) => (
// //             <article
// //               key={patient.id}
// //               className="patient-card"
// //               role="listitem"
// //               tabIndex={0}
// //               aria-label={`${patient.firstName} ${patient.lastName} patient card`}
// //             >
// //               <div className="patient-info">
// //                 <strong>
// //                   {patient.firstName} {patient.lastName}
// //                 </strong>
// //                 <span>Hospital ID: {patient.hospitalId}</span>
// //                 {patient.age && <span>Age: {patient.age}</span>}
// //                 {patient.diagnosis && (
// //                   <span>Diagnosis: {patient.diagnosis}</span>
// //                 )}
// //               </div>

// //               <div className="patient-records">
// //                 <p
// //                   className="record-display"
// //                   aria-label="Primary medical reason"
// //                 >
// //                   {patient.medicalInformation?.primaryReason ||
// //                     "No records yet."}
// //                 </p>
// //                 <button
// //                   className="edit-records-btn"
// //                   aria-label={`Edit records for ${patient.firstName} ${patient.lastName}`}
// //                   onClick={() => openEditModal(patient)}
// //                 >
// //                   <FaEdit /> Edit
// //                 </button>
// //               </div>
// //             </article>
// //           ))}
// //         </div>
// //       )}

// //       {isModalOpen && (
// //         <Modal onClose={closeModal}>
// //           <h3>Update Patient Record</h3>
// //           <p>
// //             <strong>
// //               {modalPatient.firstName} {modalPatient.lastName}
// //             </strong>
// //           </p>
// //           <textarea
// //             className="patient-textarea"
// //             rows={6}
// //             aria-label="Edit primary medical reason"
// //             value={editRecords}
// //             onChange={(e) => setEditRecords(e.target.value)}
// //             autoFocus
// //           />
// //           <div className="modal-buttons">
// //             <button
// //               className="save-records-btn"
// //               onClick={savePatientRecord}
// //               disabled={editRecords.trim() === ""}
// //             >
// //               <FaSave /> Update
// //             </button>
// //             <button className="cancel-edit-btn" onClick={closeModal}>
// //               Cancel
// //             </button>
// //           </div>
// //         </Modal>
// //       )}
// //     </section>
// //   );
// // };

// // export default PatientsSection;

// import React, { useState, useEffect } from "react";
// import EditPatientModal from "./EditPatientModal";
// import {
//   FaUserInjured,
//   FaSave,
//   FaEdit,
//   FaTimes,
//   FaHospital,
//   FaCalendarAlt,
//   FaStethoscope,
// } from "react-icons/fa";
// import axios from "axios";
// import "./PatientsSection.css";

// const PatientsSection = ({ nurseId }) => {
//   const [nurseDetails, setNurseDetails] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPatient, setModalPatient] = useState(null);
//   const [editRecords, setEditRecords] = useState("");

//   // useEffect(() => {
//   //   const fetchNurseDetails = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const res = await axios.get(
//   //         `http://localhost:9999/staff-service/api/nurse/${nurseId}`
//   //       );
//   //       if (res.status === 200) {
//   //         setNurseDetails(res.data);
//   //         if (res.data.hospitalId) {
//   //           await fetchPatients(res.data.hospitalId);
//   //         } else {
//   //           setPatients([]);
//   //         }
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch nurse details", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   const fetchPatients = async (hospitalId) => {
//   //     try {
//   //       const res = await axios.get(
//   //         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/hosp001`
//   //       );
//   //       if (res.status === 200) {
//   //         setPatients(res.data);
//   //       } else {
//   //         setPatients([]);
//   //       }
//   //     } catch (error) {
//   //       console.error("Failed to fetch patients", error);
//   //       setPatients([]);
//   //     }
//   //   };

//   //   fetchNurseDetails();
//   // }, [nurseId]);

//   const fetchNurseDetails = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:9999/staff-service/api/nurse/${nurseId}`
//       );
//       if (res.status === 200) {
//         setNurseDetails(res.data);
//         console.log(res.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch nurse details", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNurseDetails();
//   }, [nurseId]);

//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/hosp001`
//       )
//       .then((res) => {
//         console.log(res.data);

//         setPatients(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [nurseDetails]);

//   const openEditModal = (patient) => {
//     setModalPatient(patient);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setModalPatient(null);
//   };

//   const savePatientRecord = async (updatedPatient) => {
//     try {
//       await axios.put(
//         `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
//         updatedPatient
//       );
//       setPatients((prev) =>
//         prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
//       );
//       alert("Patient records updated successfully!");
//       closeModal();
//     } catch (error) {
//       console.error("Failed to update patient record", error);
//       alert("Failed to update records. Please try again.");
//     }
//   };

//   if (loading)
//     return (
//       <section className="section-card">
//         <p>Loading patient records...</p>
//       </section>
//     );
//   if (!nurseDetails)
//     return (
//       <section className="section-card">
//         <p>Unable to load nurse details.</p>
//       </section>
//     );

//   return (
//     <section className="section-card patient-section" aria-live="polite">
//       <div className="section-header">
//         <h2>
//           <FaUserInjured aria-hidden="true" /> Patient Records
//         </h2>
//       </div>

//       {patients.length === 0 ? (
//         <p className="info-text">
//           No patients assigned to your hospital currently.
//         </p>
//       ) : (
//         <div className="patients-list" role="list">
//           {patients.map((patient) => (
//             <article
//               key={patient.id}
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
//                 <FaCalendarAlt /> <span>Admit Date: {patient.admitDate}</span>
//               </div>
//               <div className="patient-info-row">
//                 <FaCalendarAlt />{" "}
//                 <span>Expected Discharge: {patient.expectedDischargeDate}</span>
//               </div>

//               <div className="patient-records">
//                 <p
//                   className="record-display"
//                   aria-label="Primary medical reason"
//                 >
//                   {patient.medicalInformation?.primaryReason ||
//                     "No records yet."}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       )}

//       {isModalOpen && (
//         <EditPatientModal onClose={closeModal}>
//           <h3>Update Patient Record</h3>
//           <p>
//             <strong>
//               {modalPatient.firstName} {modalPatient.lastName}
//             </strong>
//           </p>
//           <textarea
//             className="patient-textarea"
//             rows={6}
//             aria-label="Edit primary medical reason"
//             value={editRecords}
//             onChange={(e) => setEditRecords(e.target.value)}
//             autoFocus
//           />
//           <div className="modal-buttons">
//             <button
//               className="save-records-btn"
//               onClick={savePatientRecord}
//               disabled={editRecords.trim() === ""}
//             >
//               <FaSave /> Update
//             </button>
//             <button className="cancel-edit-btn" onClick={closeModal}>
//               Cancel
//             </button>
//           </div>
//         </EditPatientModal>
//       )}
//     </section>
//   );
// };

// export default PatientsSection;

import React, { useState, useEffect } from "react";
import {
  FaUserInjured,
  FaEdit,
  FaHospital,
  FaCalendarAlt,
  FaStethoscope,
} from "react-icons/fa";
import axios from "axios";
import EditPatientModal from "./EditPatientModal";
import "./PatientsSection.css";

const PatientsSection = ({ nurseId, hospitalId }) => {
  const [nurseDetails, setNurseDetails] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPatient, setModalPatient] = useState(null);

  // Fetch nurse & patients on mount or whenever nurseId changes
  // useEffect(() => {
  //   const fetchNurseDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         `http://localhost:9999/staff-service/api/nurse/${nurseId}`
  //       );
  //       if (res.status === 200) {
  //         setNurseDetails(res.data);
  //         if (res.data.hospitalId) {
  //           await fetchPatients(res.data.hospitalId);
  //         } else {
  //           setPatients([]);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch nurse details", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const fetchPatients = async (hospitalId) => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/hosp001`
  //       );
  //       if (res.status === 200) {
  //         setPatients(res.data);
  //       } else {
  //         setPatients([]);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch patients", error);
  //       setPatients([]);
  //     }
  //   };

  //   fetchNurseDetails();
  // }, [nurseId]);

  const fetchNurseDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:9999/staff-service/api/nurse/${nurseId}`
      );
      if (res.status === 200) {
        setNurseDetails(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch nurse details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurseDetails();
  }, [nurseId]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:9999/staff-service/api/nurse/getPatientDetailsByHospitalId/${hospitalId}`
      )
      .then((res) => {
        console.log(res.data);

        setPatients(res.data);
      })
      .catch((err) => console.log(err));
  }, [nurseDetails]);

  // Open modal for selected patient
  const openEditModal = (patient) => {
    setModalPatient(patient);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalPatient(null);
  };

  // Save updated patient from modal
  const savePatientRecord = async (updatedPatient) => {
    try {
      await axios.put(
        `http://localhost:9999/staff-service/api/nurse/updatePatientDetails`,
        updatedPatient
      );

      setPatients((prev) =>
        prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
      );

      alert("Patient records updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Failed to update patient record", error);
      alert("Failed to update records. Please try again.");
    }
  };

  if (loading)
    return (
      <section className="section-card">
        <p>Loading patient records...</p>
      </section>
    );

  if (!nurseDetails)
    return (
      <section className="section-card">
        <p>Unable to load nurse details.</p>
      </section>
    );

  const handleUpdatedPatient = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    alert("Patient records updated successfully!");
    closeModal();
  };

  return (
    <section className="section-card patient-section" aria-live="polite">
      <div className="section-header">
        <h2>
          <FaUserInjured aria-hidden="true" /> Patient Records
        </h2>
      </div>

      {patients.length === 0 ? (
        <p className="info-text">
          No patients assigned to your hospital currently.
        </p>
      ) : (
        <div className="patients-list" role="list">
          {patients.map((patient) => (
            <article
              key={patient.id}
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
                <FaCalendarAlt /> <span>Admit Date: {patient.admitDate}</span>
              </div>
              <div className="patient-info-row">
                <FaCalendarAlt />{" "}
                <span>Expected Discharge: {patient.expectedDischargeDate}</span>
              </div>

              <div className="patient-records">
                <p
                  className="record-display"
                  aria-label="Primary medical reason"
                >
                  {patient.medicalInformation?.primaryReason ||
                    "No records yet."}
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
          onSave={handleUpdatedPatient}
        />
      )}
    </section>
  );
};

export default PatientsSection;
