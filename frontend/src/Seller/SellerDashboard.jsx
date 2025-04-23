import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaChartLine, FaTag, FaWallet } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import AddProductForm from './components/AddProductForm';
import ManageInventory from './components/ManageInventory';
import ViewSales from './components/ViewSales';
import PromotionsAndDiscounts from './components/PromotionsDiscount';
import FinancialsAndPayments from './components/FinancialsAndPayments';
import ProductAnalytics from './components/ProductAnalytics';
import OrderManagement from './components/OrderManagement';
import Settings from './components/Settings';

const SellerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('addProduct');

  // Component rendering logic
  const renderComponent = () => {
    switch (activeComponent) {
      case 'addProduct':
        return <AddProductForm />;
      case 'manageInventory':
        return <ManageInventory />;
      case 'viewSales':
        return <ViewSales />;
      case 'promotions':
        return <PromotionsAndDiscounts />;
      case 'financials':
        return <FinancialsAndPayments />;
      case 'productAnalytics':
        return <ProductAnalytics />;
      case 'orderManagement':
        return <OrderManagement />;
      case 'settings':
        return <Settings />; 
      default:
        return <AddProductForm />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 py-10 px-6">
        <div className="max-w-7xl mx-auto relative">

          {/* Header */}
          <h1 className="text-4xl font-bold text-green-800 text-center mb-12 tracking-tight">
            Seller Dashboard
          </h1>

          {/* Component Rendering */}
          <div>{renderComponent()}</div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
