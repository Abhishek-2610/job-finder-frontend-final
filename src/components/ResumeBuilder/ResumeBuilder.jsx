// src/components/ResumeBuilder.js
import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import AchievementsSection from './AchievementsSection';

const sections = [
  'profile',
  'experience',
  'projects',
  'education',
  'skills',
  'achievements',
];

function ResumeBuilder() {
  const [selectedSection, setSelectedSection] = useState('profile');

  // Lifted state for each section:
  const [profileData, setProfileData] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [educationData, setEducationData] = useState({});
  const [skillsData, setSkillsData] = useState({});
  const [achievementsData, setAchievementsData] = useState([]);

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-52 bg-gray-200 p-4">
        {sections.map((section) => (
          <div
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`p-2 my-1 cursor-pointer rounded-md transition-all duration-300 
              ${selectedSection === section ? 'bg-gray-300 font-bold' : 'bg-transparent'} 
              hover:bg-gray-300 hover:font-semibold`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedSection === 'profile' && (
          <ProfileSection data={profileData} setData={setProfileData} />
        )}
        {selectedSection === 'experience' && (
          <ExperienceSection data={experienceData} setData={setExperienceData} />
        )}
        {selectedSection === 'projects' && (
          <ProjectsSection data={projectData} setData={setProjectData} />
        )}
        {selectedSection === 'education' && (
          <EducationSection data={educationData} setData={setEducationData} />
        )}
        {selectedSection === 'skills' && (
          <SkillsSection data={skillsData} setData={setSkillsData} />
        )}
        {selectedSection === 'achievements' && (
          <AchievementsSection data={achievementsData} setData={setAchievementsData} />
        )}
      </div>
    </div>
  );
}

export default ResumeBuilder;
