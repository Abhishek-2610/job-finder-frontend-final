import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, formType }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-[450px] bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
          {title}
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-300">
          <span>{description1}</span>{" "}
          <br/>
          <span className="font-bold italic text-blue-300">
            {description2}
          </span>
        </p>
        <div className="mt-6">
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default Template;
