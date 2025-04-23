import React, { useState } from 'react';

const ProductAnalytics = () => {
  const [analyticsData] = useState([
    { productName: 'Organic Apple', views: 350, clicks: 40, conversionRate: 11.43 },
    { productName: 'Organic Banana', views: 500, clicks: 60, conversionRate: 12.00 },
    { productName: 'Organic Carrot', views: 120, clicks: 15, conversionRate: 12.5 },
    { productName: 'Organic Tomato', views: 220, clicks: 30, conversionRate: 13.64 },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Analytics</h2>

      <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-green-600 text-white rounded-t-xl">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Views</th>
              <th className="px-6 py-3">Clicks</th>
              <th className="px-6 py-3">Conversion Rate</th>
              <th className="px-6 py-3">Performance</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map((data, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
              >
                <td className="px-6 py-4">{data.productName}</td>
                <td className="px-6 py-4">{data.views}</td>
                <td className="px-6 py-4">{data.clicks}</td>
                <td className="px-6 py-4">{data.conversionRate}%</td>
                <td className="px-6 py-4">
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-white ${
                      data.conversionRate > 12
                        ? 'bg-green-500'
                        : data.conversionRate > 10
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {data.conversionRate > 12
                      ? 'Excellent'
                      : data.conversionRate > 10
                      ? 'Good'
                      : 'Needs Improvement'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductAnalytics;
