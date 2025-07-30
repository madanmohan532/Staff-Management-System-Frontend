import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPeopleGroup } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router";
const LandingPage = () => {
  const [users, setUsers] = useState([]);

  const [hospitals, setHospitals] = useState(0);
  const [nurses, setNurses] = useState(0);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    await axios
      .get("http://localhost:9999/admin-service/api/admin/admin/users")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        } else if (response.status === 204) {
          console.log("No users found");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setHospitals(users.filter((user) => user.role === "hospital staff").length);
    setNurses(users.filter((user) => user.role === "nurse").length);
  }, [users]);

  const handleHospitalRegistration = () => {
    navigate("/hospital-registration");
  };

  const handleNurseRegistration = () => {
    navigate("/nurse-registration");
  };

  return (
    <Container>
      <Header>
        <Logo>
          <LogoIcon>
            <FaPeopleGroup />
          </LogoIcon>
        </Logo>
        <AuthButtons>
          <LoginButton>Login</LoginButton>
          <RegisterButton>Register</RegisterButton>
        </AuthButtons>
      </Header>

      <HeroSection>
        <HeroTitle>Staff Management System</HeroTitle>
        <HeroSubtitle>
          Connecting hospitals with qualified nurses for flexible work
          opportunities
        </HeroSubtitle>
        <NurseIllustration>👩⚕️🏥💉</NurseIllustration>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon style={{ backgroundColor: "#6C63FF" }}>🏥</FeatureIcon>
          <FeatureTitle>For Hospitals</FeatureTitle>
          <FeatureText>
            Quickly find qualified nurses to fill your staffing needs with our
            extensive network of healthcare professionals.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon style={{ backgroundColor: "#36CFC9" }}>👩⚕️</FeatureIcon>
          <FeatureTitle>For Nurses</FeatureTitle>
          <FeatureText>
            Find flexible work opportunities that fit your schedule and
            preferences. Take control of your career.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon style={{ backgroundColor: "#FF6584" }}>⚡</FeatureIcon>
          <FeatureTitle>Quick Matching</FeatureTitle>
          <FeatureText>
            Our system Quickly matches hospitals with available nurses, ensuring
            that shifts are filled efficiently and effectively.
          </FeatureText>
        </FeatureCard>
      </FeaturesSection>

      <StatsSection>
        <StatItem>
          <StatNumber>{hospitals}</StatNumber>
          <StatLabel>Hospitals Connected</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{nurses}</StatNumber>
          <StatLabel>Nurses Registered</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{users.length}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatItem>
      </StatsSection>

      <CtaSection>
        <CtaTitle>Ready to Get Started ?</CtaTitle>
        <CtaButtons>
          <HospitalCta onClick={handleHospitalRegistration}>
            I'm a Hospital
          </HospitalCta>
          <NurseCta onClick={handleNurseRegistration}>I'm a Nurse</NurseCta>
        </CtaButtons>
      </CtaSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #f4f6fb;
  min-height: 100vh;
  color: #232323;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #f4f6fb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.span`
  font-size: 3rem;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6c63ff;
  margin: 0;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
`;

const LoginButton = styled(Button)`
  background-color: transparent;
  color: #6c63ff;
  border: 2px solid #6c63ff;

  &:hover {
    background-color: #6c63ff;
    color: white;
  }
`;

const RegisterButton = styled(Button)`
  background-color: #6c63ff;
  color: white;

  &:hover {
    background-color: #5a52e0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #232323;
  background: linear-gradient(90deg, #6c63ff, #ff6584);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
`;

const NurseIllustration = styled.div`
  font-size: 3rem;
  margin-top: 2rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #232323;
`;

const FeatureText = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const StatsSection = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3rem 2rem;
  background-color: #ffffff;
  margin: 3rem 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  min-width: 200px;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #6c63ff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #6b7280;
`;

const CtaSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #6c63ff, #36cfc9);
  border-radius: 1rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: white;
`;

const CtaTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const CtaButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const HospitalCta = styled(Button)`
  background-color: white;
  color: #6c63ff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
  }
`;

const NurseCta = styled(Button)`
  background-color: #ffd86e;
  color: #232323;

  &:hover {
    background-color: #ffd05a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 216, 110, 0.3);
  }
`;

export default LandingPage;
