// import React, { useState } from "react";
// import "./RegistrationApproval.css";

// const RegistrationApproval = (props) => {
//   const [activeTab, setActiveTab] = useState("all");

//   // Sample data
//   const pendingData = null;

//   const filteredData =
//     activeTab === "all"
//       ? pendingData
//       : pendingData.filter((item) =>
//           activeTab === "hospitals"
//             ? item.type === "Hospital"
//             : item.type === "Registered Nurse"
//         );

//   return (
//     <div className="approval-container">
//       <h1 className="page-title">Pending Approvals</h1>

//       <div className="stats-cards">
//         <div className="stat-card total">
//           <h3>Total Pending</h3>
//           <p className="stat-number">14</p>
//         </div>

//         <div className="stat-card hospitals">
//           <h3>Pending Hospitals</h3>
//           <p className="stat-number">5</p>
//         </div>

//         <div className="stat-card nurses">
//           <h3>Pending Staff</h3>
//           <p className="stat-number">9</p>
//         </div>
//       </div>

//       <div className="tabs">
//         <button
//           className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Approvals
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "hospitals" ? "active" : ""}`}
//           onClick={() => setActiveTab("hospitals")}
//         >
//           Hospitals
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "nurses" ? "active" : ""}`}
//           onClick={() => setActiveTab("nurses")}
//         >
//           Nurses
//         </button>
//       </div>

//       <div className="approval-table-container">
//         <table className="approval-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Submitted On</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.type}</td>
//                 <td>{item.submittedOn}</td>
//                 <td>
//                   <span className={`status-badge ${item.status.toLowerCase()}`}>
//                     {item.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button className="action-btn approve">Approve</button>
//                   <button className="action-btn reject">Reject</button>
//                   <button className="action-btn view">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RegistrationApproval;

// import React, { useState } from "react";
// import "./RegistrationApproval.css";

// const RegistrationApproval = (props) => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const pendingHospitals = props.pendingHospitals;
//   const pendingNurses = props.pendingNurses;

//   // Combine both types of pending items for the "all" tab
//   const allPendingItems = [
//     ...pendingHospitals.map((item) => ({ ...item, type: "Hospital" })),
//     ...pendingNurses.map((item) => ({ ...item, type: "Registered Nurse" })),
//   ];

//   const filteredData =
//     activeTab === "all"
//       ? allPendingItems
//       : activeTab === "hospitals"
//       ? pendingHospitals.map((item) => ({ ...item, type: "Hospital" }))
//       : pendingNurses.map((item) => ({ ...item, type: "Registered Nurse" }));

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   return (
//     <div className="approval-container">
//       <h1 className="page-title">Pending Approvals</h1>

//       {/* Stats Cards Section */}
//       <div className="stats-cards">
//         <div className="stat-card total">
//           <h3>Total Pending</h3>
//           <p className="stat-number">{allPendingItems.length}</p>
//         </div>

//         <div className="stat-card hospitals">
//           <h3>Pending Hospitals</h3>
//           <p className="stat-number">{pendingHospitals.length}</p>
//         </div>

//         <div className="stat-card nurses">
//           <h3>Pending Staff</h3>
//           <p className="stat-number">{pendingNurses.length}</p>
//         </div>
//       </div>

//       {/* Tab Navigation Section */}
//       <div className="tabs">
//         <button
//           className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
//           onClick={() => setActiveTab("all")}
//         >
//           All Approvals
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "hospitals" ? "active" : ""}`}
//           onClick={() => setActiveTab("hospitals")}
//         >
//           Hospitals
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "nurses" ? "active" : ""}`}
//           onClick={() => setActiveTab("nurses")}
//         >
//           Nurses
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="approval-table-container">
//         <table className="approval-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Submitted On</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.type}</td>
//                 <td>{item.submittedOn || "N/A"}</td>
//                 <td>
//                   <span
//                     className={`status-badge ${
//                       item.status?.toLowerCase() || "pending"
//                     }`}
//                   >
//                     {item.status || "Pending"}
//                   </span>
//                 </td>
//                 <td>
//                   <button className="action-btn approve">Approve</button>
//                   <button className="action-btn reject">Reject</button>
//                   <button
//                     className="action-btn view"
//                     onClick={() => openModal(item)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Section */}
//       {isModalOpen && selectedItem && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <button className="modal-close" onClick={closeModal}>
//               ×
//             </button>
//             <h2>{selectedItem.name}</h2>
//             <div className="modal-details">
//               <p>
//                 <strong>Type:</strong> {selectedItem.type}
//               </p>
//               <p>
//                 <strong>Submitted On:</strong>{" "}
//                 {selectedItem.submittedOn || "N/A"}
//               </p>
//               <p>
//                 <strong>Status:</strong> {selectedItem.status || "Pending"}
//               </p>

//               {/* Display additional details based on type */}
//               {selectedItem.type === "Hospital" && (
//                 <>
//                   <p>
//                     <strong>CEO Name:</strong> {selectedItem.ceoName || "N/A"}
//                   </p>
//                   <p>
//                     <strong>KMC Number:</strong>{" "}
//                     {selectedItem.kmcNumber || "N/A"}
//                   </p>
//                 </>
//               )}

//               {selectedItem.type === "Registered Nurse" && (
//                 <>
//                   <p>
//                     <strong>License Number:</strong>{" "}
//                     {selectedItem.licenseNumber || "N/A"}
//                   </p>
//                   <p>
//                     <strong>Specialization:</strong>{" "}
//                     {selectedItem.specialization || "N/A"}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegistrationApproval;

import React, { useState, useEffect, useRef } from "react";
import "./RegistrationApproval.css";
import axios from "axios";

const RegistrationApproval = ({
  pendingHospitals = () => [],
  pendingNurses = () => [],
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [hospitals, setHospitals] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Initialize data when component mounts
  useEffect(() => {
    setHospitals(pendingHospitals());
    setNurses(pendingNurses());
  }, [pendingHospitals, pendingNurses]);

  console.log(hospitals);
  console.log(nurses);

  // Filter data based on active tab
  const getFilteredData = () => {
    switch (activeTab) {
      case "hospitals":
        return hospitals.map((item) => ({ ...item, type: "Hospital" }));
      case "nurses":
        return nurses.map((item) => ({ ...item, type: "Registered Nurse" }));
      default: // 'all'
        return [
          ...hospitals.map((item) => ({ ...item, type: "Hospital" })),
          ...nurses.map((item) => ({ ...item, type: "Registered Nurse" })),
        ];
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // const viewCertificate = (base64String) => {
  //   if (!base64String) return;
  //   console.log("Opening certificate:", base64String);
  //   try {
  //     // Determine MIME type from the base64 string
  //     // const mimeType = base64String.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
  //     // const extension = mimeType.split("/")[1];

  //     // // Create a blob from the base64 data
  //     // const byteCharacters = atob(base64String.split(",")[1]);
  //     // const byteNumbers = new Array(byteCharacters.length);
  //     // for (let i = 0; i < byteCharacters.length; i++) {
  //     //   byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     // }
  //     // const byteArray = new Uint8Array(byteNumbers);
  //     // const blob = new Blob([byteArray], { type: mimeType });

  //     // Create object URL and open in new tab

  //     window.open(base64String, "_blank");
  //   } catch (error) {
  //     console.error("Error opening certificate:", error);
  //     alert("Could not open certificate");
  //   }
  // };

  const handleViewIdProof = (base64String) => {
    if (!base64String) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<iframe src="${base64String}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
      );
      newWindow.document.title = "Certificate Preview";
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const [loggedEmail, setLoggedEmail] = useState(localStorage.getItem("email"));

  console.log(loggedEmail);

  const handleRegistrationApprove = (item) => {
    if (item.type === "Hospital") {
      item.registrationStatus = "approved";

      axios
        .put(
          `http://localhost:9999/admin-service/api/admin/hospital/updateRegistrationStatus/${loggedEmail}`,
          item
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (item.type === "Registered Nurse") {
      item.registrationStatus = "approved";
      axios
        .put(
          `http://localhost:9999/admin-service/api/admin/nurse/updateRegistrationStatus/${loggedEmail}`,
          item
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRegistrationReject = (item) => {
    if (item.type === "Hospital") {
      item.registrationStatus = "cancelled";

      axios
        .put(
          `http://localhost:9999/admin-service/api/admin/hospital/updateHospital`,
          item
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (item.type === "Registered Nurse") {
      item.registrationStatus = "cancelled";
      axios
        .put(
          `http://localhost:9999/admin-service/api/admin/nurse/updateNurse`,
          item
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="approval-container">
      <h1 className="page-title">Pending Approvals</h1>

      {/* Stats Cards - Showing Separate Counts */}
      <div className="stats-cards">
        <div className="stat-card total">
          <h3>Total Pending</h3>
          <p className="stat-number">{hospitals.length + nurses.length}</p>
        </div>

        <div className="stat-card hospitals">
          <h3>Pending Hospitals</h3>
          <p className="stat-number">{hospitals.length}</p>
        </div>

        <div className="stat-card nurses">
          <h3>Pending Staff</h3>
          <p className="stat-number">{nurses.length}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Approvals
        </button>
        <button
          className={`tab-btn ${activeTab === "hospitals" ? "active" : ""}`}
          onClick={() => setActiveTab("hospitals")}
        >
          Hospitals
        </button>
        <button
          className={`tab-btn ${activeTab === "nurses" ? "active" : ""}`}
          onClick={() => setActiveTab("nurses")}
        >
          Nurses
        </button>
      </div>

      {/* Table - Showing Filtered Data */}
      <div className="approval-table-container">
        <table className="approval-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              <th>UNIQUE NUMBER</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredData().map((item) => (
              <tr key={item.id}>
                <td>{item.name || item.firstName + " " + item.lastName}</td>
                <td>{item.contactDetails.email}</td>
                <td>{item.kmcNumber || item.certificateNumber}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {item.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn approve"
                    onClick={() => handleRegistrationApprove(item)}
                  >
                    Approve
                  </button>
                  <button
                    className="action-btn reject"
                    onClick={() => handleRegistrationReject(item)}
                  >
                    Reject
                  </button>
                  <button
                    className="action-btn view"
                    onClick={() => openModal(item)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Modal Section */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <h2 className="modal-title">{selectedItem.name}</h2>

            <div className="modal-details">
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span className="detail-value">
                  {(selectedItem.address?.street &&
                    `${selectedItem.address.street}, ${selectedItem.address.city}, ${selectedItem.address.state}, ${selectedItem.address.pincode}`) ||
                    "N/A"}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">
                  {selectedItem.contactDetails?.email || "N/A"}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">
                  {selectedItem.contactDetails?.phone || "N/A"}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span
                  className={`status-badge ${
                    selectedItem.status?.toLowerCase() || "pending"
                  }`}
                >
                  {selectedItem.status || "Pending"}
                </span>
              </div>

              {selectedItem.type === "Hospital" && (
                <>
                  <div className="detail-row">
                    <span className="detail-label">CEO Name:</span>
                    <span className="detail-value">
                      {selectedItem.ceoName || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">KMC Number:</span>
                    <span className="detail-value">
                      {selectedItem.kmcNumber || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Certificate:</span>
                    <span className="detail-value">
                      {selectedItem.certificate ? (
                        <button
                          className="certificate-btn"
                          onClick={() =>
                            handleViewIdProof(selectedItem.certificate)
                          }
                        >
                          View Certificate
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </>
              )}

              {selectedItem.type === "Registered Nurse" && (
                <>
                  <div className="detail-row">
                    <span className="detail-label">Aadhar Number:</span>
                    <span className="detail-value">
                      {selectedItem._id || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Unique Number:</span>
                    <span className="detail-value">
                      {selectedItem.certificateNumber || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">First Name:</span>
                    <span className="detail-value">
                      {selectedItem.firstName || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Last Name:</span>
                    <span className="detail-value">
                      {selectedItem.lastName || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Specialization:</span>
                    <span className="detail-value">
                      {selectedItem.skills[0] + ", " + selectedItem.skills[1] ||
                        "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">
                      {selectedItem.yearOfExperience || "N/A"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Self Description:</span>
                    <span className="detail-value">
                      {selectedItem.selfDescription || "N/A"}
                    </span>
                  </div>

                  <div className="detail-row">
                    <span className="detail-label">Certificate:</span>
                    <span className="detail-value">
                      {selectedItem.certificate ? (
                        <button
                          className="certificate-btn"
                          onClick={() =>
                            handleViewIdProof(selectedItem.certificate)
                          }
                        >
                          View Certificate
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationApproval;
