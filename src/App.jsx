import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TemplateSelection from "./components/Generate/TemplateSelection";
import Dashboard from "./components/Generate/Dashboard";
import UserDetails from "./components/Details/userDetails";
import MobileDialog from './components/MobileDialog/MobileDialog';
import EditGeneratedResume from './components/Generate/EditGeneratedResume';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const checkDevice = () => {
    setIsMobile(window.innerWidth < 768); // Mobile screen size threshold
  };

  useEffect(() => {
    checkDevice(); // Check on initial render
    window.addEventListener('resize', checkDevice); // Update on window resize

    return () => {
      window.removeEventListener('resize', checkDevice); // Cleanup listener
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [isMobile]);

  return (
    <div>
      {showDialog && <MobileDialog onClose={() => setShowDialog(false)} />}
      {!showDialog && (
        <>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/user-details' element={<UserDetails />} />
            <Route path='/template-selection' element={<TemplateSelection />} />
            <Route path='/dashboard/:template' element={<Dashboard />} />
            <Route path='/editGeneratedResume' element={<EditGeneratedResume />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
