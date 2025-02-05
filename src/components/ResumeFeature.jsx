import { FaFileAlt, FaRobot, FaShieldAlt, FaTrophy, FaPenNib, FaMoneyBillWave } from "react-icons/fa";

const features = [
  {
    icon: <FaFileAlt className="text-yellow-500 text-3xl" />,
    title: "A better resume in minutes",
    description: "Replace your old resume in a few simple clicks. Our builder gives recruiters what they want.",
  },
  {
    icon: <FaShieldAlt className="text-orange-500 text-3xl" />,
    title: "ATS-friendly templates",
    description: "Tick every box and make sure your resume is never filtered out by the hiring software.",
  },
  {
    icon: <FaPenNib className="text-orange-500 text-3xl" />,
    title: "Pre-written content",
    description: "Stop worrying about words. Save time by adding pre-approved, tested content from certified writers.",
  },
  {
    icon: <FaRobot className="text-blue-600 text-3xl" />,
    title: "Easy with AI",
    description: "Quickly generate formal phrases and summaries. Sound professional, faster.",
  },
  {
    icon: <FaTrophy className="text-blue-600 text-3xl" />,
    title: "Beat the competition",
    description: "Our tested resume templates are designed to make you more attractive to recruiters.",
  },
  {
    icon: <FaMoneyBillWave className="text-yellow-500 text-3xl" />,
    title: "Get paid more",
    description: "A higher salary begins with a strong resume. Our salary analyzer tells you if your job offer is competitive (or not).",
  },
];

const ResumeFeatures = () => {
  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Get hired fast with a powerful resume
        </h2>
      </div>

      {/* ✅ 2 Rows, 3 Columns Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {features.map((feature, index) => (
          <div key={index} className="flex space-x-4 items-start">
            <div>{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeFeatures;
