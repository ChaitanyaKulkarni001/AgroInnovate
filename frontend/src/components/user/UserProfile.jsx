import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-green-800">My Account</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="viewed" className="hover:text-green-700">Viewed Products</NavLink>
          <NavLink to="orders" className="hover:text-green-700">Order History</NavLink>
          <NavLink to="wishlist" className="hover:text-green-700">Wishlist</NavLink>
          <NavLink to="addresses" className="hover:text-green-700">Saved Addresses</NavLink>
          <NavLink to="payments" className="hover:text-green-700">Payment Methods</NavLink>
          <NavLink to="faq" className="hover:text-green-700">FAQs</NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfile;
