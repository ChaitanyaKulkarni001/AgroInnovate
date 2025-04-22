// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing"; // Your landing page component
import Products from "./product"; // Your products page component
import ProductDetails from "./components/ProductDetails";
import About from "./components/Layout/Navbar/about";
import BecomeSeller from "./components/Layout/Navbar/BecomeSeller";
import Support from "./components/Layout/Navbar/Support";
import Login from "./components/auth/Login";
// import SignupStep1 from "./components/SignupStep1";
// import SignupStep2 from "./components/SignupStep2";
// import SignupStep3 from "./components/SignupStep3";
import AdminLayout from "./components/admin/AdminLayout";
import AdminRoute from "./components/admin/components/AdminRoute";
import DataTable from "./components/admin/components/DataTable";
import UserProfile from "./components/user/UserProfile";
import ViewedProducts from "./components/user/sections/ViewedProducts";
import OrderHistory from "./components/user/sections/OrderHistory";
import Wishlist from "./components/user/sections/Wishlist";
import FAQ from "./components/user/sections/FAQ";
import Signup from "./components/signups/SignUp";
import CustomerSetup from "./components/pages/CustomerSetup";
import FarmerSetup from "./components/pages/FarmerSetup";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="products" element={<Products />} />
      <Route path="about" element={<About />} />
      <Route path="become-seller" element={<BecomeSeller />} />
      <Route path="support" element={<Support />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      {/* <Route path="signup1" element={<SignupStep1 />} /> */}
      {/* <Route path="signup2" element={<SignupStep2 />} /> */}
      {/* <Route path="signup3" element={<SignupStep3 />} /> */}
      <Route path="admin-layout" element={<AdminLayout />} />
      <Route path="admin-route" element={<AdminRoute />} />
      <Route path="data" element={<DataTable />} />
      <Route path="/farmer-setup" element={<FarmerSetup />} />
      <Route path="/customer-setup" element={<CustomerSetup />} />
      <Route path="user-profile" element={<UserProfile />}>
        <Route path="viewed" element={<ViewedProducts />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        {/* <Route path="payments" element={<PaymentMethods />} /> */}
        <Route path="faq" element={<FAQ />} />
      </Route>

      <Route path="/product/:name" element={<ProductDetails />} />
    </Routes>
  );
};

export default AppRoutes;
