import React from 'react'

function DeleteAppointmentModal({handleDeleteDialog,handleDeleteSlot}) {
    return (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-backgroundColor text-left shadow-xl transition-all sm:my-8 w-full mx-2 md:w-fit">
                <div className="bg-backgroundColor">
                  <h3
                    className="text-base font-semibold leading-6 text-white p-4 text-start bg-secondaryColor border-secondaryColor"
                    id="modal-title"
                  >
                    Delete Appointment Slot
                  </h3>
                  <div className="sm:flex sm:items-start">
                    <div className="p-4">
                      Are you sure you want to delete this slot?
                    </div>
                  </div>
                </div>
                <div className="bg-backgroundColor px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-secondaryColor">
                  <button
                    type="button"
                    onClick={handleDeleteSlot}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800  sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteDialog}
                    className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-gray-500 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default DeleteAppointmentModal