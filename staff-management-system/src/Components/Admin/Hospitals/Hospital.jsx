import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditHospitalModal from "./EditHospitalModal";
import "./Hospital.css";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch hospitals with filtering out cancelled status
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
      } else {
        alert("Error fetching hospitals");
      }
    } catch (e) {
      alert("Error fetching hospitals: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(hospitals.length / rowsPerPage);
  const startIdx = (page - 1) * rowsPerPage;
  const currentHospitals = hospitals.slice(startIdx, startIdx + rowsPerPage);

  // Delete hospital
  const handleDelete = async (hospital) => {
    if (
      !window.confirm(
        `Are you sure you want to delete hospital "${hospital.name}"?`
      )
    )
      return;
    try {
      const res = await axios.delete(
        `http://localhost:9999/admin-service/api/admin/hospital/delete/${hospital._id}`
      );
      if (res.status === 200 || res.status === 204) {
        setHospitals((prev) => prev.filter((h) => h._id !== hospital._id));
        if (page > 1 && currentHospitals.length === 1) {
          setPage(page - 1); // Go back a page if last item deleted on last page
        }
        alert("Hospital deleted successfully");
      } else {
        alert("Failed to delete hospital");
      }
    } catch (e) {
      alert("Delete error: " + e.message);
    }
  };

  // Open edit modal
  const openEditModal = (hospital) => {
    setSelectedHospital(hospital);
    setModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedHospital(null);
  };

  // Save hospital (update API + update state)
  const handleSaveHospital = async (updatedHospital) => {
    try {
      const res = await axios.put(
        "http://localhost:9999/admin-service/api/admin/hospital/updateHospital",
        updatedHospital
      );
      if (res.status === 200) {
        setHospitals((prev) =>
          prev.map((h) => (h._id === updatedHospital._id ? updatedHospital : h))
        );
        setModalOpen(false);
        setSelectedHospital(null);
        alert("Hospital updated successfully");
      } else {
        alert("Failed to update hospital");
      }
    } catch (e) {
      alert("Update error: " + e.message);
    }
  };

  // Pagination controls
  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="hospital-container">
      <h1 className="hospital-title">Hospital Management</h1>

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      ) : hospitals.length === 0 ? (
        <p>No hospitals found.</p>
      ) : (
        <>
          <table className="hospital-table">
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
                  <td>
                    {hospital.address?.street}, {hospital.address?.city},{" "}
                    {hospital.address?.state}
                  </td>
                  <td>{hospital.contactDetails?.email}</td>
                  <td>
                    <span
                      className={`status-badge status-${hospital.registrationStatus.toLowerCase()}`}
                    >
                      {hospital.registrationStatus}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn icon-btn btn-edit"
                      title="Edit"
                      onClick={() => openEditModal(hospital)}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="btn icon-btn btn-delete"
                      title="Delete"
                      onClick={() => handleDelete(hospital)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {modalOpen && selectedHospital && (
        <EditHospitalModal
          hospital={selectedHospital}
          onClose={closeEditModal}
          onSave={handleSaveHospital}
        />
      )}
    </div>
  );
};

export default Hospital;
