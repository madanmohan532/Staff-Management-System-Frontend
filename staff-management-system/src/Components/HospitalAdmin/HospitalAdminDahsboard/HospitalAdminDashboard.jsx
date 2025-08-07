// // // // // import axios from "axios";
// // // // // import React, { useEffect, useState } from "react";
// // // // // import { FaCalendarAlt, FaHospital, FaUserNurse } from "react-icons/fa";
// // // // // import { MdAppRegistration } from "react-icons/md";

// // // // // const HospitalAdminDashboard = () => {
// // // // //   const [loggedInUser, setLoggedInUser] = useState({});
// // // // //   const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

// // // // //   const fetchLoggedInUser = async () => {
// // // // //     await axios
// // // // //       .get(
// // // // //         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
// // // // //       )
// // // // //       .then((response) => {
// // // // //         if (response.status === 200) {
// // // // //           setLoggedInUser(response.data);
// // // // //         } else {
// // // // //           console.log("No user found");
// // // // //         }
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error("Error fetching user:", error);
// // // // //       });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchLoggedInUser();
// // // // //   }, []);
// // // // import React, { useState, useEffect } from "react";
// // // // import DashboardHeader from "./DashboardHeader";
// // // // import StatsCards from "../HospitalAdminDahsboard/StatsCard";
// // // // import DetailsPanel from "./DetailsPanel";
// // // // import "../HospitalAdminDahsboard/HospitalAdminDashboard.css";
// // // // import axios from "axios";

// // // // const HospitalAdminDashboard = () => {
// // // //   const [activeTab, setActiveTab] = useState(null);

// // // //   const [loggedInUser, setLoggedInUser] = useState({});
// // // //   const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
// // // //   const [workingNurses, setWorkingNurses] = useState([]);
// // // //   const [nurses, setNurses] = useState([]);
// // // //   const [requested, setRequested] = useState([]);
// // // //   const [accepted, setAccpeted] = useState([]);

// // // //   const fetchLoggedInUser = async () => {
// // // //     await axios
// // // //       .get(
// // // //         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
// // // //       )
// // // //       .then((response) => {
// // // //         if (response.status === 200) {
// // // //           setLoggedInUser(response.data);
// // // //         } else {
// // // //           console.log("No user found");
// // // //         }
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error("Error fetching user:", error);
// // // //       });
// // // //   };

// // // //   const fetchHospitalNurses = async () => {
// // // //     await axios
// // // //       .get(
// // // //         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
// // // //       )
// // // //       .then((response) => {
// // // //         if (response.status === 200) {
// // // //           setNurses(response.data);
// // // //           console.log(response);
// // // //         } else {
// // // //           console.log("no users found");
// // // //         }
// // // //       })
// // // //       .catch((error) => console.log(error));
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchLoggedInUser();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     console.log(loggedInUser);

// // // //     fetchHospitalNurses();
// // // //     setWorkingNurses(
// // // //       nurses.filter((nurse) => {
// // // //         return nurse.workingStatus;
// // // //       })
// // // //     );
// // // //     setRequested(
// // // //       nurses.filter((nurse) => {
// // // //         return nurse.staffRequestStatus === "requested";
// // // //       })
// // // //     );
// // // //     setAccpeted(
// // // //       nurses.filter((nurse) => {
// // // //         return nurse.staffRequestStatus === "accepted";
// // // //       })
// // // //     );
// // // //     console.log(loggedInUser);
// // // //   }, []);

// // // //   const [detailsData, setDetailsData] = useState({
// // // //     requested: [],
// // // //     accepted: [],
// // // //     acknowledged: [],
// // // //   });

// // // //   const handleCardClick = (tab) => {
// // // //     setActiveTab(activeTab === tab ? null : tab);
// // // //   };

// // // //   const handleCancelRequest = (id) => {
// // // //     // Update state to remove the canceled request
// // // //     setDetailsData((prev) => ({
// // // //       ...prev,
// // // //       requested: prev.requested.filter((nurse) => nurse.id !== id),
// // // //     }));
// // // //     setNurseData((prev) => ({ ...prev, requested: prev.requested - 1 }));
// // // //   };

// // // //   const handleAcceptNurse = (id) => {
// // // //     // Move nurse from accepted to acknowledged
// // // //     const nurseToAcknowledge = detailsData.accepted.find(
// // // //       (nurse) => nurse.id === id
// // // //     );
// // // //     if (nurseToAcknowledge) {
// // // //       setDetailsData((prev) => ({
// // // //         ...prev,
// // // //         accepted: prev.accepted.filter((nurse) => nurse.id !== id),
// // // //         acknowledged: [
// // // //           ...prev.acknowledged,
// // // //           {
// // // //             ...nurseToAcknowledge,
// // // //             acknowledgedDate: new Date().toISOString().split("T")[0],
// // // //           },
// // // //         ],
// // // //       }));
// // // //       setNurseData((prev) => ({
// // // //         ...prev,
// // // //         accepted: prev.accepted - 1,
// // // //         acknowledged: prev.acknowledged + 1,
// // // //       }));
// // // //     }
// // // //   };

// // // //   const handleAssignNurse = (id, floor) => {
// // // //     // Move nurse from acknowledged to working staff
// // // //     const nurseToAssign = detailsData.acknowledged.find(
// // // //       (nurse) => nurse.id === id
// // // //     );
// // // //     if (nurseToAssign) {
// // // //       setDetailsData((prev) => ({
// // // //         ...prev,
// // // //         acknowledged: prev.acknowledged.filter((nurse) => nurse.id !== id),
// // // //       }));
// // // //       setNurseData((prev) => ({
// // // //         ...prev,
// // // //         acknowledged: prev.acknowledged - 1,
// // // //         working: prev.working + 1,
// // // //       }));
// // // //       // In a real app, you would update the nurse's record with the assigned floor
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="hospital-dashboard">
// // // //       <DashboardHeader />
// // // //       <StatsCards
// // // //         workingNurses={workingNurses}
// // // //         requestedNurses={requested}
// // // //         acceptedNurses={accepted}
// // // //         activeTab={activeTab}
// // // //         onCardClick={handleCardClick}
// // // //       />
// // // //       <DetailsPanel
// // // //         activeTab={activeTab}
// // // //         data={detailsData}
// // // //         onCancelRequest={handleCancelRequest}
// // // //         onAcceptNurse={handleAcceptNurse}
// // // //         onAssignNurse={handleAssignNurse}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HospitalAdminDashboard;

// // // // import React, { useState, useEffect } from "react";
// // // // import DashboardHeader from "./DashboardHeader";
// // // // import StatsCards from "../HospitalAdminDahsboard/StatsCard";
// // // // import DetailsPanel from "./DetailsPanel";
// // // // import "../HospitalAdminDahsboard/HospitalAdminDashboard.css";
// // // // import axios from "axios";

// // // // const HospitalAdminDashboard = () => {
// // // //   const [activeTab, setActiveTab] = useState(null);
// // // //   const [loggedInUser, setLoggedInUser] = useState({});
// // // //   const [userEmail, setUserEmail] = useState(
// // // //     localStorage.getItem("userEmail") || ""
// // // //   );
// // // //   const [workingNurses, setWorkingNurses] = useState([]);
// // // //   const [nurses, setNurses] = useState([]);
// // // //   const [requested, setRequested] = useState([]);
// // // //   const [accepted, setAccepted] = useState([]);

// // // //   // Fetch logged in hospital user by email
// // // //   const fetchLoggedInUser = async () => {
// // // //     try {
// // // //       const response = await axios.get(
// // // //         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
// // // //       );
// // // //       if (response.status === 200) {
// // // //         setLoggedInUser(response.data);
// // // //       } else {
// // // //         console.log("No user found");
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching user:", error);
// // // //     }
// // // //   };

// // // //   // Fetch nurses for logged in hospital by hospitalId
// // // //   const fetchHospitalNurses = async () => {
// // // //     if (!loggedInUser._id) return; // Guard clause: ensure _id is present

// // // //     try {
// // // //       const response = await axios.get(
// // // //         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
// // // //       );
// // // //       if (response.status === 200) {
// // // //         setNurses(response.data);
// // // //       } else {
// // // //         console.log("No nurses found");
// // // //         setNurses([]); // Clear nurses if no data returned
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching nurses:", error);
// // // //       setNurses([]);
// // // //     }
// // // //   };

// // // //   // Fetch logged in user on initial mount
// // // //   useEffect(() => {
// // // //     if (userEmail) {
// // // //       fetchLoggedInUser();
// // // //     } else {
// // // //       console.warn("User email not found in localStorage.");
// // // //     }
// // // //   }, [userEmail]);

// // // //   // Fetch nurses whenever loggedInUser._id changes (after user fetched)
// // // //   useEffect(() => {
// // // //     if (loggedInUser?._id) {
// // // //       fetchHospitalNurses();
// // // //     }
// // // //   }, [loggedInUser]);

// // // //   // Update filtered nurse groups anytime nurses change
// // // //   useEffect(() => {
// // // //     setWorkingNurses(nurses.filter((nurse) => nurse.workingStatus === true));
// // // //     setRequested(
// // // //       nurses.filter((nurse) => nurse.staffRequestStatus === "requested")
// // // //     );
// // // //     setAccepted(
// // // //       nurses.filter((nurse) => nurse.staffRequestStatus === "accepted")
// // // //     );
// // // //   }, [nurses]);

// // // //   // Detail data for panels
// // // //   const [detailsData, setDetailsData] = useState({
// // // //     requested: [],
// // // //     accepted: [],
// // // //     acknowledged: [],
// // // //   });

// // // //   // Keep detailsData in sync with updated filtered nurses
// // // //   useEffect(() => {
// // // //     setDetailsData({
// // // //       requested,
// // // //       accepted,
// // // //       acknowledged: detailsData.acknowledged || [],
// // // //     });
// // // //   }, [requested, accepted]);

// // // //   const handleCardClick = (tab) => {
// // // //     setActiveTab(activeTab === tab ? null : tab);
// // // //   };

// // // //   const handleCancelRequest = (id) => {
// // // //     setDetailsData((prev) => ({
// // // //       ...prev,
// // // //       requested: prev.requested.filter((nurse) => nurse.id !== id),
// // // //     }));
// // // //     // If you have a nurse count state, update here accordingly
// // // //   };

// // // //   const handleAcceptNurse = (id) => {
// // // //     const nurseToAcknowledge = detailsData.accepted.find(
// // // //       (nurse) => nurse.id === id
// // // //     );
// // // //     if (nurseToAcknowledge) {
// // // //       setDetailsData((prev) => ({
// // // //         ...prev,
// // // //         accepted: prev.accepted.filter((nurse) => nurse.id !== id),
// // // //         acknowledged: [
// // // //           ...prev.acknowledged,
// // // //           {
// // // //             ...nurseToAcknowledge,
// // // //             acknowledgedDate: new Date().toISOString().split("T")[0],
// // // //           },
// // // //         ],
// // // //       }));
// // // //       // Update nurse counts if needed here
// // // //     }
// // // //   };

// // // //   const handleAssignNurse = (id, floor) => {
// // // //     const nurseToAssign = detailsData.acknowledged.find(
// // // //       (nurse) => nurse.id === id
// // // //     );
// // // //     if (nurseToAssign) {
// // // //       setDetailsData((prev) => ({
// // // //         ...prev,
// // // //         acknowledged: prev.acknowledged.filter((nurse) => nurse.id !== id),
// // // //       }));
// // // //       // Update nurse counts if needed here
// // // //       // Implement logic to assign nurse to floor in your backend
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="hospital-dashboard">
// // // //       <DashboardHeader />
// // // //       <StatsCards
// // // //         workingNurses={workingNurses}
// // // //         requestedNurses={requested}
// // // //         acceptedNurses={accepted}
// // // //         activeTab={activeTab}
// // // //         onCardClick={handleCardClick}
// // // //       />
// // // //       <DetailsPanel
// // // //         activeTab={activeTab}
// // // //         data={detailsData}
// // // //         onCancelRequest={handleCancelRequest}
// // // //         onAcceptNurse={handleAcceptNurse}
// // // //         onAssignNurse={handleAssignNurse}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HospitalAdminDashboard;

// // // import React, { useState, useEffect } from "react";
// // // import DashboardHeader from "./DashboardHeader";
// // // import StatsCards from "../HospitalAdminDahsboard/StatsCard";
// // // import DetailsPanel from "./DetailsPanel";
// // // import "../HospitalAdminDahsboard/HospitalAdminDashboard.css";
// // // import axios from "axios";

// // // const HospitalAdminDashboard = () => {
// // //   const [activeTab, setActiveTab] = useState(null);
// // //   const [loggedInUser, setLoggedInUser] = useState({});
// // //   const [userEmail, setUserEmail] = useState(
// // //     localStorage.getItem("userEmail") || ""
// // //   );
// // //   const [nurses, setNurses] = useState([]);
// // //   const [workingNurses, setWorkingNurses] = useState([]);
// // //   const [requestedNurses, setRequestedNurses] = useState([]);
// // //   const [acceptedNurses, setAcceptedNurses] = useState([]);

// // //   // Fetch logged-in hospital user by email
// // //   const fetchLoggedInUser = async () => {
// // //     try {
// // //       const response = await axios.get(
// // //         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
// // //       );
// // //       if (response.status === 200) {
// // //         setLoggedInUser(response.data);
// // //       } else {
// // //         console.log("No user found");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching user:", error);
// // //     }
// // //   };

// // //   // Fetch nurses for logged-in hospital by hospitalId
// // //   const fetchHospitalNurses = async () => {
// // //     if (!loggedInUser._id) return; // Ensure _id is present

// // //     try {
// // //       const response = await axios.get(
// // //         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
// // //       );
// // //       if (response.status === 200) {
// // //         setNurses(response.data);
// // //       } else {
// // //         console.log("No nurses found");
// // //         setNurses([]);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching nurses:", error);
// // //       setNurses([]);
// // //     }
// // //   };

// // //   // Initial fetch of logged-in user
// // //   useEffect(() => {
// // //     if (userEmail) {
// // //       fetchLoggedInUser();
// // //     } else {
// // //       console.warn("User email not found in localStorage.");
// // //     }
// // //   }, [userEmail]);

// // //   // Fetch nurses when loggedInUser._id is available
// // //   useEffect(() => {
// // //     if (loggedInUser._id) {
// // //       fetchHospitalNurses();
// // //     }
// // //   }, [loggedInUser]);

// // //   // Filter nurses into groups whenever nurses list changes
// // //   useEffect(() => {
// // //     setWorkingNurses(nurses.filter((n) => n.workingStatus === true));
// // //     setRequestedNurses(
// // //       nurses.filter((n) => n.staffRequestStatus === "requested")
// // //     );
// // //     setAcceptedNurses(
// // //       nurses.filter((n) => n.staffRequestStatus === "accepted")
// // //     );
// // //   }, [nurses]);

// // //   // Manage details panel data state
// // //   const [detailsData, setDetailsData] = useState({
// // //     requested: [],
// // //     accepted: [],
// // //     working: [],
// // //   });

// // //   // Keep detailsData in sync with filtered groups
// // //   useEffect(() => {
// // //     setDetailsData((prev) => ({
// // //       requested: requestedNurses,
// // //       accepted: acceptedNurses,
// // //       working: workingNurses,
// // //     }));
// // //   }, [requestedNurses, acceptedNurses]);

// // //   const handleCardClick = (tab) => {
// // //     setActiveTab(activeTab === tab ? null : tab);
// // //   };

// // //   const handleCancelRequest = (id) => {
// // //     // Remove nurse from requested list in detailsData
// // //     setDetailsData((prev) => ({
// // //       ...prev,
// // //       requested: prev.requested.filter((nurse) => nurse.id !== id),
// // //     }));
// // //     // Optionally, update nurses state or re-fetch nurses from backend if required
// // //   };

// // //   const handleAcceptNurse = (id) => {
// // //     // Move nurse from accepted to acknowledged in detailsData
// // //     const nurseToAcknowledge = detailsData.accepted.find(
// // //       (nurse) => nurse.id === id
// // //     );
// // //     if (nurseToAcknowledge) {
// // //       setDetailsData((prev) => ({
// // //         ...prev,
// // //         accepted: prev.accepted.filter((nurse) => nurse.id !== id),
// // //         acknowledged: [
// // //           ...prev.acknowledged,
// // //           {
// // //             ...nurseToAcknowledge,
// // //             acknowledgedDate: new Date().toISOString().split("T")[0],
// // //           },
// // //         ],
// // //       }));
// // //     }
// // //   };

// // //   const handleAssignNurse = (id, floor) => {
// // //     // Remove nurse from acknowledged list (assign to floor)
// // //     setDetailsData((prev) => ({
// // //       ...prev,
// // //       acknowledged: prev.acknowledged.filter((nurse) => nurse.id !== id),
// // //     }));
// // //     // In real implementation, update backend to assign floor
// // //   };

// // //   return (
// // //     <div className="hospital-dashboard">
// // //       <DashboardHeader />
// // //       <StatsCards
// // //         workingNurses={workingNurses}
// // //         requestedNurses={requestedNurses}
// // //         acceptedNurses={acceptedNurses}
// // //         activeTab={activeTab}
// // //         onCardClick={handleCardClick}
// // //       />
// // //       <DetailsPanel
// // //         activeTab={activeTab}
// // //         data={detailsData}
// // //         onCancelRequest={handleCancelRequest}
// // //         onAcceptNurse={handleAcceptNurse}
// // //         onAssignNurse={handleAssignNurse}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default HospitalAdminDashboard;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import DashboardHeader from "./DashboardHeader";
// // import StatsCards from "./StatsCard";
// // import DetailsPanel from "./DetailsPanel";
// // import RequestStaff from "./RequestStaff"; // New component we'll create
// // import "./HospitalAdminDashboard.css";

// // const HospitalAdminDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("dashboard");
// //   const [loggedInUser, setLoggedInUser] = useState({});
// //   const [userEmail, setUserEmail] = useState(
// //     localStorage.getItem("userEmail") || ""
// //   );
// //   const [nurses, setNurses] = useState([]);
// //   const [workingNurses, setWorkingNurses] = useState([]);
// //   const [requestedNurses, setRequestedNurses] = useState([]);
// //   const [acceptedNurses, setAcceptedNurses] = useState([]);

// //   // Fetch logged-in hospital user by email
// //   const fetchLoggedInUser = async () => {
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
// //       );
// //       if (response.status === 200) {
// //         setLoggedInUser(response.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user:", error);
// //     }
// //   };

// //   // Fetch nurses for logged-in hospital by hospitalId
// //   const fetchHospitalNurses = async () => {
// //     if (!loggedInUser._id) return;

// //     try {
// //       const response = await axios.get(
// //         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
// //       );
// //       if (response.status === 200) {
// //         setNurses(response.data);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching nurses:", error);
// //     }
// //   };

// //   // Initial data loading
// //   useEffect(() => {
// //     if (userEmail) fetchLoggedInUser();
// //   }, [userEmail]);

// //   useEffect(() => {
// //     if (loggedInUser._id) fetchHospitalNurses();
// //   }, [loggedInUser]);

// //   // Filter nurses into groups
// //   useEffect(() => {
// //     setWorkingNurses(nurses.filter((n) => n.workingStatus === true));
// //     setRequestedNurses(
// //       nurses.filter((n) => n.staffRequestStatus === "requested")
// //     );
// //     setAcceptedNurses(
// //       nurses.filter((n) => n.staffRequestStatus === "accepted")
// //     );
// //   }, [nurses]);

// //   // Handle tab changes
// //   const handleTabChange = (tab) => {
// //     setActiveTab(tab);
// //   };

// //   return (
// //     <div className="hospital-dashboard">
// //       <DashboardHeader activeTab={activeTab} onTabChange={handleTabChange} />

// //       {activeTab === "dashboard" && (
// //         <>
// //           <StatsCards
// //             workingNurses={workingNurses}
// //             requestedNurses={requestedNurses}
// //             acceptedNurses={acceptedNurses}
// //           />
// //           <DetailsPanel
// //             workingNurses={workingNurses}
// //             requestedNurses={requestedNurses}
// //             acceptedNurses={acceptedNurses}
// //           />
// //         </>
// //       )}

// //       {activeTab === "request" && (
// //         <RequestStaff
// //           hospitalId={loggedInUser._id}
// //           onRequestSubmit={() => {
// //             // Refresh data after submission
// //             fetchHospitalNurses();
// //             setActiveTab("dashboard");
// //           }}
// //         />
// //       )}

// //       {activeTab === "manage" && (
// //         <div className="manage-staff-container">
// //           {/* We'll implement this later */}
// //           <h2>Manage Staff Component</h2>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // import React, { useState } from "react";

// // import "../HospitalAdminDahsboard/HospitalAdminDashboard.css";
// // import DashboardTab from "./DashboardTab";
// // import RequestStaffTab from "./RequestStaff";
// // import RequestedStaffTab from "./RequestedStaff";

// // const HospitalAdminDashboard = () => {
// //   const [activeTab, setActiveTab] = useState("dashboard");

// //   return (
// //     <div className="admin-dashboard">
// //       <header className="dashboard-header">
// //         <h1>Hospital Admin Dashboard</h1>
// //         <div className="user-info">
// //           <span className="user-name">Admin User</span>
// //           <div className="user-avatar">AU</div>
// //         </div>
// //       </header>

// //       <nav className="dashboard-nav">
// //         <button
// //           className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`}
// //           onClick={() => setActiveTab("dashboard")}
// //         >
// //           <i className="fas fa-tachometer-alt"></i> Dashboard
// //         </button>
// //         <button
// //           className={`nav-btn ${activeTab === "request" ? "active" : ""}`}
// //           onClick={() => setActiveTab("request")}
// //         >
// //           <i className="fas fa-user-plus"></i> Request Staff
// //         </button>
// //         <button
// //           className={`nav-btn ${activeTab === "requested" ? "active" : ""}`}
// //           onClick={() => setActiveTab("requested")}
// //         >
// //           <i className="fas fa-list-ul"></i> Requested Staff
// //         </button>
// //       </nav>

// //       <main className="dashboard-content">
// //         {activeTab === "dashboard" && <DashboardTab />}
// //         {activeTab === "request" && <RequestStaffTab />}
// //         {activeTab === "requested" && <RequestedStaffTab />}
// //       </main>
// //     </div>
// //   );
// // };

// // export default HospitalAdminDashboard;

// import React, { useEffect, useState } from "react";
// import "./HospitalAdminDashboard.css";
// import StaffRequests from "./StaffRequests";
// import NurseManagement from "./NurseManagement";
// import AcceptedStaff from "./AcceptedStaff";
// import RequestStaffTab from "./RequestStaff";
// import axios from "axios";

// const HospitalAdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [loggedInUser, setLoggedInUser] = useState({});

//   const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

//   const fetchLoggedInUser = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
//       );
//       if (response.status === 200) {
//         setLoggedInUser(response.data);
//         localStorage.setItem("hospitalId", response.data._id);
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const fetchHospitalNurses = async () => {
//     if (!loggedInUser._id) return;

//     try {
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/nurse/hospitalNurses?hospitalId=${loggedInUser._id}`
//       );
//       if (response.status === 200) {
//         setNurses(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching nurses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLoggedInUser();
//   }, []);

//   return (
//     <div className="hospital-admin-dashboard-container">
//       <header className="hospital-dashboard-header">
//         <h1>Hospital Nurse Management</h1>
//         <div className="admin-profile">
//           <span>Admin User</span>
//           <div className="profile-icon">AU</div>
//         </div>
//       </header>

//       <nav className="dashboard-nav">
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "manage" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("manage")}
//         >
//           Manage Nurses
//         </button>
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "requests" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("requests")}
//         >
//           Staff Requests
//         </button>
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "accepted" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("accepted")}
//         >
//           Accepted Staff
//         </button>

//         {/* <button
//           className={`hospital-nav-btn ${activeTab === "requested" ? "active" : ""}`}
//           onClick={() => setActiveTab("requested")}
//         >
//           Requested Staff
//         </button> */}
//       </nav>

//       <main className="dashboard-content">
//         Hi , Madan Welcome
//         {activeTab === "manage" && <NurseManagement id={loggedInUser._id} />}
//         {activeTab === "requests" && <StaffRequests />}
//         {activeTab === "accepted" && <AcceptedStaff />}
//       </main>
//     </div>
//   );
// };

// export default HospitalAdminDashboard;

// HospitalAdminDashboard.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./HospitalAdminDashboard.css";
// import StaffRequests from "./StaffRequests";
// import NurseManagement from "./NurseManagement";

// import HospitalProfile from "../HospitalAdminDahsboard/HospitalProfile/HospitalProfile"; // Import the new component
// import AddPatient from "./AddPatient/AddPatient";

// const HospitalAdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard"); // Set a default dashboard tab
//   const [loggedInUser, setLoggedInUser] = useState(null); // Initialize as null to handle loading state

//   const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));

//   const fetchLoggedInUser = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
//       );
//       if (response.status === 200) {
//         setLoggedInUser(response.data);
//         localStorage.setItem("hospitalId", response.data._id);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   useEffect(() => {
//     if (userEmail) {
//       fetchLoggedInUser();
//     } else {
//       console.warn("User email not found in localStorage.");
//     }
//   }, [userEmail]);

//   // NEW: Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("hospitalId");
//     // Redirect to login page
//     window.location.href = "/login"; // Or your specific login route
//   };

//   // Show a loading state while fetching user data
//   if (!loggedInUser) {
//     return <div className="loading-container">Loading dashboard...</div>;
//   }

//   // Conditionally render main content based on active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return (
//           // You might have a separate Dashboard component here
//           <>
//             <h2 className="welcome-message">
//               Hi, {loggedInUser.ceoName || "Admin"} Welcome!
//             </h2>
//             {/* ... other dashboard widgets and stats */}
//           </>
//         );
//       case "manage":
//         return <NurseManagement id={loggedInUser._id} />;
//       case "requests":
//         return <StaffRequests />;

//       case "patients":
//         return <AddPatient hospitalId={loggedInUser._id} />;

//       case "profile":
//         return (
//           <HospitalProfile
//             hospitalData={loggedInUser} // Pass the fetched user data
//             onUpdate={setLoggedInUser} // Pass the state setter to update data after edit
//             onLogout={handleLogout} // Pass the logout function
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="hospital-admin-dashboard-container">
//       <header className="hospital-dashboard-header">
//         <h1>Hospital Nurse Management</h1>
//         <div className="admin-profile">
//           <span>{loggedInUser.name || "Hospital Admin"}</span>
//           <div className="profile-icon" onClick={() => setActiveTab("profile")}>
//             {loggedInUser.name ? loggedInUser.name.charAt(0) : "H"}
//           </div>
//         </div>
//       </header>

//       <nav className="dashboard-nav">
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "dashboard" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("dashboard")}
//         >
//           Dashboard
//         </button>
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "manage" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("manage")}
//         >
//           Manage Nurses
//         </button>
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "requests" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("requests")}
//         >
//           Staff Requests
//         </button>

//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "profile" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("profile")}
//         >
//           Profile
//         </button>
//         <button
//           className={`hospital-nav-btn ${
//             activeTab === "patients" ? "active" : ""
//           }`}
//           onClick={() => setActiveTab("patients")}
//         >
//           Patients
//         </button>
//       </nav>

//       <main className="dashboard-content">{renderContent()}</main>
//     </div>
//   );
// };

// export default HospitalAdminDashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HospitalAdminDashboard.css";
import StaffRequests from "./StaffRequests";
import NurseManagement from "./NurseManagement";
import HospitalProfile from "../HospitalAdminDahsboard/HospitalProfile/HospitalProfile";
import AddPatient from "./AddPatient/AddPatient";
import DashboardWidget from "./DashboardWidgets/DashboardWidget";

// NEW: Import the DashboardWidgets component

const HospitalAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard"); // Set a default dashboard tab
  const [loggedInUser, setLoggedInUser] = useState(null); // Initialize as null to handle loading state

  const userEmail = localStorage.getItem("userEmail");

  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/hospital-service/api/hospital/getHospitalByEmail/${userEmail}`
      );
      if (response.status === 200) {
        setLoggedInUser(response.data);
        localStorage.setItem("hospitalId", response.data._id);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchLoggedInUser();
    } else {
      console.warn("User email not found in localStorage.");
    }
  }, [userEmail]);

  // NEW: Logout function
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("hospitalId");
    window.location.href = "/login"; // Or your specific login route
  };

  // Show a loading state while fetching user data
  if (!loggedInUser) {
    return <div className="loading-container">Loading dashboard...</div>;
  }

  // Conditionally render main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          // Use the new DashboardWidgets component here
          <>
            <h2 className="welcome-message">
              Hi, {loggedInUser.ceoName || "Admin"} Welcome!
            </h2>
            <DashboardWidget hospitalId={loggedInUser._id} />
          </>
        );
      case "manage":
        return <NurseManagement id={loggedInUser._id} />;
      case "requests":
        return <StaffRequests />;
      case "patients":
        return <AddPatient hospitalId={loggedInUser._id} />;
      case "profile":
        return (
          <HospitalProfile
            hospitalData={loggedInUser}
            onUpdate={setLoggedInUser}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="hospital-admin-dashboard-container">
      <header className="hospital-dashboard-header">
        <h1>Hospital Nurse Management</h1>
        <div className="admin-profile">
          <span>{loggedInUser.name || "Hospital Admin"}</span>
          <div className="profile-icon" onClick={() => setActiveTab("profile")}>
            {loggedInUser.name ? loggedInUser.name.charAt(0) : "H"}
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`hospital-nav-btn ${
            activeTab === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`hospital-nav-btn ${
            activeTab === "manage" ? "active" : ""
          }`}
          onClick={() => setActiveTab("manage")}
        >
          Manage Nurses
        </button>
        <button
          className={`hospital-nav-btn ${
            activeTab === "requests" ? "active" : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Staff Requests
        </button>
        <button
          className={`hospital-nav-btn ${
            activeTab === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`hospital-nav-btn ${
            activeTab === "patients" ? "active" : ""
          }`}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>
      </nav>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
};

export default HospitalAdminDashboard;
