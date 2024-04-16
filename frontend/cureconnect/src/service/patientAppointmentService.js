import { ApiRequest } from "../helpers/apiRequest"

const apiURL=import.meta.env.VITE_API_PATH

export const fetchAppointmentFromToday = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getAppointmentFromToday/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const fetchDoctorData = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/doctor/getDoctor/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const updateAppointment = async (data) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/update`,
            method: "PUT",
            data
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const fetchPastPrescriptionDataAPI = async (userId) => {
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/patient/${userId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}
