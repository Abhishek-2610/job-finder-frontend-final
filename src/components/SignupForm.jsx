import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    toast.success("Account Created Successfully!");
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
              First Name <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full h-11 border px-4 py-2 rounded-md"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
              Last Name <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full h-11 border px-4 py-2 rounded-md"
            />
          </label>
        </div>
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
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
              Create Password <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 h-11 border px-4 py-2 rounded-md"
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
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
              Confirm Password <sup className="text-red-600">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 h-11 border px-4 py-2 rounded-md"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-blue-600 py-[8px] px-[12px] font-medium text-white hover:bg-blue-400 transition-colors duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
