import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import PanchakarmePage from "./pages/PanchakarmePage";
import PatientLogin from "./pages/PatientLogin";
import DoctorLogin from "./pages/DoctorLogin";
import ManagementLogin from "./pages/ManagementLogin";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ManagementDashboard from "./pages/ManagementDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorProtectedRoute from "./components/DoctorProtectedRoute";
import SimpleDoctorProtectedRoute from "./components/SimpleDoctorProtectedRoute";
import PatientDetailsForm from "./components/PatientDetailsForm";
import AppointmentBooking from "./components/AppointmentBooking";
import DoctorDetail from "./components/DoctorDetail";
import ConfirmAppointment from "./components/ConfirmAppointment";


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/panchakarma" element={<PanchakarmePage />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/management-login" element={<ManagementLogin />} />
          
          {/* Protected Routes */}
          <Route path="/patient-dashboard" element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctor-dashboard" element={
            <SimpleDoctorProtectedRoute>
              <DoctorDashboard />
            </SimpleDoctorProtectedRoute>
          } />
          <Route path="/doctor/:doctorId" element={
            <DoctorProtectedRoute>
              <DoctorDashboard />
            </DoctorProtectedRoute>
          } />
          <Route path="/management-dashboard" element={
            <ProtectedRoute>
              <ManagementDashboard />
            </ProtectedRoute>
          } />
          
          {/* New Hospital Management Routes */}
          <Route path="/patient-profile" element={<PatientDetailsForm onSubmit={() => {}} onBack={() => {}} />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/doctor/:id" element={<DoctorDetail />} />
          <Route path="/doctor-info/:id" element={<DoctorDetail />} />
          <Route path="/confirm-appointment" element={<ConfirmAppointment />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
