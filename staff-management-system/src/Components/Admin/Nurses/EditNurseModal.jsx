import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./editnursemodal.css";
import { Button, Box, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";

const EditNurseModal = ({ nurse, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    availableStatus: true,
    phone: "",
    email: "",
    certificate: null,
    yearOfExperience: 0,
    password: "",
    certificateNumber: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    currentWorkingStatus: true,
    skills: "",
    selfDescription: "",
    registrationStatus: "approved",
  });
  const [preview, setPreview] = useState(null);
  const [newCertificate, setNewCertificate] = useState(null);

  useEffect(() => {
    if (nurse) {
      setFormData({
        firstName: nurse.firstName || "",
        lastName: nurse.lastName || "",
        availableStatus: nurse.availableStatus || true,
        phone: nurse.contactDetails?.phone || "",
        email: nurse.contactDetails?.email || "",
        certificate: nurse.certificate,
        yearOfExperience: nurse.yearOfExperience || 0,
        password: nurse.password || "",
        certificateNumber: nurse.certificateNumber || "",
        street: nurse.address?.street || "",
        city: nurse.address?.city || "",
        state: nurse.address?.state || "",
        pincode: nurse.address?.pincode || "",
        currentWorkingStatus: nurse.currentWorkingStatus || true,
        skills: (nurse.skills || []).join(", "),
        selfDescription: nurse.selfDescription || "",
        registrationStatus: nurse.registrationStatus || "approved",
      });
    }
  }, [nurse]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "certificate") {
      const file = files[0];
      if (file) {
        setNewCertificate(file);

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If a new certificate was uploaded, convert it to base64
    const saveCertificate = async () => {
      if (newCertificate) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(newCertificate);
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
          };
        });
      }
      return Promise.resolve(formData.certificate);
    };

    saveCertificate().then((certificateData) => {
      const updated = {
        ...nurse,
        firstName: formData.firstName,
        lastName: formData.lastName,
        availableStatus: formData.availableStatus,
        contactDetails: {
          phone: formData.phone,
          email: formData.email,
        },
        certificate: certificateData,
        yearOfExperience: formData.yearOfExperience,
        password: formData.password,
        certificateNumber: formData.certificateNumber,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        currentWorkingStatus: formData.currentWorkingStatus,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        selfDescription: formData.selfDescription,
        registrationStatus: formData.registrationStatus,
      };

      onSave(updated);
    });
  };

  const handleViewCertificate = () => {
    if (!formData.certificate) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<iframe src="${formData.certificate}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
      );
      newWindow.document.title = "Certificate Preview";
    }
  };

  const getFileIcon = () => {
    if (!formData.certificate) return null;

    // Check if certificate is PDF
    if (
      formData.certificate.startsWith("data:application/pdf") ||
      (formData.certificate.length > 100 &&
        !formData.certificate.startsWith("data:image"))
    ) {
      return (
        <PictureAsPdfIcon sx={{ fontSize: 50, color: "var(--secondary)" }} />
      );
    }
    return <ImageIcon sx={{ fontSize: 50, color: "var(--secondary)" }} />;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Edit Nurse</h2>
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <FiX size={24} />
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <label style={{ flex: 1 }}>
              First Name<span className="required">*</span>:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
              />
            </label>
            <label style={{ flex: 1 }}>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </label>
          </div>

          <fieldset>
            <legend>Contact Details</legend>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </label>
          </fieldset>

          <fieldset>
            <legend>Address</legend>
            <label>
              Street:
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
              />
            </label>
            <label>
              Pincode:
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </label>
          </fieldset>

          <label>
            Certificate Number:
            <input
              type="text"
              name="certificateNumber"
              value={formData.certificateNumber}
              onChange={handleChange}
              placeholder="Certificate Number"
            />
          </label>

          <label>
            Years of Experience:
            <input
              type="number"
              name="yearOfExperience"
              value={formData.yearOfExperience}
              onChange={handleChange}
              min="0"
              step="0.5"
              placeholder="Years of Experience"
            />
          </label>

          {/* Certificate Section */}
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Current Certificate:
            </Typography>

            {formData.certificate ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed var(--text-secondary)",
                  padding: 2,
                  borderRadius: 1,
                }}
              >
                {formData.certificate.startsWith("data:image/") ? (
                  <img
                    src={formData.certificate}
                    alt="Current Certificate"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                ) : (
                  <>
                    {getFileIcon()}
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {formData.certificate.startsWith("data:application/pdf")
                        ? "PDF Document"
                        : "File"}
                    </Typography>
                  </>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleViewCertificate}
                >
                  View Certificate
                </Button>
              </Box>
            ) : (
              <Typography variant="body2">No certificate uploaded</Typography>
            )}
          </Box>

          {/* Upload New Certificate */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Upload New Certificate:
            </Typography>
            <input
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              style={{ display: "none" }}
              id="certificate-upload"
              type="file"
              name="certificate"
              onChange={handleChange}
            />
            <label htmlFor="certificate-upload">
              <Button variant="contained" component="span">
                Select File
              </Button>
            </label>
            {newCertificate && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                Selected: {newCertificate.name}
              </Typography>
            )}
          </Box>

          {/* Preview of New Certificate */}
          {preview && (
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                New Certificate Preview:
              </Typography>
              <img
                src={preview}
                alt="New Certificate Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </label>

          <label>
            Skills (comma-separated):
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="ICU Care, Pediatric Nursing, etc."
            />
          </label>

          <label>
            Self Description:
            <textarea
              name="selfDescription"
              value={formData.selfDescription}
              onChange={handleChange}
              placeholder="Brief description about yourself"
              rows="3"
            />
          </label>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                name="availableStatus"
                checked={formData.availableStatus}
                onChange={handleChange}
              />
              Currently Available
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                name="currentWorkingStatus"
                checked={formData.currentWorkingStatus}
                onChange={handleChange}
              />
              Currently Working
            </label>
          </div>

          <label>
            Registration Status:
            <select
              name="registrationStatus"
              value={formData.registrationStatus}
              onChange={handleChange}
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNurseModal;
