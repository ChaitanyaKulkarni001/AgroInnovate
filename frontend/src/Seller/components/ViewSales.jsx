import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

const ViewSales = () => {
  const [salesData] = useState([
    { date: '2025-04-10', sales: 150 },
    { date: '2025-04-11', sales: 200 },
    { date: '2025-04-12', sales: 180 },
  ]);

  const totalSales = salesData.reduce((acc, item) => acc + item.sales, 0);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-xl max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
      <p className="text-xl text-gray-600 mb-6">Total Sales: <span className="font-bold text-green-700">{totalSales} units</span></p>

      {/* Sales Chart */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(str) => moment(str).format('MMM D')} />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} units`, 'Sales']} labelFormatter={(label) => moment(label).format('MMMM D, YYYY')} />
            <Line type="monotone" dataKey="sales" stroke="#38a169" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto shadow-lg bg-white rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Sales</th>
              <th className="px-6 py-3">Change</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => {
              const previous = salesData[index - 1]?.sales || 0;
              const change = sale.sales - previous;
              const changeStyle = change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
              const changeIcon = change > 0 ? '⬆️' : change < 0 ? '⬇️' : '→';

              return (
                <tr key={index} className="border-b hover:bg-gray-50 transition duration-300 ease-in-out">
                  <td className="px-6 py-4">{moment(sale.date).format('MMM D, YYYY')}</td>
                  <td className="px-6 py-4">{sale.sales}</td>
                  <td className={`px-6 py-4 font-medium ${changeStyle}`}>
                    {index === 0 ? '—' : `${changeIcon} ${change > 0 ? '+' : ''}${change}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSales;
