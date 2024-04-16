import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/LoginSignup/Login';
import Register from './pages/LoginSignup/Register';
import EmailConfirmation from './pages/LoginSignup/EmailConfirmation';
import ResetPassword from './pages/LoginSignup/ResetPassword';
import PrescriptionList from './pages/PrescriptionList/PrescriptionList';
import PrescribedMedicine from './pages/PrescribedMedicine/PrescribedMedicine';
import ContactUs from './pages/ContactUs/ContactUs';
import Error404 from './pages/Error404';
import Faq from './pages/FAQ/Faq';
import AppointmentManagement from './pages/DoctorAppointmentPage/AppointmentManagement';
import { ProfilePage } from './pages/LoginSignup/ProfilePage';
import { AuthProvider } from './pages/Authentication/Authentication';
import DoctorRegister from './pages/LoginSignup/DoctorRegister';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AddPrescription from './pages/MeetingPage/AddPrescription';
import PastAppointments from './pages/PastAppointments/PastAppointments';
import ViewPrescription from './pages/ViewPrescription/ViewPrescription';
import Inventory from './pages/Inventory/Inventory';
import Appointment from './pages/PatientAppointment/Appointment';

import MeetingRoom from './pages/MeetingPage/MeetingRoom';
import PrivateRoute from "./Components/PrivateRoute";
import DoctorAttendedPatients from "./pages/DoctorsPatients/DoctorAttendedPatients.jsx";
import PatientAppoitmentDetails from "./pages/DoctorsPatients/PatientAppoitmentDetails.jsx";
import DoctorsApproval from "./pages/Admin/DoctorsApproval.jsx";
import Search from "./pages/Search/Search.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import PaymentGateway from './Components/PaymentGateway.jsx';


function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigateBasedOnAppType = () => {
    if(userInfo?.role !== undefined){
      return <Dashboard/>;
    }else{
      return <Login/>
    }
  }
  return (
    <div>
      <Router>
        <Routes>
          {/* Accessible Routes */}
          <Route path='/' element={<Landing/>} />
          <Route path='/contactus' element={<ContactUs/>} />
          <Route path='*' element={<Error404/>} />
          <Route path='/faq' element={<Faq/>} />

          {/* Login and SignUp */}
          <Route path='/doctor/doctorappointment' element={<AppointmentManagement/>} />
          <Route path='/user/Login' element={userInfo ? navigateBasedOnAppType() : <Login />}  />
          <Route path='/user/Register' element={<Register/>} />
          <Route path='/user/DoctorRegister' element={<DoctorRegister/>} />
          <Route path="/user/EmailConfirmation" element= {<EmailConfirmation />} />
          <Route path="/user/Reset-Password" element={<ResetPassword />} />
          <Route path="/admin/Login" element={userInfo ? navigateBasedOnAppType() :<AdminLogin />} />
          <Route path="/admin/Register" element={<AdminRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Private Routes for Patients */}
          <Route element={<PrivateRoute role={"patient"} />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/Profile" element={<ProfilePage />} />
            <Route path='/patient/appointment' element={<Appointment/>} />
            <Route path='/patient/pastappointments' element={<PastAppointments/>} />
            <Route path='/patient/pastappointments/viewprescription' element={<ViewPrescription/>} />
            <Route path='/patient/prescriptionlist' element={<PrescriptionList/>} />
            <Route path='/patient/prescriptionlist/prescribedmedicine' element={<PrescribedMedicine/>} />
            <Route path='/appointment/patient/meeting/:meetingId' element={<MeetingRoom/>} />
            <Route path='/patient/search' element={<Search/>} />
            <Route path='/patient/paymentgateway' element={<PaymentGateway/>} />
          </Route>

          {/* Private Routes for Doctors */}
          <Route element={<PrivateRoute role={"doctor"} />}>
            <Route path='/doctor/appointments' element={<AppointmentManagement/>} />
            <Route path="/doctor/addPrescription" element={<AddPrescription />} />
            <Route path='/appointment/doctor/meeting/:meetingId' element={<MeetingRoom/>} />
            <Route path='/doctor/patients' element={<DoctorAttendedPatients/>} />
            <Route path='/doctor/patients/:patientId' element={<PatientAppoitmentDetails/>} />
          </Route>

          {/* Private Routes for Admin */}
          <Route element={<PrivateRoute role={"admin"} />}>
            <Route path='/admin/inventory' element={<Inventory />} />
            <Route path='/admin/approval' element={<DoctorsApproval />} />
          </Route>
        </Routes>
      </Router>
      <div className="bg-backgroundColor w-full"></div>
    </div>
  )
}

export default App