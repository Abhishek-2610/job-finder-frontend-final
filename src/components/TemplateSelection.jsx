// src/components/TemplateSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    // Save the selected template (e.g., in localStorage or context)
    localStorage.setItem('selectedTemplate', templateId);
    // Then navigate to a preview or application page as needed
    navigate('/preview-resume');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Example Template Cards */}
        <div
          onClick={() => handleTemplateSelect('template1')}
          className="border p-4 rounded-md cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <h3 className="font-bold mb-2">Template 1</h3>
          <p>Clean and Professional</p>
        </div>
        <div
          onClick={() => handleTemplateSelect('template2')}
          className="border p-4 rounded-md cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <h3 className="font-bold mb-2">Template 2</h3>
          <p>Modern and Creative</p>
        </div>
        <div
          onClick={() => handleTemplateSelect('template3')}
          className="border p-4 rounded-md cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <h3 className="font-bold mb-2">Template 3</h3>
          <p>Simple and Elegant</p>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
