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
              <section className="container bg-gray-950 mx-auto w-full min-h-[70vh] text-white flex flex-col justify-center items-center p-4">
                <div className="text-3xl md:text-4xl mb-8 text-center font-semibold">
                  Get interview calls from top Companies
                </div>
                <Marquee />
              </section>
              <ResumeFeatures/>
              <Footer/>

            </>
          }
        />
        
        {/* Contact Us Page */}
        <Route path="/contact" element={<Aboutus />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
      
    </>
  );
}

export default App;
