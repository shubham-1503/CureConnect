import React, { useState, useEffect } from "react";
import { MdEditSquare } from "react-icons/md";
import {useParams} from "react-router-dom";
import DoctorNavbar from "../../Components/DoctorNavbar.jsx";
import Footer from "../Landing/Footer.jsx";
import defaultProfilePic from "../PatientAppointment/default.svg";
import axios from "axios";
import getUserDetails from "../../service/userService.js";
import {Modal} from "flowbite-react";
import UpdatePrescription from "./UpdatePrescription.jsx";
import {getPatientsAppointments} from "../../service/doctorPatientsService.js";

function PatientAppointmentDetails() {
    let {patientId} = useParams();
    const [patientDetails,setPatientDetails] = useState({});
    const [futureAppointmentData, setFutureAppointmentData] = useState([]);
    const [pastAppointmentData, setPastAppointmentData] = useState([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState({});
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const fetchAppointments  = function (){
        getPatientsAppointments(patientId)
            .then((res) => {
                setFutureAppointmentData(res.futureAppointments);
                setPastAppointmentData(res.pastAppointments)
            });
    }
        useEffect(()=>{
            getUserDetails.getUserDetails(patientId, token).then((data)=>{
                setPatientDetails(data);
            });
            fetchAppointments();
        },[]);
    function onCloseModal() {
        setOpenEditModal(false);
        fetchAppointments();
    }
    return (
        <>
            <DoctorNavbar location={"patients"}/>
            <div className="flex flex-col xl:flex-row w-full mx-auto bg-backgroundColor min-h-screen">
                <div className="flex flex-col w-full h-full basis-4/12 grow-0 shrink-0">
                    <div className="flex flex-row justify-between pl-12 pt-12 pr-12">
                        <p className="text-secondaryColor text-xl font-bold mb-5">
                            Patient Details
                        </p>
                    </div>
                    <div className="[perspective:1000px]">
                        <div className="relative">
                            <div className="flex flex-col w-full pl-12 xl:file:pb-12 pr-12">
                                <div className="w-full py-5 bg-backgroundColor text-secondaryColor border-2 border-secondaryColor rounded-lg shadow " >
                                    <div className="px-5 pb-5 m-4" >
                                        <div className="flex flex-col w-full basis-1/3 border-b-2 border-secondaryColor m-auto items-center xl:border-0 p-4">
                                            <img
                                                className="mb-6 object-cover rounded-[50%] w-20 h-20 bg-no-repeat"
                                                src={defaultProfilePic}
                                            />
                                            <h2 className="text-secondaryColor text-3xl font-bold">
                                                {patientDetails.userName}
                                            </h2>
                                            <div className="text-left w-full">
                                                <div className="flex flex-col mb-2">

                                                    <p className="text-secondaryColor text-lg">
                                                        <label className="text-secondaryColor font-bold">Email:</label> {patientDetails.email}
                                                    </p>
                                                    <p className="text-secondaryColor text-lg">
                                                        <label className="text-secondaryColor font-bold">Number:</label> {patientDetails.number}
                                                    </p>
                                                    <p className="text-secondaryColor text-lg">
                                                        <label className="text-secondaryColor font-bold">Gender:</label> {patientDetails.gender}
                                                    </p>
                                                    { patientDetails.address
                                                      &&
                                                        <p className="text-secondaryColor text-lg">
                                                            <label className="text-secondaryColor font-bold">Address:</label> {patientDetails.address}
                                                        </p>
                                                    }

                                                    { patientDetails.city
                                                        &&
                                                        <p className="text-secondaryColor text-lg">
                                                            <label className="text-secondaryColor font-bold">City:</label> {patientDetails.city}
                                                        </p>
                                                    }
                                                    { patientDetails.postcode
                                                        &&
                                                        <p className="text-secondaryColor text-lg">
                                                            <label className="text-secondaryColor font-bold">Postcode:</label> {patientDetails.postcode}
                                                        </p>
                                                    }
                                                    { patientDetails.country
                                                        &&
                                                        <p className="text-secondaryColor text-lg">
                                                            <label className="text-secondaryColor font-bold">Postcode:</label> {patientDetails.country}
                                                        </p>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-full basis-8/12 grow-0 shrink-0">
                    <div className="flex flex-col w-full p-12 xl:pl-0">
                        <div className="mb-8">
                            <p className="text-secondaryColor text-xl font-bold mb-5 xl:mb-0">
                                Upcoming Appointments
                            </p>
                        </div>

                        <div className="max-h-[610px] overflow-hidden overflow-y-auto overflow-x-auto border-2 border-secondaryColor">
                            <table className="w-full text-sm text-left rtl:text-right text-secondaryColor">
                                <thead className="text-sm text-whiteColor uppercase bg-secondaryColor rounded-lg sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                {futureAppointmentData && futureAppointmentData.length > 0 ? (
                                    futureAppointmentData.map((appointment) => (
                                        <tr
                                            className="group bg-whiteColor border-t-2 border-gray-700 text-wrap hover:bg-primaryColor hover:font-extrabold hover:text=whiteColor hover:cursor-pointer g transition duration-200"
                                            key={appointment.id}
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor"
                                            >
                                                {appointment.type}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {appointment.description}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {new Date(appointment.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {new Date(appointment.start).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-4 text-sm md:text-sm text-center font-bold text-secondaryColor"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mb-8" >
                            <p className="text-secondaryColor text-xl font-bold mt-8 mb-5 xl:mb-0">
                                Past Appointments
                            </p>
                        </div>
                        <div className="max-h-[610px] overflow-hidden overflow-y-auto overflow-x-auto border-2 border-secondaryColor">
                            <table className="w-full text-sm text-left rtl:text-right text-secondaryColor">
                                <thead className="text-sm text-whiteColor uppercase bg-secondaryColor rounded-lg sticky top-0">
                                {/* Table header */}
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Edit
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                                {pastAppointmentData && pastAppointmentData.length > 0 ? (
                                                    pastAppointmentData.map((appointment) => (
                                                        <tr
                                                            className="group bg-whiteColor border-t-2 border-gray-700 text-wrap hover:bg-primaryColor hover:font-extrabold hover:text=whiteColor hover:cursor-pointer g transition duration-200"
                                                            key={appointment.id}
                                                        >
                                                            <td
                                                                scope="row"
                                                                className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor"
                                                            >
                                                                {appointment.type}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                                {appointment.description}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                                {new Date(appointment.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                                {new Date(appointment.time).toLocaleDateString()}
                                                            </td>
                                                            <td className="flex flex-row justify-start px-6 py-4 ">
                                                                <MdEditSquare
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        setOpenEditModal(true);
                                                                        setAppointmentToEdit(appointment);
                                                                    }}
                                                                    className="text-secondaryColor w-6 h-6 group-hover:text-whiteColor hover:scale-125 transition duration-200 ease-in-out"
                                                                />

                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="7"
                                                            className="px-6 py-4 text-sm md:text-sm text-center font-bold text-secondaryColor"
                                                        >
                                                            No records found
                                                        </td>
                                                    </tr>
                                                )}
                                </tbody>
                            </table>
                        </div>
                        <Modal
                            show={openEditModal}
                            size="7xl"
                            onClose={onCloseModal}
                            popup
                        >
                            <UpdatePrescription
                                appointment = {appointmentToEdit}
                                onCloseModal={onCloseModal}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PatientAppointmentDetails;
