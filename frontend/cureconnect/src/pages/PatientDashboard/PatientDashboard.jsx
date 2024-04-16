import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeImage from '../../assets/patientDashboardIcons/AI-Waving.png';
import pregnant from '../../assets/patientDashboardIcons/pregnant.png';
import skinIssues from "../../assets/patientDashboardIcons/skin-issues.png"
import cold from "../../assets/patientDashboardIcons/cold.png"
import child from "../../assets/patientDashboardIcons/child.png"
import '../../pages/css/patientDashboard.css';
import PatientNavbar from "../../Components/PatientNavbar";
import PatientFooter from "../../Components/PatientFooter";
import getBookingDetails from '../../service/userService';
import findAppointment from '../PatientDashboard/PatientBookings';
import getUserDetails from '../../service/userService';

export const PatientDashboard = () => {
    const navigate = useNavigate();
    const [token, authToken] = useState('');

    const [bookings, setBookins] = useState({
        bookingDate: '',
        bookingStartTime: '',
        bookingEndTime: '',
    });

    const [prevBookings, setprevBookings] = useState({
        bookingDate: '',
        bookingStartTime: '',
        bookingEndTime: '',
    });

    const [formData, setFormData] = useState({
        id: '',
        userRole: '',
        userName: '',
    });


    useEffect(() => {

        const fetchUserBookingDetails = async () => {

            const userDataString = localStorage.getItem("userInfo");

            const userData = await JSON.parse(userDataString);

            // Check if user is loged-in or not
            if (!userData || !userData.id || !userData.token || !userData.role || userData.role != 'patient') {
                   return navigate("/user/Login");
            }

            formData.id = userData.id;
            formData.userRole = userData.role;
            authToken(userData.token);

            try {
                
                const userDetails = await getBookingDetails.getBookingsDetails(formData.id, userData.token);
              
                const upcomingAppointment = await findAppointment.findAppointment(userDetails, 'upcoming');
                const pastAppointment = await findAppointment.findAppointment(userDetails, 'past');

                const details = await getUserDetails.getUserDetails(formData.id, userData.token);

                if(userDetails.length >0){
                    setFormData((userName) => ({ ...userName, ["userName"]: userDetails[0].patientName }));
                }else{
                    const details = await getUserDetails.getUserDetails(formData.id, userData.token);
                    setFormData((userName) => ({ ...userName, ["userName"]:  details.userName }));
                }

                    if (upcomingAppointment) {
                        setBookins((booking) => ({
                            ...booking, ["bookingDate"]: upcomingAppointment.bookingDate,
                            ["bookingStartTime"]: upcomingAppointment.startTime,
                            ["bookingEndTime"]: upcomingAppointment.endTime
                        }));
                    } else {
                    }
                    if (pastAppointment) {
                        setprevBookings((booking) => ({
                            ...booking, ["bookingDate"]: pastAppointment.bookingDate,
                            ["bookingStartTime"]: pastAppointment.startTime,
                            ["bookingEndTime"]: pastAppointment.endTime
                        }));
                  
                } else {
                }
            
            } catch (error) {
                console.error('Error from profile page:', error);
            }
        };

        fetchUserBookingDetails();

    }, []);

    const handleSpecialtyClick = (path) => {
        navigate(path);
    };

    const handleBokingClick = async (e) => {
        e.preventDefault();
        navigate("/");
    };

    const specialties = [
        {
            icon:
                <img src={pregnant} alt="Period doubts or Pregnancy" className="w-8 h-8" />,
            title: 'Period doubts or Pregnancy',
            consultText: 'CONSULT NOW',
            path: '/patient/search',
        },
        {
            icon: <img src={skinIssues} alt="Period doubts or Pregnancy" className="w-8 h-8" />,
            title: 'Acne, pimple or skin issues',
            consultText: 'CONSULT NOW',
            path: '/patient/search',
        },
        {
            icon: <img src={cold} alt="Period doubts or Pregnancy" className="w-8 h-8" />,
            title: 'Cold, cough or fever',
            consultText: 'CONSULT NOW',
            path: '/patient/search',
        },
        {
            icon: <img src={child} alt="Period doubts or Pregnancy" className="w-8 h-8" />,
            title: 'Children not feeling well',
            consultText: 'CONSULT NOW',
            path: '/patient/search',
        },
    ];

    return (
        <>
            <PatientNavbar location={"dashboard"} />
            <div className="w-full overflow-auto bg-primaryColor">
                <div className="w-full overflow-auto bg-backgroundColor">
                    <div className="flex justify-between items-center md:-my-8 p-10 my-px ml-8">
                        <h2 className="text-2xl font-bold">Welcome {formData.userName} , to the Cure-Connect</h2>
                        <div className="mr-4">
                            <img src={WelcomeImage} alt="AI Image" className="hello_Image w-auto w-auto max-w-[400px]" />
                        </div>
                    </div>

                    <div className='border rounded-lg p-4 ml-4 mr-4 md:-my-8'>
                        <div className="flex flex-col justify-between relative md:flex-row items-center md:items-start p-4 md:p-10 my-8 md:-my-8">
                            <h2 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
                                Consult top doctors online for any health concern
                            </h2>
                            <button className="text-xs sm:text-sm md:text-md h-fit w-fit  bg-secondaryColor rounded-lg text-whiteColor p-3 hover:bg-primaryColor ">

                                View All Specialities
                            </button>
                        </div>
                        <div className="flex justify-center md:justify-around flex-wrap p-4 md:p-10 md:-mt-8">
                            {specialties.map((specialty, index) => (
                                <div className="flex flex-col items-center w-full md:w-1/6 m-2 md:m-4" key={index} onClick={() => handleSpecialtyClick(specialty.path)}>
                                    <div className="bg-gray-200 rounded-full p-4">{specialty.icon}</div>
                                    <div className="flex flex-col justify-between items-center h-full">
                                        <p className="mt-2 font-bold text-center">{specialty.title}</p>
                                        <button className="text-xs sm:text-sm md:text-md h-fit w-fit  bg-secondaryColor rounded-lg text-whiteColor p-3 hover:bg-primaryColor mt-4">
                                            {/* className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"> */}
                                            {specialty.consultText}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 flex flex-col md:flex-row justify-between mt-4 md:mt-10 mt-10 gap-6 md:gap-16">
                        <div className="w-full md:w-1/2 -mb-6 md:mb-8">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Upcoming Appointment</h2>
                                <div className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg bg-white">
                                {bookings && bookings.bookingDate ? (
                                        <>
                                            <div className="mb-4 md:mb-0">
                                                <div className="font-medium">Date</div>
                                                <div className="text-sm text-gray-600">Appointment Date: {bookings.bookingDate}</div>
                                                <div className="text-sm text-gray-600">Appointment start Time: {bookings.bookingStartTime}</div>
                                                <div className="text-sm text-gray-600">Appointment end Time: {bookings.bookingEndTime}</div>
                                            </div>
                                            <button className="text-xs sm:text-sm md:text-md h-fit w-fit  bg-secondaryColor rounded-lg text-whiteColor p-3 hover:bg-primaryColor ">
                                               
                                                Join Session
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4 md:mb-0">
                                                <p className="text-sm text-gray-600">Don't have any upcoming appointments.</p>
                                            </div>
                                            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 md:ml-8"
                                                onClick={handleBokingClick}>
                                                Book Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-4">Previous Appointment</h2>
                                <div className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg bg-white">
                                    {prevBookings && prevBookings.bookingDate ? (
                                        <>
                                            <div className="mb-4 md:mb-0">
                                                <div className="font-medium">Date</div>
                                                <div className="text-sm text-gray-600">Booking Date: {prevBookings.bookingDate}</div>
                                                <div className="text-sm text-gray-600">Booking Time: {prevBookings.bookingStartTime}</div>
                                                <div className="text-sm text-gray-600">Booking Time: {prevBookings.bookingEndTime}</div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="mb-4 md:mb-0">
                                                <p className="text-sm text-gray-600">Don't have any previous appointments.</p>
                                            </div>
                                            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 md:ml-8"
                                                onClick={handleBokingClick}>
                                                Book Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PatientFooter />
        </>
    );

};

export default PatientDashboard;