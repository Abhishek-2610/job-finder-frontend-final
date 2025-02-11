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

  // For editing a card:
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    employee: '',
    duration: '',
    description: '',
  });

  const handleChange = (e) => {
    setExperienceForm({ ...experienceForm, [e.target.name]: e.target.value });
  };

  const handleAddExperience = () => {
    if (experienceForm.title.trim() === '') return;
    setData([...data, experienceForm]);
    setExperienceForm({ title: '', employee: '', duration: '', description: '' });
    setShowAddForm(false);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditForm(data[index]);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item, index) =>
      index === editIndex ? editForm : item
    );
    setData(updatedData);
    setEditIndex(null);
    setEditForm({ title: '', employee: '', duration: '', description: '' });
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditForm({ title: '', employee: '', duration: '', description: '' });
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
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title:</label>
            <input
              name="title"
              value={experienceForm.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Employee:</label>
            <input
              name="employee"
              value={experienceForm.employee}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Duration:</label>
            <input
              name="duration"
              value={experienceForm.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              name="description"
              value={experienceForm.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
          </div>
          <div>
            <button
              onClick={handleAddExperience}
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

      {data.map((exp, index) => (
        <div
          key={index}
          className="p-4 my-4 border border-blue-500 rounded-md"
        >
          {editIndex === index ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Title:</label>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Employee:</label>
                <input
                  name="employee"
                  value={editForm.employee}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Duration:</label>
                <input
                  name="duration"
                  value={editForm.duration}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Description:</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
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
