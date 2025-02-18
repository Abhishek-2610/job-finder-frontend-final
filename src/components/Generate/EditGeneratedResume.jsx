import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { decryptData } from '../../utils/crypto';
import CustomDialog from '../customDialog';

const EditGeneratedResume = () => {
  const location = useLocation();
  const { payload } = location.state;
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const userId = useSelector(state => decryptData(state.user.userId));

  // Initial State
  const [resumeData, setResumeData] = useState({
    ...payload,
    // Add a user_prompt field if it doesn't exist
    user_prompt: payload.user_prompt || ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

 
  const steps = [
    { title: 'Personal Details', key: 'user_details' },
    { title: 'Education', key: 'education' },
    { title: 'Projects', key: 'PROJECTS' },
    { title: 'Experience', key: 'EXPERIENCE' },
    { title: 'Skills', key: 'skills' },
    { title: 'Achievements', key: 'achievements' },
    { title: 'User Prompt', key: 'user_prompt' }, 
  ];

  

  // 1. User Details
  const handleUserDetailsChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      user_details: {
        ...prev.user_details,
        [field]: value
      }
    }));
  };

  // 2. Education
  const handleEducationChange = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, idx) =>
        idx === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  // 3. Projects / Experience (stored in Resume.PROJECTS and Resume.EXPERIENCE)
  const handleResumeChange = (section, index, value) => {
    setResumeData(prev => ({
      ...prev,
      Resume: {
        ...prev.Resume,
        [section]: prev.Resume[section].map((item, idx) =>
          idx === index ? value : item
        )
      }
    }));
  };

  // 4. Skills
  const handleSkillsChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [field]: value
      }
    }));
  };

  // 5. Achievements
  const handleAchievementChange = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map((achievement, idx) =>
        idx === index ? value : achievement
      )
    }));
  };

  // 6. User Prompt
  const handleUserPromptChange = (value) => {
    setResumeData(prev => ({
      ...prev,
      user_prompt: value
    }));
  };



  const handleAddItem = (section) => {
    if (section === 'education') {
      setResumeData(prev => ({
        ...prev,
        education: [
          ...prev.education,
          { Institution: '', Grade: '', Duration: '', Location: '' }
        ]
      }));
    } else if (section === 'PROJECTS' || section === 'EXPERIENCE') {
      setResumeData(prev => ({
        ...prev,
        Resume: {
          ...prev.Resume,
          [section]: [...prev.Resume[section], '']
        }
      }));
    } else if (section === 'achievements') {
      setResumeData(prev => ({
        ...prev,
        achievements: [...prev.achievements, '']
      }));
    }
  };

  const handleRemoveItem = (section, index) => {
    if (section === 'education') {
      setResumeData(prev => ({
        ...prev,
        education: prev.education.filter((_, idx) => idx !== index)
      }));
    } else if (section === 'PROJECTS' || section === 'EXPERIENCE') {
      setResumeData(prev => ({
        ...prev,
        Resume: {
          ...prev.Resume,
          [section]: prev.Resume[section].filter((_, idx) => idx !== index)
        }
      }));
    } else if (section === 'achievements') {
      setResumeData(prev => ({
        ...prev,
        achievements: prev.achievements.filter((_, idx) => idx !== index)
      }));
    }
  };

  

  const handleSave = async () => {
    setIsLoading(true);

   
    const userPrompt = resumeData.user_prompt
      ? resumeData.user_prompt
      : 'No prompt provided by user';

    try {
      const response = await axios.post(
        `${publicIp}/editResume`,
        {
          resume: resumeData,
          template: payload.template,
          user_prompt: userPrompt,
          user_id: userId
        },
        {
          responseType: 'blob'
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setPdfBlobUrl(url);
      } else {
        setErrorMessage('Failed to save the edited resume.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

 

  const renderStepContent = () => {
    const currentSection = steps[currentStep];

    switch (currentSection.key) {
      case 'user_details':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {Object.entries(resumeData.user_details).map(([field, value]) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium mb-1">{field}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleUserDetailsChange(field, e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter your ${field.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Education</h2>
              <button
                onClick={() => handleAddItem('education')}
                className="px-3 py-1 bg-[#5f27c7] text-white rounded hover:bg-[#9167e1]"
              >
                Add {currentSection.title}
              </button>
            </div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => handleRemoveItem('education', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {Object.entries(edu).map(([field, value]) => (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-1">{field}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleEducationChange(index, field, e.target.value)
                      }
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'PROJECTS':
      case 'EXPERIENCE':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{currentSection.title}</h2>
              <button
                onClick={() => handleAddItem(currentSection.key)}
                className="px-3 py-1 bg-[#5f27c7] text-white rounded hover:bg-[#9167e1]"
              >
                Add {currentSection.title}
              </button>
            </div>
            {resumeData.Resume[currentSection.key].map((item, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={item}
                  onChange={(e) =>
                    handleResumeChange(currentSection.key, index, e.target.value)
                  }
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
                <button
                  onClick={() => handleRemoveItem(currentSection.key, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            {Object.entries(resumeData.skills).map(([field, value]) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium mb-1">{field}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSkillsChange(field, e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <button
                onClick={() => handleAddItem('achievements')}
                className="px-3 py-1 bg-[#5f27c7] text-white rounded hover:bg-[#9167e1]"
              >
                Add Achievement
              </button>
            </div>
            {resumeData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="2"
                />
                <button
                  onClick={() => handleRemoveItem('achievements', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        );

      // NEW CASE: 'user_prompt'
      case 'user_prompt':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Custom Prompt</h2>
            <p className="text-sm text-gray-600">
              Provide a custom prompt for generating your resume. (Optional)
            </p>
            <input
              type="text"
              value={resumeData.user_prompt}
              onChange={(e) => handleUserPromptChange(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your custom prompt"
            />
          </div>
        );

      default:
        return null;
    }
  };

  // -------------- JSX Rendering --------------

  return (
    <div className="flex gap-5 p-3 m-0 bg-customGrey">
      {/* Left Side - Multi-step Form */}
      <div className="flex flex-col gap-5 h-screen w-1/2 bg-white rounded-xl p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Resume</h1>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-[#5f27c7] h-2.5 rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Form Content */}
        <div className="flex-grow overflow-auto">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Back
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#5f27c7] text-white rounded hover:bg-[#9167e1]"
            >
              Regenerate
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-4 py-2 bg-[#5f27c7] text-white rounded hover:bg-[#9167e1]"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Right Side - PDF Preview */}
      <div className="flex-column gap-5 h-screen w-1/2 bg-white rounded-xl">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex-column h-full">
              <iframe
                src="https://tenor.com/embed/20423219"
                width="100%"
                height="70%"
                frameBorder="0"
                allowFullScreen
                title="Loading..."
              ></iframe>
              <p className="p-5 font-bold text-[18px]">
                Your resume is being regenerated...
              </p>
            </div>
          </div>
        ) : pdfBlobUrl ? (
          <iframe
            src={pdfBlobUrl}
            width="100%"
            height="100%"
            title="Resume Preview"
            className="rounded-xl"
          />
        ) : (
          <p className="text-center p-10 text-[20px] font-bold">
            No resume generated yet.
          </p>
        )}
      </div>

      {/* Error Dialog */}
      {errorMessage && (
        <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />
      )}
    </div>
  );
};

export default EditGeneratedResume;
