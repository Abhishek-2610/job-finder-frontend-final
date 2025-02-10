import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="mt-6 flex w-full flex-col gap-y-4">
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
          Email Address <sup className="text-red-600">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style w-full h-11 border px-4 py-2 rounded-md"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
          Password <sup className="text-red-600">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style w-full h-11 border px-4 py-2 rounded-md !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-blue-600 hover:bg-blue-400 transition-colors duration-300  py-[8px] px-[12px] font-medium text-white"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
