import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('farmName', data.farmName);
    localStorage.setItem('farmSize', data.farmSize);
    localStorage.setItem('farmType', data.farmType);
    localStorage.setItem('experienceYears', data.experienceYears);
    navigate('/signup3');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-center mb-6 text-green-800">Farm Information</h2>

        <input
          placeholder="Farm Name"
          {...register('farmName', { required: 'Farm name is required' })}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        />
        {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName.message}</p>}

        <input
          placeholder="Farm Size (acres)"
          type="number"
          step="0.01"
          {...register('farmSize', { required: 'Farm size is required' })}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        />
        {errors.farmSize && <p className="text-red-500 text-sm">{errors.farmSize.message}</p>}

        <select
          {...register('farmType', { required: 'Select farm type' })}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        >
          <option value="">Select Farm Type</option>
          <option value="Organic">Organic</option>
          <option value="Conventional">Conventional</option>
        </select>
        {errors.farmType && <p className="text-red-500 text-sm">{errors.farmType.message}</p>}

        <input
          placeholder="Years of Experience"
          type="number"
          {...register('experienceYears', { required: 'Experience is required' })}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />
        {errors.experienceYears && <p className="text-red-500 text-sm">{errors.experienceYears.message}</p>}

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SignupStep2;
