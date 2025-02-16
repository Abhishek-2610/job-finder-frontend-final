import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import assets from '../assets/assets';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About and Links Section */}
        <div className="footer-section">
          <h1>About Us</h1>
          <p>Resumer is an AI-powered resume-building solution, enabling job seekers to create tailored and professional resumes that align perfectly with specific job descriptions, helping them stand out in the competitive job market.</p>
        </div>

        <div className="footer-section">
          <h1>Quick Link</h1>
          <ul>
            <a 
                href="mailto:sah.shashi2003@gmail.com, anmol03kw@gmail.com"
                className="contact-email-link"
            >
                Contact Us
            </a>
          </ul>
        </div>

        {/* About Developers Section */}
        <div className="footer-section social-media">
          <h1>About Developers</h1>
          <div className="developer-info">
            <div className="developer">
                <img className="developer-image" src={assets.shashiPic} alt='Shashi Sah' />
              <h4>Shashi Sah</h4>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/shashi-sah-56aa77175/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/shashi-sah2003" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              </div>
            </div>
            <div className="developer">
                <img className="developer-image" src={assets.anmolPic} alt='Anmol Bharadhwaj'></img>
              <h4>Anmol Bhardwaj</h4>
              <div className="social-icons">
                <a href="https://www.linkedin.com/in/anmol-bhardwaj-55374321a/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                <a href="https://github.com/Anmol-2003" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Resumer. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
