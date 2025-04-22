import React from "react";
import { useForm } from "react-hook-form";

const ContactDetails = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Contact Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="text-green-900 block mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Enter phone number"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="text-green-900 block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Enter address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Submit Button */}
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

export default ContactDetails;
