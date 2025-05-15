// AppRoutes.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../components/Layout/navbar";
import Footer from "../components/Layout/Navbar/Footer";

// Pages
import Landing from "../components/Layout/landing";
import Products from "../components/Layout/product";
import ProductDetails from "../components/ProductDetails";
import About from "../components/Layout/Navbar/about";
import BecomeSeller from "../components/Layout/Navbar/BecomeSeller";
import Support from "../components/Layout/Navbar/Support";
import Login from "../components/auth/Login";
import Signup from "../components/signups/SignUp";
import AdminLayout from "../components/admin/AdminLayout";
import AdminRoute from "../components/admin/components/AdminRoute";
import DataTable from "../components/admin/components/DataTable";
import UserProfile from "../components/user/UserProfile";
import ViewedProducts from "../components/user/sections/ViewedProducts";
import OrderHistory from "../components/user/sections/OrderHistory";
import Wishlist from "../components/user/sections/Wishlist";
import FAQ from "../components/user/sections/FAQ";
import CustomerSetup from "../components/pages/user/CustomerSetup";
import FarmerSetup from "../components/pages/farmer/FarmerSetup";
import ProfileInfo from "../components/user/sections/ProfileInfo";
import AddressManager from "../components/user/sections/AddressManager";
import PanCardInfo from "../components/user/sections/PancardInfo";
import SavedUpi from "../components/user/sections/SavedUpi";
import SavedCards from "../components/user/sections/SavedCards";
import SellerProfile from "../components/pages/seller/SellerProfile";
import Overview from "../components/pages/seller/sections/Overview";
import AddProductForm from "../components/pages/seller/sections/AddProductForm";
import ProductList from "../components/pages/seller/sections/ProductList";
import Orders from "../components/pages/seller/sections/Orders";
import Returns from "../components/pages/seller/sections/Returns";
import Payments from "../components/pages/seller/sections/Payments";
import BusinessInfo from "../components/pages/seller/sections/BusinessInfo";
import BankDetails from "../components/pages/seller/sections/BankDetails";
import GSTDetails from "../components/pages/seller/sections/GSTDetails";
import Reports from "../components/pages/seller/sections/Reports";
import CustomerMessages from "../components/pages/seller/sections/CustomerMessages";
import SellerDashboard from "../Seller/SellerDashboard";
import Settings from "../Seller/components/Settings";
import FeedbackAndSupport from "../Seller/components/FeedbackAndSupport";
import FinancialsAndPayments from "../Seller/components/FinancialsAndPayments";
import CartPage from "../components/Cart/CartPage";
import CheckoutPage from "../components/Cart/CheckOutPage";


// Reusable layout with Navbar
const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer/>
  </>
);

const AppRoutes = () => {
  return (

    <Routes>
      {/* All routes that need Navbar go inside this layout */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Landing />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="become-seller" element={<BecomeSeller />} />
        <Route path="support" element={<Support />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/farmer-setup" element={<FarmerSetup />} />
        <Route path="/customer-setup" element={<CustomerSetup />} />
        <Route path="/products/:id" element={<ProductDetails />} />
           {/* Cart and Checkout Pages */}
           <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Seller Dashboard and its sections */}
          <Route path="/SellerDashboard" element={<SellerDashboard />}>
            <Route path="settings" element={<Settings />} />
            <Route path="feedback" element={<FeedbackAndSupport />} />
            <Route path="financials" element={<FinancialsAndPayments />} />
          </Route>
        <Route path="seller-profile" element={<SellerProfile />}>
          <Route index element={<Overview/>}/>
          <Route path="overview" element={<AddProductForm/>}/>
          <Route path="add-product" element={<AddProductForm/>}/>
          <Route path="products" element={<ProductList/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="returns" element={<Returns/>}/>
          <Route path="payments" element={<Payments/>}/>
          <Route path="business-info" element={<BusinessInfo/>}/>
          <Route path="bank-details" element={<BankDetails/>}/>
          <Route path="gst-details" element={<GSTDetails/>}/>
          <Route path="reports" element={<Reports/>}/>
          <Route path="messages" element={<CustomerMessages/>}/>
        </Route>
        <Route path="user-profile" element={<UserProfile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="addresses" element={<AddressManager />} />
            <Route path="pan" element={<PanCardInfo />} />
            {/* <Route path="giftcards" element={<GiftCards />} /> */}
            <Route path="upi" element={<SavedUpi />} />
            <Route path="cards" element={<SavedCards />} />
            {/* <Route path="coupons" element={<MyCoupons />} /> */}
            {/* <Route path="reviews" element={<ReviewsAndRatings />} /> */}
            {/* <Route path="notifications" element={<Notifications />} /> */}
            <Route path="wishlist" element={<Wishlist />} />
        </Route>


      </Route>

      {/* Routes without Navbar if any (admin?) */}
      <Route path="admin-layout" element={<AdminLayout />} />
      <Route path="admin-route" element={<AdminRoute />} />
      <Route path="data" element={<DataTable />} />
    </Routes>
  );
};

export default AppRoutes;
