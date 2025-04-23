import React, { useState } from 'react';

const FinancialsAndPayments = () => {
  const [transactions] = useState([
    { id: 1, date: '2025-04-20', amount: 200, method: 'Bank Transfer' },
    { id: 2, date: '2025-04-18', amount: 150, method: 'UPI' },
    { id: 3, date: '2025-04-15', amount: 100, method: 'Paytm' },
  ]);

  const [productEarnings] = useState([
    { product: 'Organic Apple', earnings: 600 },
    { product: 'Organic Banana', earnings: 400 },
    { product: 'Wheat Grains', earnings: 200 },
  ]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-green-800 mb-6">🌾 Financials & Payments</h3>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow-md">
          <p className="text-lg font-semibold">Total Earnings</p>
          <p className="text-2xl font-bold">$1200</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow-md">
          <p className="text-lg font-semibold">Pending Payments</p>
          <p className="text-2xl font-bold">$300</p>
        </div>
      </div>

      {/* Product-wise Earnings */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">🌽 Earnings by Product</h4>
        <ul className="space-y-2">
          {productEarnings.map((item, idx) => (
            <li key={idx} className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
              <span>{item.product}</span>
              <span className="font-semibold text-green-700">${item.earnings}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-2">💳 Recent Transactions</h4>
        <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg shadow-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">${tx.amount}</td>
                <td className="px-4 py-2">{tx.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Withdraw Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-gray-800">🏦 Withdraw Earnings</h4>
        <input
          type="text"
          placeholder="Enter Bank/UPI Details"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg transition duration-300 w-fit">
          Withdraw Now
        </button>
      </div>
    </div>
  );
};

export default FinancialsAndPayments;
