import React, { useEffect, useState } from "react";
import LandingNavbar from "../Landing/LandingNavbar";
import Footer from "../Landing/Footer";
import { useNavigate } from "react-router-dom";

// Image Credits: https://storyset.com/illustration/call-center/cuate#utm_source=freepik&utm_medium=referall&utm_campaign=storiesdetail&utm_content=edit-button&utm_term=edit
import ContactImage from "../../assets/contactus2.png"

function ContactUs() {
  const initialvalues = { name: "", email: "", subject: "", message: "" };
  const [formValues, setFormValues] = useState(initialvalues);
  const [validEmail, setValidEmail] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validSubject, setValidSubject] = useState(true);
  const [validMessage, setValidMessage] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const nameregex = /^[a-zA-Z][a-zA-Z ]+$/;

    setValidName(nameregex.test(name));
    handleChange(e);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailregex = /^[^\W_]+(?:\.[^\W_]+)*@[^\W_]+(?:\.[^\W_]+)+$/;

    setValidEmail(emailregex.test(email));
    handleChange(e);
  };

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    const subjectregex = /^[a-zA-Z0-9][a-zA-Z0-9 ]+$/;

    setValidSubject(subject.length > 0);
    setValidSubject(subjectregex.test(subject));
    handleChange(e);
  };

  const handleMessageChange = (e) => {
    const message = e.target.value;
    const messageregex = /\S+/;

    setValidMessage(message.length > 0);
    setValidMessage(messageregex.test(message));
    handleChange(e);
  };

  const handleSubmit = (e) => {
    let allvalid = true;
    if (formValues.name.length === 0) {
      allvalid = false;
      setValidName(false);
    }

    if (formValues.email.length === 0) {
      allvalid = false;
      setValidEmail(false);
    }

    if (formValues.subject.length === 0) {
      allvalid = false;
      setValidSubject(false);
    }

    if (formValues.message.length === 0) {
      allvalid = false;
      setValidMessage(false);
    }

    if (validName && validEmail && validSubject && validMessage && allvalid) {
      navigate("/");
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full h-full flex flex-col overflow-auto bg-primaryColor">
        <LandingNavbar location={"contact"} />
        <div className=" flex-1 flex flex-col h-full w-full lg:flex-row">
          <div className="flex justify-center items-center basis-2/5 lg:basis-3/5 max-w-full max-h-full">
            <img
              src={ContactImage}
              alt="Contact Us Image"
              className="max-w-[350px] max-h-[350px] lg:max-w-[550px] lg:max-h-[550px] "
            />
          </div>
          <div className="flex max-w-full max-h-full basis-3/5 lg:basis-2/5 justify-center lg:justify-start">
            <div className="flex min-h-full flex-col justify-center px-4 pb-4">
              <div className="bg-whiteColor p-10 rounded-lg border-black">
                <div className="mx-auto w-full max-w-sm p-3">
                  <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Contact Us
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
                  {/* name ----------------------------------------------------------------------------------------------*/}
                  <div className="py-2">
                    <label
                      htmlFor="name"
                      className="block text-base font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formValues.name}
                        onChange={handleNameChange}
                        className="block w-50 xs:w-80 rounded-md border-2 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-secondaryColor focus:ring-3 focus:ring-inset text-sm focus:outline-none"
                      />
                    </div>
                    {!validName ? (
                      <p className="text-sm text-red-500">
                        Please Enter Letters Only
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* Email ----------------------------------------------------------------------------------------------*/}
                  <div className="py-2">
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-900"
                    >
                      Email Id
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="john.doe@gmail.com"
                        value={formValues.email}
                        onChange={handleEmailChange}
                        className="block w-full rounded-md border-2 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-secondaryColor focus:ring-3 focus:ring-inset text-sm focus:outline-none"
                      />
                    </div>
                    {!validEmail ? (
                      <p className="text-sm text-red-500">
                        Please enter a valid email
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* Subject ----------------------------------------------------------------------------------------------*/}
                  <div className="py-2">
                    <label
                      htmlFor="subject"
                      className="block text-base font-medium text-gray-900"
                    >
                      Subject
                    </label>
                    <div className="mt-1">
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Subject Line"
                        value={formValues.subject}
                        onChange={handleSubjectChange}
                        className="block w-full rounded-md border-2 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-secondaryColor focus:ring-3 focus:ring-inset text-sm focus:outline-none"
                      />
                    </div>
                    {!validSubject ? (
                      <p className="text-sm text-red-500">
                        Subject cannot be empty
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* Message ----------------------------------------------------------------------------------------------*/}
                  <div className="py-2">
                    <label
                      htmlFor="message"
                      className="block text-base font-medium text-gray-900"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        type="text"
                        rows="4"
                        placeholder="Tell us about your query ..."
                        value={formValues.message}
                        onChange={handleMessageChange}
                        className="block w-full rounded-md border-2 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-secondaryColor focus:ring-3 focus:ring-secondaryColor text-sm focus:outline-none"
                      />
                    </div>
                    {!validMessage ? (
                      <p className="text-sm text-red-500">
                        Message cannot be empty
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>

                  {/* button ----------------------------------------------------------------------------------------------*/}
                  <div className="py-2 mt-3 flex justify-center">
                    <button
                      // onClick={handleSubmit}
                      className=" flex w-5/6 justify-center rounded-full bg-secondaryColor px-4.5 py-2 text-xl font-semibold text-white shadow-sm hover:bg-black"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
