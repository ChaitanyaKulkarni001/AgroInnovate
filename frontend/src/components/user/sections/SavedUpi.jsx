import React, { useState } from "react";

const SavedUpi = () => {
  const [upis, setUpis] = useState([
    { id: 1, upiId: "ravi@ybl" },
    { id: 2, upiId: "sunita@oksbi" },
    { id: 3, upiId: "amit@paytm" },
  ]);

  const handleDeleteUpi = (id) => {
    setUpis(upis.filter((upi) => upi.id !== id));
  };

  const handleAddUpi = () => {
    const newUpiId = prompt("Enter new UPI ID:");
    if (newUpiId) {
      setUpis([...upis, { id: Date.now(), upiId: newUpiId }]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Saved UPI IDs</h1>

      {upis.length === 0 ? (
        <p className="text-gray-600">No UPI IDs saved yet.</p>
      ) : (
        upis.map((upi) => (
          <div
            key={upi.id}
            className="flex justify-between items-center bg-white border p-4 rounded-lg mb-3 shadow-sm"
          >
            <span className="text-lg text-gray-800">{upi.upiId}</span>
            <button
              onClick={() => handleDeleteUpi(upi.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}

      <button
        onClick={handleAddUpi}
        className="mt-5 bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        + Add New UPI
      </button>
    </div>
  );
};

export default SavedUpi;
