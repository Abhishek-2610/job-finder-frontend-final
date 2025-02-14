// src/components/ProfileSection.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function ProfileSection({ data, setData }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: data.name || '',
      email: data.email || '',
      linkedin: data.linkedin || '',
      github: data.github || '',
    },
  });

  // When entering edit mode, populate the form with current data
  useEffect(() => {
    if (isEditing) {
      reset({
        name: data.name || '',
        email: data.email || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
      });
    }
  }, [isEditing, data, reset]);

  const onSubmit = (formData) => {
    setData(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("email", {
                required: "Enter valid email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Enter valid email",
                },
              })}
              className={`p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* LinkedIn Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              LinkedIn: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("linkedin", {
                required: "Enter valid LinkedIn",
                pattern: {
                  value: /^https:\/\/www\.linkedin\.com/,
                  message: "Enter valid LinkedIn",
                },
              })}
              className={`p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.linkedin
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
              }`}
            />
            {errors.linkedin && (
              <span className="text-red-500 text-sm">{errors.linkedin.message}</span>
            )}
          </div>

          {/* GitHub Field */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">
              GitHub: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("github", {
                required: "Enter valid GitHub",
                pattern: {
                  value: /^https:\/\/github\.com\/[A-Za-z0-9_-]+$/,
                  message: "Enter valid GitHub",
                },
              })}
              className={`p-2 border rounded-md focus:outline-none transition-all duration-300 ${
                errors.github
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50"
              }`}
            />
            {errors.github && (
              <span className="text-red-500 text-sm">{errors.github.message}</span>
            )}
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        // Read-Only View
        <div className="space-y-4">
          <div>
            <p>
              <strong>Name:</strong> {data.name || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>Email:</strong> {data.email || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>LinkedIn:</strong> {data.linkedin || "N/A"}
            </p>
          </div>
          <div>
            <p>
              <strong>GitHub:</strong> {data.github || "N/A"}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-all duration-300"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
