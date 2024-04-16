import React from "react";
import { GrSchedule } from "react-icons/gr";
import { AiOutlineMedicineBox,AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineLock } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";


const featurelist = [
  {
    ficon: (
      <GrSchedule
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={40}
      />
    ),
    title: "Book Instant Appointment",
    desc: "View doctor schedule and book appointment instantly",
  },
  {
    ficon: (
      <AiOutlineMedicineBox
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={40}
      />
    ),
    title: "Purchase Prescribed Medicines",
    desc: "Place order of medicines and get prescription delivered at home",
  },
  {
    ficon: (
      <AiOutlineGlobal
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={40}
      />
    ),
    title: "Connectivity",
    desc: "Connect with any doctor across country",
  },
  {
    ficon: (
      <MdOutlineLock
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={50}
      />
    ),
    title: "Security",
    desc: "Your medical history is protected with best security practices",
  },
  {
    ficon: (
      <RiSecurePaymentLine
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={40}
      />
    ),
    title: "Seamless Payment",
    desc: "We ensure smooth, secured and hassle-free payment service for our customers",
  },
  {
    ficon: (
      <BiSupport
        className="w-8 mb-4 inline-block text-secondaryColor group-hover:text-primaryColor"
        size={40}
      />
    ),
    title: "Support",
    desc: "24/7 support for all emergency needs of customers",
  },
];

function Features() {
  return (
    <div className="w-full mx-auto py-10 px-10">
      <h2 className="text-3xl text-center font-bold tracking-tight text-secondaryColor sm:text-4xl mb-16">
        Exclusive Features
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 max-md:max-w-lg mx-auto">
        {featurelist.map((feature, index) => (
          <div key={index} className="rounded-xl group p-8 text-center hover:cursor-pointer hover:text-primaryColor text-secondaryColor border border-backgroundColor bg-whiteColor hover:shadow-2xl hover:scale-105 transition duration-200">
            {feature.ficon}
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="  group-hover:text-gray-500 text-md">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
