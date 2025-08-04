// import React, { useState, useEffect } from "react";
// import { FiX } from "react-icons/fi";
// import "../Admin/Hospitals/EditHospitalModal.css"; // Use your provided css here

// const EditPatientModal = ({ patient, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     primaryReason: "",
//     secondaryReason: "",
//     treatment: "",
//     lastConsultedAt: "",
//     tablets: [],
//     injections: [],
//     tests: [],
//   });

//   useEffect(() => {
//     if (patient && patient.medicalInformation) {
//       setFormData({
//         primaryReason: patient.medicalInformation.primaryReason || "",
//         secondaryReason: patient.medicalInformation.secondaryReason || "",
//         treatment: patient.medicalInformation.treatment || "",
//         lastConsultedAt: patient.medicalInformation.lastConsultedAt || "",
//         tablets: patient.medicalInformation.medicines?.tablets || [],
//         injections: patient.medicalInformation.medicines?.injections || [],
//         tests: patient.medicalInformation.medicines?.tests || [],
//       });
//     }
//   }, [patient]);

//   // Handle input change helper
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Update arrays (tablets, injections, tests) as comma-separated strings
//   const handleArrayChange = (e, field) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean),
//     }));
//   };

//   // Format date for input type="datetime-local"
//   const formatDateTimeLocal = (isoString) => {
//     if (!isoString) return "";
//     const dt = new Date(isoString);
//     // Return in format yyyy-MM-ddTHH:mm (local)
//     return dt.toISOString().slice(0, 16);
//   };

//   const parseDateTimeLocal = (value) => {
//     if (!value) return "";
//     return new Date(value).toISOString();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedMedicalInfo = {
//       primaryReason: formData.primaryReason.trim(),
//       secondaryReason: formData.secondaryReason.trim(),
//       treatment: formData.treatment.trim(),
//       lastConsultedAt: parseDateTimeLocal(formData.lastConsultedAt),
//       medicines: {
//         tablets: formData.tablets,
//         injections: formData.injections,
//         tests: formData.tests,
//       },
//     };

//     const updatedPatient = {
//       ...patient,
//       medicalInformation: updatedMedicalInfo,
//     };

//     onSave(updatedPatient);
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div
//         className="modal"
//         onClick={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modalTitle"
//       >
//         <header className="modal-header">
//           <h2 id="modalTitle">Edit Patient Record</h2>
//           <button
//             className="btn-close"
//             onClick={onClose}
//             aria-label="Close Modal"
//           >
//             <FiX size={24} />
//           </button>
//         </header>

//         <form className="modal-form" onSubmit={handleSubmit}>
//           <div>
//             <strong>
//               {patient.firstName} {patient.lastName}
//             </strong>
//           </div>

//           <label>
//             Primary Reason<span className="required">*</span>:
//             <textarea
//               name="primaryReason"
//               value={formData.primaryReason}
//               onChange={handleChange}
//               required
//               rows={3}
//             />
//           </label>

//           <label>
//             Secondary Reason:
//             <input
//               type="text"
//               name="secondaryReason"
//               value={formData.secondaryReason}
//               onChange={handleChange}
//               placeholder="Secondary Reason"
//             />
//           </label>

//           <label>
//             Treatment:
//             <input
//               type="text"
//               name="treatment"
//               value={formData.treatment}
//               onChange={handleChange}
//               placeholder="Treatment details"
//             />
//           </label>

//           <label>
//             Last Consulted At:
//             <input
//               disabled="true"
//               type="datetime-local"
//               name="lastConsultedAt"
//               value={
//                 formData.lastConsultedAt
//                   ? formatDateTimeLocal(formData.lastConsultedAt)
//                   : ""
//               }
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   lastConsultedAt: e.target.value,
//                 }))
//               }
//             />
//           </label>

//           <label>
//             Tablets (comma separated):
//             <input
//               type="text"
//               value={formData.tablets.join(", ")}
//               onChange={(e) => {
//                 console.log(e.target.value);

//                 return handleArrayChange(e, "tablets");
//               }}
//               placeholder="Paracetamol, Antibiotics"
//             />
//           </label>

//           <label>
//             Injections (comma separated):
//             <input
//               type="text"
//               value={formData.injections.join(", ")}
//               onChange={(e) => handleArrayChange(e, "injections")}
//               placeholder="Painkiller"
//             />
//           </label>

//           <label>
//             Tests (comma separated):
//             <input
//               type="text"
//               value={formData.tests.join(", ")}
//               onChange={(e) => handleArrayChange(e, "tests")}
//               placeholder="CBC, Ultrasound"
//             />
//           </label>

//           <div className="modal-footer">
//             <button type="button" className="btn btn-cancel" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="btn btn-save">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPatientModal;

// import React, { useState, useEffect } from "react";
// import { FiX } from "react-icons/fi";
// import "./patient.css";

// const EditPatientModal = ({ patient, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     primaryReason: "",
//     secondaryReason: "",
//     treatment: "",
//     lastConsultedAt: "",
//     tabletsInput: "",
//     injectionsInput: "",
//     testsInput: "",
//   });

//   useEffect(() => {
//     if (patient && patient.medicalInformation) {
//       setFormData({
//         primaryReason: patient.medicalInformation.primaryReason || "",
//         secondaryReason: patient.medicalInformation.secondaryReason || "",
//         treatment: patient.medicalInformation.treatment || "",
//         lastConsultedAt: patient.medicalInformation.lastConsultedAt || "",
//         tabletsInput: (
//           patient.medicalInformation.medicines?.tablets || []
//         ).join(", "),
//         injectionsInput: (
//           patient.medicalInformation.medicines?.injections || []
//         ).join(", "),
//         testsInput: (patient.medicalInformation.medicines?.tests || []).join(
//           ", "
//         ),
//       });
//     }
//   }, [patient]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const formatDateTimeLocal = (isoString) => {
//     if (!isoString) return "";
//     const dt = new Date(isoString);
//     return dt.toISOString().slice(0, 16);
//   };

//   const parseDateTimeLocal = (value) => {
//     if (!value) return "";
//     return new Date(value).toISOString();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Helper to convert string to string array, trimmed and filtered empty
//     const parseStringToArray = (str) =>
//       str
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);

//     const updatedMedicalInfo = {
//       primaryReason: formData.primaryReason.trim(),
//       secondaryReason: formData.secondaryReason.trim(),
//       treatment: formData.treatment.trim(),
//       lastConsultedAt: parseDateTimeLocal(formData.lastConsultedAt),
//       medicines: {
//         tablets: parseStringToArray(formData.tabletsInput),
//         injections: parseStringToArray(formData.injectionsInput),
//         tests: parseStringToArray(formData.testsInput),
//       },
//     };

//     const updatedPatient = {
//       ...patient,
//       medicalInformation: updatedMedicalInfo,
//     };

//     onSave(updatedPatient);
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div
//         className="modal"
//         onClick={(e) => e.stopPropagation()}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="modalTitle"
//       >
//         <header className="modal-header">
//           <h2 id="modalTitle">Edit Patient Record</h2>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             <FiX size={24} />
//           </button>
//         </header>

//         <form className="modal-form" onSubmit={handleSubmit} noValidate>
//           <div>
//             <strong>
//               {patient.firstName} {patient.lastName}
//             </strong>
//           </div>

//           <label>
//             Primary Reason<span className="required">*</span>:
//             <textarea
//               name="primaryReason"
//               value={formData.primaryReason}
//               onChange={handleChange}
//               rows={3}
//               required
//             />
//           </label>

//           <label>
//             Secondary Reason:
//             <input
//               type="text"
//               name="secondaryReason"
//               value={formData.secondaryReason}
//               onChange={handleChange}
//               placeholder="Secondary Reason"
//             />
//           </label>

//           <label>
//             Treatment:
//             <input
//               type="text"
//               name="treatment"
//               value={formData.treatment}
//               onChange={handleChange}
//               placeholder="Treatment details"
//             />
//           </label>

//           <label>
//             Last Consulted At:
//             <input
//               type="datetime-local"
//               name="lastConsultedAt"
//               value={
//                 formData.lastConsultedAt
//                   ? formatDateTimeLocal(formData.lastConsultedAt)
//                   : ""
//               }
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   lastConsultedAt: e.target.value,
//                 }))
//               }
//             />
//           </label>

//           <label>
//             Tablets (comma separated):
//             <input
//               type="text"
//               name="tabletsInput"
//               value={formData.tabletsInput}
//               onChange={handleChange}
//               placeholder="Paracetamol, Antibiotics"
//             />
//           </label>

//           <label>
//             Injections (comma separated):
//             <input
//               type="text"
//               name="injectionsInput"
//               value={formData.injectionsInput}
//               onChange={handleChange}
//               placeholder="Painkiller"
//             />
//           </label>

//           <label>
//             Tests (comma separated):
//             <input
//               type="text"
//               name="testsInput"
//               value={formData.testsInput}
//               onChange={handleChange}
//               placeholder="CBC, Ultrasound"
//             />
//           </label>

//           <div className="modal-footer">
//             <button type="button" className="btn btn-cancel" onClick={onClose}>
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-save"
//               disabled={formData.primaryReason.trim() === ""}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPatientModal;

import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./patient.css";
import axios from "axios";

const EditPatientModal = ({ patient, nurseId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    primaryReason: "",
    secondaryReason: "",
    treatment: "",
    lastConsultedAt: "",
    tabletsInput: "",
    injectionsInput: "",
    testsInput: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (patient && patient.medicalInformation) {
      setFormData({
        primaryReason: patient.medicalInformation.primaryReason || "",
        secondaryReason: patient.medicalInformation.secondaryReason || "",
        treatment: patient.medicalInformation.treatment || "",
        lastConsultedAt: patient.medicalInformation.lastConsultedAt || "",
        tabletsInput: (
          patient.medicalInformation.medicines?.tablets || []
        ).join(", "),
        injectionsInput: (
          patient.medicalInformation.medicines?.injections || []
        ).join(", "),
        testsInput: (patient.medicalInformation.medicines?.tests || []).join(
          ", "
        ),
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const dt = new Date(isoString);
    return dt.toISOString().slice(0, 16);
  };

  const parseStringToArray = (str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Compose updated medical info
    const nowISO = new Date().toISOString();
    const updatedMedicalInfo = {
      primaryReason: formData.primaryReason.trim(),
      secondaryReason: formData.secondaryReason.trim(),
      treatment: formData.treatment.trim(),
      lastConsultedAt: nowISO,
      medicines: {
        tablets: parseStringToArray(formData.tabletsInput),
        injections: parseStringToArray(formData.injectionsInput),
        tests: parseStringToArray(formData.testsInput),
      },
    };

    // Compose the full updated patient object
    const updatedPatient = {
      ...patient,
      staffId: nurseId,
      medicalInformation: updatedMedicalInfo,
    };

    console.log(updatedPatient);

    try {
      // API call for PUT update
      const resp = axios
        .put(
          "http://localhost:9999/staff-service/api/nurse/updatePatientDetails",

          updatedPatient
        )
        .then((resp) => {
          console.log(resp.data);

          if (!resp.status === 200)
            throw new Error("Failed to update: " + resp.status);
          onSave(updatedPatient);
          onClose();
        });
    } catch (err) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <header className="modal-header">
          <h2 id="modalTitle">Edit Patient Record</h2>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close modal"
            disabled={saving}
          >
            <FiX size={24} />
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div>
            <strong>
              {patient.firstName} {patient.lastName}
            </strong>
          </div>
          <label>
            Primary Reason<span className="required">*</span>:
            <textarea
              name="primaryReason"
              value={formData.primaryReason}
              onChange={handleChange}
              rows={3}
              required
              disabled={saving}
            />
          </label>
          <label>
            Secondary Reason:
            <input
              type="text"
              name="secondaryReason"
              value={formData.secondaryReason}
              onChange={handleChange}
              placeholder="Secondary Reason"
              disabled={saving}
            />
          </label>
          <label>
            Treatment:
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Treatment details"
              disabled={saving}
            />
          </label>
          <label>
            Last Consulted At:
            <input
              type="datetime-local"
              name="lastConsultedAt"
              value={formatDateTimeLocal(formData.lastConsultedAt)}
              disabled
            />
          </label>
          <label>
            Tablets (comma separated):
            <input
              type="text"
              name="tabletsInput"
              value={formData.tabletsInput}
              onChange={handleChange}
              placeholder="Paracetamol, Antibiotics"
              disabled={saving}
            />
          </label>
          <label>
            Injections (comma separated):
            <input
              type="text"
              name="injectionsInput"
              value={formData.injectionsInput}
              onChange={handleChange}
              placeholder="Painkiller"
              disabled={saving}
            />
          </label>
          <label>
            Tests (comma separated):
            <input
              type="text"
              name="testsInput"
              value={formData.testsInput}
              onChange={handleChange}
              placeholder="CBC, Ultrasound"
              disabled={saving}
            />
          </label>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-save"
              disabled={formData.primaryReason.trim() === "" || saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
