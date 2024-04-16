import { ApiRequest } from "../helpers/apiRequest"

const apiURL=import.meta.env.VITE_API_PATH

export const getAllMedicines = async () => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/inventory/all`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const addDoctorPrescription = async (data) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/appointment/updatePrescription`,
            method: "PUT",
            data
        });
        return res;
    } catch (err) {
        throw err; 
    }
}