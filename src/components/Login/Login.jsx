import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../store-slices/user-details/user-details";
import { updateNavPage } from "../../store-slices/navigation/nav-page";
import Loader from "../Loader";
import { validateEmail, validateNotEmpty } from "../../utils/validation";
import CustomDialog from "../customDialog";

const Login = () => {
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateNotEmpty(formData.email)) {
      setEmailError("Please enter your email");
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validateNotEmpty(formData.password)) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    const data = { email: formData.email, password: formData.password };

    try {
      const response = await fetch(`${publicIp}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        dispatch(updateUserId(responseBody.data));
        dispatch(updateNavPage("home"));
        navigate("/user-details");
      } else if (response.status === 401) {
        setErrorMessage(responseBody.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render full-screen loader when isLoading is true
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7044c3] border-t border-white w-full">
      <div className="w-full max-w-[450px] bg-gray-800 p-8 rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white text-center">
          Sign In
        </h1>
        <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-300">
          <div className="text-center">
            <span className="font-bold">Welcome Back!</span>
          </div>

          <div className="text-center">
            <span className="font-bold italic text-blue-300">
              Access your account
            </span>
          </div>
        </p>

        {/* Login Form */}
        <form
          onSubmit={loginHandler}
          className="mt-6 flex w-full flex-col gap-y-4"
        >
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
              className="w-full h-11 border px-4 py-2 rounded-md"
            />
            {emailError && (
              <p className="mt-1 text-red-500 text-sm">{emailError}</p>
            )}
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
              className="w-full h-11 border px-4 py-2 rounded-md pr-10"
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
            {passwordError && (
              <p className="mt-1 text-red-500 text-sm">{passwordError}</p>
            )}
            {/* <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link> */}
          </label>

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-[#5f27c7] hover:bg-[#8963ce] transition-colors duration-300 py-2 px-4 font-medium text-white"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4">
          <p className="text-center text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {errorMessage && (
        <CustomDialog
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default Login;
