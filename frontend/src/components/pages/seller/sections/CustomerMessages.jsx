import React, { useState } from 'react';

const CustomerMessages = () => {
  // Sample dummy messages (can be fetched from API later)
  const [messages] = useState([
    {
      id: 1,
      name: 'Rohit Sharma',
      email: 'rohit@example.com',
      message: 'Hi, when will my order #12345 be delivered?',
      date: '2025-04-20',
    },
    {
      id: 2,
      name: 'Aditi Verma',
      email: 'aditi@example.com',
      message: 'Received a defective product. Need a replacement.',
      date: '2025-04-19',
    },
    {
      id: 3,
      name: 'Aman Kulkarni',
      email: 'aman@example.com',
      message: 'Thanks for the quick support team!',
      date: '2025-04-18',
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Customer Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages available.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{msg.name}</h3>
                <span className="text-sm text-gray-500">{msg.date}</span>
              </div>
              <p className="text-gray-700 mb-2">{msg.message}</p>
              <p className="text-sm text-gray-600">📧 {msg.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerMessages;
