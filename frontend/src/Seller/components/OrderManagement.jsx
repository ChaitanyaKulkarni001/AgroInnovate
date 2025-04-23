import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders] = useState([
    { orderId: 'ORD001', customer: 'John Doe', status: 'Pending' },
    { orderId: 'ORD002', customer: 'Jane Smith', status: 'Shipped' },
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Management</h2>
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{order.orderId}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => console.log('Status updated to', e.target.value)}
                  className="p-2 rounded-md border border-gray-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
