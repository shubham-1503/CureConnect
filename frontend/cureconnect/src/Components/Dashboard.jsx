import React from 'react'
import AppointmentManagement from "../pages/DoctorAppointmentPage/AppointmentManagement.jsx";
import PatientDashboard from "../pages/PatientDashboard/PatientDashboard.jsx";
import Inventory from "../pages/Inventory/Inventory.jsx";
import Login from "../pages/LoginSignup/Login.jsx";


function Dashboard() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const handleRouting = (key) => {
        if (key?.role === "doctor") {
            return <AppointmentManagement/>
        } else if (key?.role === "patient") {
            return <PatientDashboard/>
        } else if (key?.role === "admin") {
            return <Inventory/>;
        } else {
            return <Login/>;
        }
    };

    return handleRouting(userInfo)

}
export default Dashboard;