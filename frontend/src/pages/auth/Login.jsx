import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    if(data.email === 'shreya@mail.com' && data.password === '123')
    {
      navigate('/dashboard')
    }
    // Handle login logic (e.g., API call) here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit" 
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-500 text-[20px] transition duration-300 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-green-600 font-semibold hover:text-green-500 cursor-pointer">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
