import React from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQ (Frequently Asked Questions)",
  rows: [
    { 
      title: "What is the Definition of a resume?", 
      content: "A resume is a concise document that summarizes your work experience, education, skills, qualities, and accomplishments. It’s used to showcase your qualifications to potential employers and helps you stand out. It tells employers why you deserve a job interview in one or two powerful pages." 
    },
    { 
      title: "What is the difference between a CV and a resume?", 
      content: "In the U.S. and elsewhere around the world, the terms 'CV' and 'resume' are often used in the same way. However, there are some differences. A resume is typically shorter, highlighting relevant skills and experience for a specific job. A CV (curriculum vitae) is more detailed, focusing on your entire career. For most U.S. job applications, a resume is the preferred format." 
    },
    { 
      title: "How do I choose the right resume template?", 
      content: "To choose the right resume template, consider the job you're applying for and your industry. If you're in a creative field, a more visually appealing template might be best. For traditional industries like finance or law, stick to a clean, professional layout. Ensure the template is easy to read, highlights your strengths, and aligns with your experience level." 
    },
    { 
      title: "What does an ATS-friendly resume mean?", 
      content: "An ATS-friendly resume is designed to pass through the Applicant Tracking Systems, which employers use to screen resumes, especially for roles with lots of applicants. To make your resume ATS-friendly, use a simple, clean format without complex designs or graphics, include relevant keywords from the job description, and use standard fonts. Avoid tables, images, or unusual file formats, and save your resume as a .docx or PDF to ensure compatibility." 
    }
  ]
};

const styles = {
  bgColor: "white",
  titleTextColor: "black",
  rowTitleColor: "#4B5563",
  rowContentColor: "#6B7280",
  arrowColor: "black",
};

const config = {
  animate: true,
  arrowIcon: "▼",
  tabFocus: true,
};

const FAQSection = () => {
  return (
    <div className="bg-white py-8 px-4">
      {/* The FAQ card container is no longer fixed in height or vertically centered. */}
      <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </div>
  );
};

export default FAQSection;
