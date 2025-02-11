// src/components/AchievementsSection.js
import React, { useState } from 'react';

function AchievementsSection({ data, setData }) {
  const [newAchievement, setNewAchievement] = useState('');
  const [error, setError] = useState('');

  const addAchievement = () => {
    if (newAchievement.trim() === '') {
      setError("This field is required");
      return;
    }
    setData([...data, newAchievement.trim()]);
    setNewAchievement('');
    setError('');
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    const updatedAchievement = prompt('Edit achievement', data[index]);
    if (updatedAchievement !== null && updatedAchievement.trim() !== '') {
      const updatedData = data.map((item, i) =>
        i === index ? updatedAchievement.trim() : item
      );
      setData(updatedData);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      
      {/* Add Achievement Form */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Achievement: <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={newAchievement}
          onChange={(e) => {
            setNewAchievement(e.target.value);
            if (e.target.value.trim() !== '') {
              setError('');
            }
          }}
          onBlur={(e) => {
            if (e.target.value.trim() === '') {
              setError("This field is required");
            }
          }}
          placeholder="Enter achievement"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <div>
        <button
          onClick={addAchievement}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
        >
          Add Achievement
        </button>
      </div>
      
      {/* Achievements List */}
      <ul className="mt-4 space-y-2">
        {data.map((achievement, index) => (
          <li
            key={index}
            className="p-2 border border-green-500 rounded-md flex justify-between items-center"
          >
            <span>{achievement}</span>
            <div>
              <button
                onClick={() => handleEdit(index)}
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievementsSection;
