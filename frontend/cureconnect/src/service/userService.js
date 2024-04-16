const apiUrl = import.meta.env.VITE_API_PATH+"/api/v1/user";
const BookingapiUrl = import.meta.env.VITE_API_PATH+"/api/v1/appointment";

async function registerUser(user){

    try {
        const response = await fetch(apiUrl+'/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

async function getUserDetails(uId, authToken){
    try {

        const response = await fetch(apiUrl+'/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ id: uId })
        });
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return error;
    }
}

async function updateProfile(user, authToken){
    const tmpDate = user.birthdate ? new Date(user.birthdate).toISOString() : null;
    user.birthdate = tmpDate;
    const dataReq = JSON.stringify(user);

        try {
            const response = await fetch(apiUrl+'/update/profile', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: dataReq
            });

            if (!response.ok) {
                throw new Error('Fail to insert records');
            }
    
            const data = await response.json();
            return data;
    
        } catch (error) {
        }
    }
   
    async function validateUser(email){

        try {
              
            const response = await fetch(apiUrl+'/EmailValidation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return error;
        }
    }

    async function getBookingsDetails(uId, authToken){

        try {
    
            const response = await fetch(BookingapiUrl+'/patient/'+uId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            return data;
           
        } catch (error) {
            console.error('Error fetching user details:', error);
            return error;
        }
    }

export default {getUserDetails,registerUser, updateProfile, validateUser, getBookingsDetails};