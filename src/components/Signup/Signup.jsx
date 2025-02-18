import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../store-slices/user-details/user-details";
import { updateNavPage } from "../../store-slices/navigation/nav-page";
import Loader from "../Loader";
import {
  validateEmail,
  validateNotEmpty,
  validatePassword,
  validateGitHubLink,
  validateLinkedInLink,
} from "../../utils/validation";
import CustomDialog from "../customDialog";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Singup = () => {
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    githubLink: "",
    linkedinLink: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isGoogleVerified, setIsGoogleVerified] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Handle Google Signup
  const handleGoogleSignup = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      setFormData((prev) => ({
        ...prev,
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
      }));
      setIsGoogleVerified(true);
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    setErrorMessage("Google sign-in failed. Please try again.");
  };

  // Input change handler (with inline validation for password)
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors for this field
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    if (field === "password" && value) {
      if (!validatePassword(value)) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
        }));
      }
    }
  };

  // Step 1 -> Step 2
  const handleNext = () => {
    let newErrors = {};

    if (!validateNotEmpty(formData.name)) {
      newErrors.name = "Please enter your username";
    }

    if (!validateNotEmpty(formData.email)) {
      newErrors.email = "Please enter your email";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!validateNotEmpty(formData.password)) {
      newErrors.password = "Please enter your password";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  // Final Signup Handler
  const signupHandler = async () => {
    let newErrors = {};

    if (!validateNotEmpty(formData.firstName)) {
      newErrors.firstName = "Please enter your first name";
    }

    if (!validateNotEmpty(formData.lastName)) {
      newErrors.lastName = "Please enter your last name";
    }

    if (!validateNotEmpty(formData.githubLink)) {
      newErrors.githubLink = "Please enter your github link";
    } else if (!validateGitHubLink(formData.githubLink)) {
      newErrors.githubLink = "Please enter a valid Github link";
    }

    if (!validateNotEmpty(formData.linkedinLink)) {
      newErrors.linkedinLink = "Please enter your linkedin link";
    } else if (!validateLinkedInLink(formData.linkedinLink)) {
      newErrors.linkedinLink = "Please enter a valid LinkedIn link";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${publicIp}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const responseBody = await response.json();

      if (response.status === 200) {
        // save the userId in the current session
        dispatch(updateUserId(responseBody.data));
        dispatch(updateNavPage("user-details"));
        navigate("/user-details");
      } else {
        setErrorMessage("Error during sign up");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#7044c3] border-t border-white w-full">
      <div className="w-full max-w-[450px] bg-gray-800 p-8 rounded-xl shadow-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {step === 1 ? (
              <>
                {/* Header */}
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white text-center">
                  Sign Up
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-300">
                  <div className="text-center">
                    <span className="font-bold italic text-blue-300">
                      Create your account using Google
                    </span>
                  </div>
                </p>

                {/* Google Login (Step 1) */}
                {!isGoogleVerified && (
                  <div className="flex justify-center mt-6">
                    <GoogleLogin
                      onSuccess={handleGoogleSignup}
                      onError={handleGoogleError}
                      theme="filled_black"
                      size="large"
                      width={250}
                      text="signup_with"
                
                    />
                  </div>
                )}

                {/* Form Fields (Step 1) */}
                <form className="mt-6 flex flex-col gap-y-4">
                  {/* Username */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      Username <sup className="text-red-600">*</sup>
                    </p>
                    <div className="relative flex items-center">
                      <img
                        src={assets.user}
                        alt="User icon"
                        className="absolute left-2 w-[22px] opacity-70"
                      />
                      <input
                        type="text"
                        placeholder="Enter Username"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full h-11 pl-9 pr-3 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                    )}
                  </label>

                  {/* Email */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      Email Address <sup className="text-red-600">*</sup>
                    </p>
                    <div className="relative flex items-center">
                      <img
                        src={assets.email}
                        alt="Email icon"
                        className="absolute left-2 w-[22px] opacity-70"
                      />
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          !isGoogleVerified &&
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full h-11 pl-9 pr-3 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          isGoogleVerified
                            ? "bg-white cursor-not-allowed"
                            : "bg-white"
                        }`}
                        disabled={true} // must signup with Google
                        title="Please sign up using Google"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.email}
                      </p>
                    )}
                  </label>

                  {/* Password */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      Password <sup className="text-red-600">*</sup>
                    </p>
                    <div className="relative flex items-center">
                      <img
                        src={assets.password}
                        alt="Password icon"
                        className="absolute left-2 w-[22px] opacity-70"
                      />
                      <input
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full h-11 pl-9 pr-3 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-red-500 text-sm leading-tight">
                        {errors.password}
                      </p>
                    )}
                  </label>

                  {/* Buttons (Step 1) */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-4 rounded-[8px] bg-[#5f27c7] hover:bg-[#8963ce] transition-colors duration-300 py-2 px-4 font-medium text-white"
                  >
                    Next
                  </button>
                  <div className="mt-4">
                    <p className="text-center text-gray-300">
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-300 font-bold">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Header */}
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-white">
                  Profile Details
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-gray-300">
                  <span>Complete your profile</span>
                  <br />
                  <span className="font-bold italic text-blue-300">
                    and get started
                  </span>
                </p>

                {/* Form Fields (Step 2) */}
                <form className="mt-6 flex flex-col gap-y-4">
                  {/* First Name */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      First Name <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={(e) =>
                        !isGoogleVerified &&
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={`w-full h-11 px-3 py-2 border rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isGoogleVerified
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-700"
                      }`}
                      disabled={isGoogleVerified}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.firstName}
                      </p>
                    )}
                  </label>

                  {/* Last Name */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      Last Name <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={(e) =>
                        !isGoogleVerified &&
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className={`w-full h-11 px-3 py-2 border rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isGoogleVerified
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-700"
                      }`}
                      disabled={isGoogleVerified}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.lastName}
                      </p>
                    )}
                  </label>

                  {/* GitHub Link */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      GitHub Link <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter GitHub Link"
                      value={formData.githubLink}
                      onChange={(e) =>
                        setFormData({ ...formData, githubLink: e.target.value })
                      }
                      className="w-full h-11 px-3 py-2 border rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.githubLink && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.githubLink}
                      </p>
                    )}
                  </label>

                  {/* LinkedIn Link */}
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-200">
                      LinkedIn Link <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      placeholder="Enter LinkedIn Link"
                      value={formData.linkedinLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          linkedinLink: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3 py-2 border rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.linkedinLink && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.linkedinLink}
                      </p>
                    )}
                  </label>

                  {/* Buttons (Step 2) */}
                  <button
                    type="button"
                    onClick={signupHandler}
                    className="mt-4 rounded-[8px] bg-[#5f27c7] hover:bg-[#8963ce] transition-colors duration-300 py-2 px-4 font-medium text-white"
                  >
                    Sign Up
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>

      {/* Error Dialog */}
      {errorMessage && (
        <CustomDialog
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </div>
  );
};

export default Singup;
