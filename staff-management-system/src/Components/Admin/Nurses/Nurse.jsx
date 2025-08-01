import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditNurseModal from "./EditNurseModal";
import "./Nurse.css";

const Nurse = () => {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch nurses with filtering out cancelled status
  const fetchNurses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:9999/admin-service/api/admin/nurse/nurseDetails"
      );
      if (res.status === 200) {
        const filtered = res.data.filter(
          (n) => n.registrationStatus !== "cancelled"
        );
        setNurses(filtered);
      } else {
        alert("Error fetching nurses");
      }
    } catch (e) {
      alert("Error fetching nurses: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(nurses.length / rowsPerPage);
  const startIdx = (page - 1) * rowsPerPage;
  const currentNurses = nurses.slice(startIdx, startIdx + rowsPerPage);

  // Delete nurse
  const handleDelete = async (nurse) => {
    if (
      !window.confirm(
        `Are you sure you want to delete nurse "${nurse.firstName} ${nurse.lastName}"?`
      )
    )
      return;
    try {
      const res = await axios.delete(
        `http://localhost:9999/admin-service/api/admin/nurse/deleteNurse`,
        nurse._id
      );
      if (res.status === 200 || res.status === 204) {
        setNurses((prev) => prev.filter((n) => n._id !== nurse._id));
        if (page > 1 && currentNurses.length === 1) {
          setPage(page - 1); // Go back a page if last item deleted on last page
        }
        alert("Nurse deleted successfully");
      } else {
        alert("Failed to delete nurse");
      }
    } catch (e) {
      alert("Delete error: " + e.message);
    }
  };

  // Open edit modal
  const openEditModal = (nurse) => {
    setSelectedNurse(nurse);
    setModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedNurse(null);
  };

  // Save nurse (update API + update state)
  const handleSaveNurse = async (updatedNurse) => {
    try {
      const res = await axios.put(
        "http://localhost:9999/admin-service/api/admin/nurse/updateNurse",
        updatedNurse
      );
      if (res.status === 200) {
        setNurses((prev) =>
          prev.map((n) => (n._id === updatedNurse._id ? updatedNurse : n))
        );
        setModalOpen(false);
        setSelectedNurse(null);
        alert("Nurse updated successfully");
      } else {
        alert("Failed to update nurse");
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
    <div className="nurse-container">
      <h1 className="nurse-title">Nurse Management</h1>

      {loading ? (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      ) : nurses.length === 0 ? (
        <p>No nurses found.</p>
      ) : (
        <>
          <table className="hospital-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentNurses.map((nurse) => (
                <tr key={nurse._id}>
                  <td>{nurse._id}</td>
                  <td>{`${nurse.firstName} ${nurse.lastName}`}</td>
                  <td>{nurse.contactDetails?.email}</td>
                  <td>{nurse.contactDetails?.phone}</td>
                  <td>{nurse.yearOfExperience} years</td>
                  <td>
                    <span
                      className={`status-badge status-${nurse.registrationStatus.toLowerCase()}`}
                    >
                      {nurse.registrationStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        nurse.availableStatus
                          ? "status-approved"
                          : "status-rejected"
                      }`}
                    >
                      {nurse.availableStatus ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn icon-btn btn-edit"
                      title="Edit"
                      onClick={() => openEditModal(nurse)}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="btn icon-btn btn-delete"
                      title="Delete"
                      onClick={() => handleDelete(nurse)}
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

      {modalOpen && selectedNurse && (
        <EditNurseModal
          nurse={selectedNurse}
          onClose={closeEditModal}
          onSave={handleSaveNurse}
        />
      )}
    </div>
  );
};

export default Nurse;
