import React from 'react';

const Reports = () => {
  // Sample dummy data (this could later be fetched via API)
  const reportData = [
    { id: 1, product: 'Wireless Headphones', sales: 120, stockLeft: 30, revenue: 36000 },
    { id: 2, product: 'Smart Watch', sales: 85, stockLeft: 20, revenue: 25500 },
    { id: 3, product: 'Bluetooth Speaker', sales: 60, stockLeft: 10, revenue: 18000 },
  ];

  const totalRevenue = reportData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Sales & Inventory Reports</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Summary</h3>
        <p className="text-gray-600 mt-2">Total Revenue: <span className="font-bold text-green-600">₹{totalRevenue}</span></p>
      </div>

      <table className="w-full table-auto border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border text-left">Product</th>
            <th className="p-3 border text-left">Sales</th>
            <th className="p-3 border text-left">Stock Left</th>
            <th className="p-3 border text-left">Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3 border">{item.product}</td>
              <td className="p-3 border">{item.sales}</td>
              <td className="p-3 border">{item.stockLeft}</td>
              <td className="p-3 border">₹{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
