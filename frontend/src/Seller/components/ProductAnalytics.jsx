import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const ProductAnalytics = () => {
  const [analyticsData] = useState([
    { productName: 'Organic Apple', unitsSold: 150, revenue: 3000 },
    { productName: 'Organic Banana', unitsSold: 200, revenue: 2800 },
    { productName: 'Organic Carrot', unitsSold: 90, revenue: 1200 },
    { productName: 'Organic Tomato', unitsSold: 130, revenue: 1950 },
  ]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Sales Analytics</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="unitsSold" fill="#38a169" name="Units Sold" />
          <Bar dataKey="revenue" fill="#3182ce" name="Revenue ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductAnalytics;
