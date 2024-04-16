import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import {addOrUpdateMedicine} from "../../service/inventoryService";

function MedicineForm({ handleRefresh }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    expiryDate: "",
    quantity: 0,
    price: 0.0,
    description: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    brand: false,
    expiryDate: false,
    quantity: false,
    price: false,
    description: false,
  });

  const handleSubmit = (event) => {
    const elements = ["name", "brand", "expiryDate", "description"];
    event.preventDefault();
    let isValid = true;

    for (const element of elements) {
      if (formData[element] === "") {
        isValid = false;
        setErrors((prevState) => ({
          ...prevState,
          [element]: true,
        }));
      }
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        price: true,
      }));
    }

    if (isNaN(formData.quantity) || formData.quantity < 1) {
      isValid = false;
      setErrors((prevState) => ({
        ...prevState,
        quantity: true,
      }));
    }

    for (const errorKey in errors) {
      if (errors[errorKey]) {
        isValid = false;
        break;
      }
    }
    if (!isValid) {
      toast.warning("Please fill all the required fields.");
      return;
    }
    try {
      addOrUpdateMedicine(formData).then((res) => {
        event.target.reset();
        toast.success("Medicine added successfully!");
        setTimeout(() => handleRefresh(true), 1000);
      });
      
    } catch (error) {
      toast.error("Error while adding medicine. Please try again");
    }
  };

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setError(false);
    let { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (value === "") {
      setErrors((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };

  const handleQuantityChange = (e) => {
    setError(false);
    let { name, value } = e.target;
    value = Number(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (isNaN(value) || value < 1) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };

  const handlePriceChange = (e) => {
    setError(false);
    let { name, value } = e.target;
    value = Number(value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (isNaN(value) || value <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    }
  };

  return (
    <>
      <form
        className="w-full py-5 bg-backgroundColor text-secondaryColor border-2 border-secondaryColor rounded-lg shadow "
        onSubmit={handleSubmit}
      >
        <div className="px-5 pb-5 m-4">
          <div className="mt-2">
            <label htmlFor="subject" className="block text-sm px-1 font-bold ">
              Medicine
            </label>
            <input
              placeholder="Medicine"
              name="name"
              className=" text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-2 mt-1 text-base transition duration-200 ease-in-out rounded-lg bg-whiteColor border-2 border-secondaryColor border-solid focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="my-2 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
                ❌ Medicine name cannot be empty
              </p>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="subject" className="block text-sm px-1 font-bold ">
              Manufactured By
            </label>
            <input
              placeholder="Brand"
              name="brand"
              className=" text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-2 mt-1 text-base transition duration-200 ease-in-out border-2 border-secondaryColor border-solid rounded-lg bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
              onChange={handleChange}
            />
            {errors.brand && (
              <p className="text-errorText mb-4 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
                ❌ Brand name cannot be empty
              </p>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="subject" className="block text-sm px-1 font-bold ">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              min={new Date().toISOString().split("T")[0]}
              className=" text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-2 mt-1 text-base transition duration-200 ease-in-out border-2 border-secondaryColor border-solid rounded-lg bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
              onChange={handleChange}
            />
            {errors.expiryDate && (
              <p className="text-errorText mb-4 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
                ❌ Expiry date cannot be empty
              </p>
            )}
          </div>
          <div className="flex flex-row items-start mt-2 gap-2">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="subject"
                className="block text-sm px-1 font-bold basis-1/2"
              >
                Quantity
              </label>
              <input
                placeholder="Quantity"
                name="quantity"
                className=" text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-2 mt-1 mr-1 text-base transition duration-200 ease-in-out border-2 border-secondaryColor border-solid rounded-lg bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
                type="number"
                step="1"
                onChange={handleQuantityChange}
              />
            </div>
            <div className="flex flex-col w-1/2">
            <label
              htmlFor="subject"
              className="block text-sm px-1 ml-1 font-bold  basis-1/2"
            >
              Price
            </label>
            <input
              placeholder="Price"
              name="price"
              className="text-secondaryColor placeholder-gray-600 w-full px-4 py-1.5 mb-2 mt-1 text-base transition duration-200 ease-in-out border-2 border-secondaryColor border-solid rounded-lg bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none"
              type="number"
              step=".01"
              onChange={handlePriceChange}
            />
            </div>
            
          </div>
        
          {errors.quantity && (
            <p className="text-errorText mb-4 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
              ❌ Enter correct quantity.
            </p>
          )}
          {errors.price && (
            <p className="text-errorText mb-4 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
              ❌ Enter correct price.
            </p>
          )}
          <div className="mt-2">
            <label
              htmlFor="description"
              className="block text-sm px-1 font-bold"
            >
              Description
            </label>
            <textarea
              className="min-h-[100px] max-h-[300px] mt-1 h-28 placeholder-gray-600 mb-2 appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-secondaryColor border-solid rounded-lg py-4 px-4 text-secondaryColor bg-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor focus:bg-whiteColor focus:border-none transition duration-200 ease-in-out"
              placeholder="Description"
              name="description"
              onChange={handleChange}
            ></textarea>
            {errors.description && (
              <p className="text-errorText mb-4 text-start uppercase text-[0.60em] font-bold tracking-[0.15em]">
                ❌ Description cannot be empty
              </p>
            )}
          </div>
        </div>
        <hr className="my-4 border-secondaryColor"></hr>
        <div className="flex flex-row-reverse px-9">
          <div className="flex-initial pl-3">
            <button
              type="submit"
              className="flex items-center px-5 py-2.5 font-medium tracking-wide text-whiteColor capitalize bg-primaryColor rounded-md hover:bg-darkPrimary focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path
                  d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                  opacity=".3"
                ></path>
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
              </svg>
              <span className="pl-2 mx-1">Save</span>
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default MedicineForm;
