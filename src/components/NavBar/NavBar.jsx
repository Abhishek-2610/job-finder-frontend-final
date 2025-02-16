import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateNavPage } from '../../store-slices/navigation/nav-page';
import { updateUserId } from '../../store-slices/user-details/user-details';
import { decryptData } from '../../utils/crypto';
import  Loader  from '../Loader';
import  CustomDialog  from '../customDialog'

const NavBar = () => {
    const page = useSelector(state => state.navPage.page); 
    const userId = useSelector(state => decryptData(state.user.userId));
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handlingLogout = async () => {
        setIsLoading(true);
        try{
            const response = await fetch(`${publicIp}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if(response.ok){
                dispatch(updateUserId(null));
                dispatch(updateNavPage('home'));
                navigate('/');
            }else{
                setErrorMessage('An error occured while logging out')
            }
        }catch(error){
            setErrorMessage('An unexpected error occurred. Please try again later.')
        } finally{
            setIsLoading(false);
        }
    }


    return (
        <>
        {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Loader />
            </div>
        )}

        <div className="px-[50px] py-[40px] flex justify-between items-center h-[30px] bg-[#5f27c7]">
            <div className="flex gap-y-5px items-center">
                <p className='text-white font-bold text-[24px]'>Resumer</p>
                <div className="flex items-center ml-2">
                    <span className="text-red-500 font-bold text-[14px]">Beta</span>
                    <div className="ml-1 w-2.5 h-2.5 bg-red-500 rounded-full blink"></div>
                </div>
            </div>
            <div className="hidden md:flex">
                <ul className="flex list-none gap-[50px] text-white text-[22px] font-kanit">
                    <li
                        onClick={() => {
                            dispatch(updateNavPage('home'));
                            navigate('/');
                        }}
                        className={page === "home" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Home
                    </li>
                    { userId && (
                    <li
                        onClick={() => {
                            dispatch(updateNavPage('details'));
                            navigate('/user-details');
                        }}
                        className={page === "details" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Profile
                    </li>
                    )}

                    {userId && (
                    <li
                        onClick={() => {
                            dispatch(updateNavPage('generate'));
                            navigate('/template-selection');
                        }}
                        className={page === "generate" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Generate
                    </li>
                    )}
                    {userId && (
                        <li>
                            <button
                                onClick={handlingLogout}
                                className="cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
            <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-white">
                    &#9776;
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <div className="bg-white w-64 h-full p-5">
                        <button onClick={toggleMobileMenu} className="text-black mb-5">
                            &times;
                        </button>
                        <ul className="flex flex-col gap-5 text-black text-[22px] font-kanit">
                            <li
                                onClick={() => {
                                    dispatch(updateNavPage('home'));
                                    navigate('/');
                                    toggleMobileMenu();
                                }}
                                className={page === "home" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                            >
                                Home
                            </li>
                            <li
                                onClick={() => {
                                    dispatch(updateNavPage('details'));
                                    navigate('/user-details');
                                    toggleMobileMenu();
                                }}
                                className={page === "details" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                            >
                                Profile
                            </li>
                            <li
                                onClick={() => {
                                    dispatch(updateNavPage('generate'));
                                    navigate('/template-selection');
                                    toggleMobileMenu();
                                }}
                                className={page === "generate" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                            >
                                Generate
                            </li>
                            <li
                                onClick={() => {
                                    handlingLogout();
                                    toggleMobileMenu();
                                }}
                                className="cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            )}
      {errorMessage && <CustomDialog message={errorMessage} onClose={() => setErrorMessage('')} />}
        </div>
        </>
    );
};

export default NavBar;
