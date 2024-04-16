import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import { auth, storage } from '../Authentication/firebase';
import { updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import PatientNavbar from "../../Components/PatientNavbar";
import PatientFooter from "../../Components/PatientFooter";
import '../../pages/css/ProfilePageStyle.css';
import '../../pages/css/Imageupload.css';
import getUserDetails from '../../service/userService';
import updateProfile from '../../service/userService';
import getBookingDetails from '../../service/userService';
import countMonthAppointment from '../PatientDashboard/PatientBookings';
import { ToastContainer, toast } from 'react-toastify';
import {deleteUserAccount} from '../Authentication/Auth';
import profileImage from '../../assets/profileImage.jpg';

const generateProvinceOptions = () => {
    const provinces = [
        { code: 'AB', name: 'Alberta' },
        { code: 'BC', name: 'British Columbia' },
        { code: 'MB', name: 'Manitoba' },
        { code: 'NB', name: 'New Brunswick' },
        { code: 'NL', name: 'Newfoundland and Labrador' },
        { code: 'NS', name: 'Nova Scotia' },
        { code: 'ON', name: 'Ontario' },
        { code: 'PE', name: 'Prince Edward Island' },
        { code: 'QC', name: 'Quebec' },
        { code: 'SK', name: 'Saskatchewan' },
        { code: 'NT', name: 'Northwest Territories' },
        { code: 'NU', name: 'Nunavut' },
        { code: 'YT', name: 'Yukon' },
    ];

    return provinces.map((province) => (
        <option key={province.code} value={province.code}>
            {province.name}
        </option>
    ));
};


export const ProfilePage = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [token, authToken] = useState('');
    var userId;
    const navigate = useNavigate();

    const [bookingCount, setBookingCount] = useState({
        totalBookingCount: '',
        monthCount: ''
    });

    const [formData, setFormData] = useState({
        id: '',
        userRole: '',
        userName: '',
        birthdate: '',
        email: '',
        number: '',
        address: '',
        gender: '',
        city: '',
        country: '',
        profilePicture: ''
    });

    const [validateData, setValidateData] = useState({
        id: '',
        userRole: '',
        userName: '',
        birthdate: '',
        email: '',
        number: '',
        address: '',
        gender: '',
        city: '',
        country: '',
        profilePicture: ''
    });

    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setCount({
            ...count,
            [e.target.id]: e.target.value,
        });

    };

    const formattedBirthdate = formData.birthdate ? new Date(formData.birthdate) : '';
    const formattedDateString = formattedBirthdate instanceof Date && !isNaN(formattedBirthdate) ? formattedBirthdate.toISOString().split('T')[0] : '';
    formData.birthdate = formattedDateString;

    const validateBirthdate = validateData.birthdate ? new Date(validateData.birthdate) : '';
    const validateBirthdateString = validateBirthdate instanceof Date && !isNaN(validateBirthdate) ? validateBirthdate.toISOString().split('T')[0] : '';
    validateData.birthdate = validateBirthdateString;

    useEffect(() => {

        const fetchUserDetails = async () => {

            const userDataString = localStorage.getItem("userInfo");

            const userData = JSON.parse(userDataString);

            // Check if user is loged in or not
            if (!userData || !userData.id || !userData.token || !userData.role || userData.role != 'patient') {
                return navigate("/user/Login");
            }

            userId = userData.id;
            formData.id = userId;
            formData.userRole = userData.role;
            authToken(userData.token);

            try {
                const details = await getUserDetails.getUserDetails(userId, userData.token);

                const bookingDetails = await getBookingDetails.getBookingsDetails(formData.id, userData.token);
                const monthBookings = await countMonthAppointment.countMonthAppointment(bookingDetails);
                if (details === null || details === undefined) {
                    navigate('/user/login');
                } else {
                    setValidateData({
                        ...validateData,
                        ...details
                    });

                    setFormData({
                        ...formData,
                        ...details
                    });

                    setBookingCount((bookings) => ({ ...bookings, ["totalBookingCount"]: bookingDetails.length,
                    ["monthCount"]: monthBookings}));
                }

            } catch (error) {
                console.error('Error from profile page:', error);
                navigate('/user/login');
            }
        };

        fetchUserDetails();

    }, []);

    const handleImageChange = (e) => {

        const [file] = e.target.files;
        setImageUpload(file);

    };

    async function userImageUpload() {
        try {
            if (imageUpload == null) { return; }
            const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

            await uploadBytes(imageRef, imageUpload).then(() => {

                getDownloadURL(imageRef).then((url) => {
                    setImageUrl(url);
                    formData.profilePicture = url;
                    updateProfile.updateProfile(formData, token);
                });
            });
        } catch (error) {
        }
    }


    const handlePasswordUpdate = async () => {

        const user = auth.currentUser;

        if (user) {
            updatePassword(user, newPassword.password).then(() => {
                toast.success("Password updated Succesfully !!");
            }).catch((error) => {
            });
        }
    };


    const handleValidation = () => {

        const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{8,}$/;
        const mobileRegex = /^\d{10}$/;
        const postcodeRegex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;


        if (formData.userName) {

            if (!nameRegex.test(formData.userName)) {
                toast.error("Please enter a valid user name containing only letters.");
                return false;
            }
        }

        if (formData.number) {

            if (!mobileRegex.test(formData.number)) {
                toast.error("Please enter a valid mobile number !");
                return false;
            }
        }

        if (newPassword.password) {

            if (!passRegex.test(newPassword.password)) {
                toast.error("Password must be at least 8 characters long and contain at least one lowercase letter, uppercase letter, number, and special character !");
                return false;
            }

            if (!newPassword.confirmPassword || newPassword.confirmPassword === 0 || (newPassword.password != newPassword.confirmPassword)) {
                toast.error("Confirm Password should be same !");
                return false;
            }
        }

        if (formData.address) {
            if (formData.address.trim() == '') {
                toast.error("Please enter a valid address");
                return false;
            }
        }

        if (formData.postcode) {

            if (!postcodeRegex.test(formData.postcode)) {
                toast.error("Please enter a valid postcode");
                return false;
            }
        }

        return true;
    }

    function compareChanges(afterChange, beforeChange) {

        const keys1 = Object.keys(afterChange);
        const keys2 = Object.keys(beforeChange);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (afterChange[key] !== beforeChange[key]) {
                return false;
            }
        }
        return true;
    }



    const handleClick = async (e) => {

        e.preventDefault();

        if (imageUpload != null) {
            userImageUpload();
            toast.success('User Details are updated !!');
        } else {
            try {
                if (compareChanges(formData, validateData) && ((newPassword.password.length === 0) || !newPassword.password)) {
                    toast.error('Nothing to update !!');
                } else if (compareChanges(formData, validateData) && (newPassword.password)) {
                    if (handleValidation) {
                        handlePasswordUpdate();
                    }
                }
                else {
                    const validation = handleValidation();
                    if (validation) {
                        updateProfile.updateProfile(formData, token);
                        toast.success('User Details are updated !!');
                    }
                }
            } catch (e) {
                toast.error('Unable to update the data');
            }
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            toast.success('Logout Successful');
            localStorage.clear();
            setTimeout(() => {
                navigate("/user/Login");
            }, 500);
        } catch (error) {
            toast.error('Error to log out user');
        }
    }

    const handleDelete = async (e) => { 
        e.preventDefault();

        try{
            const result = deleteUserAccount();
            if(result){
                toast.success('User Account Deleted.');
                setTimeout(() => {
                    navigate("/user/Login");
                }, 1000);
            }else{
                toast.error("Unable to delete account");
            }
        }catch(error){
        }
    }

    return (
        <>
            <PatientNavbar location={""} />
            <div className="w-full overflow-auto bg-primaryColor">
                <div className='BoxWrapper bg-backgroundColor p-1/2'>
                    <div className='profileWrapper flex flex-col md:flex-row gap-4  bg-backgroundColor'>
                        <div className='w-full md:w-1/3  bg-backgroundColor p-6 border-r'>
                            <div className="flex flex-col items-center text-center">
                                <div className="ImageUploadcontainer">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit">
                                            <input type='file' id="imageUpload" onChange={handleImageChange} />
                                            <label htmlFor="imageUpload" className='labl_dsg' >
                                                <svg width="25px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
                                                        stroke="#1C274C" strokeWidth="1.5" />
                                                    <path d="M14.5197 10.6799L14.2397 10.4C13.0026 9.16288 10.9969 9.16288 9.75984 10.4C8.52276 11.637 8.52276 13.6427 9.75984 14.8798C10.9969 16.1169 13.0026 16.1169 14.2397 14.8798C14.7665 14.353 15.069 13.6868 15.1471 13M14.5197 10.6799L13 11M14.5197 10.6799V9" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            {formData.profilePicture ? (
                                                <img src={formData.profilePicture} alt="Uploaded" className="imageStyle object-cover rounded-[50%] w-[200px] h-[200px] bg-no-repeat" />
                                            ) : (
                                                <img src={profileImage} alt="Doctor Logo" className="imageStyle object-cover rounded-[50%] w-[200px] h-[200px] bg-no-repeat" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold" id='userName'>{formData.userName ? formData.userName : 'User Name'}</h2>
                                <h2 className="text-lg font-semibold" id='userRole'>{formData.userRole ? formData.userRole : ''}</h2>
                            </div>
                            < br />
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Total Appointments booked</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-md py-1 px-2" id='totalBookingCount'>
                                        {bookingCount.totalBookingCount ? bookingCount.totalBookingCount : '0'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Current Month Appointments</span>
                                    <span className="bg-gray-200 text-gray-700 rounded-md py-1 px-2" id='currentBookings'>
                                        {bookingCount.monthCount ? bookingCount.monthCount : '0'}</span>
                                </div>
                            </div>
                            < br />
                            <div className="flex items-center justify-center mt-4 space-x-2">
                                <a href="/" className="bg-secondaryColor hover:bg-primaryColor text-whiteColor border border-secondaryColor py-3 px-4 rounded inline-flex items-center">
                                    Book Appointment
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        viewBox="0 0 24 24" className="w-6 h-6 ml-2">
                                        <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className='w-full md:w-2/3 bg-backgroundColor p-6'>
                            <form className="w-full">
                                <div className='flex justify-between'>
                                    <div className='divContainer flex sm:flex-row w-full flex-col'>

                                        <div className='flex flex-col w-full sm:p-3 p-1' >
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label className="text-sm font-medium leading-none mb-2">
                                                    User Name
                                                </label>
                                                <input id="userName" className="border border-black rounded-md py-2 px-3 outline-none"
                                                    placeholder={formData.userName ? formData.userName : 'User Name'} onChange={handleChange}
                                                    value={formData.userName || ''} />
                                            </div>
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label htmlFor="birthdate" className="text-sm font-medium leading-none mb-2">
                                                    Birthdate
                                                </label>
                                                <input
                                                    type="date" id="birthdate"
                                                    className="border border-black rounded-md py-2 px-3 outline-none outline-none"
                                                    onChange={handleChange}
                                                    value={formData.birthdate} />
                                            </div>
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label className="text-sm font-medium leading-none mb-2" htmlFor="phone">
                                                    Phone Number
                                                </label>
                                                <input id="number" className="border border-black rounded-md py-2 px-3 outline-none"
                                                    placeholder={formData.number ? formData.number : '9090909090'} onChange={handleChange}
                                                    value={formData.number || ''} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full sm:p-3 p-1'>
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label className="text-sm font-medium leading-none mb-2" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <input id="email" className="border border-black rounded-md py-2 px-3 outline-none" readOnly
                                                    placeholder={formData.email ? formData.email : 'example@email.com'} onChange={handleChange}
                                                    value={formData.email || ''} />
                                            </div>
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label className="text-sm font-medium leading-none mb-2" htmlFor="password">
                                                    Password
                                                </label>
                                                <input type="password" id="password" className="border border-black rounded-md py-2 px-3 outline-none"
                                                    value={newPassword.password}
                                                    onChange={(e) => setNewPassword({
                                                        ...newPassword,
                                                        [e.target.id]: e.target.value,
                                                    })} />
                                            </div>
                                            <div className="flex flex-col md:col-span-1 mb-2">
                                                <label className="text-sm font-medium leading-none mb-2" htmlFor="confirmPassword">
                                                    Confirm Password
                                                </label>
                                                <input type="password" id="confirmPassword"
                                                    className="border border-black rounded-md py-2 px-3 outline-none"
                                                    value={newPassword.confirmPassword}
                                                    onChange={(e) => setNewPassword({
                                                        ...newPassword,
                                                        [e.target.id]: e.target.value,
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col w-full sm:p-3 p-1 sm:-mt-4 -mt-2'>
                                    <div className="flex flex-col md:col-span-2 mb-2">
                                        <label className="text-sm font-medium leading-none mb-2" htmlFor="Gender">
                                            Gender
                                        </label>
                                        <select id="gender" className="border border-black rounded-md py-2 px-3 outline-none"
                                            onChange={handleChange}
                                            value={formData.gender || ''}>
                                            <option value="" hidden>select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col md:col-span-2 mb-2">
                                        <label className="text-sm font-medium leading-none mb-2" htmlFor="address">
                                            Address
                                        </label>
                                        <input id="address" className="border border-black rounded-md py-2 px-3 outline-none"
                                            placeholder={formData.address ? formData.address : 'Spring Garden Road'} onChange={handleChange}
                                            value={formData.address || ''} />
                                    </div>

                                    <div className="flex flex-col md:col-span-2 mb-2">
                                        <label className="text-sm font-medium leading-none mb-2" htmlFor="postcode">
                                            Post Code
                                        </label>
                                        <input
                                            id="postcode"
                                            className="border border-black rounded-md py-2 px-3 outline-none"
                                            placeholder={formData.postcode ? formData.postcode : 'B3H1B3'}
                                            onChange={handleChange}
                                            value={formData.postcode || ''} />
                                    </div>
                                    <div className="flex flex-col md:col-span-2 mb-2">
                                        <label className="text-sm font-medium leading-none mb-2" htmlFor="city">
                                            province
                                        </label>
                                        <select id="city" className="border border-black rounded-md py-2 px-3 outline-none"
                                            placeholder={formData.city ? formData.city : ''} onChange={handleChange}
                                            value={formData.city || ''}>
                                            <option value="" hidden>select city</option>
                                            {generateProvinceOptions()}
                                        </select>
                                    </div>
                                    <div className="flex flex-col md:col-span-2 mb-2">
                                        <label className="text-sm font-medium leading-none mb-2 outline-none" htmlFor="country">
                                            Country
                                        </label>
                                        <select id="country" className="border border-black rounded-md py-2 px-3 outline-none"
                                            placeholder={formData.country ? formData.country : ''} onChange={handleChange}
                                            value={formData.country || ''}>
                                            <option value="" hidden>select country</option>
                                            <option value="Canada">Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex justify-between sm:flex-row w-full flex-col'>
                                    <div className="col-span-2 sm:p-3 p-1">
                                        <button
                                            className='relative px-8 py-2 rounded-md bg-secondaryColor isolation-auto z-10 border-2 bg-secondaryColor before:absolute before:w-full 
                                        before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                                        before:bg-teal-600 before:-z-10 before:aspect-square 
                                        before:hover:scale-150 overflow-hidden 
                                        text-white hover:text-white'
                                            onClick={handleClick}>
                                            Update
                                        </button>
                                    </div>
                                    <div className="col-span-2 sm:p-3 p-1">
                                        <button
                                            className='relative px-8 py-2 rounded-md bg-red-500 isolation-auto z-10 border-2 border-red-600 before:absolute before:w-full 
                                       before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                                       before:bg-red-600 before:-z-10 before:aspect-square 
                                       before:hover:scale-150 overflow-hidden 
                                       text-white hover:text-white'
                                            onClick={handleLogout}>
                                            Log Out
                                        </button>
                                    </div>
                                    <div className="col-span-2 sm:p-3 p-1">
                                        <button
                                            className='relative px-8 py-2 rounded-md bg-secondaryColor isolation-auto z-10 border-2 bg-secondaryColor before:absolute before:w-full 
                                            before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                                            before:bg-teal-600 before:-z-10 before:aspect-square 
                                            before:hover:scale-150 overflow-hidden 
                                            text-white hover:text-white'
                                            onClick={handleDelete}>
                                            Delete?
                                        </button>
                                    </div>
                                </div>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div >
            </div >
            <PatientFooter />
        </>
    )
}