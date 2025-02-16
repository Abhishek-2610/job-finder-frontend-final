import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { decryptData } from '../../utils/crypto';
import RequiredField from '../RequiredFields';

const AddDetailsCard = ({content, onClose}) => {
    const userId = useSelector(state => decryptData(state.user.userId));
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const initialFormData = () => {
        if (content === 'experience') {
            return { userId : userId, title: "", employer: "", duration: "", description: "" };
        } else if (content === 'projects') {
            return { userId : userId , title: "", description: "", duration: "", techStack: "" };
        } else if (content === 'education') {
            return { userId : userId, institution: "", location: "", duration: "", grade: "" };
        } else if(content ==='skills'){
            return {userId : userId , languages : "", frameworks : "", courses : "", certifications : ""};
        } else if(content ==='achievements'){
            return {userId : userId , achievement1:"", achievement2:"", achievement3:"", achievement4:"", achievement5:""};
        }else return {};
    };

    const [formData, setFormData] = useState(initialFormData());


    const validateForm = () => {
        let newErrors = {};
        if (content === 'achievements') {
            // For achievements, check if at least one achievement is filled

            if (!Object.entries(formData).some(([key, value]) => key.startsWith('achievement') && typeof value === 'string' && value.trim() !== '')) {
                newErrors.achievements = 'At least one achievement is required';
            }
        }else {
            // For other content types, all fields must be filled

            Object.entries(formData).forEach(([key, value]) => {
                if (typeof value === "string" && value.trim() === "") {
                    newErrors[key] = 'This field is required';
                }
            });

        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleSave = async () => {
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        const url = `${publicIp}` + 
            (content === 'experience' ? "/saveExperience" : 
            content === 'projects' ? "/saveProject" : 
            content === 'skills' ? '/saveSkills' :
            content === 'achievements' ? '/saveAchievements' : '/saveEducation');

        const response = await fetch(url, {
            headers : {'Content-Type' : 'application/json'}, 
            body : JSON.stringify(formData),
            method : 'POST'
        });

        if(response.ok){
            const responseBody = await response.json(); 
            if(response.status === 200){
                onClose(true);
            } else {
                onClose(false);
            }
        }else {
            onClose(false);
        }
        setIsLoading(false);
    };

  return (
    <div className='addModal bg-white w-1/2 h-5/6 rounded-2xl p-5 flex flex-col'>
        {isLoading ? <Loader/> : (
        <>
        {/* Adding details part */}
        <div className='overflow-y-auto flex-grow border-b-[2px]' >
            {content === 'experience' && (
                <>
                <div className="mb-3">
                <RequiredField
                    label="Title"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({...prev, title : e.target.value}))}
                    placeholder='Enter Title'
                />
                    {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>}
                </div>
                
                <div className="mb-3">
                <RequiredField
                    label="Employer"
                    value={formData.employer}
                    onChange={e => setFormData(prev => ({ ...prev, employer: e.target.value }))}
                    placeholder="Enter employer"
                />
                    {errors.employer && <p className="text-red-500 text-sm ">{errors.employer}</p>}
                    </div>
                
                    <div className="mb-3">
                <RequiredField
                    label="Duration"
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="Enter duration"
                />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                <div className="mb-3">
                    <RequiredField
                    label="Description"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter description"
                />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                </>
            )}
            {content === 'projects' && (
                <>
                <div className='mb-3'>
                    <RequiredField 
                    label="Title"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({...prev, title : e.target.value}))}
                    placeholder='Enter Title'
                    />
                    {errors.title && <p className='text-red-500 text-sm'>{errors.title}</p>} 
                </div>

                <div className='mb-3'>
                    <RequiredField
                    label="Duration"
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({...prev, duration : e.target.value}))}
                    placeholder='Enter Duration'
                    />
                    {errors.duration && <p className='text-red-500 text-sm'>{errors.duration}</p>}
                </div>
                <div className='mb-3'>
                    <RequiredField
                    label="Tech Stack"
                    value={formData.techStack}
                    onChange={e => setFormData(prev => ({...prev, techStack : e.target.value}))}
                    placeholder='Enter Tech Stack'
                     />
                    {errors.techStack && <p className='text-red-500 text-sm'>{errors.techStack}</p>}
                </div>
                <div className='mb-3'>
                    <RequiredField 
                    label="Description"
                    value={formData.description}
                    onChange={e => setFormData(prev => ({...prev, description : e.target.value}))}
                    placeholder='Enter Description'
                    />
                    {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
                </div>
                </>
            )}
            {content === 'education' && (
                <>
                <div className='mb-3'>
                    <RequiredField 
                    label="Institution"
                    value={formData.institution}
                    onChange={e => setFormData(prev => ({...prev, institution : e.target.value}))}
                    placeholder='Enter Institution'
                    />
                    {errors.institution && <p className='text-red-500 text-sm'>{errors.institution}</p>}
                </div>
                <div className='mb-3'>
                    <RequiredField
                    label="Duration"
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({...prev, duration : e.target.value}))}
                    placeholder='Enter Duration'
                    />
                    {errors.duration && <p className='text-red-500 text-sm'>{errors.duration}</p>}
                </div>
                <div className='mb-3'>
                    <RequiredField
                    label="Location"
                    value={formData.location}
                    onChange={e => setFormData(prev => ({...prev, location : e.target.value}))}
                    placeholder='Enter Location'
                    />
                    {errors.location && <p className='text-red-500 text-sm'>{errors.location}</p>}
                </div>
                <div className='mb-3'>
                    <RequiredField
                    label="Grade (Enter CGPA or Percentage)"
                    value={formData.grade}
                    onChange={e => setFormData(prev => ({...prev, grade : e.target.value}))}
                    placeholder='Enter Grade'
                    type='number'
                    />
                    {errors.grade && <p className='text-red-500 text-sm'>{errors.grade}</p>}
                </div>
                </>
            )}
            {
                content === 'skills' && (
                    <>
                    <div className='mb-5'>
                    <label htmlFor="">Languages : 
                        <input 
                        type='text' 
                        value={formData.languages}
                        onChange={e => setFormData(prev => ({...prev, languages : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Frameworks : 
                        <input 
                        type='text' 
                        value={formData.frameworks}
                        onChange={e => setFormData(prev => ({...prev, frameworks : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Courses : 
                        <input 
                        type='text' 
                        value={formData.courses}
                        onChange={e => setFormData(prev => ({...prev, courses : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Certifcations : 
                        <input 
                        type='text' 
                        value={formData.certifications}
                        onChange={e => setFormData(prev => ({...prev, certifications : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    </>
                )
            }
            {
                content === 'achievements' && (
                    <>
                    <div className='mb-5'>
                        <div className='mb-4'>
                            <label htmlFor="">Achievement 1 : 
                            <input 
                            type='text' 
                            value={formData.achievement1}
                            onChange={e => setFormData(prev => ({...prev, achievement1 : e.target.value}))}
                            className='w-full border rounded px-2 py-1'>
                            </input>
                        </label>
                    </div>

                    <div className='mb-4'>
                    <label htmlFor="">Achievement 2 : 
                        <input 
                        type='text' 
                        value={formData.achievement2}
                        onChange={e => setFormData(prev => ({...prev, achievement2 : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    
                    <div className='mb-4'>
                    <label htmlFor="">Achievement 3 : 
                        <input 
                        type='text' 
                        value={formData.achievement3}
                        onChange={e => setFormData(prev => ({...prev, achievement3 : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>

                    <div className='mb-4'>
                    <label htmlFor="">Achievement 4 : 
                        <input 
                        type='text' 
                        value={formData.achievement4}
                        onChange={e => setFormData(prev => ({...prev, achievement4 : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>

                    <div className='mb-4'>
                    <label htmlFor="">Achievement 5 : 
                        <input 
                        type='text' 
                        value={formData.achievement5}
                        onChange={e => setFormData(prev => ({...prev, achievement5 : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div> 
                    {errors.achievements && <p className='text-red-500 text-sm'>{errors.achievements}</p>} 
                    </div>
                    </>
                )
            }
        </div>
        {/* Buttons for saving and cancel */}
        <div className='px-10 py-5 flex justify-between'>
            <button 
            onClick={handleSave}
            className='h-[40px] rounded-3xl bg-[#5f27c7] text-white font-bold px-10 w-[200px] cursor-pointer'>
                Save
            </button>
            <button 
            onClick={()=>{
                onClose(false); 
            }}
            className=' h-[40px] rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer w-[200px]'>
                Cancel
            </button>

        </div>
        </>
        )}
    </div>
  )
}

export default AddDetailsCard;
