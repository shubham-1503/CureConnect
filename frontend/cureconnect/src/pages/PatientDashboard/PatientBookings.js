function formatAppointmentData(appointment) {
    const formattedData = {
        bookingDate: new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        startTime: '',
        endTime: ''
    };

    const nearestStartDate = new Date(appointment.start);
    const nearestEndDate = new Date(appointment.end);
    
    formattedData.startTime = ('0' + nearestStartDate.getHours()).slice(-2) + ':' + ('0' + nearestStartDate.getMinutes()).slice(-2);
    formattedData.endTime = ('0' + nearestEndDate.getHours()).slice(-2) + ':' + ('0' + nearestEndDate.getMinutes()).slice(-2);

    return formattedData;
}

async function findAppointment(userDetails, appointmentType) {
    const currentTimestamp = Date.now(); // Get current timestamp in milliseconds

    let nearestAppointment = null;
    let smallestDifference = Infinity;

    for (const userDetail of userDetails) {
        const startTimestamp = userDetail.start;
        const difference = (appointmentType === 'upcoming') ? (startTimestamp - currentTimestamp) : (currentTimestamp - startTimestamp);

        if (difference > 0 && difference < smallestDifference) {
            smallestDifference = difference;
            nearestAppointment = userDetail;
        }
    }

    if (nearestAppointment) {
        const formattedData = formatAppointmentData(nearestAppointment);
        return formattedData;
    } else {
        return null;
    }
}

async function countMonthAppointment(userDetails) {
   
    const currentDate = new Date();
   
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
    const currentYear = currentDate.getFullYear();

    let appointmentCount = 0;

   
    for (const userDetail of userDetails) {
   
        const appointmentDate = new Date(userDetail.appointmentDate);
   
        const appointmentMonth = appointmentDate.getMonth() + 1; // January is 0, so add 1
        const appointmentYear = appointmentDate.getFullYear();

        if (currentMonth === appointmentMonth && currentYear === appointmentYear) {
            appointmentCount++;
        }
    }

    return appointmentCount;
}

export default {findAppointment,countMonthAppointment};