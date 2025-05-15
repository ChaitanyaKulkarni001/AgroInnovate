import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupStep3 = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('bankAccountNumber', data.bankAccountNumber);
    localStorage.setItem('ifscCode', data.ifscCode);
    localStorage.setItem('upiId', data.upiId || '');
    // Assuming files will be handled via backend upload
    navigate('/signup3');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold text-center mb-6 text-green-800">Bank & ID Details</h2>

        <input
          placeholder="Bank Account Number"
          {...register('bankAccountNumber', { required: 'Required' })}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        />
        {errors.bankAccountNumber && <p className="text-red-500 text-sm">{errors.bankAccountNumber.message}</p>}

        <input
          placeholder="IFSC Code"
          {...register('ifscCode', { required: 'Required' })}
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        />
        {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>}

        <input
          placeholder="UPI ID (optional)"
          {...register('upiId')}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-900 transition"
        >
          Finish
        </button>
      </form>
    </div>
  );
};

export default SignupStep3;
