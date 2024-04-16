import AdminFooter from "../../Components/AdminFooter.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import AdminNavbar from "../../Components/AdminNavbar.jsx";
import {FaRegIdBadge} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";
import {approveDoctor, getDoctors} from "../../service/adminService.js";


function DoctorsApproval() {
    const [query, setQuery] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const token = JSON.parse(localStorage.getItem('userInfo')).token;
    const fetchDoctor = function (){
        getDoctors()
            .then((res) => {
                setDoctorData(res);
            });
    }
    useEffect(()=>{
        fetchDoctor();
    },[])

    useEffect(() => {
        setFilteredDoctors(doctorData);
    }, [doctorData]);

    useEffect(() => {
        setFilteredDoctors(
            doctorData.filter((doctor) =>
                doctor.userName.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query]);
    const handleApproval = (event,doctorId,isApproved) => {
        event.preventDefault()
        if (!isApproved) {
            approveDoctor(doctorId).then((res)=>{
                    toast.success("Doctor Approved!");
                    fetchDoctor();
            }).catch((res)=>{
                toast.error("Error While Approving Doctor!");
            })
        }
    };
    return (
        <>
            <AdminNavbar location={"approval"}/>
            <ToastContainer />
            <div className="flex flex-col xl:flex-row w-full mx-auto bg-backgroundColor min-h-screen">
                <div className="flex w-full h-full shrink-0">
                    <div className="flex flex-col w-full p-12 xl:pl-10">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <p className="text-secondaryColor text-xl font-bold mb-5 xl:mb-0">
                                Doctors
                            </p>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-whiteColor dark:text-gray-400"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="block p-2 ps-10 text-sm text-whiteColor rounded-lg w-full md:w-80 bg-secondaryColor placeholder:text-whiteColor focus:text-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor transition duration-200 ease-in-out"
                                    placeholder="Search for Doctors"
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="max-h-[610px] overflow-hidden overflow-y-auto overflow-x-auto border-2 border-secondaryColor">
                            <table className="w-full text-sm text-left rtl:text-right text-secondaryColor">
                                <thead className="text-sm text-whiteColor uppercase bg-secondaryColor rounded-lg sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Specialization
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Experience
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Education
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        License
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Approved
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredDoctors && filteredDoctors.length > 0 ? (
                                    filteredDoctors.map((doctor) => (
                                        <tr
                                            className="group bg-whiteColor border-t-2 border-gray-700 text-wrap hover:bg-primaryColor hover:font-extrabold hover:text=whiteColor hover:cursor-pointer g transition duration-200"
                                            key={doctor.id}
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor"
                                            >
                                                {doctor.userName}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.specialization}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.description}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.experience}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.email}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.number}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.gender}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {doctor.educationDetails}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                <button className={`bg-teal-500 hover:bg-secondaryColor text-white font-bold py-2 px-4 rounded mt-4 md:mt-0 md:ml-8 `}
                                                        onClick={event => {
                                                            event.preventDefault();
                                                            window.open(doctor.licenseUrl, '_blank', 'noopener, noreferrer');
                                                        }}>
                                                    <FaRegIdBadge />
                                                </button>
                                            </td>

                                            <td className="flex flex-row justify-start px-6 py-4 ">

                                                {doctor.approved ? (
                                                    // ${doctor.approved ? "bg-secondaryColor":"bg-primaryColor"}
                                                    <button disabled className=" text-white px-4 py-2 rounded cursor-not-allowed bg-primaryColor">
                                                        Approved
                                                    </button>
                                                ) : (
                                                    <button onClick={event => handleApproval(event,doctor.id,doctor.approved)} className=" text-white px-4 py-2 rounded bg-secondaryColor">
                                                        Approve
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-6 py-4 text-sm md:text-sm text-center font-bold text-secondaryColor"
                                        >
                                            No records found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    );
}

export default DoctorsApproval;