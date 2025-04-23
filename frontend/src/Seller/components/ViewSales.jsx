import React, { useState } from 'react';

const ViewSales = () => {
  const [salesData] = useState([
    { date: '2025-04-10', sales: 150 },
    { date: '2025-04-11', sales: 200 },
    { date: '2025-04-12', sales: 180 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Sales</h2>
      <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg shadow-lg">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Sales</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{sale.date}</td>
              <td className="px-6 py-4">{sale.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSales;
