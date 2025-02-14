// src/components/ExperienceSection.js
import React, { useState } from 'react';

function ExperienceSection({ data, setData }) {
  // data is an array of experience objects
  const [showAddForm, setShowAddForm] = useState(false);
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    employee: '',
    duration: '',
    description: '',
  });
  const [experienceErrors, setExperienceErrors] = useState({
    title: '',
    employee: '',
    duration: '',
    description: '',
  });

  // For editing a card:
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    employee: '',
    duration: '',
    description: '',
  });
  const [editErrors, setEditErrors] = useState({
    title: '',
    employee: '',
    duration: '',
    description: '',
  });

  // Common input classes for consistent styling and focus highlight
  const inputClasses =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 transition-all duration-300";

  // ----- Add Form Handlers -----
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm({ ...experienceForm, [name]: value });
    if (value.trim() !== '') {
      setExperienceErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setExperienceErrors(prev => ({ ...prev, [name]: 'This field is required' }));
    } else {
      setExperienceErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddExperience = () => {
    let valid = true;
    const newErrors = {};
    Object.keys(experienceForm).forEach((field) => {
      if (experienceForm[field].trim() === '') {
        newErrors[field] = 'This field is required';
        valid = false;
      } else {
        newErrors[field] = '';
      }
    });
    setExperienceErrors(newErrors);
    if (!valid) return;

    setData([...data, experienceForm]);
    setExperienceForm({ title: '', employee: '', duration: '', description: '' });
    setExperienceErrors({ title: '', employee: '', duration: '', description: '' });
    setShowAddForm(false);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // ----- Edit Form Handlers -----
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditForm(data[index]);
    setEditErrors({ title: '', employee: '', duration: '', description: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
    if (value.trim() !== '') {
      setEditErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setEditErrors(prev => ({ ...prev, [name]: 'This field is required' }));
    } else {
      setEditErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSaveEdit = () => {
    let valid = true;
    const newEditErrors = {};
    Object.keys(editForm).forEach((field) => {
      if (editForm[field].trim() === '') {
        newEditErrors[field] = 'This field is required';
        valid = false;
      } else {
        newEditErrors[field] = '';
      }
    });
    setEditErrors(newEditErrors);
    if (!valid) return;

    const updatedData = data.map((item, index) =>
      index === editIndex ? editForm : item
    );
    setData(updatedData);
    setEditIndex(null);
    setEditForm({ title: '', employee: '', duration: '', description: '' });
    setEditErrors({ title: '', employee: '', duration: '', description: '' });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditForm({ title: '', employee: '', duration: '', description: '' });
    setEditErrors({ title: '', employee: '', duration: '', description: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
        >
          Add Experience
        </button>
      )}

      {showAddForm && (
        <div className="my-4 p-4 border border-gray-300 rounded-md">
          {/* Title Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Title: <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={experienceForm.title}
              onChange={handleAddChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {experienceErrors.title && (
              <p className="text-red-500 text-sm mt-1">{experienceErrors.title}</p>
            )}
          </div>
          {/* Employee Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Employee: <span className="text-red-500">*</span>
            </label>
            <input
              name="employee"
              value={experienceForm.employee}
              onChange={handleAddChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {experienceErrors.employee && (
              <p className="text-red-500 text-sm mt-1">{experienceErrors.employee}</p>
            )}
          </div>
          {/* Duration Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Duration: <span className="text-red-500">*</span>
            </label>
            <input
              name="duration"
              value={experienceForm.duration}
              onChange={handleAddChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {experienceErrors.duration && (
              <p className="text-red-500 text-sm mt-1">{experienceErrors.duration}</p>
            )}
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Description: <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={experienceForm.description}
              onChange={handleAddChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {experienceErrors.description && (
              <p className="text-red-500 text-sm mt-1">{experienceErrors.description}</p>
            )}
          </div>
          <div>
            <button
              onClick={handleAddExperience}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setExperienceForm({ title: '', employee: '', duration: '', description: '' });
                setExperienceErrors({ title: '', employee: '', duration: '', description: '' });
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {data.map((exp, index) => (
        <div key={index} className="p-4 my-4 border border-blue-500 rounded-md">
          {editIndex === index ? (
            <div>
              {/* Edit Mode - Title */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Title: <span className="text-red-500">*</span>
                </label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  onBlur={handleEditBlur}
                  className={inputClasses}
                />
                {editErrors.title && (
                  <p className="text-red-500 text-sm mt-1">{editErrors.title}</p>
                )}
              </div>
              {/* Edit Mode - Employee */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Employee: <span className="text-red-500">*</span>
                </label>
                <input
                  name="employee"
                  value={editForm.employee}
                  onChange={handleEditChange}
                  onBlur={handleEditBlur}
                  className={inputClasses}
                />
                {editErrors.employee && (
                  <p className="text-red-500 text-sm mt-1">{editErrors.employee}</p>
                )}
              </div>
              {/* Edit Mode - Duration */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Duration: <span className="text-red-500">*</span>
                </label>
                <input
                  name="duration"
                  value={editForm.duration}
                  onChange={handleEditChange}
                  onBlur={handleEditBlur}
                  className={inputClasses}
                />
                {editErrors.duration && (
                  <p className="text-red-500 text-sm mt-1">{editErrors.duration}</p>
                )}
              </div>
              {/* Edit Mode - Description */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Description: <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  onBlur={handleEditBlur}
                  className={inputClasses}
                />
                {editErrors.description && (
                  <p className="text-red-500 text-sm mt-1">{editErrors.description}</p>
                )}
              </div>
              <div>
                <button
                  onClick={handleSaveEdit}
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-lg font-semibold">{exp.title}</h4>
              <p>
                <strong>Employee:</strong> {exp.employee}
              </p>
              <p>
                <strong>Duration:</strong> {exp.duration}
              </p>
              <p>
                <strong>Description:</strong> {exp.description}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => handleEditClick(index)}
                  className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperienceSection;
