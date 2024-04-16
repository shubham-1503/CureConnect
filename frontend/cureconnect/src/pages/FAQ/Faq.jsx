import React, { useState } from "react";
import LineItem from "./LineItem";
import Footer from "../Landing/Footer";
import LandingNavbar from "../Landing/LandingNavbar";

function Faq() {
  const qnas = [
    {
      id: 1,
      question: "How can I book an appointment with a doctor?",
      answer:
        'Booking an appointment with a doctor is easy. After logging in to your account, navigate to the "Book Appointment" section. Here, you can search for doctors based on specialty, availability, or location. Select your preferred doctor, choose a suitable time slot, and confirm your appointment.',
    },
    {
      id: 2,
      question: "Can I view my prescription history on the website?",
      answer:
        'Yes, you can access your prescription history and medical records through your patient dashboard. Simply log in to your account and navigate to the "Prescription History" or "Medical Records" section to view and manage your past prescriptions and medical history.',
    },
    {
      id: 3,
      question: "How do I order medicines online?",
      answer:
        'Ordering medicines online is convenient. Once you have a valid prescription from a registered doctor, log in to your account and visit the "Medication Purchase" or "Order Medicines" section. Select your prescription based on your previous appointment, select the medicines you need, and proceed to checkout. Make the payment through our secure payment gateway, and your medicines will be delivered to your doorstep.',
    },
    {
      id: 4,
      question: "How can I pay for my orders?",
      answer:
        "We offer various payment options for your convenience. You can pay for your orders using credit/debit cards, net banking, mobile wallets, or other online payment methods available on our website. Rest assured, all transactions are processed securely.",
    },
    {
      id: 5,
      question: "What if I need to reschedule or cancel my appointment?",
      answer:
        'If you need to reschedule or cancel your appointment with a doctor, simply log in to your account and navigate to the "Appointment Management" section. Here, you can view your upcoming appointments and choose to reschedule or cancel as per your convenience. Please note that some doctors may have specific cancellation policies.',
    },
    {
      id: 6,
      question:
        "Is my personal information and medical data secure on the website?",
      answer:
        "Yes, we take the privacy and security of your personal information and medical data seriously. Our website employs robust security measures to safeguard your data against unauthorized access, misuse, or disclosure. We comply with all relevant data protection regulations to ensure the confidentiality of your information.",
    },
    {
      id: 7,
      question: "How do I contact customer support for assistance?",
      answer:
        'If you need any assistance or have queries regarding our services, you can contact our customer support team through the "Contact Us" page on our website. Alternatively, you can email us at support@email.com or call our helpline number XXX-XXX-XXXX. Our dedicated support team will be happy to assist you with any inquiries or concerns you may have.',
    },
    {
      id: 8,
      question: "Can I consult multiple doctors through this platform?",
      answer:
        "Yes, you can consult multiple doctors through our platform. Each consultation is independent, and you have the flexibility to choose different doctors for different health concerns or specialties. However, we recommend maintaining transparency with your healthcare providers and informing them about any ongoing treatments or prescriptions from other doctors.",
    },
    {
      id: 9,
      question:
        "What if I have an urgent medical issue and need immediate assistance?",
      answer:
        "For urgent medical issues requiring immediate assistance, we recommend contacting emergency services or visiting the nearest healthcare facility. Our platform is designed for non-emergency consultations and medication orders. If you have a medical emergency, please seek help from qualified medical professionals immediately.",
    },
    {
      id: 10,
      question: "Are the doctors on your platform licensed and verified?",
      answer:
        "Yes, all the doctors on our platform are licensed healthcare professionals with verified credentials. We carefully screen and verify each doctor's qualifications, credentials, and professional experience to ensure that our users receive high-quality and reliable medical advice and consultations.",
    },
  ];

  const [filterQna, setFilterQna] = useState(qnas);

  const handleFilter = (filterword) => {
    if (filterword.length > 0) {
      const newList = qnas.filter((qna) =>
        qna.question.toLowerCase().includes(filterword.toLowerCase())
      );
      setFilterQna(newList);
    } else {
      setFilterQna(qnas);
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="w-full h-full min-h-screen flex flex-col bg-primaryColor ">
        <LandingNavbar location={"faq"} />
        <div className="w-full flex-1 flex flex-col items-center">
          <div className="mt-10 mb-5 items-end  text-secondaryColor text-5xl font-bold ">
            FAQ
          </div>
          <div className="items-end text-secondaryColor text-xl md:text-2xl mb-4">
            Any Questions? Look Here!
          </div>
          <input
            placeholder="Enter your query"
            onChange={(e) => {
              handleFilter(e.target.value);
            }}
            className=" w-1/2 text-md p-3 m-4 rounded-full text-gray-800 ring-1 ring-secondaryColor focus:outline-none focus:ring-3 focus:ring-inset focus:border-none focus:ring-secondaryColor"
            type="text"
          />

          <div className=" w-full md:justify-center mb-10 p-10 flex md:flex-row flex-col gap-4 ">
            <div
              className=" flex flex-col gap-4 w-full md:w-2/5 border-5 "
              key={100}
            >
              {filterQna.map((qna, index) =>
                index % 2 === 0 ? <LineItem key={qna.id} props={qna} /> : null
              )}
            </div>
            <div className=" flex flex-col gap-4 w-full md:w-2/5" key={200}>
              {filterQna.map((qna, index) =>
                index % 2 === 1 ? <LineItem key={qna.id} props={qna} /> : null
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Faq;
