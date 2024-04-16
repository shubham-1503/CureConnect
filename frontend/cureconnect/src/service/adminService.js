import { ApiRequest } from "../helpers/apiRequest"

const apiURL=import.meta.env.VITE_API_PATH

export const getDoctors = async () => {

    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/admin/doctors`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err;
    }
}
export const approveDoctor = async (doctorId) => {

    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/admin/doctors/${doctorId}`,
            method: "PUT",
        });
        return res;
    } catch (err) {
        throw err;
    }
}
export default {getDoctors,approveDoctor};