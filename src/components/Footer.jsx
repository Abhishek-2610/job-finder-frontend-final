import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import assets from '../assets/assets';


const Footer = () => {
  return (
    <footer className="bg-[#5f27c7] text-white py-8">
      {/* Outer Container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Content (3 columns on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h1 className="text-xl font-semibold mb-2">About Us</h1>
          
            <p className="text-sm leading-relaxed">
              Resumer is an AI-powered resume-building solution, enabling job
              seekers to create tailored and professional resumes that align
              perfectly with specific job descriptions, helping them stand out
              in the competitive job market.
            </p>

      
            
          </div>

          {/* Quick Link */}
          <div>
            <h1 className="text-xl font-semibold mb-2">Quick Link</h1>
            <ul>
              <li>
                <a
                  href="mailto:sah.shashi2003@gmail.com, anmol03kw@gmail.com, abhishekshahdtu@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* About Developers */}
          <div>
            <h1 className="text-xl font-semibold mb-2">About Developers</h1>
            <div className="space-y-4">
              {/* Developer: Shashi Sah */}
              <div className="flex items-center gap-4">
                <img
                  src={assets.shashiPic}
                  alt="Shashi Sah"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">Shashi Sah</h4>
                  <div className="flex gap-3 mt-1 text-xl">
                    <a
                      href="https://www.linkedin.com/in/shashi-sah-56aa77175/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/shashi-sah2003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>

              {/* Developer: Anmol Bhardwaj */}
              <div className="flex items-center gap-4">
                <img
                  src={assets.anmolPic}
                  alt="Anmol Bhardwaj"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">Anmol Bhardwaj</h4>
                  <div className="flex gap-3 mt-1 text-xl">
                    <a
                      href="https://www.linkedin.com/in/anmol-bhardwaj-55374321a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/Anmol-2003"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>

              {/* Developer: Abhishek Shah */}
              <div className="flex items-center gap-4">
                <img
                  src="/abhishek.png"
                  alt="Abhishek Shah"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">Abhishek Shah</h4>
                  <div className="flex gap-3 mt-1 text-xl">
                    <a
                      href="https://www.linkedin.com/in/abhishek-shah-3262ba275/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/Abhishek-2610"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-400 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Resumer. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
