// src/components/EducationSection.js
import React, { useState } from 'react';

function EducationSection({ data, setData }) {
  // Local state to track editing mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    institution: data.institution || '',
    duration: data.duration || '',
    location: data.location || '',
    cgpa: data.cgpa || '',
  });
  const [errors, setErrors] = useState({
    institution: '',
    duration: '',
    location: '',
    cgpa: '',
  });

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message if value is not empty
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate on blur: if field is empty, set error message
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, [name]: 'This field is required' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Save changes if all fields are valid
  const handleSave = () => {
    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === '') {
        newErrors[key] = 'This field is required';
        valid = false;
      } else {
        newErrors[key] = '';
      }
    });
    setErrors(newErrors);
    if (!valid) return;

    // Save the data and exit edit mode
    setData(formData);
    setIsEditing(false);
  };

  // Enter edit mode and populate form data with current values
  const handleEdit = () => {
    setFormData({
      institution: data.institution || '',
      duration: data.duration || '',
      location: data.location || '',
      cgpa: data.cgpa || '',
    });
    setErrors({
      institution: '',
      duration: '',
      location: '',
      cgpa: '',
    });
    setIsEditing(true);
  };

  // Cancel editing and revert to read-only mode
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {isEditing ? (
        <div className="space-y-4">
          {/* Institution Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Institution: <span className="text-red-500">*</span>
            </label>
            <input
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.institution
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.institution && (
              <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
            )}
          </div>

          {/* Duration Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Duration: <span className="text-red-500">*</span>
            </label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.duration
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Location Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Location: <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.location
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* CGPA Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              CGPA: <span className="text-red-500">*</span>
            </label>
            <input
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.cgpa
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            {errors.cgpa && (
              <p className="text-red-500 text-sm mt-1">{errors.cgpa}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Display read-only data */}
          <div className="mb-4">
            <p>
              <strong>Institution:</strong> {data.institution || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Duration:</strong> {data.duration || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Location:</strong> {data.location || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>CGPA:</strong> {data.cgpa || 'N/A'}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationSection;
