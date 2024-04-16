import React from "react";
import '../../pages/css/userProfileStyle.css';
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { docreateUserWithEmailAndPassword } from "../Authentication/Auth";
import registerUser from "../../service/userService";
import { auth, storage } from "../Authentication/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import registerDoctor from "../../service/doctorService";

export const DoctorRegister = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    email: "",
    number: "",
    gender: "",
    specialization: "",
    educationDetails: "",
    experience: "",
    description: "",
    password: "",
    confirm_password: "",
    userRole: "",
    profileUrl: "",
    licenseUrl: "",
    approved:false
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [profileImageName, setProfileImageName] = useState("No File Chosen");

  const [licenseUpload, setLicenseUpload] = useState(null);
  const [licenseName, setLicenseName] = useState("No File Chosen");

  const fileInputRef = useRef(null);
  const licenseRef = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click(); // Simulate click on the actual file input
  };

  const handleImageChange = (event) => {
    const fileName = event.target.files[0]?.name;
    setProfileImageName(fileName);
    setImageUpload(event.target.files[0]);
  };

  const handleLicenseClick = (e) => {
    e.preventDefault();
    licenseRef.current.click(); // Simulate click on the actual file input
  };

  const handleLicenseChange = (event) => {
    const fileName = event.target.files[0]?.name;
    setLicenseName(fileName);
    setLicenseUpload(event.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const isValidName = (name) => {
    const name_regex = /^[a-zA-Z]+$/;
    return name_regex.test(name);
  };

  // function to validate entered email
  const isValidEmail = (email) => {
    const email_regex =
      /^[a-zA-Z0-9][a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email_regex.test(email);
  };

  // function to validate entered mobile number
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{8,}$/;
    return passRegex.test(password);
  };

  const formattedBirthdate = formData.birthdate
    ? new Date(formData.birthdate)
    : "";
  const formattedDateString =
    formattedBirthdate instanceof Date && !isNaN(formattedBirthdate)
      ? formattedBirthdate.toISOString().split("T")[0]
      : "";
  formData.birthdate = formattedDateString;

  async function userImageUpload() {
    try {
      if (imageUpload == null) {
        return;
      }
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

      await uploadBytes(imageRef, imageUpload).then(() => {
        getDownloadURL(imageRef).then((url) => {
          formData.profileUrl = url;
        });
      });
    } catch (error) {
    }
  }

  async function licenseDetailsUpload() {
    try {
      if (licenseUpload == null) {
        return;
      }
      const licenseDetailsRef = ref(storage, `license/${licenseName + v4()}`);

      await uploadBytes(licenseDetailsRef, licenseUpload).then(() => {
        getDownloadURL(licenseDetailsRef).then((url) => {
          formData.licenseUrl =url;
        });
      });
    } catch (error) {
    }
  }

  // function to store user data into localstorage
  const storeUser = (id, token, role) => {
    try {
      localStorage.clear();

      const userData = {
        id: id,
        token: token,
        role: role,
      };
      localStorage.setItem("userInfo", JSON.stringify(userData));
      toast.success("User registered successfully !");
      navigate("/doctor/appointments");
    } catch (error) {
    }
  };

  // function to validate form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Funciton to validate name

    if (!formData.userName) {
      toast.error("Name is required ");
      return;
    } else if (!isValidName(formData.userName)) {
      toast.error("Name should contain characters only");
      return;
    }

    if (!formData.email) {
      toast.error("Email address is required");
      return;
    } else if (!isValidEmail(formData.email)) {
      toast.error("Enter valid email address");
      return;
    }

    if (!formData.number) {
      toast.error("Mobile Number is required");
      return;
    } else if (!isValidPhoneNumber(formData.number)) {
      toast.error("Enter valid mobile number");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return;
    } else if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one lowercase letter, uppercase letter, number, and special character !"
      );
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Confirm Password should be same");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender is required ");
      return;
    }
    if (!formData.specialization) {
      toast.error("Specialization is required ");
      return;
    }
    if (!formData.educationDetails) {
      toast.error("Education Details are required ");
      return;
    }
    if (!formData.experience) {
      toast.error("Experience is required ");
      return;
    }
    if (!formData.description) {
      toast.error("Description is required ");
      return;
    }
    if(imageUpload === null) {
      toast.error("Please upload profile image");
      return;
    }
    else if(!(profileImageName.endsWith('.jpg')||profileImageName.endsWith('.png')||profileImageName.endsWith('.jpeg'))) {
      toast.error("Please upload image in .jpg or .png format");
      return;
    }
    else {
      userImageUpload();
    }
    if(licenseUpload === null) {
      toast.error("Please upload license");
      return;
    }
    else if(!(licenseName.endsWith('.jpg')||licenseName.endsWith('.png')||licenseName.endsWith('.jpeg'))) {
      toast.error("Please upload license in jpeg or png format");
      return;
    }
    else {
      licenseDetailsUpload();
    }

    if (!isSignUp) {
      setisSignUp(true);
      formData.userRole = "doctor";

      try {
        const result = await docreateUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        const user = result.user;
        const token = await user.getIdToken();
        formData.id = user.uid;
        try {
          const userDetails = await registerUser.registerUser(formData);
          const updatedToken = await user.getIdToken(true)
          
          const doctor = await registerDoctor.registerDoctor(formData,updatedToken)
          storeUser(formData.id, token, formData.userRole);
        } catch (error) {
        }
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error(
              "Email already in use. Please use a different email address."
            );
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Please try again later.");
            break;
          case "auth/operation-not-allowed":
            toast.error("Registration is currently not allowed.");
            break;
          default:
            toast.error(
              "An error occurred during registration. Please try again later."
            );
            break;
        }
      }
    }
  };

  return (
    <div className="wrapper bg-backgroundColor">
      <div className="main_container flex justify-center min-h-screen items-center p-8">
        <div className="flexContainerForm w-3/4 h-4/5">
          <div className="w-1/2 side_image"></div>
          <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center relative overflow-auto">
            <div className="input_box w-4/5 md:w-330px">
              <div className="flex flex-col md:flex-row justify-center items-center mb-10 ">
                <header className="flex flex-col text-center mb-50 font-bold text-lg">
                  Sign Up Doctor
                </header>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input_field flex flex-col relative">
                  <input
                    type="text"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="userName"
                    placeholder="Name"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_field flex flex-col relative">
                  <input
                    type="text"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <input
                    type="text"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="number"
                    placeholder="Mobile Number"
                    value={formData.number}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <select
                    id="gender"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    onChange={handleChange}
                    value={formData.gender || ""}
                  >
                    <option value="" hidden>
                      Select Gender{" "}
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="input_field flex flex-col relative">
                  <input
                    type="text"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <input
                    type="text"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="educationDetails"
                    placeholder="Education Details"
                    value={formData.educationDetails}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="experience"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <textarea
                    id="description"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    placeholder="Enter Your Description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="input_field flex flex-col relative">
                  <input
                    type="password"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex flex-col relative">
                  <input
                    type="password"
                    className="outline-none w-full h-10 md:h-12 border-b border-black mb-2"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_field flex relative gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="relative px-8 py-2 rounded-md bg-teal-600 isolation-auto z-10 border-2 border-teal-700 before:absolute before:w-1/2 
                                        before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                                        before:bg-teal-700 before:-z-10 before:aspect-square 
                                        before:hover:scale-150 overflow-hidden 
                                        text-white hover:text-white"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {/* Custom button that triggers file input */}
                  <button
                    onClick={handleClick}
                    className="relative px-2 py-2 rounded-md bg-teal-600 isolation-auto z-10 border-2 border-teal-700 before:absolute before:w-1/2 
                                        hover:bg-darkPrimary
                                        text-white hover:text-white basis-1/2 text-sm"
                  >
                    Upload Profile Picture
                  </button>
                  <div className="file-name flex items-center px-2 overflow-x-auto basis-1/2">
                    {profileImageName}
                  </div>
                </div>
                <div className="input_field flex relative gap-2 mt-5">
                  <input
                    ref={licenseRef}
                    type="file"
                    className="relative px-8 py-2 rounded-md bg-teal-600 isolation-auto z-10 border-2 border-teal-700 before:absolute before:w-1/2 
                                        before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
                                        before:bg-teal-700 before:-z-10 before:aspect-square 
                                        before:hover:scale-150 overflow-hidden 
                                        text-white hover:text-white"
                    onChange={handleLicenseChange}
                    style={{ display: "none" }}
                  />
                  {/* Custom button that triggers file input */}
                  <button
                    onClick={handleLicenseClick}
                    className="relative px-2 py-2 rounded-md bg-teal-600 isolation-auto z-10 border-2 border-teal-700 before:absolute before:w-1/2 
                                        hover:bg-darkPrimary
                                        text-white hover:text-white basis-1/2 text-sm"
                  >
                    Upload License
                  </button>
                  <div className="file-name flex items-center px-2 overflow-x-auto basis-1/2">
                    {licenseName}
                  </div>
                </div>
                <br />
                <div className="flex flex-col relative bg-gray-300">
                  <input
                    type="submit"
                    className="h-12 px-6 text-black bg-gray-200 hover:bg-teal-600 hover:text-white"
                    value="Sign Up"
                  />
                  <ToastContainer />
                </div>
              </form>
              <div className="text-center text-sm mt-4">
                <span>
                  Already have an account?{" "}
                  <a
                    className="text-decoration-none font-bold text-black transition duration-500 hover:text-black hover:underline"
                    href="/user/Login"
                  >
                    Login here
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegister;
