import React, { useState } from "react";
import FileUpload from "./FileUpload";
import MedicineForm from "./MedicineForm";
import { Tooltip } from "flowbite-react";

function UpdateInventory({handleRefresh}) {
  let [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-between pl-12 pt-12 pr-12">
        <p className="text-secondaryColor text-xl font-bold mb-5">
          Update Inventory
        </p>
        <Tooltip content="Toggle between form and CSV">
            <label className="inline-flex items-center cursor-pointer pl-12">
            <input
                type="checkbox"
                value={toggle}
                onChange={() => setToggle(!toggle)}
                className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-secondaryColor peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primaryColor rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primaryColor after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-whiteColor after:border-whiteColor after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primaryColor"></div>
            <span className="ms-3 text-sm font-medium text-secondaryColor">
                {toggle ? `Form` : `CSV`}
            </span>
            </label>
        </Tooltip>
      </div>
      <div className="[perspective:1000px]">
        <div className="relative">
          <div className="flex flex-col w-full pl-12 xl:file:pb-12 pr-12">
            {!toggle && <MedicineForm handleRefresh={handleRefresh} />}
            {toggle && <FileUpload handleRefresh={handleRefresh} />}
          </div>
        </div>
        
        
      </div>
    </>
  );
}

export default UpdateInventory;
