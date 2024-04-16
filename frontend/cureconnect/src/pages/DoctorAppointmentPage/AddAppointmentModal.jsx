import React, { useEffect, useState, } from "react";
import Calendar from "./Calendar";

function AddAppointmentModal({ showDialog, handleShowDialog ,onAddAppointment,appointmentsByDate}) {
  const timeslots = [
    "9:00 to 9:30",
    "9:30 to 10:00",
    "10:00 to 10:30",
    "10:30 to 11:00",
    "11:00 to 11:30",
    "11:30 to 12:00",
    "12:00 to 12:30",
    "12:30 to 13:00",
    "13:00 to 13:30",
    "13:30 to 14:00",
    "14:00 to 14:30",
    "14:30 to 15:00",
    "15:00 to 15:30",
    "15:30 to 16:00",
    "16:00 to 16:30",
    "16:30 to 17:00",
    "17:00 to 17:30",
    "17:30 to 18:00",
    "18:00 to 18:30",
    "18:30 to 19:00",
    "19:00 to 19:30",
    "19:30 to 20:00",
    "20:00 to 20:30",
    "20:30 to 21:00",
  ];
  

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlotInfo, setTimeSlotInfo] = useState(
    new Array(24).fill({ isValid: true, isSelected: false })
  );

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const getColorClass = (index,isValidSlot, isSelected) => {
    if (isValidSlot) {
      if (isSelected) {
        return 'bg-primaryColor'; 
      }else{
          return 'bg-secondaryColor hover:bg-primaryColor hover:text-whiteColor hover:border-primaryColor'; 
      }
    } else {
      return 'bg-gray-400'; 
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    onAddAppointment(selectedDate,timeSlotInfo,timeslots)
  };

  const handleHourSelection = (hourIndex) => {

    setTimeSlotInfo((prevTimeSlotInfo) => {
        return prevTimeSlotInfo.map((info, index) =>
          index === hourIndex ? { ...info, isSelected: !info.isSelected } : info
        );
      });
  };


useEffect(() => {
    const currentTime = new Date();
    const currentDay = currentTime.getDate();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const cleanSlots=new Array(24).fill({ isValid: true, isSelected: false })

      const newTimeSlotInfo = cleanSlots.map((info, index) => {
        const [startHour, startMinute] = timeslots[index].split(' ')[0].split(':').map(Number);
        if (currentDay === selectedDate.getDate() && (currentHour > startHour || (currentHour === startHour && currentMinute > startMinute))) {
          return { ...info, isValid: false };
        }
        return info;
      });
      setTimeSlotInfo(newTimeSlotInfo);
    

    
      const newDate = new Date(selectedDate);
      newDate.setHours(0);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      const midNightTimeStamp = newDate.getTime();
      const bookedSlots = appointmentsByDate[midNightTimeStamp] || [];
      const updatedTimeSlotInfo = newTimeSlotInfo.map((info, index) => {
        if (bookedSlots.some((slot) => slot.slotId === index)) {
          return { ...info, isValid: false };
        }
        return info;
      });
      setTimeSlotInfo(updatedTimeSlotInfo);

   

    return () => {};
  }, [selectedDate, appointmentsByDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };



  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-backgroundColor text-left shadow-xl transition-all sm:my-8 w-full mx-2 md:w-3/5">
            <div className="bg-backgroundColor">
              <h3
                className="text-base font-semibold leading-6 text-white p-4 text-start bg-secondaryColor border-secondaryColor"
                id="modal-title"
              >
                Add Appointment Slots
              </h3>
              <div className="sm:flex sm:items-start">
                <div className="my-3 text-center p-4 sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <div className="flex flex-col lg:flex-row items-start gap-5 mt-1">
                    <Calendar
                      id="booking"
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                    />
                    <div className="flex flex-col w-full">
                      <ul className="grid grid-flow-row grid-cols-1 xs:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-2">
                        {timeSlotInfo.map((slotInfo, index) => (
                          <li
                            key={index}
                            
                            className={`w-full h-10 leading-5 rounded-lg ${getColorClass(index,slotInfo.isValid, slotInfo.isSelected)} text-whiteColor text-ellipsis whitespace-nowrap overflow-hidden ring-2 ring-primaryColor outline-none p-2 cursor-pointer  transition duration-200 ease-in-out`}
                            onClick={() => slotInfo.isValid && handleHourSelection(index)}
                          >
                            {timeslots[index]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-backgroundColor px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-secondaryColor">
              <button
                type="button"
                onClick={handleAddSlot}
                className="inline-flex w-full justify-center rounded-md bg-secondaryColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryColor  sm:ml-3 sm:w-auto"
              >
                Add Slots
              </button>
              <button
                type="button"
                onClick={handleShowDialog}
                className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-gray-500 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAppointmentModal;
