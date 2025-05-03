import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/AuthContext";

const SellerProfile = () => {
  // Dummy seller data (simulate fetched API response)
  const seller = {
    name: 'Elite Traders',
    email: 'elite.traders@example.com',
    mobile: '+91 9876543210',
    businessName: 'Elite Traders Pvt. Ltd.',
  };

  const navLinkClass = ({ isActive }) =>
  isActive
    ? "block text-blue-600 font-semibold"
    : "block text-gray-700 hover:text-blue-600";


  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const  handleOverview = ()=>{
    navigate('/SellerDashboard')
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
            {seller.name[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{seller.name}</h3>
            <p className="text-sm text-gray-500">{seller.email}</p>
            <p className="text-sm text-gray-400">{seller.businessName}</p>
          </div>
        </div>

        <nav className="space-y-6">
          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Dashboard</h4>
            <button to="SellerDashboard" onClick={handleOverview}>Overview</button>
          </div>

          {/* <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Product Management</h4>
            <NavLink to="products" className={navLinkClass}>My Products</NavLink>
            <NavLink to="add-product" className={navLinkClass}>Add New Product</NavLink>
          </div> */}

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Orders</h4>
            <NavLink to="orders"className={navLinkClass}>Manage Orders</NavLink>
            <NavLink to="returns" className={navLinkClass}>Returns</NavLink>
          </div>

          {/* <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Payments</h4>
            <NavLink to="payments" className={navLinkClass}>Settlement Reports</NavLink>
          </div> */}

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Account Settings</h4>
            <NavLink to="business-info" className={navLinkClass}>Business Info</NavLink>
            <NavLink to="bank-details" className={navLinkClass}>Bank Details</NavLink>
            <NavLink to="gst-details"className={navLinkClass}>GST Details</NavLink>
          </div>

          {/* <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Analytics</h4>
            <NavLink to="reports" className={navLinkClass}>Sales Reports</NavLink>
          </div> */}

          <div>
            <h4 className="text-gray-500 text-xs mb-2 uppercase">Communication</h4>
            <NavLink to="messages" className={navLinkClass}>Customer Messages</NavLink>
          </div>

          <div>
            <button onClick={onLogout} className="mt-8 w-full text-left text-red-600 hover:underline">Logout</button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10">
        {/* Nested content */}
        <Outlet />
      </main>
    </div>
  );
};

export default SellerProfile;
