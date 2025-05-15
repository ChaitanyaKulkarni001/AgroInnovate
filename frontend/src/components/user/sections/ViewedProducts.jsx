import React, { useEffect, useState } from 'react';

const ViewedProducts = () => {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('viewedProducts')) || [];
    setViewed(stored);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-800">Recently Viewed Products</h2>
      {viewed.length === 0 ? (
        <p className="text-gray-600">You haven't viewed any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {viewed.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-green-900">{product.name}</h3>
              <p className="text-green-700 font-medium">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewedProducts;
