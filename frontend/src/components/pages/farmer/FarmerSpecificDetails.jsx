import React from "react";

const FarmerSpecificDetails = ({ onSubmit }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Farmer Specific Details</h2>
        {/* Farmer-specific fields */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Example field */}
          <div>
            <label htmlFor="farmSize" className="text-green-900 block mb-1">
              Farm Size (in acres)
            </label>
            <input
              type="number"
              id="farmSize"
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-600"
              placeholder="Enter farm size"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-900 text-white py-3 rounded-md font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerSpecificDetails;
