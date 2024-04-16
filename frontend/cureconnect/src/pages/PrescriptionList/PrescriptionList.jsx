import React from "react";
import { useNavigate } from "react-router-dom";
// import { FaFileDownload } from "react-icons/fa";
// import { IoEye } from "react-icons/io5";
import { useEffect, useState } from "react";
import PatientFooter from "../../Components/PatientFooter";
import PatientNavbar from "../../Components/PatientNavbar";
import { fetchPastPrescriptionDataAPI } from "../../service/patientAppointmentService";

function PrescriptionList() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const userInfo.id = "kseryLgniKPNB4V3oFE4ryWjWlO2";

  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await 
        fetchPastPrescriptionDataAPI(userInfo.id)
          .then((response) => {
            setAppointmentsData(response);
          });
      } catch (error) {
        console.error("Error fetching appointments data:", error);
      }
    };
    fetchAppointmentsData();
  }, []);


  const [searchText, setSearchText] = useState("");

  const filteredAppointmentsData = appointmentsData
    ? appointmentsData.filter((appointment) =>
        appointment.doctorName.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  function convertToDate(timestamp) {
    var date = new Date(timestamp);

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();

    var formattedDate = month + " " + day + ", " + year;

    return formattedDate;
  }

  function convertToTime(timestamp) {
    var date = new Date(timestamp);

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    var formattedTime = hours + ":" + minutes + " " + ampm;

    return formattedTime;
  }

  const navigate = useNavigate();

  const handleBuy = (appointment) => {
    navigate("/patient/prescriptionlist/prescribedmedicine", { state: { appointment } });
  };

  return (
    <>
    <PatientNavbar />
      <div className="flex flex-col w-screen h-screen px-6 overflow-y-auto items-stretch bg-backgroundColor">

        <div className="w-4/5 lg:w-3/5  mx-auto flex flex-col sm:flex-row justify-between items-center my-2 mt-6 gap-4 ">
          <div className="text-xl md:text-2xl font-bold">
            Select a prescription
          </div>
          <div className="min-w-40 flex md:text-lg items-center bg-secondaryColor rounded-md text-white p-2 ">
            <input
              type="text"
              placeholder="Search by name"
              className=" bg-secondaryColor w-full px-1 outine-none focus:outline-none"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col my-2 justify-center items-center w-full mb-4">
          <div className="w-4/5 lg:w-3/5 overflow-x-auto ">
            <table className="min-w-full w-full text-center border bg-white border-black">
              <thead className="text-white uppercase md:text-lg bg-secondaryColor border-black border-2">
                <tr>
                  <th scope="col" className="p-3">
                    Doctor Name
                  </th>
                  <th scope="col" className="p-3">
                    Date
                  </th>
                  <th scope="col" className="p-3">
                    Slot
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Buy Medicine
                  </th>
                </tr>
              </thead>
              <tbody className="md:text-lg">
                {filteredAppointmentsData.map((appointment, index) => (
                  <tr
                    key={index}
                    className={
                      "bg-white hover:bg-primaryColor hover:text-white border-2 border-black"
                    }
                  >
                    <td scope="row" className="px-3 py-4 font-semibold">
                      {appointment.doctorName}
                    </td>
                    <td scope="row" className="px-3 py-4 font-semibold">
                      {convertToDate(appointment.appointmentDate)}
                    </td>
                    <td scope="row" className="px-3 py-4 font-semibold">
                      {convertToTime(appointment.start)}
                    </td>
                    <td className="p">
                      <button
                        onClick={() => handleBuy(appointment)}
                        className="rounded-full py-1 px-8 font-semibold text-white bg-secondaryColor"
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PatientFooter />
    </>
  );
}

export default PrescriptionList;
