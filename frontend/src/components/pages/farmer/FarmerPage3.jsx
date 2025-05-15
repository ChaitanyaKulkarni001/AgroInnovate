import React, { useState } from "react";

const FarmerPage3 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    id_proof: null,
    ownership_proof: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 4: Upload Documents</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">ID Proof (Aadhar, PAN, etc.)</label>
          <input
            type="file"
            name="id_proof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ownership Proof (Land, Lease, etc.)</label>
          <input
            type="file"
            name="ownership_proof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          
          <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Back
        </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default FarmerPage3;
