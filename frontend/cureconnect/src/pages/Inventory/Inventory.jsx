import React, { useState } from "react";
import AdminNavbar from "../../Components/AdminNavbar";
import AdminFooter from "../../Components/AdminFooter";
import InventoryTable from "./InventoryTable";
import UpdateInventory from "./UpdateInventory";

function Inventory() {

    const [refreshData, setRefreshData] = useState(false);

    return(
    <>
    <AdminNavbar location={"inventory"}/>
    <div className="flex flex-col xl:flex-row w-full mx-auto bg-backgroundColor min-h-screen">
        <div className="flex flex-col w-full h-full basis-4/12 grow-0 shrink-0">
            <UpdateInventory handleRefresh={setRefreshData} />
        </div>
        <div className="flex w-full h-full basis-8/12 grow-0 shrink-0">
            <InventoryTable refreshData={refreshData} setRefreshData={setRefreshData} />
        </div>
    </div>
    <AdminFooter />
    </>
    );
}

export default Inventory;