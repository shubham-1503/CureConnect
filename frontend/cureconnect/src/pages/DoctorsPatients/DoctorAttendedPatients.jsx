import DoctorNavbar from "../../Components/DoctorNavbar.jsx";
import DoctorFooter from "../../Components/DoctorFooter.jsx";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MdEditSquare} from "react-icons/md";
import {getPatients} from "../../service/doctorPatientsService.js";


function DoctorAttendedPatients() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [filteredPatients, setfilteredPatients] = useState([]);
    const [patientData, setpatientData] = useState([]);

    useEffect(() => {
        getPatients().then((res) => {
            setpatientData(res);
            setfilteredPatients(res);
        });
    }, [])

    useEffect(() => {
        setfilteredPatients(patientData);
    }, [patientData]);

    useEffect(() => {
        setfilteredPatients(
            patientData.filter((patient) =>
                patient.patientName.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query]);
    const handlePatientClick =  (event,patientId)=>{ event.preventDefault();navigate(`/doctor/patients/${patientId}`);}
    return (
        <>
            <DoctorNavbar location={"patients"}/>
            <div className="flex flex-col xl:flex-row w-full mx-auto bg-backgroundColor min-h-screen">
                <div className="flex w-full h-full shrink-0">
                    <div className="flex flex-col w-full p-12 xl:pl-10">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <p className="text-secondaryColor text-xl font-bold mb-5 xl:mb-0">
                                Attended Patients
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
                                    placeholder="Search for patients"
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
                                        Age
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        View
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredPatients && filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient) => (
                                        <tr
                                            className="group bg-whiteColor border-t-2 border-gray-700 text-wrap hover:bg-primaryColor hover:font-extrabold hover:text=whiteColor hover:cursor-pointer g transition duration-200"
                                            key={patient.id}
                                            // onClick={event => }
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor"
                                            >
                                                {patient.patientName}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {patient.age}
                                            </td>
                                            <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                                                {patient.gender}
                                            </td>

                                            <td className="flex flex-row justify-start px-6 py-4 ">
                                                <MdEditSquare
                                                    onClick={(event) => {
                                                        handlePatientClick(event,patient.id);
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
                    </div>
                </div>
            </div>
            <DoctorFooter />
        </>
    );
}

export default DoctorAttendedPatients;