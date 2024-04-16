import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function LineItem({ props }) {
  const [active, setActive] = useState(false);

  const { question, answer } = props;

  const handleToggle = (event) => {
    event.preventDefault();
    setActive(!active);
  };
  return (
    <div
      onClick={handleToggle}
      className="flex flex-col bg-whiteColor py-10 px-10 rounded-xl transition-opacity duration-1000 ease-in-out"
    >
      <div className=" flex">
        {active ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
        <div className=" flex-1">
          <div className="text-secondaryColor text-md md:text-xl text-center">
            {question}
          </div>
        </div>
      </div>
      <div
        className={
          active
            ? " flex-1 mt-4 px-10 opacity-100 transition-opacity"
            : "hidden opacity-0"
        }
      >
        <p className=" text-sm md:text-lg">{answer}</p>
      </div>
    </div>
  );
}
export default LineItem;
