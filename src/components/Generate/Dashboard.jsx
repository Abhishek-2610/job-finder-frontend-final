import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { decryptData } from '../../utils/crypto';
import CustomDialog from '../customDialog';
import Loader from '../Loader';


const Dashboard = () => {
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const { template } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [job_description, setJobDescription] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = useSelector(state => decryptData(state.user.userId));

  // USING AXIOS 
  const generateResume = async () => {
    if (!job_description) {
        setErrorMessage('Please enter a job description');
        return;
    }

    const prompt = userPrompt ? userPrompt : 'No prompt provided by user';

    setIsLoading(true);

    const data = {
        "user_id": userId,
        "job_description": job_description,
        "user_prompt": prompt
    };

    try {
        // Axios request with responseType set to 'blob' to handle the binary file
        const response = await axios.post(`${publicIp}/generateResume/${template}`, data, {
            responseType: 'blob',  // Important: Set responseType to blob
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(response.status === 200){
          //Create blob URL for PDF
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob); // This returns a string URL of the object/blob passed as parameter. Lifetime is same as of the window
          setPdfBlobUrl(url);
        }
    } catch (error) {
        if (error.response && error.response.status === 420) {
          setErrorMessage('Limit Exceeded for today. Please try again later.');
      } else {
          setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
        setIsLoading(false);
    }
  };

  const fetchResumeMetadata = async () => {
    setIsEditing(true);
    try {
      const response = await axios.post(`${publicIp}/getResumeMetadata`, { user_id: userId });
      if (response.status === 200) {

        // Parse the payload if it's a string, otherwise use it directly
        const payload = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      
        // Process each section into structured data
        const processedPayload = {
          template: payload.template,
          user_details: processUserDetails(payload.user_details),
          education: processEducation(payload.education),
          Resume: processProjectExperience(payload.projectExperience),
          skills: processSkills(payload.skills),
          achievements: processAchievements(payload.achievements),
      };
        
        navigate('/editGeneratedResume', { state: { payload: processedPayload } });
      } else {
        setErrorMessage('Failed to fetch resume metadata.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsEditing(false);
    }
  };

  //Helper Function to process User details string into structured data
  function processUserDetails(userDetailsStr) {
    const details = {
      'First Name': '',
      'Last Name': '',
      'Email': '',
      'Linkedin': '',
      'Github': ''
    };
  
    if (userDetailsStr) {
      let currentField = '';
      const lines = userDetailsStr.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();        
        const matchedField = Object.keys(details).find(field => 
          line.toLowerCase().startsWith(field.toLowerCase() + ':')
        );
        
        if (matchedField) {
          currentField = matchedField;
          const valueAfterColon = line.split(':')[1].trim();
          if (valueAfterColon) {
            details[currentField] = valueAfterColon;
          }
          else if (i + 1 < lines.length) {
            details[currentField] = lines[i + 1].trim();
          }
        }
      }
    }
    return details;
  }
  
  // Helper function to process education string into structured data
  const processEducation = (educationStr) => {
    const entries = educationStr.trim().split('\n\n').filter(entry => entry);

    return entries.map(entry => {
      const lines = entry.split('\n');
      const eduObj = {};
      lines.forEach(line => {
        const [key, value] = line.split(':').map(str => str.trim());
        eduObj[key] = value;
      });
      return eduObj;
    });
  };

  // Helper Function to process Project and Experience string into structured data
  const processProjectExperience = (projectExperienceStr) => {

    const sections = {};
    let currentSection = '';

    projectExperienceStr.split('\n').forEach(line => {
      if(line.includes('PROJECTS') || line.includes('EXPERIENCE')){
        currentSection = line.trim();
        sections[currentSection] = [];
      } else if(currentSection && line.trim()){
        sections[currentSection].push(line.trim());
      }
    });

    return {
      PROJECTS: sections['PROJECTS'] || [],
      EXPERIENCE: sections['EXPERIENCE'] || []
    };
  };

  // Helper Function to process Skills string into structured data
  const processSkills = (skillsStr) => {
    const lines = skillsStr.replace('SKILLS :-\n', '').split('\n');
    const skills = {};
    lines.forEach(line => {
      if(line.trim()){
        const [key, value] = line.split(':').map(str => str.trim());
        skills[key] = value;
      }
    });

    return skills;
  }

  // Helper function to process achievements string into structured data
  const processAchievements = (achievementsStr) => {
    return achievementsStr
      .replace('ACHIEVEMENTS :-\n', '')
      .split('\n')
      .filter(achievement => achievement.trim())
      .map(achievement => achievement.trim());
  };

  return (
    <div className='flex gap-5 p-3 m-0 bg-customGrey'>
      {/* Left Side - Job Description */}
      <div className='flex-column gap-5 h-screen w-1/2 bg-white rounded-xl'>
        <div><p className='text-center p-3 text-[26px] font-bold font-kanit'>Job Description</p></div>
        <div className='flex-grow flex flex-col p-2'>
          <textarea
            value={job_description}
            className='h-[200px] w-full border-2 p-4 resize-none rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Input Job description'
            style={{ boxSizing: 'border-box' }}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div><p className='text-center p-3 text-[26px] font-bold font-kanit'>Specific Command for Agent</p></div>
        <div className='flex-grow flex flex-col p-2'>
          <textarea
            value={userPrompt}
            className='h-[200px] w-full border-2 p-4 resize-none rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your command for the AI agent here'
            style={{ boxSizing: 'border-box' }}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </div>
        <div className='m-5 flex justify-center'>
          <button className='border-2 px-[100px] py-[8px] rounded-3xl bg-[#5f27c7] text-white font-bold hover:shadow-xl' onClick={generateResume}>
            Generate
          </button>
        </div>
      </div>

      {/* Right side - Display area*/}
      <div className='flex-column gap-5 h-screen w-1/2 bg-white rounded-xl'>
      {isEditing ? (
          <Loader />
        ) : isLoading ? (
          <div className='flex justify-center items-center h-full'>
            <div className='flex-column h-full'>
              <iframe
                src="https://tenor.com/embed/20423219"
                width="100%"
                height="70%"
                frameBorder="0"
                allowFullScreen
                title="Loading..."
              ></iframe>
              <p className='p-5 font-bold text-[18px]'>The AI is generating your resume, please be patient.</p>
            </div>
          </div>
        ) : (
          pdfBlobUrl ? (
            <div className='flex flex-col h-full relative'>
              <iframe
                src={pdfBlobUrl}
                width="100%"
                height="100%"
                title="Generated Resume"
                className="rounded-xl"
              ></iframe>
              <button
                className='absolute bottom-8 left-8 px-6 py-3 bg-[#5f27c7] text-white rounded-full 
                  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200
                  flex items-center gap-2 font-semibold'
                onClick={fetchResumeMetadata}
                disabled={isEditing}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                Edit Resume
              </button>
            </div>
          ) : (
            <p className='text-center p-10 text-[20px] font-bold'>No resume generated yet.</p>
          )
        )}
      </div>
      {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
    </div>
  );
};

export default Dashboard