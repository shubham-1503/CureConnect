import React, { useState } from 'react';
import '../../pages/css/userProfileStyle.css';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { sendMail, validateEmail } from '../Authentication/Auth';
import validateUser from '../../service/userService';
import LoginNavBar from '../../Components/LoginNavbar';
import Footer from '../Landing/Footer';

export const EmailConfirmation = () => {

  const navigate_form = useNavigate();

  const [formData, setFormData] = useState({
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // function to validate entered email 
  const isValidEmail = (email) => {
    const email_regex = /^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email_regex.test(email);
  };

  // function to validate form data 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("Email is required ");
      return;
    }
    else if (!isValidEmail(formData.email)) {
      toast.error("Enter valid Email address");
      return;
    }

    try {

      const result = await validateUser.validateUser(formData.email);

      if (result) {
        await sendMail(formData.email);
        toast.success("Please check received email to reset password");
      } else {
        toast.error("Invalid email. Please enter your registered email id");
      }

    } catch (error) {

      if (error.code === 'auth/invalid-email') {
        // Handle invalid credential error, e.g., show an error message to the user
        console.error('Invalid email error:', error.message);
        toast.error('Invalid email. Please enter your registered email id');
        return;
      } else {
        // Handle other Firebase authentication errors
        console.error('Firebase authentication error:', error.code, error.message);
        toast.error('An error occurred during authentication. Please try again');
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
                <header className='flex flex-col text-center mb-55 font-bold text-lg'>Reset Password</header>
                <form onSubmit={handleSubmit} className='mt-6'>
                  <div className="input_field flex flex-col relative">
                    <input type="text" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                      id="email" placeholder='Enter registered email id'
                      value={formData.newPassword}
                      onChange={handleChange} />
                  </div>
                  <br />
                  <div className="flex flex-col relative bg-gray-300">
                    <input type="submit"
                      className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white"
                      value="confirm" />
                  </div>
                  <div className="text-center text-sm mt-6">
                    <span>Password reset? <a
                      className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                      href="/user/Login">Login here</a></span>
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmailConfirmation;