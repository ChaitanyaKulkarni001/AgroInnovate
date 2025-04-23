import React from "react";
import { useForm } from "react-hook-form";

const PersonalDetails = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    console.log("Personal Details Submitted:", data);
    onNext(data); // Trigger next page logic with submitted data
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Personal Details
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="text-green-900 block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("dob", { required: "Date of birth is required" })}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="text-green-900 block mb-1">
              Gender
            </label>
            <select
              id="gender"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">-- Choose Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-900 text-white py-3 rounded-md font-semibold transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
