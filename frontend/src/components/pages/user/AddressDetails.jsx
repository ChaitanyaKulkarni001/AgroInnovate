import React from "react";
import { useForm } from "react-hook-form";

const AddressDetails = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    console.log("Address Info Submitted:", data);
    onNext(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Address Information
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">

          {/* Address Line 1 */}
          <div>
            <label htmlFor="address_line1" className="text-green-900 block mb-1">
              Address Line 1
            </label>
            <input
              id="address_line1"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("address_line1", { required: "Address is required" })}
            />
            {errors.address_line1 && <p className="text-red-500 text-sm">{errors.address_line1.message}</p>}
          </div>

          {/* Address Line 2 (Optional) */}
          <div>
            <label htmlFor="address_line2" className="text-green-900 block mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              id="address_line2"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("address_line2")}
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="text-green-900 block mb-1">City</label>
            <input
              id="city"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="text-green-900 block mb-1">State</label>
            <input
              id="state"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="text-green-900 block mb-1">Country</label>
            <input
              id="country"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("country", { required: "Country is required" })}
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label htmlFor="pincode" className="text-green-900 block mb-1">Pincode</label>
            <input
              id="pincode"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              {...register("pincode", { required: "Pincode is required" })}
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
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

export default AddressDetails;
