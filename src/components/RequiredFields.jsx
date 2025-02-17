import React from "react";

const RequiredField = ({ label, value, onChange, type = 'text', placeholder = '' }) => {
    return (
      <div className="mb-2 relative">
        <label className="block">
          {label} 
          <span className="text-red-600 absolute">*</span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border rounded px-2 py-1"
          />
        </label>
      </div>
    );
  };
  
export default RequiredField;