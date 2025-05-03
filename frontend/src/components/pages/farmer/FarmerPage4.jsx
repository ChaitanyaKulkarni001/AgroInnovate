import React from "react";

const FarmerPage4 = ({ data, onBack, onSubmit }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Step 5: Confirm & Submit</h2>

      <div className="space-y-4">
        <h3 className="font-semibold">Personal & Farm Information:</h3>
        <ul>
          <li><strong>Farm Name:</strong> {data.farm_name}</li>
          <li><strong>Farm Size:</strong> {data.farm_size} acres</li>
          <li><strong>Farm Type:</strong> {data.farm_type}</li>
          <li><strong>Experience Years:</strong> {data.experience_years}</li>
        </ul>

        <h3 className="font-semibold">Bank & Payment Information:</h3>
        <ul>
          <li><strong>Bank Account Number:</strong> {data.bank_account_number}</li>
          <li><strong>IFSC Code:</strong> {data.ifsc_code}</li>
          <li><strong>UPI ID:</strong> {data.upi_id}</li>
        </ul>

        <h3 className="font-semibold">Uploaded Documents:</h3>
        <ul>
          <li><strong>ID Proof:</strong> {data.id_proof.name}</li>
          <li><strong>Ownership Proof:</strong> {data.ownership_proof.name}</li>
        </ul>
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
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FarmerPage4;
