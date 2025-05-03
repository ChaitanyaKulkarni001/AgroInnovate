import React, { useState } from 'react';
import { FaTruck, FaCheck } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 101,
      productName: 'Organic Wheat',
      buyerName: 'Rajesh Kumar',
      date: '2025-04-22',
      quantity: 5,
      status: 'Pending',
    },
    {
      id: 102,
      productName: 'Fresh Tomatoes',
      buyerName: 'Suman Patil',
      date: '2025-04-21',
      quantity: 10,
      status: 'Shipped',
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border">Order ID</th>
              <th className="p-4 border">Product</th>
              <th className="p-4 border">Buyer</th>
              <th className="p-4 border">Order Date</th>
              <th className="p-4 border">Quantity</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border font-medium">{order.id}</td>
                <td className="p-4 border">{order.productName}</td>
                <td className="p-4 border">{order.buyerName}</td>
                <td className="p-4 border">{order.date}</td>
                <td className="p-4 border">{order.quantity}</td>
                <td className={`p-4 border font-semibold ${order.status === 'Pending' ? 'text-yellow-600' : order.status === 'Shipped' ? 'text-blue-600' : 'text-green-600'}`}>
                  {order.status}
                </td>
                <td className="p-4 border flex space-x-4">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => updateStatus(order.id, 'Shipped')}
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <FaTruck /><span>Ship</span>
                    </button>
                  )}
                  {order.status === 'Shipped' && (
                    <button
                      onClick={() => updateStatus(order.id, 'Delivered')}
                      className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                    >
                      <FaCheck /><span>Deliver</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
