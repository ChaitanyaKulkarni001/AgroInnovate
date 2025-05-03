 // components/Settings.jsx

import React from 'react';

const Settings = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
      <p className="text-gray-600">Update your personal information, password, and notification preferences here.</p>
      
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="yourname@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Change Password</label>
          <input
            type="password"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="New password"
          />
        </div>
        <button className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition-all duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
