import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logos/logo3/logo-no-background.svg";
import Logo3 from "../assets/logos/logo3/logo-no-background.svg";
import DefaultAvatar from "../assets/default_avatar.jpeg";


function PatientNavbar({ location }) {
  const [smallNav, setSmallNav] = useState(false);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const navigate = useNavigate();

  const handleMenuVisibility = () => {
    setSmallNav(!smallNav);
  };

  const handleLogoutDropdown = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); // Navigate to login page after logout
  };

  const handleRouting = (key) => {
    if (key === "dashboard") {
      navigate("/patient");
    } else if (key === "appointment") {
      navigate("/patient/search");
    } else if (key === "past") {
      navigate("/patient/pastappointments");
    } else if (key === "buymedicine") {
      navigate("/patient/prescriptionlist");
    } else if (key === "profile"){
      navigate("/patient/Profile")
    } else {
      navigate("/");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex px-3 justify-between items-center h-22 bg-secondaryColor text-white">
      <div className=" w-60 p-4">
        <img src={Logo} alt="" onClick={handleLogoClick}/>
      </div>
      <div className="flex items-center">
        <ul className="hidden md:flex gap-3 text-md text-backgroundColor font-bold hover:cursor-pointer">
          <li
            className={`text-${location!=="dashboard" ? 'whiteColor':'primaryColor'} p-4 hover:scale-110 ease-in-out duration-150 hover:text-primaryColor after:bg-primaryColor after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-200`}
            onClick={() => {
              handleRouting("dashboard");
            }}
          >
            Dashboard
          </li>
          <li
            className={`text-${location!=="appointment" ? 'whiteColor':'primaryColor'} p-4 hover:scale-110 ease-in-out duration-150 hover:text-primaryColor after:bg-primaryColor after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-200`}
          
            onClick={() => {
              handleRouting("appointment");
            }}
          >
            Book an Appointment
          </li>
          <li
            className={`text-${location!=="past" ? 'whiteColor':'primaryColor'} p-4 hover:scale-110 ease-in-out duration-150 hover:text-primaryColor after:bg-primaryColor after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-200`}
          
            onClick={() => {
              handleRouting("past");
            }}
          >
            Past Appointments
          </li>
          <li
            className={`text-${location!=="approval" ? 'whiteColor':'primaryColor'} p-4 hover:scale-110 ease-in-out duration-150 hover:text-primaryColor after:bg-primaryColor after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-200`}
          
            onClick={() => {
              handleRouting("buymedicine");
            }}
          >
            Buy Medicine
          </li>
         
        </ul>
        <div
          onClick={handleMenuVisibility}
          className="block md:hidden text-secondaryColor"
        >
          {smallNav ? (
            <></>
          ) : (
            <AiOutlineMenu color="white" size={20} className="m-4" />
          )}
        </div>
        <ul
          className={
            smallNav
              ? " fixed right-0 top-0 bg-secondaryColor text-primaryColor ease-in-out duration-500 z-50"
              : " fixed left-[-100%] ease-in-out duration-500"
          }
        >
          <div className=" flex justify-between items-center my-2 p-3">
            <div className=" w-60 p-2">
              <img src={Logo3} alt="" />
            </div>
            <AiOutlineClose size={20} onClick={handleMenuVisibility} />
          </div>
          <li
            className="p-4 border-b text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("dashboard");
            }}
          >
            Dashboard
          </li>
          <li
            className="p-4 border-b text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("appointment");
            }}
          >
            Book an Appointment
          </li>
          <li
            className="p-4 border-b text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("past");
            }}
          >
            Past Appointments
          </li>
          <li
            className="p-4  text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("buymedicine");
            }}
          >
            Buy Medicine
          </li>
          
        </ul>
        <div className="relative">
          <img onClick={handleLogoutDropdown} className="w-10 h-10 p-1 m-3 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 hover:cursor-pointer" src={DefaultAvatar} alt="Bordered avatar" />
          {showLogoutDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <button
                className="block px-4 py-2 text-secondaryColor hover:bg-primaryColor hover:text-white w-full text-left"
                onClick={() => handleRouting("profile")}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 text-secondaryColor hover:bg-primaryColor hover:text-white w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            
          )}
        </div>
        </div>
    </div>
  );
}

export default PatientNavbar;
