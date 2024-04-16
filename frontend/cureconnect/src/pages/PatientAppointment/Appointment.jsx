import defaultProfilePic from "./default.svg";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Calendar from "./Calendar";
import PatientNavbar from "../../Components/PatientNavbar";
import PatientFooter from "../../Components/PatientFooter";
import { slots, days } from "../../Components/Constants";
import {fetchDoctorData, fetchAppointmentFromToday, updateAppointment} from "../../service/patientAppointmentService";
import {ToastContainer,toast} from 'react-toastify'


function Appointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorId = location.state.doctorId;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [availableTime, setAvailableTime] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  const [fetchedAppointements, setFetchedAppointments] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: doctorId,
    patientId: userInfo.id,
    patientName: userInfo.userName,
    reason: "",
    type: "",
    allergies: "",
    age: null,
    description: "",
    booked: true,
    price: 45.0,
  });

  const handleAgeChange = (e) => {
    let { name, value } = e.target;
    value = Number(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value === null || isNaN(value) || value < 0) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };

  const [errors, setErrors] = useState({
    reason: false,
    age: false,
    type: false,
    selectedTime: false,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    fetchAppointmentFromToday(doctorId).then((res) => {
      setFetchedAppointments(res.appointmentMapByDate);
      const millisecondsSinceEpoch = getStartDateMilliseconds(new Date());
      setAvailableTime(res.appointmentMapByDate[millisecondsSinceEpoch]);
    });
    
    fetchDoctorData(doctorId).then((resDoc) => {
      setDoctorData(resDoc);
    })
    
  }, []);

  function getStartDateMilliseconds(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  }
  const handleDateChange = (selectedDate) => {
    const millisecondsSinceEpoch = getStartDateMilliseconds(selectedDate);
    setAvailableTime(fetchedAppointements[millisecondsSinceEpoch]);
    setSelectedDate(selectedDate);
    setSelectedTime(null);
  };

  const handleTimeClick = (index) => {
    setErrors((prevState) => ({
      ...prevState,
      [selectedTime]: false,
    }));

    if (selectedTime === index) {
      setSelectedTime(null);
      return;
    }
    setSelectedTime(index);
  };

  const handleSubmit = (event) => {
    let isValid = true;
    const elements = ["reason", "type"];
    event.preventDefault();

    for (const element of elements) {
      if (formData[element] === "") {
        isValid = false;
        setErrors((prevState) => ({
          ...prevState,
          [element]: true,
        }));
      }
    }

    if (selectedTime === null) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        selectedTime: true,
      }));
    }

    if (formData.age === null || isNaN(formData.age) || formData.age < 0) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        age: true,
      }));
    }

    for (const errorKey in errors) {
      if (errors[errorKey]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      toast.warning("Please fill all the required fields.");
      return;
    }

    const filteredAppointment = availableTime.find((appointment) => {
      return appointment.slotId === selectedTime;
    });

    if (filteredAppointment) {
      const mergedData = {
        ...filteredAppointment,
        ...formData,
      };

      updateAppointment(mergedData).then ((res) => {
        event.target.reset();
        toast.success("Appointment booked successfully! You will be redirected to dashboard shortly.");
        setTimeout(() => {
          navigate("/patient/paymentgateway");
        }, 3000)
      });
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value === "") {
      setErrors((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };

  return (
    <>
      <PatientNavbar location={"appointment"} />
      <div className="flex flex-col xl:flex-row w-full overflow-scroll bg-backgroundColor">
        <div className="flex flex-col w-full h-screen basis-1/3 border-b-2 border-secondaryColor m-auto py-6 xl:py-0 items-center xl:border-0">
          <div className="justify-center items-center text-center">
            <div className="flex flex-col items-center">
              <img
                className="mb-4 object-cover rounded-[50%] w-28 h-28 bg-no-repeat"
                src={doctorData && doctorData.profileUrl !== null ? doctorData.profileUrl : defaultProfilePic}
              />
              <div className="flex flex-row gap-2 my-2">
                <h2 className="text-secondaryColor text-3xl font-bold">
                  {doctorData && doctorData.userName ? doctorData.userName : "Doctor Name"} 
                  {doctorData && doctorData.booked && <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#3AAFA9"></path> </g></svg>}
                </h2>
              </div>
            </div>
            <div className="px-8 text-left">
              <div className="flex flex-row gap-2 my-2">
                <p className="text-secondaryColor text-lg">Specialization:</p>
                <p className="text-secondaryColor font-bold  text-lg">{doctorData && doctorData.specialization ? doctorData.specialization : "No Specialization"}</p>
              </div>
              <div className="flex flex-row gap-2 my-2">
                <p className="text-secondaryColor text-lg">Education Details:</p>
                <p className="text-secondaryColor font-bold  text-lg">{doctorData && doctorData.educationDetails ? doctorData.educationDetails : "No Education Details"}</p>
              </div>
              <div className="flex flex-row gap-2 my-2">
                <p className="text-secondaryColor text-lg">Experience:</p>
                <p className="text-secondaryColor font-bold  text-lg">{doctorData && doctorData.experience ? doctorData.experience : "No Experience" }</p>
              </div>
              <div className="flex flex-row gap-2 my-2">
                <p className="text-secondaryColor text-lg">Description:</p>
                <p className="text-secondaryColor font-bold text-lg">{doctorData && doctorData.description ? doctorData.description : "No Description" }</p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
        <div className="flex flex-col w-full basis-2/3 p-8 xl:pl-0">
          <h2 className="text-secondaryColor text-2xl font-bold">
            Appointment Booking
          </h2>
          <form
            className="mt-5 w-full p-5 border-2 border-secondaryColor mb-8 text-secondaryColor rounded-lg"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="reason"
              className="block text-sm px-1 font-bold  basis-1/2"
            >
              Reason for Appointment
            </label>
            <input
              id="reason"
              name="reason"
              placeholder="Reason for Appointment"
              onChange={handleChange}
              className=" text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-5 mt-1 text-base transition duration-200 ease-in-out rounded-lg bg-whiteColor border-2 border-secondaryColor border-solid focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
            />
            {errors.reason && (
              <p className="mb-4 text-start uppercase text-[0.70em] font-bold tracking-[0.15em]">
                ❌ Reason for the appointment cannot be empty.
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:gap-10">
              <div className="flex flex-col w-full basis-1/3">
                <label
                  htmlFor="type"
                  className="block text-sm px-1 font-bold  basis-1/2"
                >
                  Type of Appointment
                </label>
                <div className="mb-5 mt-1 border-2 border-secondaryColor rounded-lg">
                  <select
                    className="text-secondaryColor placeholder-gray-600 w-full text-base transition duration-200 ease-in-out border-transparent rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryColor px-4 py-1.5"
                    defaultValue={""}
                    name="type"
                    id="type"
                    onChange={handleChange}
                  >
                    <option value={""} disabled>
                      {""}
                      -- select an option --{" "}
                    </option>
                    <option value="Regular CheckUp">Regular CheckUp</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
                {errors.type && (
                  <p className="mb-4 text-start uppercase text-[0.70em] font-bold tracking-[0.15em]">
                    ❌ Please select the type.
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full basis-1/3">
                <label
                  htmlFor="allergy"
                  className="block text-sm px-1 font-bold  basis-1/2"
                >
                  Allergies
                </label>
                <input
                  id="allergies"
                  name="allergies"
                  placeholder="Allergies (Optional)"
                  onChange={handleChange}
                  className="text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-5 mt-1 text-base transition duration-200 ease-in-out rounded-lg bg-whiteColor border-2 border-secondaryColor border-solid focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
                />
              </div>
              <div className="flex flex-col w-full basis-1/3">
                <label
                  htmlFor="age"
                  className="block text-sm px-1 font-bold  basis-1/2"
                >
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Age"
                  step={1}
                  onChange={handleAgeChange}
                  className="text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-5 mt-1 text-base transition duration-200 ease-in-out rounded-lg bg-whiteColor border-2 border-secondaryColor border-solid focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
                />

                {errors.age && (
                  <p className="text-errorText mb-4 text-start uppercase text-[0.70em] font-bold tracking-[0.15em]">
                    ❌ Enter correct age.
                  </p>
                )}
              </div>
            </div>

            <label
              htmlFor="description"
              className="block text-sm px-1 font-bold "
            >
              Additional Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              className="min-h-[100px] max-h-[300px] mt-1 mb-5 h-28 placeholder-gray-600 appearance-none block w-full border-2 border-secondaryColor rounded-lg py-4 px-4 text-secondaryColor bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bottom-0 transition duration-200 ease-in-out"
              placeholder="Description"
            ></textarea>
            <label
              htmlFor="booking"
              className="block text-sm px-1 font-bold mt-2"
            >
              Booking Date and Time
            </label>
            <div className="flex flex-col md:flex-row items-start gap-5 mt-1 mb-4">
              <Calendar
                id="booking"
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <div className="flex flex-col w-full gap-1 ">
                <div className="flex flex-col xs:flex-row justify-between px-2 text-lg">
                  <p className=" pt-1 font-bold text-secondaryColor mb-3">
                    {" "}
                    {days[selectedDate.getDay()] +
                      `, ` +
                      selectedDate.toLocaleDateString()}
                  </p>
                  <p className=" pt-1 font-bold text-secondaryColor mb-3">
                    {" "}
                    {slots[selectedTime]}
                  </p>
                </div>

                <ul className="grid grid-flow-row grid-cols-1 xs:grid-cols-2 gap-4 max-h-80 overflow-y-auto p-1 xs:p-2">
                  {slots.map((time, index) => {
                    const isAvailable =
                      availableTime &&
                      availableTime.some((slot) => slot.slotId === index);
                    const isSelected = selectedTime === index;

                    return (
                      <li
                        key={index}
                        className={`w-full h-10 leading-5 rounded-lg text-whiteColor text-ellipsis whitespace-nowrap overflow-hidden outline-none p-2 cursor-pointer transition duration-200 ease-in-out
          ${
            isAvailable
              ? isSelected
                ? "bg-primaryColor text-whiteColor"
                : "bg-secondaryColor hover:bg-primaryColor hover:text-whiteColor"
              : "bg-gray-400"
          }
          `}
                        onClick={
                          isAvailable ? () => handleTimeClick(index) : undefined
                        }
                      >
                        {time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {errors.selectedTime && (
              <p className="mb-4 text-start uppercase text-[0.70em] font-bold tracking-[0.15em]">
                ❌ Please select a time of an appointment.
              </p>
            )}
            <div className="flex flex-row mt-8 mb-2 border-2 p-2 border-secondaryColor rounded-lg">
              <div className="flex basis-9/12">
                <p className="text-lg p-2 items-center font-bold text-secondaryColor">
                  {`Total: ${formData.price}`}
                </p>
              </div>
              <div className="flex basis-3/12 justify-end">
                <button
                  type="submit"
                  className="text-whiteColor w-full p-2 text-sm font-bold tracking-wide bg-secondaryColor rounded-lg hover:bg-primaryColor hover:text-whiteColor transition duration-200 ease-in-out"
                >
                  Proceed to Pay ➜
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <PatientFooter />
    </>
  );
}

export default Appointment;
