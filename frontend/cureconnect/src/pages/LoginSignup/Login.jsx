import React from "react";
import '../../pages/css/userProfileStyle.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doSiginIn } from "../Authentication/Auth";
import { AuthProvider, useAuth } from "../Authentication/Authentication";
import LoginNavBar from "../../Components/LoginNavbar";
import Footer from "../Landing/Footer";
import userService from "../../service/userService";
import doctorService from "../../service/doctorService";


export const Login = () => {
  //const navigate = useNavigate();
  const navigate = useNavigate();
  const [isSignIn, setisSignIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let userData = null;

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    role: "",
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
    const email_regex =
      /^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email_regex.test(email);
  };

  const storeUser = async (token) => {
    try {
      localStorage.clear();
      localStorage.setItem("userInfo", JSON.stringify(userData));
      if (userData.role === "patient") {
        toast.success("User Logged in");
        navigate("/dashboard",{replace:true});
        // navigate("/patient",{replace:true});
      } else if (userData.role === "doctor") {
        const doctor = await doctorService.fetchDoctorDetails(
          userData.id,
          token
        );
        if (doctor.approved) {
          navigate("/dashboard",{replace:true});
          // navigate("/doctor/appointments",{replace:true});
        } else {
          toast.error("Doctor is not approved yet");
        }
      } else if (userData.role === "admin") {
        navigate("/dashboard",{replace:true});
        // navigate("/admin/inventory",{replace:true});
      }
    } catch (error) {
    }
  };

  // function to validate form data
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!formData.email) {
      toast.error("Email is required !");
      return;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Enter valid email id !");
      return;
    }

    if (!formData.password) {
      toast.error("Passwords is required");
      return;
    }

    if (!isChecked) {
      formData.role = "patient";
    } else {
      formData.role = "doctor";
    }

    // signIn user using firebase
    if (!isSignIn) {
      try {
        setisSignIn(true);

        const result = await doSiginIn(formData.email, formData.password);
        const user = result.user;
        const token = await user.getIdToken();
        formData.id = user.uid;
        let userResponse = await userService.getUserDetails(formData.id, token);
        if (userResponse.hasOwnProperty("userRole")) {
          userResponse.role = userResponse.userRole;
          delete userResponse.userRole;
        }
        userResponse.token = token;
        userData = userResponse;
        await storeUser(token);
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          // Handle invalid credential
          console.error("Invalid credential error:", error.message);
          toast.error(
            "Invalid credentials. Please check your email and password."
          );
          return;
        } else {
          // Handle other Firebase authentication errors
          console.error(
            "Firebase authentication error:",
            error.code,
            error.message
          );
          toast.error(
            "An error occurred during authentication. Please try again."
          );
        }
      } finally {
        setisSignIn(false); // Resetting isSignIn to false regardless of error
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
                <div className="w-1/2 side_image"></div>

                <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center relative">
                  <div className="input_box w-4/5 md:w-330px">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10 ">
                      <header className="text-center font-bold text-lg text-secondaryColor mb-4 md:mb-0">
                        Sign In
                      </header>
                    </div>
                    <form  >
                   {/* onSubmit={handleSubmit}> */}
                      <div className="flex flex-col relative">
                        <input
                          type="text"
                          className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col relative">
                        <input
                          type="password"
                          className="focus:outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                          id="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="text-left text-sm mb-5 transition-all duration-500 px-1 mt-2">
                        <span>
                          {" "}
                          <a
                            className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                            href="/user/EmailConfirmation"
                          >
                            Forgot Password?
                          </a>{" "}
                        </span>
                      </div>
                      <div className="flex flex-col relative bg-gray-300">
                        {/* <input
                          type="submit"
                          className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white"
                          value="Sign In"
                        /> */}
                        <button className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white"
                          value="Sign In" onClick={handleSubmit}>Sign In</button>
                        <ToastContainer />
                      </div>
                    </form>
                    <div className="text-center text-sm mt-4">
                      <span>
                        Don't have an account?{" "}
                        <a
                          className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                          href="/user/register"
                        >
                          {" "}
                          Sign up here
                        </a>
                      </span>
                    </div>
                    <div className="text-center text-sm mt-4">
                      <span>
                        Don't have an account?{" "}
                        <a
                          className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                          href="/user/doctorregister"
                        >
                          {" "}
                          Sign up here as Doctor
                        </a>
                      </span>
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
};

export default Login;
