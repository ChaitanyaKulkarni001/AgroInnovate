import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupStep1 = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('mobile', data.mobile);
    navigate('/signup2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-800">Create Account</h2>
          <p className="text-gray-600 mt-1">Start your farming journey with us</p>
        </div>

        {/* Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 mb-2 border rounded-lg"
        />
        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email Address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Email is not valid',
            },
          })}
          className="w-full px-4 py-2 mb-2 border rounded-lg"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        {/* Mobile Number Field */}
        <input
          type="tel"
          placeholder="Mobile Number"
          {...register('mobile', {
            required: 'Mobile number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Enter a valid 10-digit mobile number',
            },
          })}
          className="w-full px-4 py-2 mb-2 border rounded-lg"
        />
        {errors.mobile && <p className="text-red-500 text-sm mb-4">{errors.mobile.message}</p>}

        {/* Submit Button */}
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

export default SignupStep1;
