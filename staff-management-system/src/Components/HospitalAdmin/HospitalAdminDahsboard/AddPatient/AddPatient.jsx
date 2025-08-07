// import React, { useState } from "react";
// import axios from "axios";
// import "./AddPatient.css";

// const AddPatient = ({ hospitalId }) => {
//   // Initial state for the patient form, matching the backend entity
//   const [patientData, setPatientData] = useState({
//     firstName: "",
//     lastName: "",
//     admitDate: "",
//     expectedDischargeDate: "",
//     associatedDoctor: "",
//     staffId: "",
//     floorNumber: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//     medicalInformation: {
//       primaryReason: "",
//       secondaryReason: "",
//       treatment: "",
//       lastConsultedAt: "",
//       medicines: {
//         tablets: [],
//         injections: [],
//         tests: [],
//       },
//     },
//   });

//   // State for dynamic medicine inputs
//   const [newTablet, setNewTablet] = useState("");
//   const [newInjection, setNewInjection] = useState("");
//   const [newTest, setNewTest] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData((prevData) => ({
//       ...prevData,
//       address: {
//         ...prevData.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleMedicalInfoChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData((prevData) => ({
//       ...prevData,
//       medicalInformation: {
//         ...prevData.medicalInformation,
//         [name]: value,
//       },
//     }));
//   };

//   const addMedicine = (type, value) => {
//     if (value.trim()) {
//       setPatientData((prevData) => ({
//         ...prevData,
//         medicalInformation: {
//           ...prevData.medicalInformation,
//           medicines: {
//             ...prevData.medicalInformation.medicines,
//             [type]: [
//               ...prevData.medicalInformation.medicines[type],
//               value.trim(),
//             ],
//           },
//         },
//       }));
//     }
//   };

//   const removeMedicine = (type, index) => {
//     setPatientData((prevData) => {
//       const newItems = prevData.medicalInformation.medicines[type].filter(
//         (_, i) => i !== index
//       );
//       return {
//         ...prevData,
//         medicalInformation: {
//           ...prevData.medicalInformation,
//           medicines: {
//             ...prevData.medicalInformation.medicines,
//             [type]: newItems,
//           },
//         },
//       };
//     });
//   };

//   const resetForm = () => {
//     setPatientData({
//       firstName: "",
//       lastName: "",
//       admitDate: "",
//       expectedDischargeDate: "",
//       associatedDoctor: "",
//       staffId: "",
//       floorNumber: "",
//       address: {
//         street: "",
//         city: "",
//         state: "",
//         pincode: "",
//       },
//       medicalInformation: {
//         primaryReason: "",
//         secondaryReason: "",
//         treatment: "",
//         lastConsultedAt: "",
//         medicines: {
//           tablets: [],
//           injections: [],
//           tests: [],
//         },
//       },
//     });
//     setNewTablet("");
//     setNewInjection("");
//     setNewTest("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     // Add hospitalId to the patient data
//     const payload = {
//       ...patientData,
//       hospitalId: hospitalId,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:9999/hospital-service/api/addPatient",
//         payload
//       );
//       if (response.status === 200) {
//         setMessage(
//           `Patient added successfully! Patient ID: ${response.data.patientId}`
//         );
//         resetForm();
//       }
//     } catch (error) {
//       console.error("Error adding patient:", error);
//       setMessage(
//         `Failed to add patient: ${error.response?.data || error.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-patient-container">
//       <h2>Add New Patient</h2>
//       {message && (
//         <div
//           className={`feedback-message ${
//             message.includes("Failed") ? "error" : "success"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="add-patient-form">
//         {/* Patient Details Section */}
//         <fieldset className="form-section">
//           <legend>Patient Details</legend>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={patientData.firstName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={patientData.lastName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="admitDate">Admit Date</label>
//             <input
//               type="date"
//               id="admitDate"
//               name="admitDate"
//               value={patientData.admitDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="expectedDischargeDate">
//               Expected Discharge Date
//             </label>
//             <input
//               type="date"
//               id="expectedDischargeDate"
//               name="expectedDischargeDate"
//               value={patientData.expectedDischargeDate}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="associatedDoctor">Associated Doctor</label>
//             <input
//               type="text"
//               id="associatedDoctor"
//               name="associatedDoctor"
//               value={patientData.associatedDoctor}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="staffId">Staff ID</label>
//             <input
//               type="text"
//               id="staffId"
//               name="staffId"
//               value={patientData.staffId}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="floorNumber">Floor Number</label>
//             <input
//               type="text"
//               id="floorNumber"
//               name="floorNumber"
//               value={patientData.floorNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </fieldset>

//         {/* Address Section */}
//         <fieldset className="form-section">
//           <legend>Address</legend>
//           <div className="form-group">
//             <label htmlFor="street">Street</label>
//             <input
//               type="text"
//               id="street"
//               name="street"
//               value={patientData.address.street}
//               onChange={handleAddressChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="city">City</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={patientData.address.city}
//               onChange={handleAddressChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="state">State</label>
//             <input
//               type="text"
//               id="state"
//               name="state"
//               value={patientData.address.state}
//               onChange={handleAddressChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="pincode">Pincode</label>
//             <input
//               type="text"
//               id="pincode"
//               name="pincode"
//               value={patientData.address.pincode}
//               onChange={handleAddressChange}
//             />
//           </div>
//         </fieldset>

//         {/* Medical Information Section */}
//         <fieldset className="form-section">
//           <legend>Medical Information</legend>
//           <div className="form-group">
//             <label htmlFor="primaryReason">Primary Reason</label>
//             <textarea
//               id="primaryReason"
//               name="primaryReason"
//               value={patientData.medicalInformation.primaryReason}
//               onChange={handleMedicalInfoChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="secondaryReason">Secondary Reason</label>
//             <textarea
//               id="secondaryReason"
//               name="secondaryReason"
//               value={patientData.medicalInformation.secondaryReason}
//               onChange={handleMedicalInfoChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="treatment">Treatment</label>
//             <textarea
//               id="treatment"
//               name="treatment"
//               value={patientData.medicalInformation.treatment}
//               onChange={handleMedicalInfoChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastConsultedAt">Last Consulted At</label>
//             <input
//               type="datetime-local"
//               id="lastConsultedAt"
//               name="lastConsultedAt"
//               value={patientData.medicalInformation.lastConsultedAt}
//               onChange={handleMedicalInfoChange}
//             />
//           </div>

//           {/* Medicines Section */}
//           <div className="medicines-group">
//             <label>Medicines</label>
//             <div className="medicine-list-container">
//               <div className="medicine-list-item">
//                 <label>Tablets</label>
//                 <div className="add-item-control">
//                   <input
//                     type="text"
//                     value={newTablet}
//                     onChange={(e) => setNewTablet(e.target.value)}
//                     placeholder="Add tablet..."
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       addMedicine("tablets", newTablet);
//                       setNewTablet("");
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <ul className="added-items">
//                   {patientData.medicalInformation.medicines.tablets.map(
//                     (item, index) => (
//                       <li key={index}>
//                         {item}
//                         <button
//                           type="button"
//                           onClick={() => removeMedicine("tablets", index)}
//                         >
//                           &times;
//                         </button>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//               <div className="medicine-list-item">
//                 <label>Injections</label>
//                 <div className="add-item-control">
//                   <input
//                     type="text"
//                     value={newInjection}
//                     onChange={(e) => setNewInjection(e.target.value)}
//                     placeholder="Add injection..."
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       addMedicine("injections", newInjection);
//                       setNewInjection("");
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <ul className="added-items">
//                   {patientData.medicalInformation.medicines.injections.map(
//                     (item, index) => (
//                       <li key={index}>
//                         {item}
//                         <button
//                           type="button"
//                           onClick={() => removeMedicine("injections", index)}
//                         >
//                           &times;
//                         </button>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//               <div className="medicine-list-item">
//                 <label>Tests</label>
//                 <div className="add-item-control">
//                   <input
//                     type="text"
//                     value={newTest}
//                     onChange={(e) => setNewTest(e.target.value)}
//                     placeholder="Add test..."
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       addMedicine("tests", newTest);
//                       setNewTest("");
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//                 <ul className="added-items">
//                   {patientData.medicalInformation.medicines.tests.map(
//                     (item, index) => (
//                       <li key={index}>
//                         {item}
//                         <button
//                           type="button"
//                           onClick={() => removeMedicine("tests", index)}
//                         >
//                           &times;
//                         </button>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </fieldset>

//         <button type="submit" className="submit-btn" disabled={loading}>
//           {loading ? "Adding Patient..." : "Add Patient"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPatient;

import React, { useState } from "react";
import axios from "axios";
import "./AddPatient.css"; // Assuming this CSS file exists for styling

const initialPatientData = {
  firstName: "",
  lastName: "",
  admitDate: "",
  expectedDischargeDate: "",
  associatedDoctor: "",
  staffId: "",
  floorNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    pincode: "",
  },
  medicalInformation: {
    primaryReason: "",
    secondaryReason: "",
    treatment: "",
    lastConsultedAt: "",
    medicines: {
      tablets: [],
      injections: [],
      tests: [],
    },
  },
};

const AddPatient = ({ hospitalId }) => {
  const [patientData, setPatientData] = useState(initialPatientData);
  const [newTablet, setNewTablet] = useState("");
  const [newInjection, setNewInjection] = useState("");
  const [newTest, setNewTest] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleMedicalInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      medicalInformation: {
        ...prevData.medicalInformation,
        [name]: value,
      },
    }));
  };

  const addMedicine = (type, value) => {
    if (value.trim()) {
      setPatientData((prevData) => ({
        ...prevData,
        medicalInformation: {
          ...prevData.medicalInformation,
          medicines: {
            ...prevData.medicalInformation.medicines,
            [type]: [
              ...prevData.medicalInformation.medicines[type],
              value.trim(),
            ],
          },
        },
      }));
    }
  };

  const removeMedicine = (type, index) => {
    setPatientData((prevData) => {
      const newItems = prevData.medicalInformation.medicines[type].filter(
        (_, i) => i !== index
      );
      return {
        ...prevData,
        medicalInformation: {
          ...prevData.medicalInformation,
          medicines: {
            ...prevData.medicalInformation.medicines,
            [type]: newItems,
          },
        },
      };
    });
  };

  const resetForm = () => {
    setPatientData(initialPatientData);
    setNewTablet("");
    setNewInjection("");
    setNewTest("");
  };

  const validateForm = () => {
    let formErrors = {};

    // Patient Details
    if (!patientData.firstName)
      formErrors.firstName = "First name is required.";
    if (!patientData.lastName) formErrors.lastName = "Last name is required.";
    if (!patientData.admitDate)
      formErrors.admitDate = "Admit date is required.";
    if (!patientData.associatedDoctor)
      formErrors.associatedDoctor = "Associated doctor is required.";
    if (!patientData.floorNumber)
      formErrors.floorNumber = "Floor number is required.";

    // Medical Information
    if (!patientData.medicalInformation.primaryReason)
      formErrors.primaryReason = "Primary reason is required.";

    // Date validation
    const admitDate = new Date(patientData.admitDate);
    const dischargeDate = patientData.expectedDischargeDate
      ? new Date(patientData.expectedDischargeDate)
      : null;
    if (dischargeDate && dischargeDate <= admitDate) {
      formErrors.expectedDischargeDate =
        "Discharge date must be after admit date.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setMessage("Please correct the form errors.");
      return;
    }

    setLoading(true);
    setMessage("");

    const payload = {
      ...patientData,
      hospitalId: hospitalId,
    };

    console.log(payload);

    try {
      const response = await axios.post(
        "http://localhost:9999/hospital-service/api/hospital/addPatient",
        payload
      );
      if (response.status === 200) {
        setMessage(
          `Patient added successfully! Patient name: ${response.data.firstName}`
        );
        resetForm();
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      setMessage(
        `Failed to add patient: ${error.response?.data || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-patient-container">
      <h2>Add New Patient</h2>
      {message && (
        <div
          className={`feedback-message ${
            message.includes("Failed") || message.includes("correct the form")
              ? "error"
              : "success"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="add-patient-form">
        {/* Patient Details Section */}
        <fieldset className="form-section">
          <legend>Patient Details</legend>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={patientData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={patientData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="admitDate">Admit Date</label>
            <input
              type="date"
              id="admitDate"
              name="admitDate"
              value={patientData.admitDate}
              onChange={handleInputChange}
              required
            />
            {errors.admitDate && (
              <span className="error-message">{errors.admitDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="expectedDischargeDate">
              Expected Discharge Date
            </label>
            <input
              type="date"
              id="expectedDischargeDate"
              name="expectedDischargeDate"
              value={patientData.expectedDischargeDate}
              onChange={handleInputChange}
            />
            {errors.expectedDischargeDate && (
              <span className="error-message">
                {errors.expectedDischargeDate}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="associatedDoctor">Associated Doctor</label>
            <input
              type="text"
              id="associatedDoctor"
              name="associatedDoctor"
              value={patientData.associatedDoctor}
              onChange={handleInputChange}
              required
            />
            {errors.associatedDoctor && (
              <span className="error-message">{errors.associatedDoctor}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="staffId">Staff ID</label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={patientData.staffId}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber">Floor Number</label>
            <input
              type="text"
              id="floorNumber"
              name="floorNumber"
              value={patientData.floorNumber}
              onChange={handleInputChange}
              required
            />
            {errors.floorNumber && (
              <span className="error-message">{errors.floorNumber}</span>
            )}
          </div>
        </fieldset>

        {/* Address Section */}
        <fieldset className="form-section">
          <legend>Address</legend>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={patientData.address.street}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={patientData.address.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={patientData.address.state}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={patientData.address.pincode}
              onChange={handleAddressChange}
            />
          </div>
        </fieldset>

        {/* Medical Information Section */}
        <fieldset className="form-section">
          <legend>Medical Information</legend>
          <div className="form-group">
            <label htmlFor="primaryReason">Primary Reason</label>
            <textarea
              id="primaryReason"
              name="primaryReason"
              value={patientData.medicalInformation.primaryReason}
              onChange={handleMedicalInfoChange}
              required
            />
            {errors.primaryReason && (
              <span className="error-message">{errors.primaryReason}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="secondaryReason">Secondary Reason</label>
            <textarea
              id="secondaryReason"
              name="secondaryReason"
              value={patientData.medicalInformation.secondaryReason}
              onChange={handleMedicalInfoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="treatment">Treatment</label>
            <textarea
              id="treatment"
              name="treatment"
              value={patientData.medicalInformation.treatment}
              onChange={handleMedicalInfoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastConsultedAt">Last Consulted At</label>
            <input
              type="datetime-local"
              id="lastConsultedAt"
              name="lastConsultedAt"
              value={patientData.medicalInformation.lastConsultedAt}
              onChange={handleMedicalInfoChange}
            />
          </div>

          {/* Medicines Section */}
          <div className="medicines-group">
            <label>Medicines</label>
            <div className="medicine-list-container">
              <div className="medicine-list-item">
                <label>Tablets</label>
                <div className="add-item-control">
                  <input
                    type="text"
                    value={newTablet}
                    onChange={(e) => setNewTablet(e.target.value)}
                    placeholder="Add tablet..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addMedicine("tablets", newTablet);
                      setNewTablet("");
                    }}
                  >
                    Add
                  </button>
                </div>
                <ul className="added-items">
                  {patientData.medicalInformation.medicines.tablets.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                        <button
                          type="button"
                          onClick={() => removeMedicine("tablets", index)}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="medicine-list-item">
                <label>Injections</label>
                <div className="add-item-control">
                  <input
                    type="text"
                    value={newInjection}
                    onChange={(e) => setNewInjection(e.target.value)}
                    placeholder="Add injection..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addMedicine("injections", newInjection);
                      setNewInjection("");
                    }}
                  >
                    Add
                  </button>
                </div>
                <ul className="added-items">
                  {patientData.medicalInformation.medicines.injections.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                        <button
                          type="button"
                          onClick={() => removeMedicine("injections", index)}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="medicine-list-item">
                <label>Tests</label>
                <div className="add-item-control">
                  <input
                    type="text"
                    value={newTest}
                    onChange={(e) => setNewTest(e.target.value)}
                    placeholder="Add test..."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addMedicine("tests", newTest);
                      setNewTest("");
                    }}
                  >
                    Add
                  </button>
                </div>
                <ul className="added-items">
                  {patientData.medicalInformation.medicines.tests.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                        <button
                          type="button"
                          onClick={() => removeMedicine("tests", index)}
                        >
                          &times;
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding Patient..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
