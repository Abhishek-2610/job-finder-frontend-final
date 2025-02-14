// src/components/ResumeBuilder.js
import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import AchievementsSection from "./AchievementsSection";

const sections = ["profile", "experience", "projects", "education", "skills", "achievements"];

function ResumeBuilder() {
  const [selectedSection, setSelectedSection] = useState("profile");

  // ✅ Load data from localStorage when the component mounts
  const getStoredData = (key, defaultValue) => {
    const storedData = JSON.parse(localStorage.getItem(key));
    return storedData !== null ? storedData : defaultValue;
  };

  const [profileData, setProfileData] = useState(() => getStoredData("profileData", {}));
  const [experienceData, setExperienceData] = useState(() => getStoredData("experienceData", []));
  const [projectData, setProjectData] = useState(() => getStoredData("projectData", []));
  const [educationData, setEducationData] = useState(() => getStoredData("educationData", {}));
  const [skillsData, setSkillsData] = useState(() => getStoredData("skillsData", {}));
  const [achievementsData, setAchievementsData] = useState(() => getStoredData("achievementsData", []));

  // ✅ Save changes to localStorage whenever state updates
  useEffect(() => localStorage.setItem("profileData", JSON.stringify(profileData)), [profileData]);
  useEffect(() => localStorage.setItem("experienceData", JSON.stringify(experienceData)), [experienceData]);
  useEffect(() => localStorage.setItem("projectData", JSON.stringify(projectData)), [projectData]);
  useEffect(() => localStorage.setItem("educationData", JSON.stringify(educationData)), [educationData]);
  useEffect(() => localStorage.setItem("skillsData", JSON.stringify(skillsData)), [skillsData]);
  useEffect(() => localStorage.setItem("achievementsData", JSON.stringify(achievementsData)), [achievementsData]);

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-52 bg-gray-200 p-4">
        {sections.map((section) => (
          <div
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`p-2 my-1 cursor-pointer rounded-md transition-all duration-300 ${
              selectedSection === section ? "bg-gray-300 font-bold" : "bg-transparent"
            } hover:bg-gray-300 hover:font-semibold`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedSection === "profile" && <ProfileSection data={profileData} setData={setProfileData} />}
        {selectedSection === "experience" && <ExperienceSection data={experienceData} setData={setExperienceData} />}
        {selectedSection === "projects" && <ProjectsSection data={projectData} setData={setProjectData} />}
        {selectedSection === "education" && <EducationSection data={educationData} setData={setEducationData} />}
        {selectedSection === "skills" && <SkillsSection data={skillsData} setData={setSkillsData} />}
        {selectedSection === "achievements" && <AchievementsSection data={achievementsData} setData={setAchievementsData} />}
      </div>
    </div>
  );
}

export default ResumeBuilder;
