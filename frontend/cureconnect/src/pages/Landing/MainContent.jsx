import React from "react";
import { ReactTyped } from "react-typed";
import {Navigate, useNavigate} from 'react-router-dom';

// Image Credits: https://www.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_12557507.htm
import DoctorImage from "../../assets/landingImage.png"

function MainContent() {

  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if(userInfo?.role !== undefined){
      navigate("/dashboard");
    }
    else{
      navigate("/user/Login");
    }
  }
  return (
    <div className="flex justify-between lg:px-40 md:px-20 px-5">
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex-1 flex flex-col justify-center md:items-start">
          <p className=" text-xl md:text-start text-backgroundColor font-bold p-2 animate-slide-up-opacity">
          Transforming Healthcare with All-in-One Solutions
          </p>
          <h1 className=" text-secondaryColor md:text-start md:text-5xl sm:text-6xl text-4xl font-bold md:py-6 animate-slide-up-opacity duration-200">
          Access Expert Consultations
          </h1>
          <div className="flex justify-center items-center">
            <p className=" md:text-start md:text-3xl sm:text-4xl text-xl text-backgroundColor font-bold py-4 animate-slide-up-opacity">
            A Unified Platform for
            <ReactTyped
              className="md:text-3xl sm:text-4xl text-xl font-bold md:pl-2 pl-2"
              strings={["Appointments", "Consultations", "Pharmacy"]}
              typeSpeed={100}
              backSpeed={120}
              loop
            />
            </p>
          </div>
          <p className="md:text-start  md:text-2xl text-xl font-bold text-secondaryColor animate-slide-up-opacity">
          Monitor Your Health, Anywhere in the Country
          </p>
          <button className=" bg-secondaryColor w-[200px] mx-auto md:mx-0 rounded-md font-medium my-6 py-3 text-backgroundColor hover:cursor-pointer animate-slide-up-opacity"
          onClick={handleStart}>
            Get Started
          </button>
        </div>
        <div className=" hidden md:flex flex-1 items-center justify-center animate-slide-up-opacity">
            <img src={DoctorImage} className="w-full max-w-[800px] px-5"  alt="" />
        </div>
    </div>
  );
}

export default MainContent;
