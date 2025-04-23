import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { orderId: 'ORD001', customer: 'John Doe', status: 'Pending' },
    { orderId: 'ORD002', customer: 'Jane Smith', status: 'Shipped' },
  ]);

  const [newOrder, setNewOrder] = useState({
    orderId: '',
    customer: '',
    status: 'Pending',
  });

  // Handle input changes for new order form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Handle adding new order
  const handleAddOrder = (e) => {
    e.preventDefault();
    if (newOrder.orderId && newOrder.customer) {
      setOrders([...orders, newOrder]);
      setNewOrder({ orderId: '', customer: '', status: 'Pending' }); // Reset form
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handle status change of existing orders
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200'; // Yellow for Pending
      case 'Shipped':
        return 'bg-blue-200';  // Blue for Shipped
      case 'Delivered':
        return 'bg-green-200'; // Green for Delivered
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-green-800 mb-6 font-serif">Order Management</h2>

      {/* Add New Order Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-700">Add New Order</h3>
        <form onSubmit={handleAddOrder} className="mt-4 grid gap-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={newOrder.orderId}
              onChange={handleInputChange}
              className="p-2 w-full border border-green-300 rounded-md shadow-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={newOrder.customer}
              onChange={handleInputChange}
              className="p-2 w-full border border-green-300 rounded-md shadow-md focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Order Status</label>
            <select
              id="status"
              name="status"
              value={newOrder.status}
              onChange={handleInputChange}
              className="p-2 w-full border border-green-300 rounded-md shadow-md focus:ring-2 focus:ring-green-500"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            Add Order
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <table className="w-full text-sm text-left text-green-700 bg-white rounded-lg shadow">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-green-50 transition duration-300 ease-in-out">
              <td className="px-6 py-4">{order.orderId}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className={`px-6 py-4 font-medium ${getStatusColor(order.status)} text-green-800 rounded-lg`}>
                {order.status}
              </td>
              <td className="px-6 py-4">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  className="p-2 rounded-md border border-green-300 bg-green-50 focus:ring-2 focus:ring-green-500"
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
