import React, { useState } from "react";

const dummyAddresses = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    address: "123 Green Valley, Near Main Market, Pune, Maharashtra - 411001",
    type: "Home",
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "8765432109",
    address: "Village Post, Block 2, Jhansi, Uttar Pradesh - 284001",
    type: "Farm",
  },
];

const AddressManager = () => {
  const [addresses, setAddresses] = useState(dummyAddresses);

  const handleDelete = (id) => {
    const updated = addresses.filter((addr) => addr.id !== id);
    setAddresses(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-green-800">Saved Addresses</h2>

      {addresses.map((addr) => (
        <div key={addr.id} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-lg">{addr.name}</p>
              <p className="text-sm text-gray-700">{addr.phone}</p>
              <p className="text-gray-600 mt-1">{addr.address}</p>
              <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{addr.type}</span>
            </div>
            <div className="space-x-2">
              <button className="text-blue-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline" onClick={() => handleDelete(addr.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}

      <button className="mt-6 bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800">
        + Add New Address
      </button>
    </div>
  );
};

export default AddressManager;
