import React, { useState } from "react";

const FarmerPage1 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    farm_name: "",
    farm_size: "",
    farm_type: "",
    experience_years: "",
    business_registration_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData); // Pass data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Personal & Farm Info</h2>

      <div>
        <label className="block font-medium">Farm Name</label>
        <input
          type="text"
          name="farm_name"
          value={formData.farm_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Farm Size (in acres)</label>
        <input
          type="number"
          name="farm_size"
          value={formData.farm_size}
          onChange={handleChange}
          step="0.01"
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Farm Type</label>
        <select
          name="farm_type"
          value={formData.farm_type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        >
          <option value="">Select Farm Type</option>
          <option value="Organic">Organic</option>
          <option value="Conventional">Conventional</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Years of Experience</label>
        <input
          type="number"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          min="0"
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Business Registration Number</label>
        <input
          type="text"
          name="business_registration_number"
          value={formData.business_registration_number}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="(Optional)"
        />
      </div>

      {/* Buttons Row */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded transition"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default FarmerPage1;
