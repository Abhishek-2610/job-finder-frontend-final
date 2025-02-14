// src/components/PreviewResume.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreviewResume = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profileData")) || {};
    const experience = JSON.parse(localStorage.getItem("experienceData")) || [];
    const projects = JSON.parse(localStorage.getItem("projectData")) || [];
    const education = JSON.parse(localStorage.getItem("educationData")) || {};
    const skills = JSON.parse(localStorage.getItem("skillsData")) || {};
    const achievements = JSON.parse(localStorage.getItem("achievementsData")) || [];

    const isComplete =
      profile.name &&
      profile.email &&
      experience.length > 0 &&
      projects.length > 0 &&
      Object.keys(education).length > 0 &&
      Object.keys(skills).length > 0;

    if (!isComplete) {
      navigate("/resume-builder");
    } else {
      setResumeData({ profile, experience, projects, education, skills, achievements });
    }
  }, [navigate]);

  if (!resumeData) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading your resume...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center mb-6">Resume Preview</h2>

      {/* Profile Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold border-b pb-2 mb-3">Profile</h3>
        <p><strong>Name:</strong> {resumeData.profile.name}</p>
        <p><strong>Email:</strong> {resumeData.profile.email}</p>
        <p><strong>LinkedIn:</strong> {resumeData.profile.linkedin}</p>
        <p><strong>GitHub:</strong> {resumeData.profile.github}</p>
      </div>

      {/* Edit Button */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/resume-builder")}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Edit Resume
        </button>
        <button
          onClick={() => alert("PDF Download feature coming soon!")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PreviewResume;
