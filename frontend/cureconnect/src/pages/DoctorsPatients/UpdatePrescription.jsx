import React, { useState,useEffect } from "react";
import { MdDateRange, MdDeleteOutline, MdAdd, MdSave } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Modal} from "flowbite-react";
import {addDoctorPrescription, getAllMedicines} from "../../service/addPrescriptionDoctorService.js";


const UpdatePrescription = ({appointment,onCloseModal}) => {

    const [rows, setRows] = useState(
        appointment.prescriptionList
    );
    const [nextId, setNextId] = useState(2);
    const [medicineList, setMedicineList] = useState([]);

    useEffect(() => {
        fetchMedicineList();
    }, []);

    const fetchMedicineList = async () => {
        try {
            const response = await getAllMedicines();
            setMedicineList(response.medicineList);
        } catch (error) {
            toast.error("Failed to fetch medicine list");
        }
    };


    const handleAddRow = () => {
        setRows([
            ...rows,
            { id: nextId, medicineId: "", medicineName: "", quantity: "", description: "" },
        ]);
        setNextId(nextId + 1);
    };

    const handleDeleteRow = (id) => {
        if (rows.length === 1) {
            alert("At least one row is required");
            return;
        }
        setRows(rows.filter((row) => row.medicineId !== id));
    };

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        if(name==='medicineName'){
            const selectedMedicine = medicineList.find(
                (medicine) => medicine.name === value
            );

            if (!selectedMedicine) {
                const newRows = rows.map((row) =>
                    row.medicineId === id
                        ? { ...row, [name]: value, medicineId: "", medicineName: "" }
                        : row
                );
                setRows(newRows);

            }else{
                const newRows = rows.map((row) =>
                    row.medicineId === id
                        ? { ...row, [name]: value, medicineId: selectedMedicine.id, medicineName: selectedMedicine.name }
                        : row
                );
                setRows(newRows);

            }
        }else{

            const newValue = name === "quantity" ? parseInt(value, 10) || "" : value;

            const newRows = rows.map((row) =>
                row.medicineId === id ? { ...row, [name]: newValue } : row
            );
            setRows(newRows);
        }
    };

    const handleSave = () => {
        if (
            rows.some(
                (row) =>
                    !row.medicineName ||
                    !row.quantity ||
                    isNaN(row.quantity) ||
                    !row.description
            )
        ) {
            toast.error("All fields are required and quantity should be an integer");
            return;
        }
        const updatedRows = rows.map((row) => {
            const { id, ...updatedRow } = row;
            return updatedRow;
        });

        const updateAppointment = { id:appointment.id, prescriptionList: updatedRows };

        addDoctorPrescription({
            id:updateAppointment.id,
            prescriptionList: updateAppointment.prescriptionList
        }).then((res) => {
                if (res.status === "success") {
                    toast.success("Prescription added successfully");
                    setTimeout(() => {
                        onCloseModal();
                    }, 2000);
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    return (
        <>
            <Modal.Header className="p-4 px-6 truncate">
                Edit Medicine
            </Modal.Header>
            <Modal.Body>
                <div className="bg-backgroundColor flex items-center justify-center overflow-hidden">
                    <div className="w-full p-4 md:w-fit overflow-auto">
                        <h1 className="text-3xl font-bold p-2 mb-4 text-center border-b-2 border-secondaryColor">
                            Update Prescription
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-2xl">{appointment.patientName}</p>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                                <FaClipboardList size={20} />
                                <p className="text-base">{appointment.reason}</p>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <MdDateRange size={20} />
                                <p className="text-base">{new Date(appointment.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="w-full md:w-fit">
                            {rows.map((row) => (
                                <div key={row.medicineId} className="flex flex-col md:flex-row gap-4 mt-4">
                                    <input
                                        type="text"
                                        name="medicineName"
                                        value={row.medicineName}
                                        onChange={(e) => handleChange(row.medicineId, e)}
                                        placeholder="Medicine Name"
                                        list={`medicine-list-${row.medicineId}`}
                                        className="focus:outline-none focus:border focus:border-gray-300 px-4 py-2 border border-secondaryColor rounded focus:ring-2 focus:ring-primaryColor"
                                    />
                                    <datalist id={`medicine-list-${row.medicineId}`}>
                                        {medicineList.map((medicine) => (
                                            <option key={medicine.id} value={medicine.name} />
                                        ))}
                                    </datalist>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={row.quantity}
                                        onChange={(e) => handleChange(row.medicineId, e)}
                                        placeholder="Quantity"
                                        className="focus:outline-none focus:border focus:border-gray-300 px-4 py-2 border border-secondaryColor rounded focus:ring-2 focus:ring-primaryColor"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={row.description}
                                        onChange={(e) => handleChange(row.medicineId, e)}
                                        placeholder="Description"
                                        className="focus:outline-none focus:border focus:border-gray-300 px-4 py-2 border border-secondaryColor rounded focus:ring-2 focus:ring-primaryColor"
                                    />
                                    {rows.length > 1 && (
                                        <button
                                            onClick={() => handleDeleteRow(row.medicineId)}
                                            className=" flex justify-center items-center px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div className="mt-4 flex flex-col items-center w-full sm:flex-row sm:justify-evenly">
                                <button
                                    onClick={handleAddRow}
                                    className="flex justify-center gap-2 text-xs sm:text-sm lg:text-md h-fit w-full sm:w-fit bg-secondaryColor rounded-lg text-whiteColor p-3 hover:bg-primaryColor"
                                >
                                    <MdAdd size={20} />
                                    Add Row
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex gap-2 justify-center text-xs sm:text-sm lg:text-md h-fit  w-full sm:w-fit bg-primaryColor rounded-lg text-whiteColor p-3 hover:bg-darkPrimary mt-2 md:mt-0"
                                >
                                    <MdSave size={20} />
                                    Update
                                </button>
                            </div>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </Modal.Body>
        </>

    );
};

export default UpdatePrescription;
