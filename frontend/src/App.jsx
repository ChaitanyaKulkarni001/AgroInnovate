import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing'; // Your landing page component
import Products from './product'; // Your products page component
import Navbar from './components/Layout/navbar'; // The updated navbar component
import { Outlet } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import SellerDashboard from './Seller/SellerDashboard';

// Import the new pages
import About from './components/Layout/Navbar/about';
import BecomeSeller from './components/Layout/Navbar/BecomeSeller';
import Support from './components/Layout/Navbar/Support';

// Cart Pages
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/Cart/CheckOutPage';

// Import new pages for Seller Dashboard
import Settings from './Seller/components/Settings';
import FeedbackAndSupport from './Seller/components/FeedbackAndSupport';
import FinancialsAndPayments from './Seller/components/FinancialsAndPayments';

const Layout = () => {
  return (
    <>
      <Navbar /> {/* Navbar that is shared across pages */}
      <Outlet /> {/* This will render the nested route components */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="products" element={<Products />} />
          
          {/* About, BecomeSeller, and Support pages */}
          <Route path="about" element={<About />} />
          <Route path="become-seller" element={<BecomeSeller />} />
          <Route path="support" element={<Support />} />

          {/* Dynamic route for product details */}
          <Route path="/product/:name" element={<ProductDetails />} />
          
          {/* Cart and Checkout Pages */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Seller Dashboard and its sections */}
          <Route path="/SellerDashboard" element={<SellerDashboard />}>
            <Route path="settings" element={<Settings />} />
            <Route path="feedback" element={<FeedbackAndSupport />} />
            <Route path="financials" element={<FinancialsAndPayments />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
