import axios from "axios";
const apiUrl = import.meta.env.VITE_API_PATH+"/api/v1/doctor";

async function registerDoctor(user, authToken){

    try {
        const response = await fetch(apiUrl+'/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Insert ');
        }

        const data = await response.json();
        return data;

    } catch (error) {
    }
}

async function fetchDoctorDetails(doctorId, authToken) {
    try {
        // Updated to use the consistent base URL and appended the specific endpoint
        const url = `${apiUrl}/getDoctor/${doctorId}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data; // Returns the response body from the API
    } catch (error) {
        console.error('Error fetching doctor details:', error.response ? error.response.data : error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
}

export default {registerDoctor,fetchDoctorDetails};