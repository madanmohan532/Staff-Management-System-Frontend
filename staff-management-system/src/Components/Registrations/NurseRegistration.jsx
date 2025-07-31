import React, { useState } from "react";
import {
  FaUserTie,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaAward,
  FaFileSignature,
  FaUserNurse,
  FaSignInAlt,
} from "react-icons/fa";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";

const NurseRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      contactDetails: { email: "", phone: "" },
      address: { street: "", city: "", state: "", pincode: "", country: "" },
      skills: "",
      certificate: "",
      selfDescription: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificateFile, setCertificateFile] = useState(null);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Convert skills string to array by splitting commas, trimming spaces
    const skillsArray = data.skills
      ? data.skills.split(",").map((skill) => skill.trim())
      : [];

    // Construct registration payload matching your Java fields
    const registrationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      _id: data.aadhaarNumber,
      password: data.password,
      contactDetails: {
        email: data.contactDetails.email,
        phone: data.contactDetails.phone,
      },
      certificate: data.certificate, // base64 string
      certificateNumber: data.certificateNumber,
      yearOfExperience: parseInt(data.yearOfExperience, 10),
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        pincode: data.address.pincode,
        country: data.address.country,
      },
      skills: skillsArray,
      selfDescription: data.selfDescription,
    };

    console.log("Submitting Nurse Registration:", registrationData);

    axios
      .post(
        "http://localhost:9999/registration-service/api/registration/nurse",
        registrationData
      )
      .then((response) => {
        if (response.status === 201) {
          alert(
            "Nurse Registration Details Received, Verification in progress"
          );
          localStorage.setItem(
            "registeredNurse",
            response.data.contactDetails.email
          );
          setShowLoginButton(true);
          // Optionally reset form or redirect here
        } else {
          console.log("Registration failed:", response);
        }
      })
      .catch((error) => {
        console.error("Error during nurse registration:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handle certificate file upload and read as base64 string
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max size is 10MB.");
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
        const base64String = reader.result; // Remove data: prefix
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
          <NurseIcon>
            <FaUserNurse size={48} />
          </NurseIcon>
          <Title>Nurse Registration</Title>
          <Subtitle>Join our community of healthcare professionals</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormSection>
            <SectionTitle>Personal Information</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaUserTie />
              </InputIcon>
              <Input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                hasError={!!errors.firstName}
              />
              {errors.firstName && (
                <ErrorText>{errors.firstName.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaUserTie />
              </InputIcon>
              <Input
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                hasError={!!errors.lastName}
              />
              {errors.lastName && (
                <ErrorText>{errors.lastName.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
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
                <FaIdCard />
              </InputIcon>
              <Input
                type="text"
                {...register("aadhaarNumber", {
                  required: "Aadhaar is required",
                  minLength: { value: 12, message: "Min 12 characters" },
                  maxLength: { value: 12, message: "Max 12 characters" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers allowed",
                  },
                })}
                placeholder="Aadhaar UID"
                hasError={!!errors.aadhaarNumber}
              />
              {errors.aadharNumber && (
                <ErrorText>{errors.aadhaarNumber.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <AiOutlineSafetyCertificate />
              </InputIcon>
              <FileInputWrapper>
                <FileInput
                  type="text"
                  placeholder="Certificate File"
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
                <FaFileSignature />
              </InputIcon>
              <Input
                {...register("certificateNumber", {
                  required: "Certificate Number is required",
                })}
                placeholder="Certificate Number"
                hasError={!!errors.certificateNumber}
              />
              {errors.certificateNumber && (
                <ErrorText>{errors.certificateNumber.message}</ErrorText>
              )}
            </InputGroup>

            <InputGroup>
              <InputIcon>
                <FaAward />
              </InputIcon>
              <Input
                type="number"
                min="0"
                {...register("yearOfExperience", {
                  required: "Year of Experience is required",
                  min: { value: 0, message: "Must be at least 0" },
                })}
                placeholder="Year Of Experience"
                hasError={!!errors.yearOfExperience}
              />
              {errors.yearOfExperience && (
                <ErrorText>{errors.yearOfExperience.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Contact Details</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <Input
                {...register("contactDetails.email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email",
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
                <FaPhone />
              </InputIcon>
              <Input
                {...register("contactDetails.phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s]{7,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                placeholder="Phone Number"
                hasError={!!errors.contactDetails?.phone}
              />
              {errors.contactDetails?.phone && (
                <ErrorText>{errors.contactDetails.phone.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Address</SectionTitle>

            <InputGroup>
              <InputIcon>
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.street", {
                  required: "Street is required",
                })}
                placeholder="Street"
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
                <FaMapMarkerAlt />
              </InputIcon>
              <Input
                {...register("address.pincode", {
                  required: "Pincode is required",
                })}
                placeholder="Pincode"
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

          <FormSection>
            <SectionTitle>Skills (comma-separated)</SectionTitle>

            <InputGroup>
              <Input
                as="textarea"
                {...register("skills", { required: "Skills are required" })}
                placeholder="e.g. ICU Care, Pediatric Nursing, Emergency Care"
                rows={4}
                hasError={!!errors.skills}
                style={{ resize: "vertical" }}
              />
              {errors.skills && <ErrorText>{errors.skills.message}</ErrorText>}
            </InputGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Self Description</SectionTitle>

            <InputGroup>
              <Input
                as="textarea"
                {...register("selfDescription", {
                  required: "Self description is required",
                  minLength: { value: 20, message: "Min 20 characters" },
                })}
                placeholder="Describe yourself..."
                rows={5}
                hasError={!!errors.selfDescription}
                style={{ resize: "vertical" }}
              />
              {errors.selfDescription && (
                <ErrorText>{errors.selfDescription.message}</ErrorText>
              )}
            </InputGroup>
          </FormSection>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Nurse"}
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

// Styled Components (reuse styles from your hospital form with minor adjustments)
const RegistrationContainer = styled.div`
  display: flex;
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
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.25rem;

  & textarea {
    font-family: inherit;
  }
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

const NurseIcon = styled.div`
  font-size: 3rem;
  color: #ff6584;
  margin-bottom: 1rem;
`;

// Allow textarea styling as well
const InputAsTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => (props.hasError ? "#ff6584" : "#ddd")};
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.hasError ? "rgba(255, 101, 132, 0.05)" : "white"};
  resize: vertical;

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

export default NurseRegistration;
