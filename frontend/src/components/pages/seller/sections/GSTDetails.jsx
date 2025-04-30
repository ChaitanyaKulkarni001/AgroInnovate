import React, { useState } from 'react';

const GSTDetails = () => {
  const [gstDetails, setGstDetails] = useState({
    gstNumber: '',
    businessAddress: '',
    state: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGstDetails({
      ...gstDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gstDetails); // Replace with actual API call
    alert('GST Details submitted successfully!');
    // Optionally reset
    // setGstDetails({ gstNumber: '', businessAddress: '', state: '', city: '', pincode: '' });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">GST Details</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={gstDetails.gstNumber}
            onChange={handleChange}
            required
            placeholder="e.g. 27AAEPM0123C1Z5"
            className="w-full mt-1 p-3 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business Address</label>
          <textarea
            name="businessAddress"
            value={gstDetails.businessAddress}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Full business address"
            className="w-full mt-1 p-3 border rounded-md"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={gstDetails.state}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={gstDetails.city}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={gstDetails.pincode}
            onChange={handleChange}
            required
            maxLength="6"
            pattern="\d{6}"
            className="w-full mt-1 p-3 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Save GST Details
        </button>
      </form>
    </div>
  );
};

export default GSTDetails;
