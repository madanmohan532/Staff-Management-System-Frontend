import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import HospitalRegistration from "./Components/Registrations/HospitalRegistration";
import NurseRegistration from "./Components/Registrations/NurseRegistration";
import Login from "./Components/Login/Login";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import Hospital from "./Components/Admin/Hospitals/Hospital";
import HospitalAdminDashboard from "./Components/HospitalAdmin/HospitalAdminDahsboard/HospitalAdminDashboard";
import NurseDashboard from "./Components/Nurse/NurseDashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/hospital-registration"
            element={<HospitalRegistration />}
          />
          <Route path="/nurse-registration" element={<NurseRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>
            {/* <Route path="hospitals" element={<Hospital />}></Route> */}
            {/* Include nested paths of admin dashboard */}
          </Route>
          <Route path="/hospitalAdmin" element={<HospitalAdminDashboard />} />
          <Route path="/nurse" element={<NurseDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
