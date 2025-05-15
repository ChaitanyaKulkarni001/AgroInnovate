import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaClipboardList, FaUsers, FaTags } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6 text-green-700">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "text-gray-700"}>
          <FaTachometerAlt className="inline mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "text-gray-700"}>
          <FaBox className="inline mr-2" /> Products
        </NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "text-gray-700"}>
          <FaClipboardList className="inline mr-2" /> Orders
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "text-gray-700"}>
          <FaUsers className="inline mr-2" /> Users
        </NavLink>
        <NavLink to="/admin/coupons" className={({ isActive }) => isActive ? "text-green-700 font-semibold" : "text-gray-700"}>
          <FaTags className="inline mr-2" /> Coupons
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
