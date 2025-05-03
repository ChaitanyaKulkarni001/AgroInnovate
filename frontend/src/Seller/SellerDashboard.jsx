import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddProductForm from './components/AddProductForm';
import ManageInventory from './components/ManageInventory';
import ViewSales from './components/ViewSales';
import PromotionsAndDiscounts from './components/PromotionsDiscount';
import FinancialsAndPayments from './components/FinancialsAndPayments';
import ProductAnalytics from './components/ProductAnalytics';
import OrderManagement from './components/OrderManagement';
import Settings from './components/Settings';
import CurrentProducts from './components/CurrentProducts';

const SellerDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('addProduct');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'CurrentProducts':
        return <CurrentProducts />;
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
        return <CurrentProducts />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-sans">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-lg mb-2">
              Seller Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage your products, track sales, and analyze performance</p>
          </div>

          {/* Main Panel */}
          <div className="rounded-2xl bg-white/60 shadow-xl backdrop-blur-lg p-8 border border-white/30 transition-all duration-300">
            {renderComponent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
