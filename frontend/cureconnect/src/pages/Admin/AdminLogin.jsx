import React from 'react';
import '../../pages/css/userProfileStyle.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {doSiginIn} from '../Authentication/Auth';
import {AuthProvider, useAuth} from '../Authentication/Authentication';
import LoginNavBar from '../../Components/LoginNavbar';
import Footer from '../Landing/Footer';

export const AdminLogin = () => {
  const navigate = useNavigate();
     const [isSignIn, setisSignIn] = useState(false);
     const [isChecked, setIsChecked] = useState(false);

      const [formData, setFormData] = useState({
        id:'',
        email: '',
        password: '',
        role:''
      });
      
      const handleChange = (e) => {
        e.preventDefault();
        
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });

      };

      const handleCheckChange = (e) => {
        setIsChecked(!isChecked);
      };

      // function to validate entered email 
      const isValidEmail = (email) => {
        const email_regex = /^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email_regex.test(email);
      };

      const storeUser = (id, token, role) => {
        try {
            localStorage.clear();
    
            const userData = {
                id: id,
                token: token,
                role: role
            };
            localStorage.setItem("userInfo", JSON.stringify(userData));
            toast.success('User Logged in');
          //  navigate('/user/Profile');

        } catch (error) {
        }
    };

      // function to validate form data 
      const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.email) {
          toast.error("Email is required !");
          return;
        }else if(!isValidEmail(formData.email)){
          toast.error("Enter valid email id !");
          return;
        }

        if (! formData.password ) {
          toast.error("Passwords is required");
          return;
        }

        // signIn user using firebase
        if(!isSignIn){
          try {
           
            setisSignIn(true);
         
            const result = await doSiginIn(formData.email, formData.password);
            const user = result.user;
            const token = await user.getIdToken();
            formData.id = user.uid;
            formData.role = 'admin';
      
            storeUser(formData.id, token, formData.role);
            
          } catch (error) {
            if (error.code === 'auth/invalid-credential') {
              // Handle invalid credential
              console.error('Invalid credential error:', error.message);
              toast.error('Invalid credentials. Please check your email and password.');
              return;
            } else {
              // Handle other Firebase authentication errors
              console.error('Firebase authentication error:', error.code, error.message);
              toast.error('An error occurred during authentication. Please try again.');     
            }
          }
        }

      };

    return (
      <>
      <AuthProvider>
      <div className="bg-secondaryColor">
        <LoginNavBar />
        </div>
      <div>
        <div className="wrapper bg-backgroundColor">
          <div className="main_container flex justify-center items-center p-10 py-20">
            <div className="flexContainer">
              <div className="w-1/2 side_image">
              </div>

              <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center relative">
                <div className="input_box w-4/5 md:w-330px">

                 <div className="flex flex-col md:flex-row justify-center items-center mb-10 ">
                  <header className="text-center font-bold text-lg text-secondaryColor mb-4 md:mb-0">Admin Sign In</header> 
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="flex flex-col relative">
                     <input type="text" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2" 
                     id="email" placeholder='Email' 
                      value={formData.email}
                      onChange={handleChange}/>
                  </div>

                  <div className="flex flex-col relative">
                    <input type="password" className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"  
                    id="password" placeholder='Password' 
                     value={formData.password}
                     onChange={handleChange}/>
                  </div>

                  <div className="text-left text-sm mb-5 transition-all duration-500 px-1 mt-2">
                  <span> <a 
                  className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                  href="/user/EmailConfirmation">Forgot Password?</a> </span>
                  </div>
                  <div className="flex flex-col relative bg-gray-300">
                    <input type="submit" 
                    className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white" 
                    value="Sign In" />
                    <ToastContainer />
                  </div>
                  </form>
                  <div className="text-center text-sm mt-4">
                    <span>Don't have an account? <a 
                    className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                    href="/admin/register"> Sign up here</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </AuthProvider>
        <Footer />
        </>
      );
    }


export default AdminLogin;