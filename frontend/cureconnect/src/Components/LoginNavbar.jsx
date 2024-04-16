import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logos/logo3/logo-no-background.svg';
import Logo3 from '../assets/logos/logo3/logo-no-background.svg';


function LoginNavBar({ location }) {
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
    <div className="flex md:mx-20 lg:mx-40 mx-5 px-3 justify-between items-center h-24 max-w-[1240px] text-black">
      <div className=" w-36 md:w-60 p-4">
        <img src={Logo} alt="" onClick={handleLogoClick} />
      </div>
      <ul className="hidden md:flex text-lg text-black font-bold hover:cursor-pointer">
        <li
          //className={`text-${location!=="home" ? 'secondaryColor':'backgroundColor'} p-4 hover:scale-125 ease-in-out duration-150 hover:text-backgroundColor `}
          className={`text-backgroundColor p-4 hover:scale-125 ease-in-out duration-150 hover:text-backgroundColor `}
          onClick={() => {
            handleRouting("home");
          }}
        >
          Home
        </li>
        <li
          className={`text-backgroundColor p-4 hover:scale-110 ease-in-out duration-150 hover:text-backgroundColor `}
          onClick={() => {
            handleRouting("contact");
          }}
        >
          Contant Us
        </li>
        <li
          className={`text-backgroundColor p-4 hover:scale-110 ease-in-out duration-150 hover:text-backgroundColor `}
          onClick={() => {
            handleRouting("faq");
          }}
        >
          FAQ
        </li>
      </ul>
      <div
        onClick={handleMenuVisibility}
        className="block md:hidden text-secondaryColor"
      >
        {smallNav ? <></> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          smallNav
            ? " fixed right-0 top-0 bg-black text-black ease-in-out duration-500"
            : " fixed left-[-100%] ease-in-out duration-500"
        }
      >
        <div className=" flex justify-between items-center my-2 p-4 gap-2">
          <div className=" w-60 p-4">
            <img src={Logo3} alt="" />
          </div>
          <AiOutlineClose size={20} onClick={handleMenuVisibility} />
        </div>
        <li
          className="p-4 border-b text-black hover:bg-black hover:text-secondaryColor hover:cursor-pointer"
          onClick={() => {
            handleRouting("home");
          }}
        >
          Home
        </li>
        <li
          className="p-4 border-b text-black hover:bg-black hover:text-secondaryColor hover:cursor-pointer"
          onClick={() => {
            handleRouting("contact");
          }}
        >
          Contant Us
        </li>
        <li
          className="p-4  text-black hover:bg-black hover:text-secondaryColor hover:cursor-pointer"
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

export default LoginNavBar;
