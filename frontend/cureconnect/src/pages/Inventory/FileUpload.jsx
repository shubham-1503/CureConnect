import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const apiURL = import.meta.env.VITE_API_PATH

function FileUpload({handleRefresh}) {
    let uploadStatus = useRef(null);
    let [uploadedFiles, setUploadedFiles] = useState([]);
    let [rejectedFiles, setRejectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const drop = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        drop.current.addEventListener('dragover', handleDragOver);
        drop.current.addEventListener('drop', handleDrop);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        const { files } = e.dataTransfer;
    
        if (files && files.length) {
            const csvRegex = /\.csv$/i;
            const xlsxRegex = /\.xlsx$/i;
    
            const newUploadedFiles = [];
            const newRejectedFiles = [];
    
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (csvRegex.test(file.name.toLowerCase()) || xlsxRegex.test(file.name.toLowerCase())) {
                    newUploadedFiles.push(file);
                } else {
                    newRejectedFiles.push(file);
                }
            }
    
            setUploadedFiles(prevFiles => [...prevFiles, ...newUploadedFiles]);
            setRejectedFiles(prevRejectedFiles => [...prevRejectedFiles, ...newRejectedFiles]);
        }
    };
    
    
    const handleFileInputChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            setUploadedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            uploadedFiles.forEach(file => {
                formData.append('uploadedFiles', file);
            });
            const response = await axios.post(`${apiURL}/api/v1/inventory/multipleAdd`, formData , {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            });
            uploadStatus.current = response.data.uploadStatus;
            Object.entries(uploadStatus.current).map(([fileName, status]) => {
                if (status) {
                    toast.success(`${fileName} uploaded successfully`);
                }else{
                    toast.error(`${fileName} failed to upload`);
                }
            });
            setRejectedFiles([]);
            setUploadedFiles([]);
            fileInputRef.current.value = null;
            uploadStatus.current.value = null;
            handleRefresh(true);
        } catch (error) {
            toast.error("Failed to upload files");
        }
    }
  return (
    <>
        <input ref={fileInputRef} onChange={handleFileInputChange} className="hidden" id="file-upload" name="file-upload" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <div ref={drop} className="group col-span-full" onClick={handleButtonClick}>
            <div className=" flex justify-center rounded-lg border-2 border-dashed border-secondaryColor px-6 py-10 hover:cursor-pointer group-hover:border-primaryColor transition duration-300 ease-in-out" >
                <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 group-hover:fill-current group-hover:text-primaryColor transition duration-200 ease-in-ou" viewBox="0 0 50 50">
                        <path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"></path>
                    </svg>
                    <div className="mt-4 flex text-sm leading-6">
                        <span className="font-bold text-secondaryColor group-hover:text-primaryColor transition duration-300 ease-in-out">Upload a file<span className="pl-1 text-gray-400">or drag and drop</span></span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            
        </div>
        <div className="flex flex-row-reverse p-4 pr-0">
                <div className="flex-initial pl-3">
                  <button type="button" onClick={handleUpload} className="flex items-center px-5 py-2.5 font-medium tracking-wide text-whiteColor capitalize  bg-primaryColor rounded-md hover:bg-darkPrimary  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z" opacity=".3"></path>
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"></path>
                     </svg>
                     <span className="pl-2 mx-1">Save</span>
                  </button>
               </div>
            </div>
            {uploadedFiles.length > 0 &&
                    uploadedFiles.map((file, index) => (
                <p key={index} className="text-xs font-bold text-secondaryColor my-1 text-right">{file.name} <span className="text-primaryColor font-bold">added!</span></p>
            ))}

            {rejectedFiles.length > 0 &&
                    rejectedFiles.map((file, index) => (
                <p key={index} className="text-xs font-bold text-secondaryColor my-1 text-right">{file.name} <span className="text-red-500 font-bold">rejected!</span></p>
            ))}
        <ToastContainer />
    </>
  )
}

export default FileUpload