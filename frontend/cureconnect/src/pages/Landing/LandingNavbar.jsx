import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from "../../../src/assets/logos/logo1/logo-no-background.svg";
import Logo3 from "../../../src/assets/logos/logo3/logo-no-background.svg";

function LandingNavbar({ location }) {
  const [smallNav, setSmallNav] = useState(false);

  const navigate = useNavigate();

  const handleMenuVisibility = () => {
    setSmallNav(!smallNav);
  };

  const handleRouting = (key) => {
    if (key === "faq") {
      navigate("/faq");
    } else if (key === "contact") {
      navigate("/contactus");
    } else {
      navigate("/");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="flex md:mx-20 lg:mx-40 mx-5 px-3 justify-between items-center h-24 max-w-[1240px] text-white">
      <div className=" w-60 p-4">
        <img src={Logo} alt="" onClick={handleLogoClick}/>
      </div>

        <ul className="hidden md:flex text-lg text-backgroundColor font-bold hover:cursor-pointer">
          <li
            className={`text-${
              location !== "home" ? "secondaryColor" : "backgroundColor"
            } p-4 hover:scale-110 ease-in-out duration-150 hover:text-backgroundColor `}
            onClick={() => {
              handleRouting("home");
            }}
          >
            Home
          </li>
          <li
            className={`text-${
              location !== "contact" ? "secondaryColor" : "backgroundColor"
            } p-4 hover:scale-110 ease-in-out duration-150 hover:text-backgroundColor `}
            onClick={() => {
              handleRouting("contact");
            }}
          >
            Contant Us
          </li>
          <li
            className={`text-${
              location !== "faq" ? "secondaryColor" : "backgroundColor"
            } p-4 hover:scale-110 ease-in-out duration-150 hover:text-backgroundColor `}
            onClick={() => {
              handleRouting("faq");
            }}
          >
            FAQ
          </li>
        </ul>
        <div
          onClick={handleMenuVisibility}
          className="block md:hidden text-secondaryColor z-10"
        >
          {smallNav ? <></> : <AiOutlineMenu size={20}  />}
        </div>
        <ul
          className={
            smallNav
              ? " fixed right-0 top-0 bg-secondaryColor text-primaryColor ease-in-out duration-500"
              : " fixed left-[-100%] ease-in-out duration-500"
          }
        >
          <div className=" flex justify-between items-center my-2 p-4 gap-2">
            <div className=" w-40 p-4">
              <img src={Logo3} alt="" />
            </div>
            <AiOutlineClose size={20} onClick={handleMenuVisibility} />
          </div>
          <li
            className="p-4 border-b text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("home");
            }}
          >
            Home
          </li>
          <li
            className="p-4 border-b text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("contact");
            }}
          >
            Contant Us
          </li>
          <li
            className="p-4  text-backgroundColor hover:bg-backgroundColor hover:text-secondaryColor hover:cursor-pointer"
            onClick={() => {
              handleRouting("faq");
            }}
          >
            FAQ
          </li>
        </ul>
        


    </div>
  );
}

export default LandingNavbar;
