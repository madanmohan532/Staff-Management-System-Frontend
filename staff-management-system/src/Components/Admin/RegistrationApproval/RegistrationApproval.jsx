// import React, { useState, useEffect, useRef } from "react";
// import "./RegistrationApproval.css";
// import axios from "axios";

// const RegistrationApproval = ({
//   pendingHospitals = () => [],
//   pendingNurses = () => [],
// }) => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [hospitals, setHospitals] = useState([]);
//   const [nurses, setNurses] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const modalRef = useRef(null);

//   // Initialize data when component mounts
//   useEffect(() => {
//     setHospitals(pendingHospitals());
//     setNurses(pendingNurses());
//   }, [pendingHospitals, pendingNurses]);

//   // Filter data based on active tab
//   const getFilteredData = () => {
//     switch (activeTab) {
//       case "hospitals":
//         return hospitals.map((item) => ({ ...item, type: "Hospital" }));
//       case "nurses":
//         return nurses.map((item) => ({ ...item, type: "Registered Nurse" }));
//       default: // 'all'
//         return [
//           ...hospitals.map((item) => ({ ...item, type: "Hospital" })),
//           ...nurses.map((item) => ({ ...item, type: "Registered Nurse" })),
//         ];
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         closeModal();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleViewIdProof = (base64String) => {
//     if (!base64String) return;
//     const newWindow = window.open();
//     if (newWindow) {
//       newWindow.document.write(
//         `<iframe src="${base64String}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
//       );
//       newWindow.document.title = "Certificate Preview";
//     }
//   };

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//   };

//   const [loggedEmail, setLoggedEmail] = useState(localStorage.getItem("email"));

//   console.log(loggedEmail);

//   const handleRegistrationApprove = (item) => {
//     if (item.type === "Hospital") {
//       item.registrationStatus = "approved";

//       axios
//         .put(
//           `http://localhost:9999/admin-service/api/admin/hospital/updateRegistrationStatus/${loggedEmail}`,
//           item
//         )
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else if (item.type === "Registered Nurse") {
//       item.registrationStatus = "approved";
//       axios
//         .put(
//           `http://localhost:9999/admin-service/api/admin/nurse/updateRegistrationStatus/${loggedEmail}`,
//           item
//         )
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   const handleRegistrationReject = (item) => {
//     if (item.type === "Hospital") {
//       item.registrationStatus = "cancelled";

//       axios
//         .put(
//           `http://localhost:9999/admin-service/api/admin/hospital/updateHospital`,
//           item
//         )
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else if (item.type === "Registered Nurse") {
//       item.registrationStatus = "cancelled";
//       axios
//         .put(
//           `http://localhost:9999/admin-service/api/admin/nurse/updateNurse`,
//           item
//         )
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   };

//   return (
//     <div className="approval-container">
//       <h1 className="page-title">Pending Approvals</h1>

//       {/* Stats Cards - Showing Separate Counts */}
//       <div className="stats-cards">
//         <div className="stat-card total">
//           <h3>Total Pending</h3>
//           <p className="stat-number">{hospitals.length + nurses.length}</p>
//         </div>

//         <div className="stat-card hospitals">
//           <h3>Pending Hospitals</h3>
//           <p className="stat-number">{hospitals.length}</p>
//         </div>

//         <div className="stat-card nurses">
//           <h3>Pending Staff</h3>
//           <p className="stat-number">{nurses.length}</p>
//         </div>
//       </div>

//       {/* Tab Navigation */}
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

//       {/* Table - Showing Filtered Data */}
//       <div className="approval-table-container">
//         <table className="approval-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>email</th>
//               <th>UNIQUE NUMBER</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {getFilteredData().map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name || item.firstName + " " + item.lastName}</td>
//                 <td>{item.contactDetails.email}</td>
//                 <td>{item.kmcNumber || item.certificateNumber}</td>
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
//                   <button
//                     className="action-btn approve"
//                     onClick={() => handleRegistrationApprove(item)}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="action-btn reject"
//                     onClick={() => handleRegistrationReject(item)}
//                   >
//                     Reject
//                   </button>
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

//       {/* Enhanced Modal Section */}
//       {isModalOpen && selectedItem && (
//         <div className="modal-overlay">
//           <div className="modal-content" ref={modalRef}>
//             <button className="modal-close" onClick={closeModal}>
//               ×
//             </button>

//             <h2 className="modal-title">{selectedItem.name}</h2>

//             <div className="modal-details">
//               <div className="detail-row">
//                 <span className="detail-label">Address:</span>
//                 <span className="detail-value">
//                   {(selectedItem.address?.street &&
//                     `${selectedItem.address.street}, ${selectedItem.address.city}, ${selectedItem.address.state}, ${selectedItem.address.pincode}`) ||
//                     "N/A"}
//                 </span>
//               </div>

//               <div className="detail-row">
//                 <span className="detail-label">Email:</span>
//                 <span className="detail-value">
//                   {selectedItem.contactDetails?.email || "N/A"}
//                 </span>
//               </div>

//               <div className="detail-row">
//                 <span className="detail-label">Phone:</span>
//                 <span className="detail-value">
//                   {selectedItem.contactDetails?.phone || "N/A"}
//                 </span>
//               </div>

//               <div className="detail-row">
//                 <span className="detail-label">Status:</span>
//                 <span
//                   className={`status-badge ${
//                     selectedItem.status?.toLowerCase() || "pending"
//                   }`}
//                 >
//                   {selectedItem.status || "Pending"}
//                 </span>
//               </div>

//               {selectedItem.type === "Hospital" && (
//                 <>
//                   <div className="detail-row">
//                     <span className="detail-label">CEO Name:</span>
//                     <span className="detail-value">
//                       {selectedItem.ceoName || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">KMC Number:</span>
//                     <span className="detail-value">
//                       {selectedItem.kmcNumber || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Certificate:</span>
//                     <span className="detail-value">
//                       {selectedItem.certificate ? (
//                         <button
//                           className="certificate-btn"
//                           onClick={() =>
//                             handleViewIdProof(selectedItem.certificate)
//                           }
//                         >
//                           View Certificate
//                         </button>
//                       ) : (
//                         "N/A"
//                       )}
//                     </span>
//                   </div>
//                 </>
//               )}

//               {selectedItem.type === "Registered Nurse" && (
//                 <>
//                   <div className="detail-row">
//                     <span className="detail-label">Aadhar Number:</span>
//                     <span className="detail-value">
//                       {selectedItem._id || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Unique Number:</span>
//                     <span className="detail-value">
//                       {selectedItem.certificateNumber || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">First Name:</span>
//                     <span className="detail-value">
//                       {selectedItem.firstName || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Last Name:</span>
//                     <span className="detail-value">
//                       {selectedItem.lastName || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Specialization:</span>
//                     <span className="detail-value">
//                       {selectedItem.skills[0] + ", " + selectedItem.skills[1] ||
//                         "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Experience:</span>
//                     <span className="detail-value">
//                       {selectedItem.yearOfExperience || "N/A"}
//                     </span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Self Description:</span>
//                     <span className="detail-value">
//                       {selectedItem.selfDescription || "N/A"}
//                     </span>
//                   </div>

//                   <div className="detail-row">
//                     <span className="detail-label">Certificate:</span>
//                     <span className="detail-value">
//                       {selectedItem.certificate ? (
//                         <button
//                           className="certificate-btn"
//                           onClick={() =>
//                             handleViewIdProof(selectedItem.certificate)
//                           }
//                         >
//                           View Certificate
//                         </button>
//                       ) : (
//                         "N/A"
//                       )}
//                     </span>
//                   </div>
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
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

// Global styles for a consistent look based on your CSS
const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --surface: #ffffff;
    --primary: #6c63ff;
    --secondary: #ff6584;
    --hospital-admin: #0d47a1;
    --nurse: #00838f;
    --admin: #5a52d1;
    --text-primary: #232323;
    --text-secondary: #6b7280;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    margin: 0;
  }
`;

const RegistrationApproval = ({
  pendingHospitals = [],
  pendingNurses = [],
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [hospitals, setHospitals] = useState(pendingHospitals);
  const [nurses, setNurses] = useState(pendingNurses);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const loggedEmail = localStorage.getItem("email");

  // This effect ensures that if the props from the parent component
  // are updated (e.g., by fetching new data), the state of this
  // component is also updated.
  useEffect(() => {
    setHospitals(pendingHospitals);
    setNurses(pendingNurses);
  }, [pendingHospitals, pendingNurses]);

  // Effect to handle clicks outside the modal to close it
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

  // This function handles the API call and then updates the local state
  const handleRegistrationAction = async (item, status, endpoint) => {
    const payload = { ...item, registrationStatus: status };
    try {
      await axios.put(
        `http://localhost:9999/admin-service/api/admin/${endpoint}/${loggedEmail}`,
        payload
      );

      alert(`Registration has been ${status}.`);

      // **FIX: Update the local state to remove the processed item**
      if (item.type === "Hospital") {
        setHospitals((prev) => prev.filter((h) => h._id !== item._id));
      } else if (item.type === "Registered Nurse") {
        setNurses((prev) => prev.filter((n) => n._id !== item._id));
      }

      closeModal();
    } catch (error) {
      console.error(`Error updating registration status:`, error);
      alert(`Failed to update status. Please try again.`);
    }
  };

  const handleApprove = (item) => {
    const endpoint =
      item.type === "Hospital"
        ? "hospital/updateRegistrationStatus"
        : "nurse/updateRegistrationStatus";
    handleRegistrationAction(item, "approved", endpoint);
  };

  const handleReject = (item) => {
    const endpoint =
      item.type === "Hospital"
        ? "hospital/updateHospital"
        : "nurse/updateNurse";
    handleRegistrationAction(item, "cancelled", endpoint);
  };

  const getFilteredData = () => {
    switch (activeTab) {
      case "hospitals":
        return hospitals.map((item) => ({ ...item, type: "Hospital" }));
      case "nurses":
        return nurses.map((item) => ({ ...item, type: "Registered Nurse" }));
      default:
        return [
          ...hospitals.map((item) => ({ ...item, type: "Hospital" })),
          ...nurses.map((item) => ({ ...item, type: "Registered Nurse" })),
        ];
    }
  };

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

  const filteredData = getFilteredData();

  return (
    <>
      <GlobalStyle />
      <Container>
        <PageTitle>Pending Approvals</PageTitle>

        <StatsCards>
          <StatCard className="total">
            <h3>Total Pending</h3>
            <p className="stat-number">{hospitals.length + nurses.length}</p>
          </StatCard>
          <StatCard className="hospitals">
            <h3>Pending Hospitals</h3>
            <p className="stat-number">{hospitals.length}</p>
          </StatCard>
          <StatCard className="nurses">
            <h3>Pending Staff</h3>
            <p className="stat-number">{nurses.length}</p>
          </StatCard>
        </StatsCards>

        <Tabs>
          <TabButton
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          >
            All
          </TabButton>
          <TabButton
            active={activeTab === "hospitals"}
            onClick={() => setActiveTab("hospitals")}
          >
            Hospitals
          </TabButton>
          <TabButton
            active={activeTab === "nurses"}
            onClick={() => setActiveTab("nurses")}
          >
            Nurses
          </TabButton>
        </Tabs>

        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Unique Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name || `${item.firstName} ${item.lastName}`}</td>
                    <td>{item.contactDetails?.email}</td>
                    <td>{item.kmcNumber || item.certificateNumber}</td>
                    <td>
                      <StatusBadge
                        className={item.registrationStatus || "pending"}
                      >
                        {item.registrationStatus || "Pending"}
                      </StatusBadge>
                    </td>
                    <td>
                      <ActionButton
                        className="approve"
                        onClick={() => handleApprove(item)}
                      >
                        Approve
                      </ActionButton>
                      <ActionButton
                        className="reject"
                        onClick={() => handleReject(item)}
                      >
                        Reject
                      </ActionButton>
                      <ActionButton
                        className="view"
                        onClick={() => openModal(item)}
                      >
                        View
                      </ActionButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No pending approvals.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>

        {isModalOpen && selectedItem && (
          <ModalOverlay>
            <ModalContent ref={modalRef}>
              <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
              <ModalTitle>
                {selectedItem.name ||
                  `${selectedItem.firstName} ${selectedItem.lastName}`}
              </ModalTitle>
              <ModalDetails>
                <DetailRow>
                  <DetailLabel>Address:</DetailLabel>
                  <DetailValue>{`${selectedItem.address?.street}, ${selectedItem.address?.city}`}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>
                    {selectedItem.contactDetails?.email}
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Phone:</DetailLabel>
                  <DetailValue>
                    {selectedItem.contactDetails?.phone}
                  </DetailValue>
                </DetailRow>
                {selectedItem.type === "Hospital" && (
                  <>
                    <DetailRow>
                      <DetailLabel>CEO:</DetailLabel>
                      <DetailValue>{selectedItem.ceoName}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>KMC #:</DetailLabel>
                      <DetailValue>{selectedItem.kmcNumber}</DetailValue>
                    </DetailRow>
                  </>
                )}
                {selectedItem.type === "Registered Nurse" && (
                  <>
                    <DetailRow>
                      <DetailLabel>Aadhaar #:</DetailLabel>
                      <DetailValue>{selectedItem._id}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Certificate #:</DetailLabel>
                      <DetailValue>
                        {selectedItem.certificateNumber}
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Experience:</DetailLabel>
                      <DetailValue>
                        {selectedItem.yearOfExperience} years
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Skills:</DetailLabel>
                      <DetailValue>
                        {selectedItem.skills?.join(", ")}
                      </DetailValue>
                    </DetailRow>
                  </>
                )}
                <DetailRow>
                  <DetailLabel>Certificate:</DetailLabel>
                  <DetailValue>
                    <CertificateButton
                      onClick={() =>
                        handleViewIdProof(selectedItem.certificate)
                      }
                    >
                      View Certificate
                    </CertificateButton>
                  </DetailValue>
                </DetailRow>
              </ModalDetails>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  color: var(--text-primary);
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const StatsCards = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  flex: 1;
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &.total {
    border-top: 4px solid var(--primary);
  }
  &.hospitals {
    border-top: 4px solid var(--hospital-admin);
  }
  &.nurses {
    border-top: 4px solid var(--nurse);
  }

  h3 {
    color: var(--text-secondary);
    font-size: 1rem;
    margin: 0 0 0.5rem 0;
  }
  .stat-number {
    color: var(--text-primary);
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--surface);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.active ? "var(--primary)" : "var(--surface)"};
  color: ${(props) => (props.active ? "white" : "var(--text-secondary)")};

  &:hover:not(.active) {
    background-color: rgba(108, 99, 255, 0.1);
  }
`;

const TableContainer = styled.div`
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    color: var(--text-secondary);
    font-weight: 600;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;

  &.pending {
    background-color: rgba(255, 214, 110, 0.2);
    color: #b38b00;
  }
  &.approved {
    background-color: rgba(54, 207, 201, 0.2);
    color: var(--nurse);
  }
  &.cancelled {
    background-color: rgba(255, 101, 132, 0.2);
    color: var(--secondary);
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  margin-right: 0.5rem;
  transition: all 0.3s ease;

  &.approve {
    background-color: rgba(54, 207, 201, 0.2);
    color: var(--nurse);
  }
  &.reject {
    background-color: rgba(255, 101, 132, 0.2);
    color: var(--secondary);
  }
  &.view {
    background-color: rgba(108, 99, 255, 0.2);
    color: var(--primary);
  }
  &:hover {
    opacity: 0.8;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled.div`
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease-out;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalTitle = styled.h2`
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
  &:hover {
    color: var(--secondary);
  }
`;

const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: var(--text-primary);
  min-width: 120px;
  margin-right: 1rem;
  @media (max-width: 768px) {
    min-width: auto;
    margin-right: 0;
  }
`;

const DetailValue = styled.span`
  flex: 1;
  color: var(--text-secondary);
`;

const CertificateButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--admin);
  }
`;

export default RegistrationApproval;
