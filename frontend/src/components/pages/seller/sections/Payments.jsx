import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: 'TXN1001',
      date: '2025-04-20',
      orderId: 'ORD12345',
      product: 'Fresh Tomatoes',
      amount: 1500,
      status: 'Paid',
    },
    {
      id: 'TXN1002',
      date: '2025-04-19',
      orderId: 'ORD12346',
      product: 'Desi Ghee',
      amount: 2500,
      status: 'Pending',
    },
    {
      id: 'TXN1003',
      date: '2025-04-18',
      orderId: 'ORD12347',
      product: 'Organic Wheat',
      amount: 3200,
      status: 'Paid',
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Payments Report</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <FaDownload className="mr-2" /> Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border">Transaction ID</th>
              <th className="p-4 border">Date</th>
              <th className="p-4 border">Order ID</th>
              <th className="p-4 border">Product</th>
              <th className="p-4 border">Amount (₹)</th>
              <th className="p-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border font-medium">{payment.id}</td>
                <td className="p-4 border">{payment.date}</td>
                <td className="p-4 border">{payment.orderId}</td>
                <td className="p-4 border">{payment.product}</td>
                <td className="p-4 border font-semibold">₹ {payment.amount}</td>
                <td className={`p-4 border font-semibold ${
                  payment.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {payment.status}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
