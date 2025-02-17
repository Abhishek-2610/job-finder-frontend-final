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
      <div className='flex gap-10 m-20'>
        <div>
          <img className= 'h-[450px]' src={assets.homepage_img} alt="" />
        </div>
        <div>
        <h1 className='font-bold text-[34px] text-center ml-20'>The best resume builder AI <br />out there.</h1>
        <p className='ml-10 mt-10 text-[18px]'><span className='text-[24px] font-bold'>63%</span> of recruiters like to get resumes personalized to the job position. </p>
        <p className='ml-10 mt-2 text-[18px]'><span className='text-[24px] font-bold'>83%</span> of recruiters say they're more likely to hire a candidate who has a well-formatted resume. </p>
        <p className='ml-10 mt-2 text-[18px]'><span className='text-[24px] font-bold'>60%</span> of hiring managers say they've found a typo on a resume. </p>
        <div className='flex justify-center mt-20'>  {/* Added flex and justify-center */}
          <button className='h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg font-bold text-[18px]' onClick={()=>{
              fetchUserData(() => {
                dispatch(updateNavPage('profile'));
                navigate('/user-details');
              });
          }}>Get Started</button>
        </div>
        </div>   
      </div>
      )}
      {/* <Footer /> */}
      {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
    </div>
    
  )

}

export default Home;
