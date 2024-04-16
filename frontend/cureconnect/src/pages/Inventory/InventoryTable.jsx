import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import MedicineModal from "./MedicineModal";
import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {deleteMedicine, fetchAllMedicine} from "../../service/inventoryService";

function InventoryTable({ refreshData, setRefreshData }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [openDeleteModal, setDeleteOpenModal] = useState(false);

  const [query, setQuery] = useState("");

  function onCloseModal() {
    setOpenEditModal(false);
  }

  const handleDelete = () => {
    deleteMedicine(editItem.id).then((deleteStatus) => {
      if (deleteStatus) {
        setRefreshData(true);
      }
    });
    setDeleteOpenModal(false);
  };

  useEffect(() => {
    fetchAllMedicine().then((fetchData) => {
      setInventoryData(fetchData.medicineList);
      setRefreshData(false);
    });
  }, [refreshData]);

  useEffect(() => {
    setFilteredItems(inventoryData);
  }, [inventoryData]);

  useEffect(() => {
    setFilteredItems(
      inventoryData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  return (
    <div className="flex flex-col w-full p-12 xl:pl-0">
      <div className="flex flex-col md:flex-row justify-between mb-2">
        <p className="text-secondaryColor text-xl font-bold mb-5 xl:mb-0">
          Inventory
        </p>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-whiteColor dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-whiteColor rounded-lg w-full md:w-80 bg-secondaryColor placeholder:text-whiteColor focus:text-whiteColor focus:outline-none focus:ring-4 focus:ring-primaryColor transition duration-200 ease-in-out"
            placeholder="Search for items"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="max-h-[610px] overflow-hidden overflow-y-auto overflow-x-auto border-2 border-secondaryColor">
        <table className="w-full text-sm text-left rtl:text-right text-secondaryColor xl:table-fixed">
          <thead className="text-sm text-whiteColor uppercase bg-secondaryColor rounded-lg sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Medicine
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Expiry Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr
                  className="group bg-whiteColor border-t-2 border-gray-700 text-wrap hover:bg-primaryColor hover:font-extrabold hover:text=whiteColor hover:cursor-pointer g transition duration-200"
                  key={item.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor"
                  >
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                    {item.expiryDate}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-xs md:text-sm group-hover:text-whiteColor">
                    {item.description}
                  </td>
                  <td className="flex flex-row justify-start px-6 py-4 ">
                    <MdEditSquare
                      onClick={() => {
                        setEditItem(item);
                        setOpenEditModal(true);
                      }}
                      className="text-secondaryColor w-6 h-6 group-hover:text-whiteColor hover:scale-125 transition duration-200 ease-in-out"
                    />
                    <FaTrash
                      className="text-red-600 w-5 h-5 ml-4 hover:scale-125 transition duration-200 ease-in-out"
                      onClick={() => {
                        setDeleteOpenModal(true);
                        setEditItem(item);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-sm md:text-sm text-center font-bold text-secondaryColor"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        show={openEditModal}
        size="lg"
        onClose={onCloseModal}
        popup
      >
        <MedicineModal
          editItem={editItem}
          setEditItem={setEditItem}
          onCloseModal={onCloseModal}
          setRefreshData={setRefreshData}
        />
      </Modal>
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setDeleteOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-secondaryColor " />
            <h3 className="mb-5 text-md font-normal text-secondaryColor ">
              Are you sure you want to delete this Medicine?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-whiteColor font-bold py-2 px-4 rounded hover:scale-105 transition duration-200 ease-in-out"
                onClick={handleDelete}
              >
                {"Yes, I'm sure"}
              </button>
              <button
                className="bg-gray-600 hover:bg-secondaryColor text-whiteColor font-bold py-2 px-4 rounded hover:scale-105 transition duration-200 ease-in-out"
                onClick={() => setDeleteOpenModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default InventoryTable;
