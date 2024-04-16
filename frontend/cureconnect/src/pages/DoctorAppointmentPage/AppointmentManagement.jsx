import React, { useState,useEffect } from "react";
import DoctorNavbar from "../../Components/DoctorNavbar";
import DoctorFooter from "../../Components/DoctorFooter";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddAppointmentModal from "./AddAppointmentModal";
import { IoPersonSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { getAppointmentCompleted,getEventsAPI,deleteDoctorAppointment,getEventsByDateAPI,addDoctorAppointments,getPatientsTreated,getEarningForMonth,getTotalEarning } from "../../service/doctorAppointmentService";



function AppointmentManagement() {

  const localizer = momentLocalizer(moment);


  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  
  const [events, setEvents] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedEvent,setSelectedEvent]=useState(null);
  const [appointmentMapByDate, setAppointmentMapByDate] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [patientsTreated, setPatientsTreated] = useState(0);
  const [earningForMonth, setEarningForMonth] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const navigate = useNavigate();

  const userData=JSON.parse(localStorage.getItem("userInfo"));

  const doctorId=userData.id
  const doctorName=userData.userName

  useEffect(() => {
    getEvents();
    getEventsByDate();
    
    const getDetails= ()=>{
      getPatientsTreated(doctorId).then((res)=>{
        setPatientsTreated(res.numberOfPatientsTreated===undefined ? 0 : res.numberOfPatientsTreated);
      })
      getEarningForMonth(doctorId).then((res)=>{
        setEarningForMonth(res.earningsForMonth===undefined ? 0 : res.earningsForMonth);
      })
      getTotalEarning(doctorId).then((res)=>{
        setTotalEarning(res.totalEarnings===undefined ? 0 : res.totalEarnings);
      })
      getAppointmentCompleted(doctorId).then((res)=>{
        setCompletedAppointments(res.numberOfAppointmentsCompleted===undefined ? 0 : res.numberOfAppointmentsCompleted);
      })
    }
    getDetails();
  }, []);

  


  const getEvents = () => {
    getEventsAPI(doctorId)
      .then((res) => {
        const currentTimeStamp=new Date().getTime();
        const modifiedEvents = res.appointmentList.map(appointment => ({
            ...appointment,
            start: new Date(appointment.start), 
            end: new Date(appointment.end),
            title: currentTimeStamp > appointment.end ? "Completed" : appointment.booked ? "Booked" : "Available",
        }
        ));
        setEvents(modifiedEvents);
        loadUpcomingAppointments(modifiedEvents);
      })
      .catch((err) => {
      });
  };

  const getEventsByDate = () =>{
     getEventsByDateAPI(doctorId)
      .then((res) => {
        setAppointmentMapByDate(res.appointmentMapByDate);
      })
      .catch((err) => {
      });
  }


  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  

  const loadUpcomingAppointments = (appointments) =>{
    const currentTime = new Date();
    const currentDay = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const upcomingAppointments = appointments.filter((appointment) => {
      const eventDayDate = new Date(appointment.start).getDate();
      const eventHour = new Date(appointment.start).getHours();
      const eventMinute = new Date(appointment.start).getMinutes();

      return (
        (eventDayDate > currentDay && appointment.booked)||
        (
            eventDayDate === currentDay &&
            (eventHour > currentHour || (eventHour === currentHour && eventMinute > currentMinute)) &&
            appointment.booked === true
          )
      );
    }).sort((a, b) => new Date(a.start) - new Date(b.start));;
    setUpcomingAppointments(upcomingAppointments);
  }


  const handleShowDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleDeleteDialog = () => {
    setShowDelete(!showDelete);
  };


  const handleEventClick = (event) => {
    handleDeleteDialog()
    setSelectedEvent(event)
  };

  const handleDeleteAppointment = () => {
    if(selectedEvent.booked){
        handleDeleteDialog()
        toast.error("Appointment is already booked");
    }else{
      deleteDoctorAppointment(selectedEvent.id)
        .then((res) => {
          getEvents();
          getEventsByDate();
          toast.success("Appointment deleted successfully");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
        handleDeleteDialog()
    }
  };
  
  const eventStyleGetter = (event, start, end, isSelected) => {

    let style = {
      backgroundColor: 'red', 
      color: 'white', 
      borderRadius: '0px', 
      border: 'none', 
    };

    const todaydate = new Date();
    if(start<todaydate){
        style.backgroundColor = '#A9A9A9';
    }else if (!event.booked) {
      style.backgroundColor = '#3AAFA9';
    }else if (event.booked){
        style.backgroundColor = '#17252A';
    }else{
        style.backgroundColor = '#A9A9A9';
    }
    
  
    return {
      style: style
    };
  };

  const handleAddAppointment = async (selectedDate, timeSlotInfo, timeslots)  => {
    let newSlots = [];
    timeSlotInfo.forEach((data, index) => {
        if (data.isSelected) {
            const slot = timeslots[index];
            const [startTime, endTime] = slot.split(' to ');

            // Parse start and end times
            const [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);

            const date = new Date(selectedDate); 
        
            // Set time components to midnight
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            // Get timestamp at midnight
            const timestampAtMidnight = date.getTime();

            const startTimestamp = timestampAtMidnight + (startHour * 60 * 60 * 1000) + (startMinute * 60 * 1000);
            const endTimestamp = timestampAtMidnight + (endHour * 60 * 60 * 1000) + (endMinute * 60 * 1000);


            // Create start and end dates
            const startDate = new Date(startTimestamp);
            const endDate = new Date(endTimestamp);

            // Push to newSlots array
            newSlots.push({
                start: startTimestamp,
                end: endTimestamp,
                appointmentDate:timestampAtMidnight,
                doctorId:doctorId,
                meetingId:randomID(10),
                doctorName:doctorName,
                slotId:index,
                booked:false,
                prescriptionList:[],
            });
        }
    });

    if(newSlots.length===0){
        toast.error("Please select atleast one slot");
        return;
    }
    try{

        const response=await addDoctorAppointments(newSlots)
        if(response.status==="success"){
            getEvents()
            getEventsByDate()
            toast.success("Appointment added successfully");
        }else{
            toast.error("Something went wrong")
        }
    }catch(error){
    }


    handleShowDialog();
}
    const handleJoinMeeting = (meeting) => {
        const currentTime=new Date().getTime();
        if(currentTime>=meeting.start && currentTime<=meeting.end){
          navigate(`/appointment/doctor/meeting/:${meeting.meetingId}`, { state: { meeting } });
        }else{
            toast.error("Meeting is not started yet");
        }
    }

  

  return (
    <div className=" overflow-x-hidden overflow-y-auto flex flex-col">
      <div className="  lg:w-screen lg:h-screen flex flex-col">
        <DoctorNavbar location={"appointments"} />
        <div className=" flex flex-1 flex-col lg:flex-row bg-backgroundColor p-4 md:overflow-hidden">
          <div className="flex flex-col lg:basis-3/5 overflow-hidden p-2">
            <div className="flex flex-col gap-2 md:flex-row justify-between mb-3 md:items-center">
              <h1 className="text-xl lg:text-2xl font-semibold">
                Appointment Calender
              </h1>
              <button
                onClick={handleShowDialog}
                className="text-sm bg-secondaryColor text-white p-3 rounded-lg h-fit hover:bg-primaryColor "
              >
                Add Appointment
              </button>
            </div>
            <div className="w-full h-screen lg:flex-1 overflow-auto">
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                className="border-2 rounded-lg border-secondaryColor p-2 overflow-y-auto "
                onSelectEvent={handleEventClick}
              />
              {showDelete && 
                <DeleteAppointmentModal 
                    handleDeleteDialog={handleDeleteDialog}
                    handleDeleteSlot={handleDeleteAppointment}
                />
            }
            </div>
          </div>
          <div className=" lg:basis-2/5 lg:flex lg:flex-col lg:overflow-hidden p-2">
            <h1 className="text-xl lg:text-2xl font-semibold mb-5 ml-5">
              Upcoming Appointments
            </h1>

            <div className=" md:basis-4/6 lg:overflow-auto">
              { upcomingAppointments.length>0?
              
              upcomingAppointments.map((meeting, key) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row mx-5 mt-1 p-3 border-2 rounded-lg border-secondaryColor mb-4 hover:scale-105 transition duration-200"
                  >
                    <div className=" flex flex-row gap-2 sm:flex-col p-3 items-center rounded-lg border border-secondaryColor justify-center">
                      <h2 className="text-sm md:text-lg lg:text-2xl font-semibold">
                        {String(new Date(meeting.start).getDate()).padStart(2, '0')}
                      </h2>
                      <h2 className="text-sm md:text-lg lg:text-2xl font-semibold">
                        {months[new Date(meeting.appointmentDate).getMonth()].toUpperCase()}
                      </h2>
                    </div>
                    <div className="flex flex-1 gap-3 flex-col md:flex-row lg:flex-col xl:flex-row  items-center justify-between sm:items-center m-2 overflow-hidden">
                      <div className=" flex flex-col md:ml-3 justify-center gap-2">
                        <div className="flex gap-2 items-center">
                            <IoPersonSharp/>
                            <p className="text-xs md:text-sm xl:text-base">
                            {meeting.patientName}
                            </p>     
                        </div>
                       <div className="flex gap-2 items-center">
                        <MdDateRange/>
                        <p className="text-xs md:text-sm xl:text-base">
                          {meeting.age+ " years"}
                        </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <MdOutlineAccessTimeFilled/>
                        <p className="text-xs md:text-sm xl:text-base">
                        {new Date(meeting.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaClipboardList/>
                        <p className="text-xs md:text-sm xl:text-base truncate">
                          {meeting.reason}
                        </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleJoinMeeting(meeting)}
                        className="text-xs sm:text-sm lg:text-md h-fit w-fit  bg-secondaryColor rounded-lg text-whiteColor p-3 hover:bg-primaryColor ">
                        Join Appointment
                      </button>
                    </div>
                  </div>
                );
              }
              )
              :
              <p className="text-sm lg:text-lg text-start ml-5">
                No Upcoming Appointments
              </p>
              }
            </div>
            <ToastContainer />
            <div className=" md:flex-1 md:ml-5">
              <h1 className="text-xl lg:text-2xl font-semibold  my-5 ">
                Statistics
              </h1>
              <div className=" text-sm md:text-md flex flex-col border-2 border-secondaryColor p-3 gap-4 rounded-lg">
                <p>{"Appointments Completed: "+completedAppointments}</p>
                <p>{"Patients Treated: "+patientsTreated}</p>
                <p>{"Earning from current month: "+"$"+earningForMonth}</p>
                <p>{"Toal Earnings: "+"$"+totalEarning+""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DoctorFooter />
      </div>
      {showDialog ? (
        <AddAppointmentModal
          showDialog={showDialog}
          handleShowDialog={handleShowDialog}
          onAddAppointment={handleAddAppointment}
          appointmentsByDate={appointmentMapByDate}
        />
      ) : null}
    </div>
  );
}

export default AppointmentManagement;
