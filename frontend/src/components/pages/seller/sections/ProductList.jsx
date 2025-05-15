import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Wheat',
      category: 'Grains',
      price: 450,
      stock: 100,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      price: 30,
      stock: 50,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Products</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border">Image</th>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Category</th>
              <th className="p-4 border">Price (₹)</th>
              <th className="p-4 border">Stock</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 border font-medium">{product.name}</td>
                <td className="p-4 border">{product.category}</td>
                <td className="p-4 border">₹{product.price}</td>
                <td className="p-4 border">{product.stock}</td>
                <td className="p-4 border flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No products added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
