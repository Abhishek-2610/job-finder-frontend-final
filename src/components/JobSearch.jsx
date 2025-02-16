// src/components/JobSearch.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Define the job data array
const jobData = [
  { company_name: "Google", company_logo: "https://logo.google.com", description: "As a Frontend Developer, you will develop scalable web applications and create seamless user experiences.", role: "Frontend Developer", location: "Bengaluru" },
  { company_name: "Microsoft", company_logo: "https://logo.microsoft.com", description: "Join us as a Backend Developer to build robust backend systems and ensure high-performance infrastructure.", role: "Backend Developer", location: "Noida" },
  { company_name: "Amazon", company_logo: "https://logo.amazon.com", description: "Be a part of Amazon's creative team and design intuitive UI/UX solutions that enhance user engagement.", role: "UI/UX Designer", location: "Delhi" },
  { company_name: "Meta", company_logo: "https://logo.meta.com", description: "Work on developing AI models and innovative solutions that power the next generation of Meta's technologies.", role: "AI Engineer", location: "Gurgaon" },
  { company_name: "Flipkart", company_logo: "https://logo.flipkart.com", description: "Analyze e-commerce trends and generate actionable insights to enhance customer experience and business growth.", role: "Data Analyst", location: "Bengaluru" },
  { company_name: "Paytm", company_logo: "https://logo.paytm.com", description: "Join us as a Frontend Developer to create and optimize seamless payment gateway interfaces for millions of users.", role: "Frontend Developer", location: "Noida" },
  { company_name: "Swiggy", company_logo: "https://logo.swiggy.com", description: "Manage backend systems to ensure a smooth and scalable food delivery platform for Swiggy users.", role: "Backend Developer", location: "Pune" },
  { company_name: "Zomato", company_logo: "https://logo.zomato.com", description: "Enhance the restaurant search UI to create a user-friendly and visually appealing interface.", role: "UI/UX Designer", location: "Delhi" },
  { company_name: "Ola", company_logo: "https://logo.ola.com", description: "Build AI-based route optimization models to improve transportation efficiency for millions of Ola users.", role: "AI Engineer", location: "Bengaluru" },
  { company_name: "Uber", company_logo: "https://logo.uber.com", description: "Optimize ride pricing algorithms and analyze large datasets to improve user satisfaction and revenue.", role: "Data Analyst", location: "Gurgaon" },
  { company_name: "Adobe", company_logo: "https://logo.adobe.com", description: "Design creative and innovative software solutions that empower millions of users globally.", role: "UI/UX Designer", location: "Noida" },
  { company_name: "Salesforce", company_logo: "https://logo.salesforce.com", description: "Build and maintain cloud-based CRM systems that help businesses manage their operations efficiently.", role: "Backend Developer", location: "Pune" },
  { company_name: "Infosys", company_logo: "https://logo.infosys.com", description: "Develop enterprise software solutions and deliver innovative applications to meet client needs.", role: "Frontend Developer", location: "Bengaluru" },
  { company_name: "TCS", company_logo: "https://logo.tcs.com", description: "Handle large-scale software projects and contribute to developing high-quality digital solutions.", role: "Frontend Developer", location: "Delhi" },
  { company_name: "Wipro", company_logo: "https://logo.wipro.com", description: "Provide IT services and consulting while designing impactful UI/UX solutions for enterprise clients.", role: "UI/UX Designer", location: "Chennai" },
  { company_name: "HCL", company_logo: "https://logo.hcl.com", description: "Develop cloud-based applications that help clients transition to a scalable cloud infrastructure.", role: "Cloud Engineer", location: "Delhi" },
  { company_name: "Capgemini", company_logo: "https://logo.capgemini.com", description: "Deliver software consulting services and develop customized solutions for enterprise clients.", role: "Software Consultant", location: "Bengaluru" },
  { company_name: "Accenture", company_logo: "https://logo.accenture.com", description: "As a Full Stack Developer, provide technology solutions and develop end-to-end software products.", role: "Full Stack Developer", location: "Pune" },
  { company_name: "Cognizant", company_logo: "https://logo.cognizant.com", description: "Develop enterprise software solutions and work on advanced development projects for global clients.", role: "Frontend Developer", location: "Kolkata" },
  { company_name: "Deloitte", company_logo: "https://logo.deloitte.com", description: "Offer technology advisory services and develop high-quality full-stack applications for clients.", role: "Full Stack Developer", location: "Pune" },
  { company_name: "IBM", company_logo: "https://logo.ibm.com", description: "Develop AI-powered solutions that address business challenges and drive innovation.", role: "AI Engineer", location: "Bengaluru" },
  { company_name: "Tech Mahindra", company_logo: "https://logo.techmahindra.com", description: "Handle telecom software projects and contribute to building advanced software solutions.", role: "Frontend Developer", location: "Delhi" },
  { company_name: "SAP Labs", company_logo: "https://logo.sap.com", description: "Develop enterprise resource planning solutions to streamline business operations.", role: "Backend Developer", location: "Gurgaon" },
  { company_name: "Oracle", company_logo: "https://logo.oracle.com", description: "Build and maintain database-driven applications to support enterprise clients.", role: "Database Engineer", location: "Noida" },
  { company_name: "Zoho", company_logo: "https://logo.zoho.com", description: "Develop SaaS products that empower businesses to manage their operations more effectively.", role: "Full Stack Developer", location: "Chennai" },
  { company_name: "Mindtree", company_logo: "https://logo.mindtree.com", description: "Work on digital transformation projects and develop innovative backend systems.", role: "Backend Developer", location: "Pune" },
  { company_name: "LTIMindtree", company_logo: "https://logo.ltimindtree.com", description: "Manage complex IT systems and deliver impactful solutions for enterprise clients.", role: "IT Architect", location: "Pune" },
  { company_name: "Persistent Systems", company_logo: "https://logo.persistent.com", description: "Deliver backend development solutions and develop user-friendly frontend interfaces.", role: "Frontend Developer", location: "Bengaluru" },
  { company_name: "Hexaware", company_logo: "https://logo.hexaware.com", description: "Implement cloud technologies and design scalable cloud-based solutions.", role: "Cloud Developer", location: "Delhi" },
  { company_name: "Freshworks", company_logo: "https://logo.freshworks.com", description: "Develop customer engagement solutions that improve user experiences across digital platforms.", role: "Frontend Developer", location: "Chennai" }
];

// ✅ Fix: Extract unique job roles & locations inside the component
const jobRoles = [...new Set(jobData.map((job) => job.role))];
const jobLocations = [...new Set(jobData.map((job) => job.location))];

// Job Card Component
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = async () => {
    const serverIP = import.meta.env.VITE_SERVER_IP;
    const profile = JSON.parse(localStorage.getItem("profileData")) || {};
    const experience = JSON.parse(localStorage.getItem("experienceData")) || [];
    const projects = JSON.parse(localStorage.getItem("projectData")) || [];
    const education = JSON.parse(localStorage.getItem("educationData")) || {};
    const skills = JSON.parse(localStorage.getItem("skillsData")) || {};
    const achievementsData = JSON.parse(localStorage.getItem("achievementsData")) || [];

    // Check if all necessary data is available

    const isProfileComplete = profile && profile.name && profile.email;
    const isExperienceComplete = Array.isArray(experience) && experience.length > 0;
    const isProjectsComplete = Array.isArray(projects) && projects.length > 0;
    const isEducationComplete = education && Object.keys(education).length > 0;
    const isSkillsComplete = skills && Object.keys(skills).length > 0;

    const isComplete =
      isProfileComplete &&
      isExperienceComplete &&
      isProjectsComplete &&
      isEducationComplete &&
      isSkillsComplete;

    console.log('Validation Results:', {
      isProfileComplete,
      isExperienceComplete,
      isProjectsComplete,
      isEducationComplete,
      isSkillsComplete,
      isComplete
    });

    if (isComplete) {
      // navigate("/select-template");
      try {
        setIsLoading(true);
        const formattedData = {
          profile: {
            firstName: profile.name ? profile.name.split(' ')[0] : '',
            lastName: profile.name ? profile.name.split(' ').slice(1).join(' ') : '',
            email: profile.email || '',
            linkedinLink: profile.linkedin || '',
            githubLink: profile.github || ''
          },
          education: [{
            institution: education.institution || '',
            grade: education.cgpa || '',
            duration: education.duration || '',
            location: education.location || ''
          }],
          projects: projects.map(project => ({
            title: project.title || '',
            description: project.description || '',
            techStack: project.techStack || ''
          })),
          experience: experience.map(exp => ({
            title: exp.title || '',
            employer: exp.employee || '',
            duration: exp.duration || '',
            description: exp.description || ''
          })),
          skills: {
            languages: skills.languages || '',
            frameworks: skills.framework || '',
            certifications: skills.certification || '',
            courses: skills.courses || ''
          },
          achievements: achievementsData,
          user_prompt: "No user prompt were provided",
          job_description: job.description || ''
        };

        console.log('Formatted data:', formattedData);

        // Make API request with responseType blob to handle PDF
        const response = await axios.post(`${serverIP}/igdtuw/girls/2`, formattedData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
          }
        });


        const blob = new Blob([response.data], { type: 'application/pdf' });
        const fileName = `${profile.name.replace(/\s+/g, '_')}_resume.pdf`;
        // Create object URL
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 1000);

        alert('Resume generated successfully!');


      } catch (error) {
        console.error('Error generating resume:', error);
        alert('Failed to generate resume. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Navigate to resume builder after download starts
      navigate("/resume-builder");
      alert('Please Fill the required field first to apply for the job');
    }
  };

  return (
    <div className="border p-4 rounded shadow bg-white flex flex-col items-start">
      <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 mb-2" />
      <h2 className="text-lg font-bold">{job.company_name}</h2>
      <p className="text-sm font-semibold">{job.role} - {job.location}</p>
      <p className="text-gray-600 mb-2">{job.description}</p>
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Now
      </button>
    </div>
  );
};

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const shuffledJobs = [...jobData].sort(() => 0.5 - Math.random()).slice(0, 10);
    setJobs(jobData);
    setDisplayedJobs(shuffledJobs);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    let filteredJobs = jobs;

    if (selectedRole) {
      filteredJobs = filteredJobs.filter((job) => job.role === selectedRole);
    }

    if (selectedLocation) {
      filteredJobs = filteredJobs.filter((job) => job.location === selectedLocation);
    }

    setDisplayedJobs(filteredJobs.slice(0, 10));
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        {/* Job Role Dropdown */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-2 w-full md:w-1/3"
        >
          <option value="">Select Job Role</option>
          {jobRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Job Location Dropdown */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border p-2 w-full md:w-1/3"
        >
          <option value="">Select Job Location</option>
          {jobLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded md:w-1/4 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job) => <JobCard key={job.company_name + job.role} job={job} />)
        ) : (
          <p className="text-red-500">No jobs found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
