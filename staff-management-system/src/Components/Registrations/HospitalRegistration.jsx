// // // import React, { useState } from "react";
// // // import {
// // //   FaHospital,
// // //   FaUserTie,
// // //   FaIdCard,
// // //   FaLock,
// // //   FaPhone,
// // //   FaEnvelope,
// // //   FaMapMarkerAlt,
// // // } from "react-icons/fa";
// // // import { MdHealthAndSafety } from "react-icons/md";
// // // import { useForm } from "react-hook-form";
// // // import { yupResolver } from "@hookform/resolvers/yup";
// // // import * as yup from "yup";
// // // import styled from "styled-components";
// // // import axios from "axios";

// // // // Validation schema
// // // const schema = yup.object().shape({
// // //   name: yup.string().required("Hospital name is required"),
// // //   ceoName: yup.string().required("CEO name is required"),
// // //   kmcNumber: yup.string().required("KMC number is required"),
// // //   password: yup
// // //     .string()
// // //     .required("Password is required")
// // //     .min(8, "Password must be at least 8 characters"),
// // //   contactDetails: yup.object().shape({
// // //     email: yup.string().email("Invalid email").required("Email is required"),
// // //     phone: yup.string().required("Phone number is required"),
// // //   }),
// // //   address: yup.object().shape({
// // //     street: yup.string().required("Street address is required"),
// // //     city: yup.string().required("City is required"),
// // //     state: yup.string().required("State is required"),
// // //     zipCode: yup.string().required("Zip code is required"),
// // //     country: yup.string().required("Country is required"),
// // //   }),
// // //   certificate: yup
// // //     .mixed()
// // //     .required("Certificate is required")
// // //     .test(
// // //       "fileSize",
// // //       "File too large",
// // //       (value) =>
// // //         !value || (typeof value === "string" && value.length < 10000000) // ~10MB
// // //     )
// // //     .test(
// // //       "fileFormat",
// // //       "Unsupported format",
// // //       (value) =>
// // //         !value ||
// // //         (typeof value === "string" &&
// // //           value.match(
// // //             /^data:(image\/jpeg|image\/png|application\/pdf);base64,/
// // //           ))
// // //     ),
// // // });

// // // const HospitalRegistration = () => {
// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors },
// // //     setValue,
// // //   } = useForm({
// // //     resolver: yupResolver(schema),
// // //     defaultValues: {
// // //       contactDetails: { email: "", phone: "" },
// // //       address: { street: "", city: "", state: "", zipCode: "", country: "" },
// // //     },
// // //   });

// // //   const [isSubmitting, setIsSubmitting] = useState(false);
// // //   const [certificateFile, setCertificateFile] = useState(null);

// // //   const onSubmit = (data) => {
// // //     const contactDetails = data.contactDetails || {};
// // //     setIsSubmitting(true);
// // //     console.log(data);
// // //     // API call would go here

// // //     const registrationData = {
// // //       name: data.name,
// // //       ceoName: data.ceoName,
// // //       certificate: data.certificate, // base64 string
// // //       kmcNumber: data.kmcNumber,
// // //       password: data.password,
// // //       contactDetails: {
// // //         email: data.contactDetails.email,
// // //         phone: data.contactDetails.phone,
// // //       },
// // //       address: {
// // //         street: data.address.street,
// // //         city: data.address.city,
// // //         state: data.address.state,
// // //         zipCode: data.address.zipCode,
// // //         country: data.address.country,
// // //       },
// // //     };

// // //     axios
// // //       .post(
// // //         "http://localhost:9999/registration-service/api/registration/hospital",
// // //         registrationData
// // //       )
// // //       .then((response) => {
// // //         if (response.status === 201) {
// // //           console.log("Registration successful:", response.data);
// // //           alert("Registration Details Recieved, Verification is in progress");
// // //           // Redirect or reset form
// // //         } else {
// // //           log("Registration failed:", response);
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.error("Error during registration:", error);
// // //       });

// // //     setTimeout(() => {
// // //       setIsSubmitting(false);
// // //       alert("Registration successful!");
// // //     }, 1500);
// // //   };

// // //   return (
// // //     <RegistrationContainer>
// // //       <FormContainer>
// // //         <Header>
// // //           <HospitalIcon>
// // //             <MdHealthAndSafety />
// // //           </HospitalIcon>
// // //           <Title>Hospital Registration</Title>
// // //           <Subtitle>Join our network of healthcare providers</Subtitle>
// // //         </Header>

// // //         <Form onSubmit={handleSubmit(onSubmit)}>
// // //           <FormSection>
// // //             <SectionTitle>Hospital Information</SectionTitle>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaHospital />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("name")}
// // //                 placeholder="Hospital Name"
// // //                 hasError={errors.name}
// // //               />
// // //               {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaUserTie />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("ceoName")}
// // //                 placeholder="CEO Name"
// // //                 hasError={errors.ceoName}
// // //               />
// // //               {errors.ceoName && (
// // //                 <ErrorText>{errors.ceoName.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             {/* <InputGroup>
// // //               <InputIcon>
// // //                 <FaIdCard />
// // //               </InputIcon>
// // //               <FileInputContainer>
// // //                 <FileInputLabel hasError={errors.certificate}>
// // //                   {certificateFile
// // //                     ? certificateFile.name
// // //                     : "Upload Certificate"}
// // //                   <HiddenFileInput
// // //                     type="file"
// // //                     accept=".pdf,.jpg,.jpeg,.png"
// // //                     onChange={(e) => {
// // //                       const file = e.target.files[0];
// // //                       if (file) {
// // //                         const reader = new FileReader();
// // //                         reader.onloadend = () => {
// // //                           setValue("certificate", reader.result); // Store as base64
// // //                           setCertificateFile(file);
// // //                         };
// // //                         reader.readAsDataURL(file);
// // //                       }
// // //                     }}
// // //                   />
// // //                 </FileInputLabel>
// // //                 {errors.certificate && (
// // //                   <ErrorText>{errors.certificate.message}</ErrorText>
// // //                 )}
// // //               </FileInputContainer>
// // //             </InputGroup> */}

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaIdCard />
// // //               </InputIcon>
// // //               <FileInputWrapper>
// // //                 <FileInput
// // //                   type="text"
// // //                   placeholder="Certificate File"
// // //                   value={certificateFile ? certificateFile.name : ""}
// // //                   readOnly
// // //                   hasError={errors.certificate}
// // //                 />
// // //                 <FileButton>
// // //                   Browse
// // //                   <HiddenFileInput
// // //                     type="file"
// // //                     accept=".pdf,.jpg,.jpeg,.png"
// // //                     onChange={(e) => {
// // //                       const file = e.target.files[0];
// // //                       if (file) {
// // //                         const reader = new FileReader();
// // //                         reader.onloadend = () => {
// // //                           const base64String = reader.result.split(",")[1]; // Gets only the base64 part
// // //                           setValue("certificate", base64String);
// // //                           setCertificateFile(file);
// // //                         };
// // //                         reader.readAsDataURL(file);
// // //                       }
// // //                     }}
// // //                   />
// // //                 </FileButton>
// // //               </FileInputWrapper>
// // //               {errors.certificate && (
// // //                 <ErrorText>{errors.certificate.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <MdHealthAndSafety />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("kmcNumber")}
// // //                 placeholder="KMC Number"
// // //                 hasError={errors.kmcNumber}
// // //               />
// // //               {errors.kmcNumber && (
// // //                 <ErrorText>{errors.kmcNumber.message}</ErrorText>
// // //               )}
// // //             </InputGroup>
// // //           </FormSection>

// // //           <FormSection>
// // //             <SectionTitle>Security</SectionTitle>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaLock />
// // //               </InputIcon>
// // //               <Input
// // //                 type="password"
// // //                 {...register("password")}
// // //                 placeholder="Password"
// // //                 hasError={errors.password}
// // //               />
// // //               {errors.password && (
// // //                 <ErrorText>{errors.password.message}</ErrorText>
// // //               )}
// // //             </InputGroup>
// // //           </FormSection>

// // //           <FormSection>
// // //             <SectionTitle>Contact Details</SectionTitle>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaEnvelope />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("contactDetails.email")}
// // //                 placeholder="Email"
// // //                 hasError={errors.contactDetails?.email}
// // //               />
// // //               {errors.contactDetails?.email && (
// // //                 <ErrorText>{errors.contactDetails.email.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaPhone />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("contactDetails.phone")}
// // //                 placeholder="Phone Number"
// // //                 hasError={errors.contactDetails?.phone}
// // //               />
// // //               {errors.contactDetails?.phone && (
// // //                 <ErrorText>{errors.contactDetails.phone.message}</ErrorText>
// // //               )}
// // //             </InputGroup>
// // //           </FormSection>

// // //           <FormSection>
// // //             <SectionTitle>Address</SectionTitle>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaMapMarkerAlt />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("address.street")}
// // //                 placeholder="Street Address"
// // //                 hasError={errors.address?.street}
// // //               />
// // //               {errors.address?.street && (
// // //                 <ErrorText>{errors.address.street.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaMapMarkerAlt />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("address.city")}
// // //                 placeholder="City"
// // //                 hasError={errors.address?.city}
// // //               />
// // //               {errors.address?.city && (
// // //                 <ErrorText>{errors.address.city.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaMapMarkerAlt />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("address.state")}
// // //                 placeholder="State/Province"
// // //                 hasError={errors.address?.state}
// // //               />
// // //               {errors.address?.state && (
// // //                 <ErrorText>{errors.address.state.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaMapMarkerAlt />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("address.zipCode")}
// // //                 placeholder="Zip/Postal Code"
// // //                 hasError={errors.address?.zipCode}
// // //               />
// // //               {errors.address?.zipCode && (
// // //                 <ErrorText>{errors.address.zipCode.message}</ErrorText>
// // //               )}
// // //             </InputGroup>

// // //             <InputGroup>
// // //               <InputIcon>
// // //                 <FaMapMarkerAlt />
// // //               </InputIcon>
// // //               <Input
// // //                 {...register("address.country")}
// // //                 placeholder="Country"
// // //                 hasError={errors.address?.country}
// // //               />
// // //               {errors.address?.country && (
// // //                 <ErrorText>{errors.address.country.message}</ErrorText>
// // //               )}
// // //             </InputGroup>
// // //           </FormSection>

// // //           <SubmitButton
// // //             type="submit"
// // //             disabled={isSubmitting}
// // //             onClick={onSubmit}
// // //           >
// // //             {isSubmitting ? "Registering..." : "Register Hospital"}
// // //           </SubmitButton>
// // //         </Form>
// // //       </FormContainer>
// // //     </RegistrationContainer>
// // //   );
// // // };

// // // // Styled Components
// // // const RegistrationContainer = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   min-height: 100vh;
// // //   background-color: #f4f6fb;
// // //   padding: 2rem;
// // // `;

// // // const FormContainer = styled.div`
// // //   background-color: #ffffff;
// // //   border-radius: 1rem;
// // //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// // //   width: 100%;
// // //   max-width: 800px;
// // //   padding: 2.5rem;
// // // `;

// // // const Header = styled.div`
// // //   text-align: center;
// // //   margin-bottom: 2rem;
// // // `;

// // // const HospitalIcon = styled.div`
// // //   font-size: 3rem;
// // //   color: #ff6584;
// // //   margin-bottom: 1rem;
// // // `;

// // // const Title = styled.h1`
// // //   font-size: 2rem;
// // //   color: #232323;
// // //   margin-bottom: 0.5rem;
// // // `;

// // // const Subtitle = styled.p`
// // //   color: #6b7280;
// // //   font-size: 1rem;
// // // `;

// // // const Form = styled.form`
// // //   display: flex;
// // //   flex-direction: column;
// // //   gap: 1.5rem;
// // // `;

// // // const FormSection = styled.div`
// // //   background-color: rgba(244, 246, 251, 0.5);
// // //   border-radius: 0.75rem;
// // //   padding: 1.5rem;
// // //   border: 1px solid rgba(0, 0, 0, 0.05);
// // // `;

// // // const SectionTitle = styled.h2`
// // //   font-size: 1.25rem;
// // //   color: #ff6584;
// // //   margin-bottom: 1.25rem;
// // //   display: flex;
// // //   align-items: center;
// // //   gap: 0.5rem;
// // // `;

// // // const InputGroup = styled.div`
// // //   position: relative;
// // //   margin-bottom: 1.25rem;
// // // `;

// // // const InputIcon = styled.div`
// // //   position: absolute;
// // //   left: 1rem;

// // //   top: 50%;
// // //   transform: translateY(-50%);
// // //   color: #6b7280;
// // // `;

// // // const Input = styled.input`
// // //   width: 100%;
// // //   padding: 0.75rem 1rem 0.75rem 2.5rem;
// // //   border-radius: 0.5rem;
// // //   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
// // //   font-size: 1rem;
// // //   transition: all 0.3s ease;
// // //   background-color: ${(props) =>
// // //     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};

// // //   &:focus {
// // //     outline: none;
// // //     border-color: #ff6584;
// // //     box-shadow: 0 0 0 2px rgba(255, 101, 132, 0.2);
// // //   }

// // //   &::placeholder {
// // //     color: #aaa;
// // //   }
// // // `;

// // // const ErrorText = styled.span`
// // //   display: block;
// // //   color: #ff6584;
// // //   font-size: 0.875rem;
// // //   margin-top: 0.25rem;
// // //   margin-left: 0.5rem;
// // // `;

// // // const SubmitButton = styled.button`
// // //   background-color: #ff6584;
// // //   color: white;
// // //   border: none;
// // //   padding: 1rem;
// // //   border-radius: 0.5rem;
// // //   font-size: 1rem;
// // //   font-weight: 600;
// // //   cursor: pointer;
// // //   transition: all 0.3s ease;
// // //   margin-top: 1rem;

// // //   &:hover {
// // //     background-color: #e55a75;
// // //     transform: translateY(-2px);
// // //     box-shadow: 0 4px 12px rgba(255, 101, 132, 0.3);
// // //   }

// // //   &:disabled {
// // //     background-color: #ccc;
// // //     cursor: not-allowed;
// // //     transform: none;
// // //     box-shadow: none;
// // //   }
// // // `;

// // // const FileInputContainer = styled.div`
// // //   width: 100%;
// // //   gap: 1rem;
// // //   display: flex;
// // // `;

// // // const FileInputLabel = styled.label`
// // //   display: block;
// // //   width: 100%;

// // //   padding: 0.75rem 1rem;
// // //   border-radius: 0.5rem;
// // //   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
// // //   background-color: ${(props) =>
// // //     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
// // //   cursor: pointer;
// // //   transition: all 0.3s ease;
// // //   font-size: 1rem;
// // //   color: ${(props) => (props.hasError ? "#ff6584" : "#232323")};

// // //   &:hover {
// // //     border-color: #ff6584;
// // //   }
// // // `;

// // // const HiddenFileInput = styled.input`
// // //   display: none;
// // // `;

// // // const FileInputWrapper = styled.div`
// // //   display: flex;
// // //   width: 100%;
// // // `;

// // // const FileInput = styled.input`
// // //   flex: 1;
// // //   padding: 0.75rem 1rem;
// // //   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
// // //   border-right: none;
// // //   border-radius: 0.5rem 0 0 0.5rem;
// // //   font-size: 1rem;
// // //   background-color: ${(props) =>
// // //     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
// // //   text-align: center;
// // //   font-size: 1rem;
// // //   &:focus {
// // //     outline: none;
// // //   }
// // // `;

// // // const FileButton = styled.label`
// // //   padding: 0.75rem 1.5rem;
// // //   background-color: var(--hospital-admin);
// // //   color: white;
// // //   border: none;
// // //   border-radius: 0 0.5rem 0.5rem 0;
// // //   font-size: 1rem;
// // //   font-weight: 500;
// // //   cursor: pointer;
// // //   transition: all 0.3s ease;

// // //   &:hover {
// // //     background-color: #e55a75;
// // //   }
// // // `;

// // // export default HospitalRegistration;

// // import React, { use, useEffect, useState } from "react";
// // import {
// //   FaHospital,
// //   FaUserTie,
// //   FaSignInAlt,
// //   FaIdCard,
// //   FaLock,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// // } from "react-icons/fa";
// // import { AiOutlineSafetyCertificate } from "react-icons/ai";
// // import { MdHealthAndSafety } from "react-icons/md";
// // import { set, useForm } from "react-hook-form";
// // import styled from "styled-components";
// // import axios from "axios";
// // import { useNavigate } from "react-router";

// // const HospitalRegistration = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     setValue,
// //   } = useForm({
// //     defaultValues: {
// //       contactDetails: { email: "", phone: "" },
// //       address: { street: "", city: "", state: "", pincode: "", country: "" },
// //       certificate: "",
// //     },
// //   });

// //   const [showLoginButton, setShowLoginButton] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [certificateFile, setCertificateFile] = useState(null);
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");

// //   const navigate = useNavigate();

// //   const onSubmit = (data) => {
// //     setIsSubmitting(true);

// //     // Prepare registration data
// //     const registrationData = {
// //       name: data.name,
// //       ceoName: data.ceoName,
// //       kmcNumber: data.kmcNumber,
// //       password: data.password,
// //       certificate: data.certificate, // base64 string
// //       contactDetails: {
// //         email: data.contactDetails.email,
// //         phone: data.contactDetails.phone,
// //       },
// //       address: {
// //         street: data.address.street,
// //         city: data.address.city,
// //         state: data.address.state,
// //         pincode: data.address.pincode,
// //         country: data.address.country,
// //       },
// //     };

// //     console.log("Submitting registration data:", registrationData);

// //     axios
// //       .post(
// //         "http://localhost:9999/registration-service/api/registration/hospital",
// //         registrationData
// //       )
// //       .then((response) => {
// //         if (response.status === 201) {
// //           alert("Registration Details Received, Verification is in progress");
// //           // Optionally reset form or redirect here
// //           localStorage.setItem(
// //             "registeredHospital",
// //             response.data.contactDetails.email
// //           );
// //           setShowLoginButton(true);
// //         } else {
// //           console.log("Registration failed:", response);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error during registration:", error);
// //       })
// //       .finally(() => {
// //         setIsSubmitting(false);
// //       });
// //   };

// //   // File input change handler to convert file to base64 and set form value
// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Limit file size to ~10MB
// //       if (file.size > 10 * 1024 * 1024) {
// //         alert("File too large. Max size is 10MB.");
// //         return;
// //       }

// //       const allowedTypes = [
// //         "application/pdf",
// //         "image/jpeg",
// //         "image/jpg",
// //         "image/png",
// //       ];
// //       if (!allowedTypes.includes(file.type)) {
// //         alert("Unsupported file format. Allowed: PDF, JPG, PNG.");
// //         return;
// //       }

// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         const base64String = reader.result;
// //         setValue("certificate", base64String);
// //         setCertificateFile(file);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   return (
// //     <RegistrationContainer>
// //       <FormContainer>
// //         <Header>
// //           <HospitalIcon>
// //             <MdHealthAndSafety />
// //           </HospitalIcon>
// //           <Title>Hospital Registration</Title>
// //           <Subtitle>Join our network of healthcare providers</Subtitle>
// //         </Header>

// //         <Form onSubmit={handleSubmit(onSubmit)}>
// //           <FormSection>
// //             <SectionTitle>Hospital Information</SectionTitle>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaHospital />
// //               </InputIcon>
// //               <Input
// //                 {...register("name", { required: "Hospital name is required" })}
// //                 placeholder="Hospital Name"
// //                 hasError={!!errors.name}
// //               />
// //               {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaUserTie />
// //               </InputIcon>
// //               <Input
// //                 {...register("ceoName", { required: "CEO name is required" })}
// //                 placeholder="CEO Name"
// //                 hasError={!!errors.ceoName}
// //               />
// //               {errors.ceoName && (
// //                 <ErrorText>{errors.ceoName.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaEnvelope />
// //               </InputIcon>
// //               <Input
// //                 {...register("contactDetails.email", {
// //                   required: "Email is required",
// //                   pattern: {
// //                     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// //                     message: "Invalid email address",
// //                   },
// //                 })}
// //                 placeholder="Email"
// //                 hasError={!!errors.contactDetails?.email}
// //               />
// //               {errors.contactDetails?.email && (
// //                 <ErrorText>{errors.contactDetails.email.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <AiOutlineSafetyCertificate />
// //               </InputIcon>
// //               <FileInputWrapper>
// //                 <FileInput
// //                   type="text"
// //                   placeholder="Certificate File"
// //                   value={certificateFile ? certificateFile.name : ""}
// //                   readOnly
// //                   hasError={!!errors.certificate}
// //                 />
// //                 <FileButton htmlFor="file-upload">Browse</FileButton>
// //                 <HiddenFileInput
// //                   id="file-upload"
// //                   type="file"
// //                   accept=".pdf,.jpg,.jpeg,.png"
// //                   onChange={handleFileChange}
// //                 />
// //               </FileInputWrapper>
// //               {errors.certificate && (
// //                 <ErrorText>{errors.certificate.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <MdHealthAndSafety />
// //               </InputIcon>
// //               <Input
// //                 {...register("kmcNumber", {
// //                   required: "KMC number is required",
// //                 })}
// //                 placeholder="KMC Number"
// //                 hasError={!!errors.kmcNumber}
// //               />
// //               {errors.kmcNumber && (
// //                 <ErrorText>{errors.kmcNumber.message}</ErrorText>
// //               )}
// //             </InputGroup>
// //           </FormSection>

// //           <FormSection>
// //             <SectionTitle>Security</SectionTitle>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaLock />
// //               </InputIcon>
// //               <Input
// //                 onChange={(e) => setPassword("password", e.target.value)}
// //                 type="password"
// //                 {...register("password", {
// //                   required: "Password is required",
// //                   minLength: {
// //                     value: 8,
// //                     message: "Password must be at least 8 characters",
// //                   },
// //                 })}
// //                 placeholder="Password"
// //                 hasError={!!errors.password}
// //               />
// //               {errors.password && (
// //                 <ErrorText>{errors.password.message}</ErrorText>
// //               )}
// //             </InputGroup>
// //             <InputGroup>
// //               <InputIcon>
// //                 <FaLock />
// //               </InputIcon>
// //               <Input

// //                 type="password"
// //                 placeholder="Confirm Password"
// //               />
// //             </InputGroup>
// //           </FormSection>
// //           {/*
// //           <FormSection>
// //             <SectionTitle>Contact Details</SectionTitle>
// //           </FormSection> */}

// //           <FormSection>
// //             <SectionTitle>Address</SectionTitle>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaMapMarkerAlt />
// //               </InputIcon>
// //               <Input
// //                 {...register("address.street", {
// //                   required: "Street address is required",
// //                 })}
// //                 placeholder="Street Address"
// //                 hasError={!!errors.address?.street}
// //               />
// //               {errors.address?.street && (
// //                 <ErrorText>{errors.address.street.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaMapMarkerAlt />
// //               </InputIcon>
// //               <Input
// //                 {...register("address.city", { required: "City is required" })}
// //                 placeholder="City"
// //                 hasError={!!errors.address?.city}
// //               />
// //               {errors.address?.city && (
// //                 <ErrorText>{errors.address.city.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaMapMarkerAlt />
// //               </InputIcon>
// //               <Input
// //                 {...register("address.state", {
// //                   required: "State is required",
// //                 })}
// //                 placeholder="State/Province"
// //                 hasError={!!errors.address?.state}
// //               />
// //               {errors.address?.state && (
// //                 <ErrorText>{errors.address.state.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaPhone />
// //               </InputIcon>
// //               <Input
// //                 {...register("contactDetails.phone", {
// //                   required: "Phone number is required",
// //                   pattern: {
// //                     value: /^[0-9+\-\s]{7,15}$/,
// //                     message: "Invalid phone number",
// //                   },
// //                 })}
// //                 placeholder="Phone Number"
// //                 hasError={!!errors.contactDetails?.phone}
// //               />
// //               {errors.contactDetails?.phone && (
// //                 <ErrorText>{errors.contactDetails.phone.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaMapMarkerAlt />
// //               </InputIcon>
// //               <Input
// //                 {...register("address.pincode", {
// //                   required: "pincode is required",
// //                 })}
// //                 placeholder="Zip/Postal Code"
// //                 hasError={!!errors.address?.pincode}
// //               />
// //               {errors.address?.pincode && (
// //                 <ErrorText>{errors.address.pincode.message}</ErrorText>
// //               )}
// //             </InputGroup>

// //             <InputGroup>
// //               <InputIcon>
// //                 <FaMapMarkerAlt />
// //               </InputIcon>
// //               <Input
// //                 {...register("address.country", {
// //                   required: "Country is required",
// //                 })}
// //                 placeholder="Country"
// //                 hasError={!!errors.address?.country}
// //               />
// //               {errors.address?.country && (
// //                 <ErrorText>{errors.address.country.message}</ErrorText>
// //               )}
// //             </InputGroup>
// //           </FormSection>

// //           <SubmitButton type="submit" disabled={isSubmitting}>
// //             {isSubmitting ? "Registering..." : "Register Hospital"}
// //           </SubmitButton>
// //         </Form>

// //         {showLoginButton && (
// //           <LoginButton onClick={() => navigate("/login")}>
// //             <FaSignInAlt /> Login
// //           </LoginButton>
// //         )}
// //       </FormContainer>
// //     </RegistrationContainer>
// //   );
// // };

// // // Styled Components (unchanged; include your styled code from original)
// // const RegistrationContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: center;
// //   align-items: center;
// //   min-height: 100vh;
// //   background-color: #f4f6fb;
// //   padding: 2rem;
// // `;

// // const FormContainer = styled.div`
// //   background-color: #ffffff;
// //   border-radius: 1rem;
// //   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //   width: 100%;
// //   max-width: 800px;
// //   padding: 2.5rem;
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1.5rem;
// // `;

// // const Header = styled.div`
// //   text-align: center;
// //   margin-bottom: 2rem;
// // `;

// // const HospitalIcon = styled.div`
// //   font-size: 3rem;
// //   color: #ff6584;
// //   margin-bottom: 1rem;
// // `;

// // const Title = styled.h1`
// //   font-size: 2rem;
// //   color: #232323;
// //   margin-bottom: 0.5rem;
// // `;

// // const Subtitle = styled.p`
// //   color: #6b7280;
// //   font-size: 1rem;
// // `;

// // const Form = styled.form`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1.5rem;
// // `;

// // const FormSection = styled.div`
// //   background-color: rgba(244, 246, 251, 0.5);
// //   border-radius: 0.75rem;
// //   padding: 1.5rem;
// //   border: 1px solid rgba(0, 0, 0, 0.05);
// // `;

// // const SectionTitle = styled.h2`
// //   font-size: 1.25rem;
// //   color: #ff6584;
// //   margin-bottom: 1.25rem;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// // `;

// // const InputGroup = styled.div`
// //   position: relative;
// //   margin-bottom: 1.25rem;
// // `;

// // const InputIcon = styled.div`
// //   position: absolute;
// //   left: 1rem;

// //   top: 50%;
// //   transform: translateY(-50%);
// //   color: #6b7280;
// // `;

// // const Input = styled.input`
// //   width: 100%;
// //   padding: 0.75rem 1rem 0.75rem 2.5rem;
// //   border-radius: 0.5rem;
// //   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
// //   font-size: 1rem;
// //   transition: all 0.3s ease;
// //   background-color: ${(props) =>
// //     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};

// //   &:focus {
// //     outline: none;
// //     border-color: #ff6584;
// //     box-shadow: 0 0 0 2px rgba(255, 101, 132, 0.2);
// //   }

// //   &::placeholder {
// //     color: #aaa;
// //   }
// // `;

// // const ErrorText = styled.span`
// //   display: block;
// //   color: #ff6584;
// //   font-size: 0.875rem;
// //   margin-top: 0.25rem;
// //   margin-left: 0.5rem;
// // `;

// // const SubmitButton = styled.button`
// //   background-color: #ff6584;
// //   color: white;
// //   border: none;
// //   padding: 1rem;
// //   border-radius: 0.5rem;
// //   font-size: 1rem;
// //   font-weight: 600;
// //   cursor: pointer;
// //   transition: all 0.3s ease;
// //   margin-top: 1rem;

// //   &:hover {
// //     background-color: #e55a75;
// //     transform: translateY(-2px);
// //     box-shadow: 0 4px 12px rgba(255, 101, 132, 0.3);
// //   }

// //   &:disabled {
// //     background-color: #ccc;
// //     cursor: not-allowed;
// //     transform: none;
// //     box-shadow: none;
// //   }
// // `;

// // const FileInputWrapper = styled.div`
// //   display: flex;
// //   width: 100%;
// // `;

// // const FileInput = styled.input`
// //   flex: 1;
// //   padding: 0.75rem 1rem;
// //   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
// //   border-right: none;
// //   border-radius: 0.5rem 0 0 0.5rem;
// //   font-size: 1rem;
// //   background-color: ${(props) =>
// //     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
// //   text-align: center;
// //   font-size: 1rem;

// //   &:focus {
// //     outline: none;
// //   }
// // `;

// // const FileButton = styled.label`
// //   padding: 0.75rem 1.5rem;
// //   background-color: #ff6584;
// //   color: white;
// //   border: none;
// //   border-radius: 0 0.5rem 0.5rem 0;
// //   font-size: 1rem;
// //   font-weight: 500;
// //   cursor: pointer;
// //   transition: all 0.3s ease;

// //   &:hover {
// //     background-color: #e55a75;
// //   }
// // `;

// // const HiddenFileInput = styled.input`
// //   display: none;
// // `;

// // const LoginButton = styled.button`
// //   background-color: transparent;
// //   color: #6c63ff;
// //   border: 2px solid #6c63ff;
// //   padding: 0.75rem 1.5rem;
// //   border-radius: 50px;
// //   font-weight: 600;
// //   cursor: pointer;
// //   transition: all 0.3s ease;
// //   font-size: 1rem;
// //   display: flex;
// //   align-items: center;
// //   gap: 0.5rem;
// //   margin-left: 1rem;
// //   width: fit-content;
// //   align-self: center;

// //   &:hover {
// //     background-color: #6c63ff;
// //     color: white;
// //     transform: translateY(-2px);
// //     box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);
// //   }
// // `;

// // export default HospitalRegistration;

// import React, { useState } from "react";
// import {
//   FaHospital,
//   FaUserTie,
//   FaSignInAlt,
//   FaLock,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { AiOutlineSafetyCertificate } from "react-icons/ai";
// import { MdHealthAndSafety } from "react-icons/md";
// import { useForm } from "react-hook-form";
// import styled from "styled-components";
// import axios from "axios";
// import { useNavigate } from "react-router";

// const HospitalRegistration = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch, // Import watch from react-hook-form
//   } = useForm({
//     defaultValues: {
//       contactDetails: { email: "", phone: "" },
//       address: { street: "", city: "", state: "", pincode: "", country: "" },
//       certificate: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   // Watch the value of the password field
//   const password = watch("password");

//   const [showLoginButton, setShowLoginButton] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [certificateFile, setCertificateFile] = useState(null);

//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     setIsSubmitting(true);

//     // Prepare registration data (excluding confirmPassword)
//     const registrationData = {
//       name: data.name,
//       ceoName: data.ceoName,
//       kmcNumber: data.kmcNumber,
//       password: data.password,
//       certificate: data.certificate, // base64 string
//       contactDetails: {
//         email: data.contactDetails.email,
//         phone: data.contactDetails.phone,
//       },
//       address: {
//         street: data.address.street,
//         city: data.address.city,
//         state: data.address.state,
//         pincode: data.address.pincode,
//         country: data.address.country,
//       },
//     };

//     console.log("Submitting registration data:", registrationData);

//     axios
//       .post(
//         "http://localhost:9999/registration-service/api/registration/hospital",
//         registrationData
//       )
//       .then((response) => {
//         if (response.status === 201) {
//           alert("Registration Details Received, Verification is in progress");
//           localStorage.setItem(
//             "registeredHospital",
//             response.data.contactDetails.email
//           );
//           setShowLoginButton(true);
//         } else {
//           console.log("Registration failed:", response);
//           alert("Registration failed. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error during registration:", error);
//         alert(
//           "An error occurred during registration. Please check the console."
//         );
//       })
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//   };

//   // File input change handler to convert file to base64 and set form value
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         // Limit file size to ~10MB
//         alert("File too large. Max size is 10MB.");
//         return;
//       }

//       const allowedTypes = [
//         "application/pdf",
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         alert("Unsupported file format. Allowed: PDF, JPG, PNG.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         setValue("certificate", base64String);
//         setCertificateFile(file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <RegistrationContainer>
//       <FormContainer>
//         <Header>
//           <HospitalIcon>
//             <MdHealthAndSafety />
//           </HospitalIcon>
//           <Title>Hospital Registration</Title>
//           <Subtitle>Join our network of healthcare providers</Subtitle>
//         </Header>

//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <FormSection>
//             <SectionTitle>Hospital Information</SectionTitle>

//             <InputGroup>
//               <InputIcon>
//                 <FaHospital />
//               </InputIcon>
//               <Input
//                 {...register("name", { required: "Hospital name is required" })}
//                 placeholder="Hospital Name"
//                 hasError={!!errors.name}
//               />
//               {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaUserTie />
//               </InputIcon>
//               <Input
//                 {...register("ceoName", { required: "CEO name is required" })}
//                 placeholder="CEO Name"
//                 hasError={!!errors.ceoName}
//               />
//               {errors.ceoName && (
//                 <ErrorText>{errors.ceoName.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaEnvelope />
//               </InputIcon>
//               <Input
//                 {...register("contactDetails.email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 placeholder="Email"
//                 hasError={!!errors.contactDetails?.email}
//               />
//               {errors.contactDetails?.email && (
//                 <ErrorText>{errors.contactDetails.email.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <AiOutlineSafetyCertificate />
//               </InputIcon>
//               <FileInputWrapper>
//                 <FileInput
//                   type="text"
//                   placeholder="Certificate File"
//                   value={certificateFile ? certificateFile.name : ""}
//                   readOnly
//                   hasError={!!errors.certificate}
//                 />
//                 <FileButton htmlFor="file-upload">Browse</FileButton>
//                 <HiddenFileInput
//                   id="file-upload"
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                 />
//               </FileInputWrapper>
//               {errors.certificate && (
//                 <ErrorText>{errors.certificate.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <MdHealthAndSafety />
//               </InputIcon>
//               <Input
//                 {...register("kmcNumber", {
//                   required: "KMC number is required",
//                 })}
//                 placeholder="KMC Number"
//                 hasError={!!errors.kmcNumber}
//               />
//               {errors.kmcNumber && (
//                 <ErrorText>{errors.kmcNumber.message}</ErrorText>
//               )}
//             </InputGroup>
//           </FormSection>

//           <FormSection>
//             <SectionTitle>Security</SectionTitle>

//             <InputGroup>
//               <InputIcon>
//                 <FaLock />
//               </InputIcon>
//               <Input
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters",
//                   },
//                 })}
//                 placeholder="Password"
//                 hasError={!!errors.password}
//               />
//               {errors.password && (
//                 <ErrorText>{errors.password.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaLock />
//               </InputIcon>
//               <Input
//                 type="password"
//                 placeholder="Confirm Password"
//                 hasError={!!errors.confirmPassword}
//                 {...register("confirmPassword", {
//                   required: "Please confirm your password",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 })}
//               />
//               {errors.confirmPassword && (
//                 <ErrorText>{errors.confirmPassword.message}</ErrorText>
//               )}
//             </InputGroup>
//           </FormSection>

//           <FormSection>
//             <SectionTitle>Address</SectionTitle>

//             <InputGroup>
//               <InputIcon>
//                 <FaMapMarkerAlt />
//               </InputIcon>
//               <Input
//                 {...register("address.street", {
//                   required: "Street address is required",
//                 })}
//                 placeholder="Street Address"
//                 hasError={!!errors.address?.street}
//               />
//               {errors.address?.street && (
//                 <ErrorText>{errors.address.street.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaMapMarkerAlt />
//               </InputIcon>
//               <Input
//                 {...register("address.city", { required: "City is required" })}
//                 placeholder="City"
//                 hasError={!!errors.address?.city}
//               />
//               {errors.address?.city && (
//                 <ErrorText>{errors.address.city.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaMapMarkerAlt />
//               </InputIcon>
//               <Input
//                 {...register("address.state", {
//                   required: "State is required",
//                 })}
//                 placeholder="State/Province"
//                 hasError={!!errors.address?.state}
//               />
//               {errors.address?.state && (
//                 <ErrorText>{errors.address.state.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaPhone />
//               </InputIcon>
//               <Input
//                 {...register("contactDetails.phone", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^[0-9+\-\s]{7,15}$/,
//                     message: "Invalid phone number",
//                   },
//                 })}
//                 placeholder="Phone Number"
//                 hasError={!!errors.contactDetails?.phone}
//               />
//               {errors.contactDetails?.phone && (
//                 <ErrorText>{errors.contactDetails.phone.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaMapMarkerAlt />
//               </InputIcon>
//               <Input
//                 {...register("address.pincode", {
//                   required: "Pincode is required",
//                 })}
//                 placeholder="Zip/Postal Code"
//                 hasError={!!errors.address?.pincode}
//               />
//               {errors.address?.pincode && (
//                 <ErrorText>{errors.address.pincode.message}</ErrorText>
//               )}
//             </InputGroup>

//             <InputGroup>
//               <InputIcon>
//                 <FaMapMarkerAlt />
//               </InputIcon>
//               <Input
//                 {...register("address.country", {
//                   required: "Country is required",
//                 })}
//                 placeholder="Country"
//                 hasError={!!errors.address?.country}
//               />
//               {errors.address?.country && (
//                 <ErrorText>{errors.address.country.message}</ErrorText>
//               )}
//             </InputGroup>
//           </FormSection>

//           <SubmitButton type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Registering..." : "Register Hospital"}
//           </SubmitButton>
//         </Form>

//         {showLoginButton && (
//           <LoginButton onClick={() => navigate("/login")}>
//             <FaSignInAlt /> Login
//           </LoginButton>
//         )}
//       </FormContainer>
//     </RegistrationContainer>
//   );
// };

// // Styled Components
// const RegistrationContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-color: #f4f6fb;
//   padding: 2rem;
// `;

// const FormContainer = styled.div`
//   background-color: #ffffff;
//   border-radius: 1rem;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 800px;
//   padding: 2.5rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const Header = styled.div`
//   text-align: center;
//   margin-bottom: 2rem;
// `;

// const HospitalIcon = styled.div`
//   font-size: 3rem;
//   color: #ff6584;
//   margin-bottom: 1rem;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   color: #232323;
//   margin-bottom: 0.5rem;
// `;

// const Subtitle = styled.p`
//   color: #6b7280;
//   font-size: 1rem;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const FormSection = styled.div`
//   background-color: rgba(244, 246, 251, 0.5);
//   border-radius: 0.75rem;
//   padding: 1.5rem;
//   border: 1px solid rgba(0, 0, 0, 0.05);
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.25rem;
//   color: #ff6584;
//   margin-bottom: 1.25rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const InputGroup = styled.div`
//   position: relative;
//   margin-bottom: 1.25rem;
// `;

// const InputIcon = styled.div`
//   position: absolute;
//   left: 1rem;
//   top: 50%;
//   transform: translateY(-50%);
//   color: #6b7280;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem 0.75rem 2.5rem;
//   border-radius: 0.5rem;
//   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
//   font-size: 1rem;
//   transition: all 0.3s ease;
//   background-color: ${(props) =>
//     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};

//   &:focus {
//     outline: none;
//     border-color: #ff6584;
//     box-shadow: 0 0 0 2px rgba(255, 101, 132, 0.2);
//   }

//   &::placeholder {
//     color: #aaa;
//   }
// `;

// const ErrorText = styled.span`
//   display: block;
//   color: #ff6584;
//   font-size: 0.875rem;
//   margin-top: 0.25rem;
//   margin-left: 0.5rem;
// `;

// const SubmitButton = styled.button`
//   background-color: #ff6584;
//   color: white;
//   border: none;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   margin-top: 1rem;

//   &:hover {
//     background-color: #e55a75;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(255, 101, 132, 0.3);
//   }

//   &:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//   }
// `;

// const FileInputWrapper = styled.div`
//   display: flex;
//   width: 100%;
// `;

// const FileInput = styled.input`
//   flex: 1;
//   padding: 0.75rem 1rem;
//   border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
//   border-right: none;
//   border-radius: 0.5rem 0 0 0.5rem;
//   font-size: 1rem;
//   background-color: ${(props) =>
//     props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
//   text-align: center;
//   font-size: 1rem;

//   &:focus {
//     outline: none;
//   }
// `;

// const FileButton = styled.label`
//   padding: 0.75rem 1.5rem;
//   background-color: #ff6584;
//   color: white;
//   border: none;
//   border-radius: 0 0.5rem 0.5rem 0;
//   font-size: 1rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #e55a75;
//   }
// `;

// const HiddenFileInput = styled.input`
//   display: none;
// `;

// const LoginButton = styled.button`
//   background-color: transparent;
//   color: #6c63ff;
//   border: 2px solid #6c63ff;
//   padding: 0.75rem 1.5rem;
//   border-radius: 50px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   font-size: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   margin-left: 1rem;
//   width: fit-content;
//   align-self: center;

//   &:hover {
//     background-color: #6c63ff;
//     color: white;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);
//   }
// `;

// export default HospitalRegistration;

import React, { useState } from "react";
import {
  FaHospital,
  FaUserTie,
  FaSignInAlt,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { MdHealthAndSafety } from "react-icons/md";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";

const HospitalRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur", // Validation triggers on focus out
    reValidateMode: "onChange", // Re-validates on change after the first blur
    defaultValues: {
      contactDetails: { email: "", phone: "" },
      address: { street: "", city: "", state: "", pincode: "", country: "" },
      certificate: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch the value of the password field for confirmation
  const password = watch("password");

  const [showLoginButton, setShowLoginButton] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificateFile, setCertificateFile] = useState(null);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Prepare registration data
    const registrationData = {
      name: data.name,
      ceoName: data.ceoName,
      kmcNumber: data.kmcNumber,
      password: data.password,
      certificate: data.certificate,
      contactDetails: {
        email: data.contactDetails.email,
        phone: data.contactDetails.phone,
      },
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
        country: data.address.country,
      },
    };

    console.log("Submitting registration data:", registrationData);

    axios
      .post(
        "http://localhost:9999/registration-service/api/registration/hospital",
        registrationData
      )
      .then((response) => {
        if (response.status === 201) {
          alert("Registration Details Received, Verification is in progress");
          localStorage.setItem(
            "registeredHospital",
            response.data.contactDetails.email
          );
          setShowLoginButton(true);
        } else {
          console.log("Registration failed:", response);
          alert("Registration failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert(
          "An error occurred during registration. Please check the console."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // File input change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 3MB)
      if (file.size > 3 * 1024 * 1024) {
        alert("File too large. Max size is 3MB.");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Unsupported file format. Allowed: PDF, JPG, PNG.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setValue("certificate", base64String);
        setCertificateFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <RegistrationContainer>
      <FormContainer>
        <Header>
          <HospitalIcon>
            <MdHealthAndSafety />
          </HospitalIcon>
          <Title>Hospital Registration</Title>
          <Subtitle>Join our network of healthcare providers</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormSection>
            <SectionTitle>Hospital Information</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaHospital />
              </InputIcon>
              <Input
                {...register("name", { required: "Hospital name is required" })}
                placeholder="Hospital Name"
                hasError={!!errors.name}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaUserTie />
              </InputIcon>
              <Input
                {...register("ceoName", { required: "CEO name is required" })}
                placeholder="CEO Name"
                hasError={!!errors.ceoName}
              />
              {errors.ceoName && (
                <ErrorText>{errors.ceoName.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                {...register("contactDetails.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                hasError={!!errors.contactDetails?.email}
              />
              {errors.contactDetails?.email && (
                <ErrorText>{errors.contactDetails.email.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <AiOutlineSafetyCertificate />
              </InputIcon>
              <FileInputWrapper>
                <FileInput
                  type="text"
                  placeholder="Certificate File (Max 3MB)"
                  value={certificateFile ? certificateFile.name : ""}
                  readOnly
                  hasError={!!errors.certificate}
                />
                <FileButton htmlFor="file-upload">Browse</FileButton>
                <HiddenFileInput
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </FileInputWrapper>
              {errors.certificate && (
                <ErrorText>{errors.certificate.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <MdHealthAndSafety />
              </InputIcon>
              <Input
                {...register("kmcNumber", {
                  required: "KMC number is required",
                })}
                placeholder="KMC Number"
                hasError={!!errors.kmcNumber}
              />
              {errors.kmcNumber && (
                <ErrorText>{errors.kmcNumber.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Security</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Password"
                hasError={!!errors.password}
              />
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                placeholder="Confirm Password"
                hasError={!!errors.confirmPassword}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <ErrorText>{errors.confirmPassword.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Address & Contact</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.street", {
                  required: "Street address is required",
                })}
                placeholder="Street Address"
                hasError={!!errors.address?.street}
              />
              {errors.address?.street && (
                <ErrorText>{errors.address.street.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.city", { required: "City is required" })}
                placeholder="City"
                hasError={!!errors.address?.city}
              />
              {errors.address?.city && (
                <ErrorText>{errors.address.city.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.state", {
                  required: "State is required",
                })}
                placeholder="State/Province"
                hasError={!!errors.address?.state}
              />
              {errors.address?.state && (
                <ErrorText>{errors.address.state.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaPhone />
              </InputIcon>
              <Input
                {...register("contactDetails.phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be exactly 10 digits",
                  },
                })}
                placeholder="Phone Number"
                hasError={!!errors.contactDetails?.phone}
              />
              {errors.contactDetails?.phone && (
                <ErrorText>{errors.contactDetails.phone.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.pincode", {
                  required: "Pincode is required",
                })}
                placeholder="Zip/Postal Code"
                hasError={!!errors.address?.pincode}
              />
              {errors.address?.pincode && (
                <ErrorText>{errors.address.pincode.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.country", {
                  required: "Country is required",
                })}
                placeholder="Country"
                hasError={!!errors.address?.country}
              />
              {errors.address?.country && (
                <ErrorText>{errors.address.country.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Hospital"}
          </SubmitButton>
        </Form>

        {showLoginButton && (
          <LoginButton onClick={() => navigate("/login")}>
            <FaSignInAlt /> Login
          </LoginButton>
        )}
      </FormContainer>
    </RegistrationContainer>
  );
};

// Styled Components
const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6fb;
  padding: 2rem;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const HospitalIcon = styled.div`
  font-size: 3rem;
  color: #ff6584;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #232323;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  background-color: rgba(244, 246, 251, 0.5);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #ff6584;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};

  &:focus {
    outline: none;
    border-color: #ff6584;
    box-shadow: 0 0 0 2px rgba(255, 101, 132, 0.2);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ErrorText = styled.span`
  display: block;
  color: #ff6584;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #ff6584;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #e55a75;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 101, 132, 0.3);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const FileInputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const FileInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
  border-right: none;
  border-radius: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
  background-color: ${(props) =>
    props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
  text-align: center;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const FileButton = styled.label`
  padding: 0.75rem 1.5rem;
  background-color: #ff6584;
  color: white;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e55a75;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const LoginButton = styled.button`
  background-color: transparent;
  color: #6c63ff;
  border: 2px solid #6c63ff;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  width: fit-content;
  align-self: center;

  &:hover {
    background-color: #6c63ff;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);
  }
`;

export default HospitalRegistration;
