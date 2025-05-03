import React from "react";
import { useForm } from "react-hook-form";

const FinalPreferences = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onFormSubmit = (data) => {
    console.log("Final Preferences Submitted:", data);
    onNext(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Final Preferences
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* Custom User-Defined Fields */}
          <div>
            <label htmlFor="udf1" className="text-green-900 block mb-1">
              Preference 1
            </label>
            <input
              type="text"
              id="udf1"
              {...register("udf1")}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Optional"
            />
          </div>

          <div>
            <label htmlFor="udf2" className="text-green-900 block mb-1">
              Preference 2
            </label>
            <input
              type="text"
              id="udf2"
              {...register("udf2")}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Optional"
            />
          </div>

          <div>
            <label htmlFor="udf3" className="text-green-900 block mb-1">
              Preference 3
            </label>
            <input
              type="text"
              id="udf3"
              {...register("udf3")}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Optional"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-900"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinalPreferences;
