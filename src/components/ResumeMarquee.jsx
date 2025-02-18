import React from "react";

const ResumeMarquee = () => {
  // Replace these with your actual image paths
  const resumeImages = [
    "../public/template_1.png",
    "../public/template_2.png",
    "../public/template_3.png",
  ];

  return (
    <div className="flex justify-center items-center gap-16 p-8 bg-gray-200">
      {resumeImages.map((src, index) => (
        <div
          key={index}
          className="
            group
            rounded-lg
            transition-all
            duration-300
            hover:shadow-[0_0_40px_12px_rgba(139,92,246,0.3)]
          "
        >
          {/* Inner container: the actual white card holding the image */}
          <div
            className="
              bg-white
              rounded-lg
              overflow-hidden
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src={src}
              alt={`Resume template ${index + 1}`}
              className="w-64 h-80 object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeMarquee;
