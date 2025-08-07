import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./ChangePasswordModal.css"; // Dedicated CSS for this modal

const ChangePasswordModal = ({ nurseId, onClose, onPasswordChangeSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      // In a real application, you would send currentPassword to the backend
      // for verification against the stored hash. The backend would then
      // hash the newPassword and update it.
      const response = await axios.put(
        `http://localhost:9999/staff-service/api/nurse/changePassword/${nurseId}`,
        {
          currentPassword: currentPassword, // Send current password for backend validation
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        setMessage("Password changed successfully!");
        // Clear fields on success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        // Notify parent component of success
        if (onPasswordChangeSuccess) {
          onPasswordChangeSuccess("Password updated successfully!");
        }
        // Automatically close modal after a short delay
        setTimeout(onClose, 1500);
      } else {
        setMessage(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error);
      setMessage(
        error.response?.data?.message ||
          "Error changing password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content change-password-modal">
        <div className="modal-header">
          <h3>Change Password</h3>
          <FaTimes
            className="close-icon"
            onClick={onClose}
            aria-label="Close"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {message && (
            <p
              className={`status-message ${
                message.includes("success") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
