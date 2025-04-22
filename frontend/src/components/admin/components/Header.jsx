import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-green-800">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Admin</span>
        <img
          src="https://i.pravatar.cc/40?img=5"
          alt="admin avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
