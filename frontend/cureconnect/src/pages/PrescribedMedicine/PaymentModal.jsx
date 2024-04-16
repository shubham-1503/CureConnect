import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ total, onClose, medicines }) => {
  const deliveryFee = 15;
  const taxRate = 0.15;
  const taxes = (total+ deliveryFee) * taxRate;
  const grandTotal = total + deliveryFee + taxes;

  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate("/patient/paymentgateway");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70">
        <div className="bg-white p-4 rounded-md w-[300px]">
          <div className="flex flex-row justify-between w-full items-center ">
            <h3 className="text-lg font-bold text-black">Payment Summary</h3>
            <button
              className="text-black bg-transparent hover:bg-gray-300 rounded-xl text-lg h-8 w-8 flex justify-center items-center"
              onClick={onClose}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="my-4 flex items-stretch flex-col gap-2">
            <div>Total Amount: {total} CAD</div>
            <div>Delivery Fee: {deliveryFee} CAD</div>
            <div>Taxes (15%): {taxes.toFixed(2)} CAD</div>
            <div className="font-semibold border p-2 border-black">
              Grand Total: {grandTotal.toFixed(2)} CAD
            </div>
          </div>

          <div className="">
            <button className="bg-secondaryColor hover:bg-primaryColor hover:text-black text-white font-semibold px-4 py-2 rounded-md flex justify-center items-center w-full"
              onClick={handlePayNow}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
