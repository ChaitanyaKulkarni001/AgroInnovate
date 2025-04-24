import React from 'react';
import { FaHome, FaPlus, FaEdit, FaTag, FaWallet, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="w-64 bg-gray-800 text-white py-6 px-4">
      <h2 className="text-2xl font-semibold mb-8">Seller Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveComponent('addProduct')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaPlus /> <span>Add Product</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('manageInventory')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaEdit /> <span>Manage Inventory</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('viewSales')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaChartLine /> <span>View Sales</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('promotions')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaTag /> <span>Promotions & Discounts</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('financials')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaWallet /> <span>Financials</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('productAnalytics')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaChartLine /> <span>Product Analytics</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveComponent('orderManagement')}
              className="flex items-center space-x-2 text-lg"
            >
              <FaChartLine /> <span>Order Management</span>
            </button>
          </li>
          <li>
  <button
    onClick={() => setActiveComponent('settings')}
    className="flex items-center space-x-2 text-lg"
  >
    <FaEdit /> <span>Settings</span>
  </button>
</li>
<li>
  <button
    onClick={() => setActiveComponent('CurrentProducts')}
    className="flex items-center space-x-2 text-lg"
  >
    <FaEdit /> <span>CurrentProducts</span>
  </button>
</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
