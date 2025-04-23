 // App.jsx
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

//cart
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/Cart/CheckOutPage';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
          {/* Add the new routes */}
          <Route path="about" element={<About />} />
          <Route path="become-seller" element={<BecomeSeller />} />
          <Route path="support" element={<Support />} />
          <Route path="/product/:name" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/SellerDashboard" element={<SellerDashboard />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
