import React, { useState } from "react";
import "./StaffRequests.css"; // Import the shared CSS file

const RequestedStaff = ({ requestedNurses, onCancelRequest }) => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can adjust the number of items per page

  // Logic to calculate items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requestedNurses.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic to render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(requestedNurses.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const cancelRequest = (nurse) => {
    const cancelDetail = {
      staffId: nurse.staffId,
      date: new Date(nurse.requestedFrom).toLocaleDateString(),
      from: nurse.requestedFrom,
      to: nurse.requestedUpto,
      hospitalId: nurse.hospitalId,
    };
    onCancelRequest(cancelDetail);
  };

  return (
    <div className="requested-staff">
      <h3>Requested Staff</h3>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Hospital Staff</th>
            <th>Specialty</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((nurse) => (
            <tr key={nurse.id}>
              <td>{nurse.hospitalStaffId || "N/A"}</td>
              <td>{nurse.staffId}</td>
              <td>{new Date(nurse.requestedFrom).toLocaleDateString()}</td>
              <td>{new Date(nurse.requestedFrom).toLocaleTimeString()}</td>
              <td>{new Date(nurse.requestedUpto).toLocaleTimeString()}</td>
              <td>
                <button
                  className="cancel-btn"
                  onClick={() => cancelRequest(nurse)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {requestedNurses.length > itemsPerPage && (
        <nav className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-btn ${currentPage === number ? "active" : ""}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="page-btn"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export default RequestedStaff;
