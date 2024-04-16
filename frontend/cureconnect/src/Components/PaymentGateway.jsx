import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";

function PaymentGateway() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/patient");
    }, 3200);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-backgroundColor justify-center items-center">
      <p className="text-3xl font-bold">Payment Gateway</p>
      <p className="text-xl mt-3">Coming Soon</p>
      <p className="text-xl">
        Redirecting to dashboard in . . .
        <ReactTyped
          className="text-xl ml-2"
          strings={[ " 3", " 2", " 1"]}
          typeSpeed={100}
          // backSpeed={100}
          // loop
          showCursor={false}
        />
      </p>
    </div>
  );
}

export default PaymentGateway;
