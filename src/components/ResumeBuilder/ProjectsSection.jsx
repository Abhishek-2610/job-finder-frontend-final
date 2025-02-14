// src/components/ProjectsSection.js
import React, { useState } from 'react';

function ProjectsSection({ data, setData }) {
  // data is an array of project objects
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    duration: '',
    techStack: '',
    description: '',
  });
  const [errorsAdd, setErrorsAdd] = useState({
    title: '',
    duration: '',
    techStack: '',
    description: '',
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    duration: '',
    techStack: '',
    description: '',
  });
  const [errorsEdit, setErrorsEdit] = useState({
    title: '',
    duration: '',
    techStack: '',
    description: '',
  });

  // Common focus & style classes for inputs and textareas
  const inputClasses =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300";

  // ---------- Add Form Handlers ----------

  // Handle changes for the add form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({ ...projectForm, [name]: value });
    if (value.trim() !== '') {
      setErrorsAdd({ ...errorsAdd, [name]: '' });
    }
  };

  // Validate required field on blur for the add form
  const handleAddBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrorsAdd({ ...errorsAdd, [name]: 'This field is required' });
    } else {
      setErrorsAdd({ ...errorsAdd, [name]: '' });
    }
  };

  // Validate and add a new project
  const handleAddProject = () => {
    let valid = true;
    let newErrors = {};
    Object.keys(projectForm).forEach((field) => {
      if (projectForm[field].trim() === '') {
        newErrors[field] = 'This field is required';
        valid = false;
      } else {
        newErrors[field] = '';
      }
    });
    setErrorsAdd(newErrors);
    if (!valid) return;

    setData([...data, projectForm]);
    setProjectForm({ title: '', duration: '', techStack: '', description: '' });
    setErrorsAdd({ title: '', duration: '', techStack: '', description: '' });
    setShowAddForm(false);
  };

  // Delete a project
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  // ---------- Edit Form Handlers ----------

  // Begin editing a project
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditForm(data[index]);
    setErrorsEdit({ title: '', duration: '', techStack: '', description: '' });
  };

  // Handle changes for the edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
    if (value.trim() !== '') {
      setErrorsEdit({ ...errorsEdit, [name]: '' });
    }
  };

  // Validate required field on blur for the edit form
  const handleEditBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrorsEdit({ ...errorsEdit, [name]: 'This field is required' });
    } else {
      setErrorsEdit({ ...errorsEdit, [name]: '' });
    }
  };

  // Validate and save the edited project
  const handleSaveEdit = () => {
    let valid = true;
    let newErrors = {};
    Object.keys(editForm).forEach((field) => {
      if (editForm[field].trim() === '') {
        newErrors[field] = 'This field is required';
        valid = false;
      } else {
        newErrors[field] = '';
      }
    });
    setErrorsEdit(newErrors);
    if (!valid) return;

    const updatedData = data.map((item, index) =>
      index === editIndex ? editForm : item
    );
    setData(updatedData);
    setEditIndex(null);
    setEditForm({ title: '', duration: '', techStack: '', description: '' });
    setErrorsEdit({ title: '', duration: '', techStack: '', description: '' });
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditForm({ title: '', duration: '', techStack: '', description: '' });
    setErrorsEdit({ title: '', duration: '', techStack: '', description: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
        >
          Add Project
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
              value={projectForm.title}
              onChange={handleChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {errorsAdd.title && (
              <p className="text-red-500 text-sm mt-1">{errorsAdd.title}</p>
            )}
          </div>
          {/* Duration Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Duration: <span className="text-red-500">*</span>
            </label>
            <input
              name="duration"
              value={projectForm.duration}
              onChange={handleChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {errorsAdd.duration && (
              <p className="text-red-500 text-sm mt-1">{errorsAdd.duration}</p>
            )}
          </div>
          {/* Tech Stack Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Tech Stack: <span className="text-red-500">*</span>
            </label>
            <input
              name="techStack"
              value={projectForm.techStack}
              onChange={handleChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {errorsAdd.techStack && (
              <p className="text-red-500 text-sm mt-1">{errorsAdd.techStack}</p>
            )}
          </div>
          {/* Description Field */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Description: <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleChange}
              onBlur={handleAddBlur}
              className={inputClasses}
            />
            {errorsAdd.description && (
              <p className="text-red-500 text-sm mt-1">{errorsAdd.description}</p>
            )}
          </div>
          {/* Form Buttons */}
          <div>
            <button
              onClick={handleAddProject}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Projects */}
      {data.map((project, index) => (
        <div key={index} className="p-4 my-4 border border-green-500 rounded-md">
          {editIndex === index ? (
            <div>
              {/* Edit Title */}
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
                {errorsEdit.title && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.title}</p>
                )}
              </div>
              {/* Edit Duration */}
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
                {errorsEdit.duration && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.duration}</p>
                )}
              </div>
              {/* Edit Tech Stack */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Tech Stack: <span className="text-red-500">*</span>
                </label>
                <input
                  name="techStack"
                  value={editForm.techStack}
                  onChange={handleEditChange}
                  onBlur={handleEditBlur}
                  className={inputClasses}
                />
                {errorsEdit.techStack && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.techStack}</p>
                )}
              </div>
              {/* Edit Description */}
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
                {errorsEdit.description && (
                  <p className="text-red-500 text-sm mt-1">{errorsEdit.description}</p>
                )}
              </div>
              {/* Edit Form Buttons */}
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
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p>
                <strong>Duration:</strong> {project.duration}
              </p>
              <p>
                <strong>Tech Stack:</strong> {project.techStack}
              </p>
              <p>
                <strong>Description:</strong> {project.description}
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

export default ProjectsSection;
