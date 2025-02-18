import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserId } from '../../store-slices/user-details/user-details'
import { updateNavPage } from '../../store-slices/navigation/nav-page'
import Loader from '../Loader';
import { decryptData } from '../../utils/crypto'
import Footer from '../Footer'
import CustomDialog from '../customDialog'
import ResumeFeature from '../ResumeFeature'
import Marquee from '../Marquee'
import ProvenResumeTemplates from '../ProvenResumeTemplates'
import ResumeMarquee from '../ResumeMarquee'
import FAQsection from '../FAQsection'
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision.jsx";



const Home = () => {
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId ? decryptData(state.user.userId) : null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fetchUserData = async (callback) => {
    setIsLoading(true);
      try{
        const response = await fetch(
          `${publicIp}/auth/me`, {
            method : 'GET',
            credentials : 'include', 
            headers : {
              'Content-Type' : 'application/json'
            }
          }
        );
        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if(response.ok){
          const responseBody = await response.json(); // response is a promise type object
          // storing the userId data in the global state
          dispatch(updateUserId(responseBody.data));
          if(callback) callback();
        }else {
          navigate('/signup');
        }
      } catch (error) {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }finally{
        setIsLoading(false);
      }
    }
  return (
    <div className=''>
      { isLoading ? <Loader /> :(
    
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center gap-3 text-center min-h-screen p-4 bg-slate-200">
        
        {/* Badge Section */}
        <div className="rounded-full py-2 px-4 bg-gray-700 flex flex-row items-center mb-5">
          <div className="rounded-full bg-blue-500 text-white mr-2">
            <span className="py-1 px-2 text-xs md:text-sm">NEW</span>
          </div>
          <span className="text-white text-sm md:text-base">Create Resume in 5 mins</span>
        </div>
        
        {/* Hero Title */}
        <div className="relative text-3xl md:text-5xl text-black font-bold">
          Your Dream Career Starts Here
        </div>

        {/* Gradient Text */}
        <div className="relative text-3xl md:text-5xl bg-gradient-to-r from-blue-600 via-green-500 to-purple-700 text-transparent bg-clip-text font-bold block leading-tight p-2">
          Effortless Resume Buildings.
        </div>

        {/* Description */}
        <div className="relative p-2 text-gray-500 max-w-2xl font-bold text-sm md:text-base">
          Craft a winning resume with our easy-to-use AI-powered builder. Select templates, input details, and get a ready-to-use resume in minutes! Start now.
        </div>

        {/* Gradient Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button className="px-4 md:px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl shadow-md hover:opacity-80 transition" onClick={()=>{
               fetchUserData(() => {
                 dispatch(updateNavPage('profile'));
                 navigate('/user-details');
               });
           }}>
            Get Started
          </button>
          <button className="px-4 md:px-6 py-2 text-white font-semibold bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl shadow-md hover:opacity-80 transition">
            Learn More
          </button>
        </div>
      </div>
        </BackgroundBeamsWithCollision>
      
      
      )}
      <ResumeFeature/>
      <Marquee/>
      <ProvenResumeTemplates/>
      <ResumeMarquee/>
      <FAQsection/>
      <Footer />
      
      
      {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
    </div>
    
  )

}

export default Home;
