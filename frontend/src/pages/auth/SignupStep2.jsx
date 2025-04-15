import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Step 2 Data:', data);
    navigate('/signup-step-3');
  };

  const handleBack = () => {
    navigate('/signup-step-1');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Farming Profile - Step 2</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Are you a Seller or Consumer?</label>
            <select
              id="userType"
              {...register("userType", { required: "Please select user type" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="seller">Seller</option>
              <option value="consumer">Consumer</option>
            </select>
            {errors.userType && <p className="text-red-500 text-xs mt-1">{errors.userType.message}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500 cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupStep2;

