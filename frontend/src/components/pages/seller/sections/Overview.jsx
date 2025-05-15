import React from 'react';

const Overview = () => {
  // Dummy summary stats (could come from an API later)
  const stats = [
    { label: 'Total Products', value: 124, color: 'bg-blue-500' },
    { label: 'Pending Orders', value: 18, color: 'bg-yellow-500' },
    { label: 'Total Earnings', value: '₹1,50,000', color: 'bg-green-500' },
    { label: 'New Messages', value: 7, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Seller Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow bg-white flex flex-col items-center space-y-3"
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white font-bold text-lg ${stat.color}`}>
              {typeof stat.value === 'number' ? stat.value : '₹'}
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {stat.value}
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
