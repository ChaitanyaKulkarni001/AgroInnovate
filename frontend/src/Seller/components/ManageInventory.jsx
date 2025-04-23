import React, { useState } from 'react';

const ManageInventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Organic Apple', stock: 100, price: 20 },
    { id: 2, name: 'Organic Banana', stock: 200, price: 15 },
  ]);

  const handleUpdateStock = (id, newStock) => {
    setInventory((prevInventory) =>
      prevInventory.map((product) =>
        product.id === id ? { ...product, stock: newStock } : product
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Inventory</h2>
      <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg shadow-lg">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Update Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="px-6 py-4">${item.price}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleUpdateStock(item.id, e.target.value)}
                  className="p-2 rounded-md border border-gray-300"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventory;
