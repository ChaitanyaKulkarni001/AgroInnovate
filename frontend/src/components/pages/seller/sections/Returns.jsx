import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Returns = () => {
  const [returns, setReturns] = useState([
    {
      id: 501,
      productName: 'Organic Onions',
      buyerName: 'Amit Sharma',
      reason: 'Received damaged product',
      date: '2025-04-20',
      status: 'Requested',
    },
    {
      id: 502,
      productName: 'Desi Ghee',
      buyerName: 'Sneha Deshmukh',
      reason: 'Wrong product delivered',
      date: '2025-04-18',
      status: 'Approved',
    },
  ]);

  const updateReturnStatus = (id, newStatus) => {
    setReturns(returns.map(ret => ret.id === id ? { ...ret, status: newStatus } : ret));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Returns Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border">Return ID</th>
              <th className="p-4 border">Product</th>
              <th className="p-4 border">Buyer</th>
              <th className="p-4 border">Reason</th>
              <th className="p-4 border">Date</th>
              <th className="p-4 border">Status</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(ret => (
              <tr key={ret.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border font-medium">{ret.id}</td>
                <td className="p-4 border">{ret.productName}</td>
                <td className="p-4 border">{ret.buyerName}</td>
                <td className="p-4 border">{ret.reason}</td>
                <td className="p-4 border">{ret.date}</td>
                <td className={`p-4 border font-semibold ${ret.status === 'Requested' ? 'text-yellow-600' : ret.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                  {ret.status}
                </td>
                <td className="p-4 border flex space-x-4">
                  {ret.status === 'Requested' && (
                    <>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Approved')}
                        className="text-green-600 hover:text-green-800 flex items-center space-x-1"
                      >
                        <FaCheck /><span>Approve</span>
                      </button>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'Declined')}
                        className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                      >
                        <FaTimes /><span>Decline</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {returns.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No returns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Returns;
