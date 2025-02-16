import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { updateUserId } from '../../store-slices/user-details/user-details';
import { updateNavPage } from '../../store-slices/navigation/nav-page';
import Loader from '../Loader';
import { validateEmail, validateNotEmpty } from '../../utils/validation';
import CustomDialog from '../customDialog';

const Login = () => {
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const loginHandler = async () => {
        let isValid = true;

        if (!validateNotEmpty(email)) {
            setEmailError('Please enter your email');
            isValid = false;
        } else if (!validateEmail(email)){
            setEmailError('Please enter a valid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if(!validateNotEmpty(password)){
            setPasswordError('Please enter your password');
            isValid = false;
        }
        else{
            setPasswordError('');
        }

        if(!isValid){
            return;
        }

        setIsLoading(true);
        const data = { email, password };
        try {
            const response = await fetch(`${publicIp}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            const responseBody = await response.json();
            if (response.status === 200) {
                dispatch(updateUserId(responseBody.data));
                dispatch(updateNavPage('home'));
                navigate('/user-details');
            } else if (response.status === 401) {
                setErrorMessage(`${responseBody["message"]}`)
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#5f27c7] flex items-center pl-[230px]">
            <div className="flex flex-col ml-[150px] w-[500px] h-[70vh] bg-gray-300 rounded-[20px] shadow-lg">
                {isLoading ? <Loader /> : (
                    <>
                        <div className="self-center mt-8 mb-16 text-[38px] font-bold text-[#5f27c7] font-pacifico">
                            Login
                        </div>
                        <div className="self-center space-y-4">
                            <div className="flex flex-col space-y-1">
                                <div className="flex gap-[20px]">
                                    <img src={assets.email} alt="" className="w-[30px]" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                                    />
                                </div>
                                {emailError && (
                                    <div className="ml-[50px]">
                                        <p className="text-red-500 text-sm">{emailError}</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex flex-col space-y-1">
                                <div className="flex gap-[20px]">
                                    <img src={assets.password} alt="" className="w-[30px]" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] py-[5px] text-[18px]"
                                    />
                                </div>
                                {passwordError && (
                                    <div className="ml-[50px]">
                                        <p className="text-red-500 text-sm">{passwordError}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-8 space-y-5">
                            <button
                                className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                                onClick={loginHandler}
                            >
                                Continue
                            </button>
                            <button
                                className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </div>
                    </>
                )}
            </div>
            {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
        </div>
    );
};

export default Login;