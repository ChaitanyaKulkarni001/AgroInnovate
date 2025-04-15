import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignupStep3 = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log('Step 3 Data:', data);
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/signup-step-2');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Farming Details - Step 3</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Products Interested in (or Selling)</label>
            <input
              id="product"
              type="text"
              {...register("product", { required: "This field is required" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>}
          </div>

          <div>
            <label htmlFor="landSize" className="block text-sm font-medium text-gray-700">Land Size (in acres)</label>
            <input
              id="landSize"
              type="number"
              {...register("landSize", { required: "Please enter land size" })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.landSize && <p className="text-red-500 text-xs mt-1">{errors.landSize.message}</p>}
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
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupStep3;
