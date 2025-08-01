import React, { useState } from "react";
import "../HospitalAdminDahsboard/RequestedStaff.css";

const RequestedStaffTab = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([
    {
      id: 1,
      nurseName: "Alex Morgan",
      date: "2023-06-15",
      fromTime: "08:00",
      toTime: "16:00",
      department: "Emergency",
      status: "Pending",
    },
    {
      id: 2,
      nurseName: "Taylor Swift",
      date: "2023-06-18",
      fromTime: "08:00",
      toTime: "16:00",
      department: "Pediatrics",
      status: "Approved",
    },
    {
      id: 3,
      nurseName: "Jamie Lee",
      date: "2023-06-16",
      fromTime: "16:00",
      toTime: "24:00",
      department: "ICU",
      status: "Pending",
    },
  ]);

  const handleCancel = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setEditModalOpen(true);
  };

  const handleSave = (updatedRequest) => {
    setRequests(
      requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className="requested-staff-tab">
      <h2>Requested Staff</h2>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Nurse Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.nurseName}</td>
                <td>{request.date}</td>
                <td>
                  {request.fromTime} - {request.toTime}
                </td>
                <td>{request.department}</td>
                <td>
                  <span
                    className={`status-badge ${request.status.toLowerCase()}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(request)}
                  >
                    Edit
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(request.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && selectedRequest && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Request</h3>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={selectedRequest.date}
                onChange={(e) =>
                  setSelectedRequest({
                    ...selectedRequest,
                    date: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>From Time</label>
                <input
                  type="time"
                  value={selectedRequest.fromTime}
                  onChange={(e) =>
                    setSelectedRequest({
                      ...selectedRequest,
                      fromTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>To Time</label>
                <input
                  type="time"
                  value={selectedRequest.toTime}
                  onChange={(e) =>
                    setSelectedRequest({
                      ...selectedRequest,
                      toTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                value={selectedRequest.department}
                onChange={(e) =>
                  setSelectedRequest({
                    ...selectedRequest,
                    department: e.target.value,
                  })
                }
              >
                <option value="Emergency">Emergency</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Cardiology">Cardiology</option>
              </select>
            </div>

            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={() => handleSave(selectedRequest)}
              >
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedStaffTab;
