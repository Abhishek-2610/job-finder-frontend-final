// src/App.js
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeFeatures from "./components/ResumeFeature";
import JobSearch from "./components/JobSearch";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import TemplateSelection from "./components/TemplateSelection";
import PreviewResume from "./components/PreviewResume"; // Optional: create this component as needed

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <section className="bg-gray-950 mx-auto w-screen min-h-[70vh] text-white flex flex-col justify-center items-center">
                <div className="text-3xl md:text-4xl mb-8 text-center font-semibold">
                  Get interview calls from top Companies
                </div>
                <Marquee />
              </section>
              <ResumeFeatures />
              <Footer />
            </>
          }
        />
        <Route path="/contact" element={<Aboutus />} />
        <Route path="/findjob" element={<JobSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Resume Routes */}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/select-template" element={<TemplateSelection />} />
        <Route path="/preview-resume" element={<PreviewResume />} />
      </Routes>
    </>
  );
}

export default App;
