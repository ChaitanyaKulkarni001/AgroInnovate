import React, { useState } from 'react';
import { Leaf, Trash2, PlusCircle } from 'lucide-react'; // Optional: icons

const ManageInventory = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: '🌿 Organic Apple', stock: 100, price: 20 },
    { id: 2, name: '🌽 Organic Banana', stock: 200, price: 15 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '' });
  const [toast, setToast] = useState('');

  const handleUpdateStock = (id, newStock) => {
    setInventory((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, stock: Number(newStock) } : product
      )
    );
    showToast('🌱 Stock updated successfully!');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.stock || !newProduct.price) return;
    const newItem = {
      id: Date.now(),
      name: '🌿 ' + newProduct.name,
      stock: Number(newProduct.stock),
      price: Number(newProduct.price),
    };
    setInventory([...inventory, newItem]);
    setNewProduct({ name: '', stock: '', price: '' });
    showToast('🌾 Product added!');
  };

  const deleteProduct = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
    showToast('❌ Product removed.');
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
        <Leaf size={28} className="text-green-700" />
        Manage Farm Inventory
      </h2>

      {/* Toast */}
      {toast && (
        <div className="mb-4 px-4 py-2 bg-amber-100 text-amber-800 rounded shadow font-medium">
          {toast}
        </div>
      )}

      {/* Add Product */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-green-100">
        <h3 className="text-xl font-semibold text-green-700 mb-4">🌿 Add New Crop</h3>
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Crop Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border border-green-300 rounded-md w-48 focus:outline-green-500"
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="p-2 border border-green-300 rounded-md w-32 focus:outline-green-500"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border border-green-300 rounded-md w-32 focus:outline-green-500"
          />
          <button
            onClick={handleAddProduct}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 flex items-center gap-2"
          >
            <PlusCircle size={16} /> Add
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <table className="w-full text-sm text-left bg-white rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3">Crop</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Price (₹)</th>
            <th className="px-6 py-3">Update Stock</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-b hover:bg-green-50 transition">
              <td className="px-6 py-4 font-medium text-green-900">{item.name}</td>
              <td className="px-6 py-4 flex items-center gap-2">
                {item.stock}
                {item.stock < 10 && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                    Low
                  </span>
                )}
              </td>
              <td className="px-6 py-4">₹{item.price}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleUpdateStock(item.id, e.target.value)}
                  className="p-2 border border-green-300 rounded-md w-24"
                />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => deleteProduct(item.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventory;
