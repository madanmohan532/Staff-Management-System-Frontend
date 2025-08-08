import {
  FiEdit,
  FiTrash2,
  FiX,
  FiUploadCloud,
  FiFileText,
} from "react-icons/fi";

import React from "react";

import { useForm } from "react-hook-form";

import styled, { keyframes, createGlobalStyle } from "styled-components";

import axios from "axios";

const { useState, useEffect, useRef } = React;

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --surface: #ffffff;
    --primary: #6c63ff;
    --secondary: #ff6584;
    --text-primary: #232323;
    --text-secondary: #6b7280;
    --status-approved: #28a745;
    --status-pending: #ffc107;
    --error: #e53935;
  }
  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--background);
    margin: 0;
  }
`;

// --- Standalone Edit Hospital Modal Component ---
const EditHospitalModal = ({ hospital, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: hospital.name || "",
      ceoName: hospital.ceoName || "",
      street: hospital.address?.street || "",
      city: hospital.address?.city || "",
      state: hospital.address?.state || "",
      pincode: hospital.address?.pincode || "",
      kmcNumber: hospital.kmcNumber || "",
      phone: hospital.contactDetails?.phone || "",
      email: hospital.contactDetails?.email || "",
      staffDetails: (hospital.staffDetails || []).join(", "),
    },
  });

  const [newCertificate, setNewCertificate] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null); // Ref for the file input

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Invalid file type. Please select a JPG, PNG, or PDF.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setFileError("File is too large. Maximum size is 2MB.");
        return;
      }

      setNewCertificate(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleViewCertificate = (cert) => {
    if (!cert) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
                <html>
                    <head>
                        <title>Certificate Preview</title>
                        <style>
                            body { margin: 0; display: flex; justify-content: center; align-items: center; background-color: #f0f2f5; height: 100vh; }
                            iframe { border:0; width:100%; height:100%; }
                            img { max-width: 100%; max-height: 100%; object-fit: contain; }
                        </style>
                    </head>
                    <body>
                        ${
                          cert.startsWith("data:application/pdf")
                            ? `<iframe src="${cert}"></iframe>`
                            : `<img src="${cert}" alt="Certificate Preview" />`
                        }
                    </body>
                </html>
            `);
    }
  };

  const processSubmit = (data) => {
    if (fileError) return;

    const saveCertificate = () => {
      if (newCertificate) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(newCertificate);
          reader.onloadend = () => resolve(reader.result);
        });
      }
      return Promise.resolve(hospital.certificate);
    };

    saveCertificate().then((certificateData) => {
      const updated = {
        ...hospital,
        name: data.name,
        ceoName: data.ceoName,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        kmcNumber: data.kmcNumber,
        certificate: certificateData,
        contactDetails: { phone: data.phone, email: data.email },
        staffDetails: data.staffDetails
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      onSave(updated);
    });
  };

  const currentCertIsImage = hospital.certificate?.startsWith("data:image/");
  const currentCertIsPdf = hospital.certificate?.startsWith(
    "data:application/pdf"
  );

  return (
    <ModalOverlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Edit Hospital</h2>
          <CloseButton onClick={onClose}>
            <FiX size={24} />
          </CloseButton>
        </ModalHeader>
        <ModalForm onSubmit={handleSubmit(processSubmit)}>
          <InputGrid>
            <InputGroup>
              <label>Name</label>
              <input {...register("name", { required: "Name is required" })} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </InputGroup>
            <InputGroup>
              <label>CEO Name</label>
              <input {...register("ceoName")} />
            </InputGroup>
          </InputGrid>
          <InputGroup>
            <label>Street</label>
            <input
              {...register("street", { required: "Street is required" })}
            />
            {errors.street && <FieldError>{errors.street.message}</FieldError>}
          </InputGroup>
          <InputGrid>
            <InputGroup>
              <label>City</label>
              <input {...register("city", { required: "City is required" })} />
              {errors.city && <FieldError>{errors.city.message}</FieldError>}
            </InputGroup>
            <InputGroup>
              <label>State</label>
              <input
                {...register("state", { required: "State is required" })}
              />
              {errors.state && <FieldError>{errors.state.message}</FieldError>}
            </InputGroup>
            <InputGroup>
              <label>Pincode</label>
              <input
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: { value: /^[0-9]{6}$/, message: "Must be 6 digits" },
                })}
              />
              {errors.pincode && (
                <FieldError>{errors.pincode.message}</FieldError>
              )}
            </InputGroup>
          </InputGrid>
          <InputGrid>
            <InputGroup>
              <label>KMC Number</label>
              <input {...register("kmcNumber")} />
            </InputGroup>
            <InputGroup>
              <label>Phone</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Must be 10 digits",
                  },
                })}
              />
              {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
            </InputGroup>
          </InputGrid>
          <InputGroup>
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </InputGroup>
          {/* <InputGroup>
            <label>Staff Details (comma-separated)</label>
            <input {...register("staffDetails")} />
          </InputGroup> */}

          <CertificateSection>
            <div>
              <label>Current Certificate</label>
              {hospital.certificate ? (
                <CertificatePreview>
                  <div className="preview-content">
                    {currentCertIsImage && (
                      <img src={hospital.certificate} alt="Certificate" />
                    )}
                    {currentCertIsPdf && <FiFileText size={40} />}
                  </div>
                  <ViewButton
                    type="button"
                    onClick={() => handleViewCertificate(hospital.certificate)}
                  >
                    View
                  </ViewButton>
                </CertificatePreview>
              ) : (
                <p>None</p>
              )}
            </div>
            <div>
              <label>Upload New (Max 2MB)</label>
              <FileUploadWrapper>
                <input
                  type="file"
                  id="certificate-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <FileUploadButton
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUploadCloud />{" "}
                  {newCertificate ? newCertificate.name : "Select File"}
                </FileUploadButton>
              </FileUploadWrapper>
              {fileError && <FieldError>{fileError}</FieldError>}
              {preview && (
                <ImagePreview src={preview} alt="New certificate preview" />
              )}
            </div>
          </CertificateSection>

          <ModalFooter>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </ModalFooter>
        </ModalForm>
      </Modal>
    </ModalOverlay>
  );
};

// --- Main Hospital Component ---
const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState(null);
  const [message, setMessage] = useState("");

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:9999/admin-service/api/admin/hospital/hospitalDetails"
      );
      if (res.status === 200) {
        const filtered = res.data.filter(
          (h) => h.registrationStatus !== "cancelled"
        );
        setHospitals(filtered);
      }
    } catch (e) {
      setMessage("Error fetching hospitals: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async () => {
    if (!hospitalToDelete) return;
    try {
      const res = await axios.delete(
        `http://localhost:9999/admin-service/api/admin/hospital/deleteNurse`,
        { data: { _id: hospitalToDelete._id } }
      );
      if (res.status === 200 || res.status === 204) {
        setHospitals((prev) =>
          prev.filter((h) => h._id !== hospitalToDelete._id)
        );
        setMessage("Hospital deleted successfully.");
      }
    } catch (e) {
      setMessage("Delete error: " + e.message);
    }
    closeDeleteModal();
  };

  const openEditModal = (hospital) => {
    setSelectedHospital(hospital);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedHospital(null);
  };
  const openDeleteModal = (hospital) => {
    setHospitalToDelete(hospital);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setHospitalToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleSaveHospital = async (updatedHospital) => {
    console.log(updatedHospital);

    try {
      const res = await axios.put(
        "http://localhost:9999/hospital-service/api/hospital/updateHospitalDetails",
        updatedHospital
      );
      if (res.status === 200) {
        setHospitals((prev) =>
          prev.map((h) => (h._id === updatedHospital._id ? updatedHospital : h))
        );
        console.log(res.data);

        closeEditModal();
        setMessage("Hospital updated successfully.");
      }
    } catch (e) {
      setMessage("Update error: " + e.message);
    }
  };

  const totalPages = Math.ceil(hospitals.length / rowsPerPage);
  const currentHospitals = hospitals.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Hospital Management</Title>
        {message && <StatusMessage>{message}</StatusMessage>}
        {loading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : hospitals.length === 0 ? (
          <p>No hospitals found.</p>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentHospitals.map((hospital) => (
                  <tr key={hospital._id}>
                    <td>{hospital._id}</td>
                    <td>{hospital.name}</td>
                    <td>{`${hospital.address?.street}, ${hospital.address?.city}`}</td>
                    <td>{hospital.contactDetails?.email}</td>
                    <td>
                      <StatusBadge status={hospital.registrationStatus}>
                        {hospital.registrationStatus}
                      </StatusBadge>
                    </td>
                    <td className="action-buttons">
                      <IconButton $edit onClick={() => openEditModal(hospital)}>
                        <FiEdit size={18} />
                      </IconButton>
                      <IconButton
                        $delete
                        onClick={() => openDeleteModal(hospital)}
                      >
                        <FiTrash2 size={18} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <PageButton
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </PageButton>
              <span>
                Page {page} of {totalPages}
              </span>
              <PageButton
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </PageButton>
            </Pagination>
          </>
        )}

        {isEditModalOpen && selectedHospital && (
          <EditHospitalModal
            hospital={selectedHospital}
            onClose={closeEditModal}
            onSave={handleSaveHospital}
          />
        )}

        {isDeleteModalOpen && hospitalToDelete && (
          <ConfirmationModal
            onClose={closeDeleteModal}
            onConfirm={handleDelete}
            title="Confirm Deletion"
            message={`Are you sure you want to delete hospital "${hospitalToDelete.name}"? This action cannot be undone.`}
          />
        )}
      </Container>
    </>
  );
};

const ConfirmationModal = ({ onClose, onConfirm, title, message }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent small onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="confirm" onClick={onConfirm}>
            Confirm
          </button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// --- Styled Components ---

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideIn = keyframes`from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;

const Container = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 2rem;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: #e3f2fd;
  color: #1a237e;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: ${fadeIn} 0.5s ease;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--primary);
  animation: ${spin} 1s ease infinite;
`;

const Table = styled.table`
  width: 100%;
  background-color: var(--surface);
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  th {
    background-color: #f8f9fa;
  }
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: capitalize;
  color: #fff;
  background-color: ${({ status }) =>
    status === "approved" ? "var(--status-approved)" : "var(--status-pending)"};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin: 0 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;
  color: var(--text-secondary);

  ${(props) =>
    props.$edit &&
    `
    &:hover { background-color: #e3f2fd; color: #1e88e5; }
  `}
  ${(props) =>
    props.$delete &&
    `
    &:hover { background-color: #ffebee; color: #e53935; }
  `}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: var(--surface);
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:hover:not(:disabled) {
    background-color: #f0f0f0;
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
  animation: ${fadeIn} 0.3s;
`;

const Modal = styled.div`
  background: var(--surface);
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  background: var(--surface);
  border-radius: 12px;
  width: 90%;
  max-width: ${(props) => (props.small ? "400px" : "600px")};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s;
`;

const ModalHeader = styled.header`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  &:hover {
    color: var(--error);
  }
`;

const ModalForm = styled.form`
  padding: 1.5rem;
  overflow-y: auto;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-secondary);
  }
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
    }
  }
`;

const CertificateSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const CertificatePreview = styled.div`
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 150px;
  text-align: center;
  color: var(--text-secondary);

  .preview-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ViewButton = styled.button`
  margin-top: 0.5rem;
  background: none;
  border: 1px solid var(--text-secondary);
  color: var(--text-secondary);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
`;

const FileUploadWrapper = styled.div``;

const FileUploadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-top: 1rem;
  border-radius: 6px;
  border: 1px solid #eee;
`;

const FieldError = styled.p`
  color: var(--error);
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }
  .btn-save,
  .confirm {
    background-color: var(--primary);
    color: white;
  }
  .btn-cancel {
    background-color: #f1f1f1;
  }
`;

export default Hospital;
