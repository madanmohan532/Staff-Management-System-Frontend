// import React, { useState, useEffect } from "react";
// import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import styled, { createGlobalStyle } from "styled-components";
// import axios from "axios";

// // Global styles for body and font
// const GlobalStyle = createGlobalStyle`
//   @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
//   body {
//     font-family: 'Inter', sans-serif;
//     background-color: #f0f2f5;
//   }
// `;

// const AdminProfile = ({ adminData, onUpdate }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm({
//     mode: "onBlur",
//   });

//   const newPasswordValue = watch("newPassword");
//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (adminData) {
//       reset({
//         firstName: adminData.firstName || "",
//         lastName: adminData.lastName || "",
//         phone: adminData.contactDetails?.phone || "",
//         email: adminData.contactDetails?.email || "",
//         street: adminData.address?.street || "",
//         city: adminData.address?.city || "",
//         state: adminData.address?.state || "",
//         pincode: adminData.address?.pincode || "",
//         currentPassword: "",
//         newPassword: "",
//         confirmNewPassword: "",
//       });
//     }
//   }, [adminData, reset]);

//   const onSubmit = async (data) => {
//     setMessage("");
//     const payload = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       contactDetails: { phone: data.phone, email: data.email },
//       address: {
//         street: data.street,
//         city: data.city,
//         state: data.state,
//         pincode: data.pincode,
//       },
//     };

//     if (data.newPassword) {
//       payload.newPassword = data.newPassword;
//       payload.currentPassword = data.currentPassword;
//     }

//     try {
//       const response = await axios.put(
//         `http://localhost:9999/admin-service/api/admin/admin/${adminData._id}`,
//         payload
//       );
//       if (response.status === 200) {
//         setMessage("Profile updated successfully! ✅");
//         setIsEditing(false);
//         if (onUpdate) onUpdate(response.data);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error.response || error);
//       setMessage(
//         error.response?.status === 401
//           ? "Incorrect current password. Please try again. 🔒"
//           : "Error updating profile. Please try again later. ⚠️"
//       );
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     setIsEditing(false);
//     setMessage("");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <ProfileCard>
//         <CardTitle>Admin Profile</CardTitle>

//         {!isEditing && (
//           <CardHeaderActions>
//             <ActionIconWrapper
//               onClick={() => setIsEditing(true)}
//               title="Edit Profile"
//             >
//               <FaEdit className="edit-icon" />
//             </ActionIconWrapper>
//             <ActionIconWrapper onClick={handleLogout} title="Logout">
//               <FaSignOutAlt className="logout-icon" />
//             </ActionIconWrapper>
//           </CardHeaderActions>
//         )}

//         <DisplayForm>
//           <FormLayoutGrid>
//             <FormFieldGroup>
//               <label>First Name</label>
//               <input type="text" value={watch("firstName")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>Last Name</label>
//               <input type="text" value={watch("lastName")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>Phone</label>
//               <input type="text" value={watch("phone")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>Email</label>
//               <input type="email" value={watch("email")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroupFullWidth>
//               <label>Street</label>
//               <input type="text" value={watch("street")} disabled />
//             </FormFieldGroupFullWidth>
//             <FormFieldGroup>
//               <label>City</label>
//               <input type="text" value={watch("city")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>State</label>
//               <input type="text" value={watch("state")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>Pincode</label>
//               <input type="text" value={watch("pincode")} disabled />
//             </FormFieldGroup>
//             <FormFieldGroup>
//               <label>Password</label>
//               <input type="password" value="********" disabled />
//             </FormFieldGroup>
//           </FormLayoutGrid>
//         </DisplayForm>

//         <EditPanel isOpen={isEditing}>
//           <EditPanelHeader>
//             <h3>Edit Profile</h3>
//             <CloseIcon onClick={handleCancel} title="Cancel" />
//           </EditPanelHeader>
//           <EditForm onSubmit={handleSubmit(onSubmit)} noValidate>
//             <FormLayoutGridEdit>
//               <FormFieldGroup>
//                 <label>ID</label>
//                 <input type="text" value={adminData?.id || ""} disabled />
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Verification ID</label>
//                 <input
//                   type="text"
//                   value={adminData?.uniqueVerificationId || ""}
//                   disabled
//                 />
//               </FormFieldGroup>

//               <FormFieldGroupFullWidth>
//                 <h4>Change Password</h4>
//               </FormFieldGroupFullWidth>
//               <FormFieldGroup>
//                 <label>Current Password</label>
//                 <input
//                   type="password"
//                   {...register("currentPassword", {
//                     validate: (value) =>
//                       watch("newPassword") && !value
//                         ? "Current password is required"
//                         : true,
//                   })}
//                   placeholder="Enter current password"
//                 />
//                 {errors.currentPassword && (
//                   <FieldError>{errors.currentPassword.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>New Password</label>
//                 <input
//                   type="password"
//                   {...register("newPassword", {
//                     minLength: {
//                       value: 8,
//                       message: "Must be at least 8 characters",
//                     },
//                   })}
//                   placeholder="Enter new password"
//                 />
//                 {errors.newPassword && (
//                   <FieldError>{errors.newPassword.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Confirm New Password</label>
//                 <input
//                   type="password"
//                   {...register("confirmNewPassword", {
//                     validate: (value) =>
//                       value === newPasswordValue || "Passwords do not match",
//                   })}
//                   placeholder="Confirm new password"
//                 />
//                 {errors.confirmNewPassword && (
//                   <FieldError>{errors.confirmNewPassword.message}</FieldError>
//                 )}
//               </FormFieldGroup>

//               <FormFieldGroupFullWidth>
//                 <h4>Personal Details</h4>
//               </FormFieldGroupFullWidth>
//               <FormFieldGroup>
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   {...register("firstName", {
//                     required: "First Name is required.",
//                   })}
//                 />
//                 {errors.firstName && (
//                   <FieldError>{errors.firstName.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   {...register("lastName", {
//                     required: "Last Name is required.",
//                   })}
//                 />
//                 {errors.lastName && (
//                   <FieldError>{errors.lastName.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Phone</label>
//                 <input
//                   type="text"
//                   {...register("phone", {
//                     required: "Phone is required.",
//                     pattern: {
//                       value: /^[0-9]{10}$/,
//                       message: "Must be 10 digits.",
//                     },
//                   })}
//                 />
//                 {errors.phone && (
//                   <FieldError>{errors.phone.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required.",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email format.",
//                     },
//                   })}
//                 />
//                 {errors.email && (
//                   <FieldError>{errors.email.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroupFullWidth>
//                 <label>Street</label>
//                 <input
//                   type="text"
//                   {...register("street", { required: "Street is required." })}
//                 />
//                 {errors.street && (
//                   <FieldError>{errors.street.message}</FieldError>
//                 )}
//               </FormFieldGroupFullWidth>
//               <FormFieldGroup>
//                 <label>City</label>
//                 <input
//                   type="text"
//                   {...register("city", { required: "City is required." })}
//                 />
//                 {errors.city && <FieldError>{errors.city.message}</FieldError>}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>State</label>
//                 <input
//                   type="text"
//                   {...register("state", { required: "State is required." })}
//                 />
//                 {errors.state && (
//                   <FieldError>{errors.state.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//               <FormFieldGroup>
//                 <label>Pincode</label>
//                 <input
//                   type="text"
//                   {...register("pincode", {
//                     required: "Pincode is required.",
//                     pattern: {
//                       value: /^[0-9]{6}$/,
//                       message: "Must be 6 digits.",
//                     },
//                   })}
//                 />
//                 {errors.pincode && (
//                   <FieldError>{errors.pincode.message}</FieldError>
//                 )}
//               </FormFieldGroup>
//             </FormLayoutGridEdit>
//             <FormActions>
//               <Button type="submit" save>
//                 Save Changes
//               </Button>
//               <Button type="button" cancel onClick={handleCancel}>
//                 Cancel
//               </Button>
//             </FormActions>
//           </EditForm>
//           {message && <StatusAlert>{message}</StatusAlert>}
//         </EditPanel>
//       </ProfileCard>
//     </>
//   );
// };

// // Styled Components
// const ProfileCard = styled.div`
//   max-width: 800px;
//   margin: 40px auto;
//   padding: 30px;
//   background-color: #fff;
//   border-radius: 12px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//   position: relative;
//   overflow: hidden;
// `;

// const CardTitle = styled.h2`
//   text-align: center;
//   color: #1a237e;
//   margin-bottom: 30px;
//   font-size: 2rem;
//   font-weight: 600;
// `;

// const CardHeaderActions = styled.div`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   display: flex;
//   gap: 15px;
//   z-index: 5;
// `;

// const ActionIconWrapper = styled.div`
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: transform 0.2s ease-in-out;
//   font-size: 1.5rem;

//   .edit-icon {
//     color: #1a237e;
//   }
//   .logout-icon {
//     color: #d32f2f;
//   }

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const DisplayForm = styled.div`
//   background-color: #f8f9fa;
//   padding: 25px;
//   border-radius: 10px;
//   border: 1px solid #e0e0e0;
// `;

// const FormLayoutGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FormFieldGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;

//   label {
//     font-weight: 500;
//     margin-bottom: 8px;
//     color: #555;
//     font-size: 0.9rem;
//   }

//   input {
//     padding: 12px;
//     border: 1px solid #ccc;
//     border-radius: 8px;
//     font-size: 1rem;
//     background-color: #fff;
//     transition: border-color 0.3s, box-shadow 0.3s;

//     &:focus {
//       outline: none;
//       border-color: #1a237e;
//       box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
//     }

//     &:disabled {
//       background-color: #e9ecef;
//       color: #6c757d;
//       cursor: not-allowed;
//       border: 1px solid #dcdfe4;
//     }
//   }
// `;

// const FormFieldGroupFullWidth = styled(FormFieldGroup)`
//   grid-column: 1 / -1;
//   h4 {
//     margin: 1rem 0 0;
//     color: #1a237e;
//     border-bottom: 1px solid #e0e0e0;
//     padding-bottom: 0.5rem;
//   }
// `;

// const EditPanel = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   width: 450px;
//   max-width: 90vw;
//   height: 100vh;
//   background-color: #ffffff;
//   box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
//   transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
//   transition: transform 0.3s ease-in-out;
//   padding: 30px;
//   box-sizing: border-box;
//   overflow-y: auto;
//   z-index: 20;
// `;

// const EditPanelHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 25px;
//   padding-bottom: 15px;
//   border-bottom: 1px solid #e0e0e0;

//   h3 {
//     margin: 0;
//     font-size: 1.5rem;
//     color: #1a237e;
//   }
// `;

// const CloseIcon = styled(FaTimes)`
//   font-size: 1.5rem;
//   color: #777;
//   cursor: pointer;
//   transition: color 0.3s;
//   &:hover {
//     color: #d32f2f;
//   }
// `;

// const EditForm = styled.form``;

// const FormLayoutGridEdit = styled(FormLayoutGrid)`
//   grid-template-columns: 1fr;
//   gap: 15px;
//   @media (min-width: 768px) {
//     grid-template-columns: 1fr 1fr;
//     & > .form-field-group:nth-child(3),
//     & > .form-field-group:nth-child(4),
//     & > .form-field-group:nth-child(5) {
//       grid-column: 1 / -1;
//     }
//   }
// `;

// const FormActions = styled.div`
//   margin-top: 25px;
//   display: flex;
//   gap: 15px;
//   justify-content: flex-end;
// `;

// const Button = styled.button`
//   padding: 12px 25px;
//   font-size: 1rem;
//   font-weight: 500;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.3s, transform 0.2s;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

//   ${(props) =>
//     props.save &&
//     `
//     background-color: #4caf50;
//     color: #fff;
//     &:hover {
//       background-color: #388e3c;
//       transform: translateY(-2px);
//     }
//   `}

//   ${(props) =>
//     props.cancel &&
//     `
//     background-color: #f44336;
//     color: #fff;
//     &:hover {
//       background-color: #d32f2f;
//       transform: translateY(-2px);
//     }
//   `}
// `;

// const FieldError = styled.p`
//   color: #d32f2f;
//   font-size: 0.8rem;
//   margin-top: 5px;
// `;

// const StatusAlert = styled.p`
//   text-align: center;
//   margin-top: 20px;
//   font-size: 1rem;
//   font-weight: 500;
//   padding: 10px 15px;
//   border-radius: 8px;
//   background-color: #e3f2fd;
//   border: 1px solid #bbdefb;
//   color: #1a237e;
// `;

// export default AdminProfile;

import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import axios from "axios";

// Global styles for body and font
const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
  body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f2f5;
  }
`;

const AdminProfile = ({ adminData, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const newPasswordValue = watch("newPassword");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (adminData) {
      reset({
        firstName: adminData.firstName || "",
        lastName: adminData.lastName || "",
        phone: adminData.contactDetails?.phone || "",
        email: adminData.contactDetails?.email || "",
        street: adminData.address?.street || "",
        city: adminData.address?.city || "",
        state: adminData.address?.state || "",
        pincode: adminData.address?.pincode || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [adminData, reset]);

  const onSubmit = async (data) => {
    setMessage("");
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      contactDetails: { phone: data.phone, email: data.email },
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
      },
    };

    if (data.newPassword) {
      payload.newPassword = data.newPassword;
      payload.currentPassword = data.currentPassword;
    }

    try {
      const response = await axios.put(
        `http://localhost:9999/admin-service/api/admin/admin/${adminData._id}`,
        payload
      );
      if (response.status === 200) {
        setMessage("Profile updated successfully! ✅");
        setIsEditing(false);
        if (onUpdate) onUpdate(response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response || error);
      setMessage(
        error.response?.status === 401
          ? "Incorrect current password. Please try again. 🔒"
          : "Error updating profile. Please try again later. ⚠️"
      );
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setMessage("");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <GlobalStyle />
      <ProfileCard>
        <CardTitle>Admin Profile</CardTitle>

        {!isEditing && (
          <CardHeaderActions>
            <ActionIconWrapper
              onClick={() => setIsEditing(true)}
              title="Edit Profile"
            >
              <FaEdit className="edit-icon" />
            </ActionIconWrapper>
            <ActionIconWrapper onClick={handleLogout} title="Logout">
              <FaSignOutAlt className="logout-icon" />
            </ActionIconWrapper>
          </CardHeaderActions>
        )}

        <DisplayForm>
          <FormLayoutGrid>
            <FormFieldGroup>
              <label>First Name</label>
              <input type="text" value={watch("firstName")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>Last Name</label>
              <input type="text" value={watch("lastName")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>Phone</label>
              <input type="text" value={watch("phone")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>Email</label>
              <input type="email" value={watch("email")} disabled />
            </FormFieldGroup>
            <FormFieldGroupFullWidth>
              <label>Street</label>
              <input type="text" value={watch("street")} disabled />
            </FormFieldGroupFullWidth>
            <FormFieldGroup>
              <label>City</label>
              <input type="text" value={watch("city")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>State</label>
              <input type="text" value={watch("state")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>Pincode</label>
              <input type="text" value={watch("pincode")} disabled />
            </FormFieldGroup>
            <FormFieldGroup>
              <label>Password</label>
              <input type="password" value="********" disabled />
            </FormFieldGroup>
          </FormLayoutGrid>
        </DisplayForm>

        {isEditing && (
          <ModalOverlay onClick={handleCancel}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <h2>Edit Profile</h2>
                <CloseButton onClick={handleCancel}>&times;</CloseButton>
              </ModalHeader>
              <ModalForm onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormLayoutGridEdit>
                  <FormFieldGroup>
                    <label>ID</label>
                    <input type="text" value={adminData?._id || ""} disabled />
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>Verification ID</label>
                    <input
                      type="text"
                      value={adminData?.unique_verification_id || ""}
                      disabled
                    />
                  </FormFieldGroup>

                  <FormFieldGroupFullWidth>
                    <h4>Change Password</h4>
                  </FormFieldGroupFullWidth>
                  <FormFieldGroup>
                    <label>Current Password</label>
                    <input
                      type="password"
                      {...register("currentPassword", {
                        validate: (value) =>
                          watch("newPassword") && !value
                            ? "Current password is required"
                            : true,
                      })}
                      placeholder="Enter current password"
                    />
                    {errors.currentPassword && (
                      <FieldError>{errors.currentPassword.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>New Password</label>
                    <input
                      type="password"
                      {...register("newPassword", {
                        minLength: {
                          value: 8,
                          message: "Must be at least 8 characters",
                        },
                      })}
                      placeholder="Enter new password"
                    />
                    {errors.newPassword && (
                      <FieldError>{errors.newPassword.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroupFullWidth>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      {...register("confirmNewPassword", {
                        validate: (value) =>
                          value === newPasswordValue ||
                          "Passwords do not match",
                      })}
                      placeholder="Confirm new password"
                    />
                    {errors.confirmNewPassword && (
                      <FieldError>
                        {errors.confirmNewPassword.message}
                      </FieldError>
                    )}
                  </FormFieldGroupFullWidth>

                  <FormFieldGroupFullWidth>
                    <h4>Personal Details</h4>
                  </FormFieldGroupFullWidth>
                  <FormFieldGroup>
                    <label>First Name</label>
                    <input
                      type="text"
                      {...register("firstName", {
                        required: "First Name is required.",
                      })}
                    />
                    {errors.firstName && (
                      <FieldError>{errors.firstName.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", {
                        required: "Last Name is required.",
                      })}
                    />
                    {errors.lastName && (
                      <FieldError>{errors.lastName.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>Phone</label>
                    <input
                      type="text"
                      {...register("phone", {
                        required: "Phone is required.",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Must be 10 digits.",
                        },
                      })}
                    />
                    {errors.phone && (
                      <FieldError>{errors.phone.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>Email</label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format.",
                        },
                      })}
                    />
                    {errors.email && (
                      <FieldError>{errors.email.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroupFullWidth>
                    <label>Street</label>
                    <input
                      type="text"
                      {...register("street", {
                        required: "Street is required.",
                      })}
                    />
                    {errors.street && (
                      <FieldError>{errors.street.message}</FieldError>
                    )}
                  </FormFieldGroupFullWidth>
                  <FormFieldGroup>
                    <label>City</label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required." })}
                    />
                    {errors.city && (
                      <FieldError>{errors.city.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>State</label>
                    <input
                      type="text"
                      {...register("state", { required: "State is required." })}
                    />
                    {errors.state && (
                      <FieldError>{errors.state.message}</FieldError>
                    )}
                  </FormFieldGroup>
                  <FormFieldGroup>
                    <label>Pincode</label>
                    <input
                      type="text"
                      {...register("pincode", {
                        required: "Pincode is required.",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Must be 6 digits.",
                        },
                      })}
                    />
                    {errors.pincode && (
                      <FieldError>{errors.pincode.message}</FieldError>
                    )}
                  </FormFieldGroup>
                </FormLayoutGridEdit>
                <FormActions>
                  <Button type="submit" $save>
                    Save Changes
                  </Button>
                  <Button type="button" $cancel onClick={handleCancel}>
                    Cancel
                  </Button>
                </FormActions>
              </ModalForm>
              {message && <StatusAlert>{message}</StatusAlert>}
            </ModalContent>
          </ModalOverlay>
        )}
      </ProfileCard>
    </>
  );
};

// Styled Components
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideIn = keyframes`from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;

const ProfileCard = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
`;

const CardTitle = styled.h2`
  text-align: center;
  color: #1a237e;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
`;

const CardHeaderActions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 15px;
  z-index: 5;
`;

const ActionIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  font-size: 1.5rem;

  .edit-icon {
    color: #1a237e;
  }
  .logout-icon {
    color: #d32f2f;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const DisplayForm = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;

const FormLayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    font-weight: 500;
    margin-bottom: 8px;
    color: #555;
    font-size: 0.9rem;
  }

  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
      outline: none;
      border-color: #1a237e;
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
    }

    &:disabled {
      background-color: #e9ecef;
      color: #6c757d;
      cursor: not-allowed;
      border: 1px solid #dcdfe4;
    }
  }
`;

const FormFieldGroupFullWidth = styled(FormFieldGroup)`
  grid-column: 1 / -1;
  h4 {
    margin: 1rem 0 0;
    color: #1a237e;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
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

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${slideIn} 0.3s;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.header`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #d32f2f;
  }
`;

const ModalForm = styled.form`
  padding: 1.5rem;
  overflow-y: auto;
`;

const FormLayoutGridEdit = styled(FormLayoutGrid)`
  grid-template-columns: 1fr 1fr;
`;

const FormActions = styled.div`
  margin-top: 25px;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.$save &&
    `
    background-color: #4caf50;
    color: #fff;
    &:hover {
      background-color: #388e3c;
      transform: translateY(-2px);
    }
  `}

  ${(props) =>
    props.$cancel &&
    `
    background-color: #f44336;
    color: #fff;
    &:hover {
      background-color: #d32f2f;
      transform: translateY(-2px);
    }
  `}
`;

const FieldError = styled.p`
  color: #d32f2f;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const StatusAlert = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #e3f2fd;
  border: 1px solid #bbdefb;
  color: #1a237e;
`;

export default AdminProfile;
