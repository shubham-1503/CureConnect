import React, { useState, useEffect } from "react";
import PaymentModal from "./PaymentModal";
import { useLocation } from "react-router-dom";
import PatientFooter from "../../Components/PatientFooter";
import PatientNavbar from "../../Components/PatientNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchInventoryAPI } from "../../service/inventoryService";

function PrescribedMedicine() {
  const location = useLocation();
  const { appointment } = location.state;

  const prescriptionData = appointment.prescriptionList;

  const [upperlimit, setUpperlimit] = useState([]);

  const medicineNames = prescriptionData.map(
    (medicine) => medicine.medicineName
  );
  const medicinesQueryParam = medicineNames.join(",");

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
      
        fetchInventoryAPI(medicinesQueryParam).then((response) => {
          const inventory = response.medicineList;

          const updatedMedicines = prescriptionData.map((medicine, index) => ({
            ...medicine,
            isChecked: true,
            price: inventory[index].price,
            quantity:
              inventory[index].quantity >= prescriptionData[index].quantity
                ? prescriptionData[index].quantity
                : inventory[index].quantity,
            isError:
              inventory[index].quantity >= prescriptionData[index].quantity
                ? false
                : true,
          }));
          setMedicines(updatedMedicines);
          setUpperlimit(updatedMedicines);
        });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  const [masterCheckboxChecked, setMasterCheckboxChecked] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMedicines = medicines ? medicines.filter((medicine) =>
  medicine.medicineName.toLowerCase().includes(searchText.toLowerCase())
) : [];

  useEffect(() => {
    calculateTotal();
  }, [medicines]);

  const calculateTotal = () => {
    let totalPrice = 0;
    medicines.forEach((medicine) => {
      if (medicine.isChecked) {
        totalPrice += medicine.price * medicine.quantity;
      }
    });
    // Round the total price to 2 decimal places
    totalPrice = parseFloat(totalPrice.toFixed(2));
    setTotal(totalPrice);
  };

  const handleCheckboxChange = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index].isChecked = !updatedMedicines[index].isChecked;
    setMedicines(updatedMedicines);

    const allChecked = updatedMedicines.every((medicine) => medicine.isChecked);
    setMasterCheckboxChecked(allChecked);
  };

  const handleQuantityChange = (index, newValue) => {
    if (newValue > upperlimit[index].quantity) {
      newValue = upperlimit[index].quantity;
    }

    newValue = Math.max(newValue, 0);

    const updatedMedicines = [...medicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      quantity: newValue,
    };
    setMedicines(updatedMedicines);
  };

  const handleMasterCheckboxChange = () => {
    const updatedMedicines = medicines.map((medicine) => ({
      ...medicine,
      isChecked: !masterCheckboxChecked,
    }));
    setMedicines(updatedMedicines);
    setMasterCheckboxChecked(!masterCheckboxChecked);
  };

  const handleProceedToPay = () => {
    if(total>0){
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInfoClick = () => {
    toast.warning("Available inventory quantity is set for purchase");
  };

  function convertToDate(timestamp) {
    var date = new Date(timestamp);

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();

    var formattedDate = month + " " + day + ", " + year;

    return formattedDate;
  }

  function convertToTime(timestamp) {
    var date = new Date(timestamp);

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    var formattedTime = hours + ":" + minutes + " " + ampm;

    return formattedTime;
  }

  const hasErrorMedicine = medicines.some((medicine) => medicine.isError);

  return (
    <>
    <PatientNavbar />
      <div className="flex flex-col w-screen h-screen px-6 overflow-y-auto items-stretch bg-backgroundColor">
        <ToastContainer />

        <div className="w-4/5 lg:w-3/5 mx-auto flex flex-col lg:flex-row justify-between items-center my-2 mt-6 gap-4 ">
          <div className="text-xl md:text-2xl font-bold">
            {appointment.doctorName} (
            {convertToDate(appointment.appointmentDate)} -{" "}
            {convertToTime(appointment.start)})
          </div>
          <div className="lg:min-w-40 flex md:text-lg  items-center bg-secondaryColor rounded-md text-white p-2 ">
            <input
              type="text"
              placeholder="Search by name"
              className=" bg-secondaryColor w-full px-1 outine-none focus:outline-none"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex flex-col my-2 justify-center items-center w-full">
          <div className="w-4/5 lg:w-3/5 overflow-x-auto">
            <table className="min-w-full w-full text-center border bg-white border-black">
              <thead className="text-white uppercase md:text-lg bg-secondaryColor border-black border-2">
                <tr>
                  <th scope="col" className="p-3">
                    <div>
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="accent-secondaryColor w-4 h-4"
                        checked={masterCheckboxChecked}
                        onChange={handleMasterCheckboxChange}
                      />
                    </div>
                  </th>
                  <th scope="col" className="p-3">
                    Medicine name
                  </th>
                  <th scope="col" className="p-3">
                    Price (CAD)
                  </th>
                  <th scope="col" className="p-3">
                    Quantity
                  </th>
                  {hasErrorMedicine ? (
                    <th scope="col" className="p-3 pr-5 mr-2">
                      *
                    </th>
                  ) : (
                    <div></div>
                  )}
                </tr>
              </thead>
              <tbody className="md:text-lg">
                {filteredMedicines.map((medicine, index) => (
                  <tr
                    key={index}
                    className={`${
                      medicine.isChecked ? "bg-white" : "bg-gray-300"
                    } hover:bg-primaryColor  border-2 border-black  accent-secondaryColor`}
                  >
                    <td className="p-3">
                      <div className="">
                        <input
                          id={`checkbox-table-${index}`}
                          type="checkbox"
                          className="p-3 w-4 h-4"
                          checked={medicine.isChecked}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="p-3 font-semibold whitespace-nowrap"
                    >
                      {medicine.medicineName}
                    </td>
                    <td className="p-3 font-semibold">{medicine.price}</td>
                    <td className="p-3">
                      <div className="flex justify-center items-center">
                        <button
                          className={`${
                            medicine.isChecked
                              ? "bg-secondaryColor text-white"
                              : "bg-gray-300 text-black"
                          }  border-2 border-black inline-flex items-center justify-center h-6 w-6 ms-3 text-xl font-bold  rounded-full `}
                          onClick={() =>
                            handleQuantityChange(index, medicine.quantity - 1)
                          }
                          disabled={!medicine.isChecked}
                        >
                          -
                        </button>
                        <div className="ms-3">
                          <input
                            type="text"
                            id={`quantity-${index}`}
                            className={`${
                              medicine.isChecked ? "bg-white" : "bg-gray-300"
                            } text-black w-14 text-center font-semibold  text-md rounded-lg px-2 py-1 `}
                            value={medicine.quantity}
                            readOnly
                          />
                        </div>
                        <button
                          className={`${
                            medicine.isChecked
                              ? "bg-secondaryColor text-white"
                              : "bg-gray-300 text-black"
                          } border-2 border-black inline-flex items-center justify-center h-6 w-6 ms-3 text-xl font-bold  rounded-full `}
                          onClick={() =>
                            handleQuantityChange(index, medicine.quantity + 1)
                          }
                          disabled={!medicine.isChecked}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    {medicine.isError ? (
                      <td className="">
                        <button
                          className="bg-red-600 font-serif font-black px-3 py-0.5 mr-2 rounded-full"
                          onClick={handleInfoClick}
                        >
                          i
                        </button>
                      </td>
                    ) : (
                      <div></div>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 w-4/5 lg:w-3/5 mx-auto flex flex-col xs:flex-row gap-4 justify-between items-center border-2 border-black rounded-md pl-3 p-2 mb-4">
          <div className=" text-lg md:text-xl font-bold ">
            Total Cost: {total} CAD
          </div>
          <button
            className={`${total > 0 ? "bg-secondaryColor hover:bg-primaryColor text-white hover:text-black" : "bg-gray-300 hover:bg-none text-black"} flex justify-center rounded-md py-2 px-4 md:text-lg font-semibold `}
            onClick={handleProceedToPay}
          >
            Proceed to pay
          </button>
        </div>
        {showModal && (
          <PaymentModal
            total={total}
            onClose={handleModalClose}
            medicines={medicines}
          />
        )}
      </div>
      <PatientFooter />
    </>
  );
}
export default PrescribedMedicine;
