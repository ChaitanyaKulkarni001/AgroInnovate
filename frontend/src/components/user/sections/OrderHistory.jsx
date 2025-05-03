import React, { useEffect, useState } from 'react';

// Simulated dummy orders
const dummyOrders = [
  {
    id: 'ORD123456',
    date: '2024-03-15',
    status: 'Delivered',
    total: 1899,
    items: [
      {
        name: 'Tractor Plough',
        image: '/images/plough.jpg',
        quantity: 1,
        price: 1500,
      },
      {
        name: 'Fertilizer - Urea',
        image: '/images/urea.jpg',
        quantity: 2,
        price: 199,
      },
    ],
  },
  {
    id: 'ORD789101',
    date: '2024-04-01',
    status: 'Shipped',
    total: 2200,
    items: [
      {
        name: 'Organic Seeds Pack',
        image: '/images/seeds.jpg',
        quantity: 3,
        price: 700,
      },
    ],
  },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Here you can fetch from API instead
    setOrders(dummyOrders);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-6">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between mb-3 text-sm text-gray-700">
                <div>Order ID: <span className="font-medium">{order.id}</span></div>
                <div>Status: <span className="font-semibold text-green-700">{order.status}</span></div>
              </div>
              <div className="text-sm text-gray-600 mb-2">Placed on: {order.date}</div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-green-900 font-medium">{item.name}</h4>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-green-700 font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="text-right font-bold text-green-900 mt-2">Total: ₹{order.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
