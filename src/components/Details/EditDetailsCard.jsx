import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { decryptData } from '../../utils/crypto';
import RequiredField from '../RequiredFields';

const EditCard = ({content, item, onClose}) => {
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [formData, setFormData] = useState({...item}); // shallow copy of the item
    const [isChanged, setIsChanged] = useState(false); // initially its not changed
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => decryptData(state.user.userId));
    const [errors, setErrors] = useState({});


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

    // APIs for saving or deleting the information
    const handleSave = async (itemId) => {
        setIsLoading(true);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {  

            const endpoint = content === 'profile' ? `${publicIp}/editUserProfile` : `${publicIp}/updateDetails/${content}/${itemId}`;

            const response = await fetch(endpoint, {
                headers : {'Content-Type' : 'application/json'}, 
                method : 'POST', 
                body : JSON.stringify({...formData, userId : userId})
            });
            if(response.ok){
                if(response.status === 200) {
                    onClose(true); 
                }
                else {
                    onClose(false);
                }
            } else {
                alert('Error Occured');
                onClose(false); 
            }
        } catch (error) {
            onClose(false);
        }finally{
            setIsLoading(false);
        }
    }

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${publicIp}/deleteDetails/${content}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                if (response.status === 200) {
                    onClose(true); 
                } else {
                    onClose(false);
                }
            } else {
                onClose(false);
            }
        } catch (error) {
            onClose(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        if (content === 'experience'){
            const changed = 
            formData.title != item.title ||
            formData.duration != item.duration||
            formData.description != item.description ||
            formData.employer != item.employer;
            setIsChanged(changed);
        }else if(content === 'projects'){
            const changed = 
            formData.title != item.title ||
            formData.duration != item.duration||
            formData.description != item.description ||
            formData.techStack != item.techStack;
            
            setIsChanged(changed);
        }else if(content === 'education'){
            const changed = 
            formData.institution != item.institution ||
            formData.duration != item.duration||
            formData.grade != item.grade ||
            formData.location != item.location;
            
            setIsChanged(changed);
        }else if(content === 'skills') {
            const changed = 
            formData.languages != item.languages ||
            formData.frameworks != item.frameworks||
            formData.courses != item.courses ||
            formData.certifications != item.certifications;        
            setIsChanged(changed);
        } else if(content === 'profile'){
            const changed = 
            formData.firstName !== item.firstName ||
            formData.lastName !== item.lastName ||
            formData.email !== item.email ||
            formData.githubLink !== item.githubLink ||
            formData.linkedinLink !== item.linkedinLink;
            setIsChanged(changed);
        } else if(content === 'achievements'){
            const changed = 
            formData.achievement1 !== item.achievement1 ||
            formData.achievement2 !== item.achievement2 ||
            formData.achievement3 !== item.achievement3 ||
            formData.achievement4 !== item.achievement4 ||
            formData.achievement5 !== item.achievement5;
            setIsChanged(changed);
        }
         else{
            alert('Invalid content type');
        }
    }, [formData]);


   return (
    <>
    <div className='editModal bg-white w-1/2 h-5/6 rounded-2xl p-5 flex flex-col'>
        {isLoading ? <Loader /> : (
            <>
        {/* Information that can be edited */}
        <div className='overflow-y-auto flex-grow'>
        {content === 'experience' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit experience</h2>
                <div className='mb-5'>
                    <RequiredField 
                        label='Title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                      {errors.title && <p className='text-red-600'>{errors.title}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField 
                        label="Employer"
                        value={formData.employer}
                        onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                    />
                    {errors.employer && <p className='text-red-600'>{errors.employer}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField
                        label="Duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                    {errors.duration && <p className='text-red-600'>{errors.duration}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField 
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <p className='text-red-600'>{errors.description}</p>}
                </div>
            </div>
            </>
        )}

        {content === 'projects' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit projects</h2>
                <div className='mb-5'>
                    <RequiredField 
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <p className='text-red-600'>{errors.title}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField
                        label="Duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                    {errors.duration && <p className='text-red-600'>{errors.duration}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField 
                        label="Tech Stack"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                    {errors.techStack && <p className='text-red-600'>{errors.techStack}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField 
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <p className='text-red-600'>{errors.description}</p>}
                </div>
            </div>
            </>
        )}

        {content === 'education' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit education</h2>
                <div className='mb-5'>
                    <RequiredField
                        label="Institution"
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                    {errors.institution && <p className='text-red-600'>{errors.institution}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField
                        label="Duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                    {errors.duration && <p className='text-red-600'>{errors.duration}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField
                        label="Grade (Enter CGPA or Percentage)"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        type='number'
                    />
                    {errors.grade && <p className='text-red-600'>{errors.grade}</p>}
                </div>
                <div className='mb-5'>
                    <RequiredField
                        label="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    {errors.location && <p className='text-red-600'>{errors.location}</p>}
                </div>
            </div>
            </>
        )}

        {content === 'profile' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit profile</h2>
                <div className='mb-5'>
                    <label htmlFor="">First Name : 
                        <input 
                            type="text" 
                            value={formData.firstName} 
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Last Name : 
                        <input 
                            type="text" 
                            value={formData.lastName} 
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Email : 
                        <input 
                            type="text" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Github Link : 
                        <input 
                            type="text" 
                            value={formData.githubLink} 
                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Linkedin Link: 
                        <input 
                            type="text" 
                            value={formData.linkedinLink} 
                            onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
            </div>
            </>
        )}
        {content === 'skills' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit Skills</h2>
                <div className='mb-5'>
                    <label htmlFor="">Languages : 
                        <input 
                            type="text" 
                            value={formData.languages} 
                            onChange={(e) => setFormData({ ...formData, languages: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Frameworks : 
                        <input 
                            type="text" 
                            value={formData.frameworks} 
                            onChange={(e) => setFormData({ ...formData, frameworks: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Courses : 
                        <input 
                            type="text" 
                            value={formData.courses} 
                            onChange={(e) => setFormData({ ...formData, courses: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Certifications : 
                        <input 
                            type="text" 
                            value={formData.certifications} 
                            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>

            </div>
            </>
        )}

        {content === 'achievements' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit Achievements</h2>
                <div className='mb-5'>
                    <label htmlFor="">Achievement 1 : 
                            <input 
                                type="text" 
                                value={formData.achievement1} 
                                onChange={(e) => setFormData({ ...formData, achievement1: e.target.value })} 
                                className='w-full border rounded px-2 py-1'
                            />
                        </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Achievement 2 : 
                        <input 
                            type="text" 
                            value={formData.achievement2} 
                            onChange={(e) => setFormData({ ...formData, achievement2: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Achievement 3 : 
                        <input 
                            type="text" 
                            value={formData.achievement3} 
                            onChange={(e) => setFormData({ ...formData, achievement3: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Achievement 4 : 
                        <input 
                            type="text" 
                            value={formData.achievement4} 
                            onChange={(e) => setFormData({ ...formData, achievement4: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Achievement 5 : 
                        <input 
                            type="text" 
                            value={formData.achievement5} 
                            onChange={(e) => setFormData({ ...formData, achievement5: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                {errors.achievements && <p className='text-red-600'>{errors.achievements}</p>}
            </div>
            </>
        )}


        </div>
        <div className='flex justify-between px-10'>
            <button className='rounded-3xl bg-[#5f27c7] text-white font-bold px-10' disabled={!isChanged} onClick={async ()=> {
                const itemId = content === 'experience' ? item.expId : content === 'projects' ? item.projectId : content === 'education' ? item.eduId : content === 'profile' ? item.userId : content === 'achievements' ? item.achievementId : item.skillsId;
                await handleSave(itemId);
            }}>Save</button>
            <button className='rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer' onClick={()=>{onClose(false)}}>Cancel</button>

            {content !== 'profile' && (
            <button className='rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer' onClick={async () => {
                try {
                    const itemId = content === 'experience' ? item.expId : content === 'projects' ? item.projectId : content === 'education' ? item.eduId : content === 'profile' ? item.userId : content === 'achievements' ? item.achievementId : null;
                    if (itemId) {
                        await handleDelete(itemId);
                    } else {
                        console.error('Invalid content type for deletion');
                    }
                } catch (error) {
                    console.error('Error deleting item:', error);
                }
            }}>Delete</button>
        )}
        </div>
        </>
        )}
    </div>
    </>
  )
}

export default EditCard