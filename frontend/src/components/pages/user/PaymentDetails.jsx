import React from "react";
import { useForm } from "react-hook-form";

const PaymentDetails = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    console.log("Payment Info Submitted:", data);
    onNext(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Payment Information
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
          {/* Default Payment Method */}
          <div>
            <label htmlFor="payment_method" className="text-green-900 block mb-1">
              Preferred Payment Method
            </label>
            <select
              id="payment_method"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("payment_method", { required: "Payment method is required" })}
            >
              <option value="">-- Select Method --</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Wallet">Wallet</option>
              <option value="Other">Other</option>
            </select>
            {errors.payment_method && (
              <p className="text-red-500 text-sm">{errors.payment_method.message}</p>
            )}
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
