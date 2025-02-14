// src/components/SkillsSection.js
import React, { useState } from 'react';

function SkillsSection({ data, setData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    languages: data.languages || '',
    framework: data.framework || '',
    courses: data.courses || '',
    certification: data.certification || '',
  });
  const [errors, setErrors] = useState({
    languages: '',
    framework: '',
    courses: '',
    certification: '',
  });

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate input on blur; if empty, display an error message
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, [name]: 'This field is required' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Switch to edit mode; populate form data with current data
  const handleEdit = () => {
    setFormData({
      languages: data.languages || '',
      framework: data.framework || '',
      courses: data.courses || '',
      certification: data.certification || '',
    });
    setErrors({
      languages: '',
      framework: '',
      courses: '',
      certification: '',
    });
    setIsEditing(true);
  };

  // Validate and save form data if all fields are filled
  const handleSave = () => {
    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field].trim() === '') {
        newErrors[field] = 'This field is required';
        valid = false;
      } else {
        newErrors[field] = '';
      }
    });
    setErrors(newErrors);
    if (!valid) return;
    setData(formData);
    setIsEditing(false);
  };

  // Cancel editing without saving
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {isEditing ? (
        <div className="space-y-4">
          {/* Languages Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Languages: <span className="text-red-500">*</span>
            </label>
            <input
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.languages
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50'
              }`}
            />
            {errors.languages && (
              <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
            )}
          </div>

          {/* Framework Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Framework: <span className="text-red-500">*</span>
            </label>
            <input
              name="framework"
              value={formData.framework}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.framework
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50'
              }`}
            />
            {errors.framework && (
              <p className="text-red-500 text-sm mt-1">{errors.framework}</p>
            )}
          </div>

          {/* Courses Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Courses: <span className="text-red-500">*</span>
            </label>
            <input
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.courses
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50'
              }`}
            />
            {errors.courses && (
              <p className="text-red-500 text-sm mt-1">{errors.courses}</p>
            )}
          </div>

          {/* Certification Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Certification: <span className="text-red-500">*</span>
            </label>
            <input
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.certification
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50'
              }`}
            />
            {errors.certification && (
              <p className="text-red-500 text-sm mt-1">{errors.certification}</p>
            )}
          </div>

          {/* Save/Cancel Buttons */}
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
        // Read-Only Display
        <div className="space-y-4">
          <div className="mb-4">
            <p>
              <strong>Languages:</strong> {data.languages || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Framework:</strong> {data.framework || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Courses:</strong> {data.courses || 'N/A'}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>Certification:</strong> {data.certification || 'N/A'}
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

export default SkillsSection;
