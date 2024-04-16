import { ApiRequest } from "../helpers/apiRequest"

const apiURL=import.meta.env.VITE_API_PATH

export const getPatientsAppointments = async (patientId) => {

    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/doctor/patients/${patientId}/appointments`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err;
    }
}
export const getPatients = async () => {

    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/doctor/patients`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err;
    }
}
export default {getPatientsAppointments};