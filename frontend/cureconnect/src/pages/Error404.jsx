import React from "react";

function Error404() {
  return (
    <>
      <div className="bg-primaryColor h-screen">
        <div className="flex flex-col h-full items-center justify-center">
          <div className="text-9xl font-black text-secondaryColor mb-5">
            404
          </div>
          <div className="text-4xl font-semibold text-secondaryColor">
            Page not Found
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;