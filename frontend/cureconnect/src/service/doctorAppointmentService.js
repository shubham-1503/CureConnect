import { ApiRequest } from "../helpers/apiRequest"

const apiURL=import.meta.env.VITE_API_PATH


export const getEventsAPI = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getAllAppointment/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const getEventsByDateAPI = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getAppointmentByDate/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const getAppointmentCompleted = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getAppointmentsCompleted/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const getPatientsTreated = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getPatientsTreated/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const getEarningForMonth = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getEarningForMonth/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const getTotalEarning = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/getTotalEarnings/${doctorId}`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const addDoctorAppointments = async (data) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/addAppointments`,
            method: "POST",
            data
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const deleteDoctorAppointment = async (doctorId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/deleteById/${doctorId}`,
            method: "DELETE",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

