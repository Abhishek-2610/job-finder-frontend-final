import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { updateUserId } from '../../store-slices/user-details/user-details';
import { updateNavPage } from '../../store-slices/navigation/nav-page';
import Loader from '../Loader';
import { validateEmail, validateNotEmpty, validatePassword, validateGitHubLink, validateLinkedInLink } from '../../utils/validation';
import CustomDialog from '../customDialog';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';


const Signup = () => {

  const publicIp = import.meta.env.VITE_SERVER_IP;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    githubLink: '',
    linkedinLink: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleVerified, setIsGoogleVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = async (response) => {

    const decoded = jwtDecode(response.credential);

    setFormData(prev => ({
      ...prev,
      email: decoded.email,
      firstName: decoded.given_name,
      lastName: decoded.family_name,
    }));

    setIsGoogleVerified(true);
  };

  const handleGoogleError = () => {
    setErrorMessage('Google sign-in failed. Please try again.');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    //clear errors for the specific field being changed
    setErrors(prev => ({
      ...prev,
      [field]: undefined
    }));

    // Validate the field as user types
    if (field === 'password' && value) {
      if (!validatePassword(value)) {
        setErrors(prev => ({
          ...prev,
          password: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
        }));
      }
    }
  };

  const handleNext = () => {
    let newErrors = {};

    if(!validateNotEmpty(formData.name)){
      newErrors.name = 'Please enter your username';
    }

    if(!validateNotEmpty(formData.email)){
      newErrors.email = 'Please enter your email';
    }else if(!validateEmail(formData.email)){
      newErrors.email = 'Please enter a valid email';
    }

    if(!validateNotEmpty(formData.password)){
      newErrors.password = 'Please enter your password';
    }else if(!validatePassword(formData.password)){
      newErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    }

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  }

  const signupHandler = async () => {
    let newErrors = {};

    if(!validateNotEmpty(formData.firstName)){
      newErrors.firstName = 'Please enter your first name';
    }

    if(!validateNotEmpty(formData.lastName)){
      newErrors.lastName = 'Please enter your last name';
    }

    if(!validateNotEmpty(formData.githubLink)){
      newErrors.githubLink = 'Please enter your github link';
    }else if(!validateGitHubLink(formData.githubLink)){
      newErrors.githubLink = 'Please enter a valid Github link';
    }

    if(!validateNotEmpty(formData.linkedinLink)){
      newErrors.linkedinLink = 'Please enter your linkedin link';
    }else if(!validateLinkedInLink(formData.linkedinLink)){
      newErrors.linkedinLink = 'Please enter a valid LinkedIn link';
    }

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${publicIp}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
        credentials: 'include',
      });
      const responseBody = await response.json();

      if (response.status === 200) {
        dispatch(updateUserId(responseBody.data)); // save the userId in the current session 
        dispatch(updateNavPage('user-details'));
        navigate('/user-details');

      } else {
        setErrorMessage('Error during sign up');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#5f27c7] flex items-center pl-[230px]">
      <div className="flex flex-col ml-[150px] w-[500px] min-h-[80vh] bg-gray-300 rounded-[20px] shadow-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {step === 1 ? (
              <>
                <div className="self-center mt-8 mb-12 text-[38px] font-bold text-[#5f27c7] font-pacifico">
                  Sign Up
                </div>
                <div className="self-center space-y-6">
                  {!isGoogleVerified && (
                    <div className='flex justify-center mb-4'>
                      <GoogleLogin
                      onSuccess={handleGoogleSignup}
                      onError={handleGoogleError}
                      theme='filled_black'
                      size='large'
                      width={250} 
                      text='signup_with'/>
                      </div>
                  )}
                
                  <div className="flex flex-col space-y-1">
                    <div className="flex gap-[20px]">
                      <img src={assets.user} alt="" className="w-[30px]" />
                      <input
                        type="text"
                        placeholder="Username"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px] `}
                        title='Please signup using Google'
                      />
                    </div>
                    {errors.name && (
                      <div className="ml-[50px]">
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex gap-[20px]">
                      <img src={assets.email} alt="" className="w-[30px]" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => !isGoogleVerified && setFormData({ ...formData, email: e.target.value })}
                        className={`w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px] ${isGoogleVerified ? 'bg-gray-100': ''}`}
                        disabled={true}
                        title='Please signup using Google'
                      />
                    </div>
                    {errors.email && (
                      <div className="ml-[50px]">
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex gap-[20px]">
                      <img src={assets.password} alt="" className="w-[30px]" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                      />
                    </div>
                    {errors.password && (
                      <div className="ml-[50px] max-w-[300px]">
                        <p className="text-red-500 text-sm leading-tight">{errors.password}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center mt-8 space-y-5">
                  <button
                    className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                  <button
                    className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg mb-8"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="self-center mt-8 mb-12 text-[38px] font-bold text-[#5f27c7] font-pacifico">
                  Profile Details
                </div>
                <div className="self-center space-y-6">
                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => !isGoogleVerified && setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px] ${isGoogleVerified ? 'bg-gray-100': ''}`}
                      disabled={isGoogleVerified}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => !isGoogleVerified && setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px] ${isGoogleVerified ? 'bg-gray-100': ''}`}
                      disabled={isGoogleVerified}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      placeholder="GitHub Link"
                      value={formData.githubLink}
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                    />
                    {errors.githubLink && (
                      <p className="text-red-500 text-sm">{errors.githubLink}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <input
                      type="text"
                      placeholder="LinkedIn Link"
                      value={formData.linkedinLink}
                      onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })}
                      className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                    />
                    {errors.linkedinLink && (
                      <p className="text-red-500 text-sm">{errors.linkedinLink}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center mt-8 space-y-5">
                  <button
                    className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                    onClick={signupHandler}
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
    </div>
  );
};

export default Signup;