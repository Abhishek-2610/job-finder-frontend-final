import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const CustomDialog = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
            <FaTimesCircle className="text-red-600 text-6xl mb-4 mx-auto"/>
            <p className="text-gray-800 text-lg mb-4">{message}</p>
            <button 
            className="px-6 py-2 rounded-lg bg-[#5F27C7] text-white hover:bg-[#4b1f9d] transition duration-300"
            onClick={onClose}
            >
                Close
            </button>
            </div>
        </div>
    );
};

export default CustomDialog;