import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Sample products data (This can be replaced by an API call in the real app)
const sampleProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    description: 'This is a great product for all your needs!',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    description: 'A premium product for professionals.',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    description: 'Affordable and durable for everyday use.',
  },
];

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Simulate an API call to fetch products for the seller
  useEffect(() => {
    setProducts(sampleProducts); // Here we use the sample data, replace it with actual API call
  }, []);

  const handleDelete = (productId) => {
    // Logic for deleting a product (Can be replaced with an API call)
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">My Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700 mt-2">{product.description}</p>
              <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/edit-product/${product.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProductsPage;
