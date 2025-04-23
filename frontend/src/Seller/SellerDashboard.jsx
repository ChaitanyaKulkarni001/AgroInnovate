import React from 'react';
import AddProductForm from './components/AddProductForm';
import ManageInventory from './components/ManageInventory';
import ViewSales from './components/ViewSales';
import ProductAnalytics from './components/ProductAnalytics';
import OrderManagement from './components/OrderManagement';
 
 
const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-green-800 mb-8 text-center">Seller Dashboard</h1>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Add Product Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Product</h3>
            <AddProductForm />
          </div>

          {/* Manage Inventory Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Inventory</h3>
            <ManageInventory />
          </div>

          {/* View Sales Card */}
          <div className="p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">View Sales</h3>
            <ViewSales />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Product Analytics</h3>
          <ProductAnalytics />
        </div>

        {/* Order Management Section */}
        <div className="mb-12 p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Management</h3>
          <OrderManagement />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
