import React from 'react';
import '../../pages/css/userProfileStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { docreateUserWithEmailAndPassword } from '../Authentication/Auth';
import registerUser from '../../service/userService';
import LoginNavBar from '../../Components/LoginNavbar';
import Footer from '../Landing/Footer';

export const Register = () => {

  const [isSignUp, setisSignUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    email: '',
    number: '',
    password: '',
    confirm_password: '',
    userRole: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isValidName = (name) => {
    const name_regex = /^[a-zA-Z]+$/;
    return name_regex.test(name);
  };

  // function to validate entered email 
  const isValidEmail = (email) => {
    const email_regex = /^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email_regex.test(email);
  };

  // function to validate entered mobile number 
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{8,}$/;
    return passRegex.test(password);
  }

  // function to store user data into localstorage
  const storeUser = (id, token, role) => {
    try {
      localStorage.clear();

      const userData = {
        id: id,
        token: token,
        role: role
      };
      localStorage.setItem("userInfo", JSON.stringify(userData));
      toast.success("User registered successfully !");
      navigate('/user/Login');

    } catch (error) {
    }
  };


  // function to validate form data 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Funciton to validate name

    if (!formData.userName) {
      toast.error("Name is required ");
      return;
    } else if (!isValidName(formData.userName)) {
      toast.error("Name should contain characters only");
      return;
    }

    if (!formData.email) {
      toast.error("Email address is required");
      return;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (!formData.number) {
      toast.error("Mobile Number is required");
      return;
    } else if (!isValidPhoneNumber(formData.number)) {
      toast.error("Enter valid mobile number");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    else if (!isValidPassword(formData.password)) {
      toast.error("Password must be at least 8 characters long and contain at least one lowercase letter, uppercase letter, number, and special character !");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Confirm Password should be same");
      return;
    }

    if (!isSignUp) {

      setisSignUp(true);
      formData.userRole = 'patient';

      try {
        const result = await docreateUserWithEmailAndPassword(formData.email, formData.password);
        const user = result.user;
        const token = await user.getIdToken();
        formData.id = user.uid;
        try {
          const userDetails = await registerUser.registerUser(formData);
          storeUser(formData.id, token, formData.userRole);
        } catch (error) {
        }
      } catch (error) {
        console.error('Firebase authentication error:', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error("Email already in use. Please use a different email address.");
            break;
          case 'auth/network-request-failed':
            toast.error("Network error. Please try again later.");
            break;
          case 'auth/operation-not-allowed':
            toast.error("Registration is currently not allowed.");
            break;
          default:
            toast.error("An error occurred during registration. Please try again later.");
            break;
        }
      }
    }

  };

  return (
    <>
      <div className="bg-secondaryColor">
        <LoginNavBar />
      </div>
      <div className="wrapper bg-backgroundColor">
        <div className="main_container flex justify-center items-center p-10 py-20">
          <div className="flexContainer">
            <div className="w-1/2 side_image">
            </div>
            <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center relative">
              <div className="input_box w-4/5 md:w-330px">
                <div className="flex flex-col md:flex-row justify-center items-center mb-10 ">
                  <header className='flex flex-col text-center mb-50 font-bold text-lg'>Sign Up</header>
                </div>
                <form onSubmit={handleSubmit} >
                  <div className="input_field flex flex-col relative">
                    <input type="text" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="userName" placeholder='User Name'
                      value={formData.userName}
                      onChange={handleChange} />
                  </div>

                  <div className="input_field flex flex-col relative">
                    <input type="text" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="email" placeholder='Email'
                      value={formData.email}
                      onChange={handleChange} />
                  </div>
                  <div className="input_field flex flex-col relative">
                    <input type="text" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="number" placeholder='Mobile Number'
                      value={formData.number}
                      onChange={handleChange} />

                  </div>
                  <div className="input_field flex flex-col relative">
                    <input type="password" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="password" placeholder='Password'
                      value={formData.password}
                      onChange={handleChange} />
                  </div>
                  <div className="input_field flex flex-col relative">
                    <input type="password" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="confirm_password" placeholder='Confirm Password'
                      value={formData.confirm_password}
                      onChange={handleChange} />
                  </div>
                  <br />
                  <div className="flex flex-col relative bg-gray-300">
                    <input type="submit"
                      className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white"
                      value="Sign Up" />
                    <ToastContainer />
                  </div>
                </form>
                <div className="text-center text-sm mt-4">
                  <span>Already have an account? <a
                    className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                    href="/user/Login">Login here</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
