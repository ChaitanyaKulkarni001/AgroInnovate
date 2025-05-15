import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { GiFarmTractor } from "react-icons/gi";
import { HiOutlineSupport } from "react-icons/hi";
import { BiStore } from "react-icons/bi";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userRole } = useAuth();

  const onUserClick = () => {
    if (isLoggedIn) {
      // Future role-based routing
      // if (userRole === "Farmer") {
      //   navigate("/farmer-profile");
      // } else if (userRole === "Customer") {
      //   navigate("/customer-profile");
      // }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed !== "") {
      if (
        !location.pathname.startsWith("/products") ||
        !location.search.includes(trimmed)
      ) {
        navigate(`/products?search=${encodeURIComponent(trimmed)}`, { replace: true });
      }
    }
  }, [searchQuery, location.pathname, location.search, navigate]);

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Branding */}
      <Link to="/" className="text-3xl font-bold flex items-center gap-2 transform hover:scale-105 transition-all">
        <GiFarmTractor className="text-4xl" />
        AgroKart
      </Link>

      {/* Search Bar (desktop) */}
      <div className="relative hidden md:flex w-1/3">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-yellow-500 rounded-r-md text-white hover:bg-yellow-600 transition-all"
          onClick={() => {
            if (searchQuery.trim()) {
              navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
            }
          }}
        >
          <FaSearch />
        </button>
      </div>

      {/* Links */}
      <nav className="flex gap-8 text-sm md:text-base">
        <Link to="/about" className="hover:text-yellow-500 hover:scale-105 transition-all">About Us</Link>
        <Link to="/become-seller" className="flex items-center gap-2 hover:text-yellow-500 hover:scale-105 transition-all">
          <BiStore className="text-lg" />
          Become a Seller
        </Link>
        <Link to="/support" className="flex items-center gap-2 hover:text-yellow-500 hover:scale-105 transition-all">
          <HiOutlineSupport className="text-lg" />
          Customer Support
        </Link>
      </nav>

      {/* Right controls */}
      <div className="flex gap-6 items-center">
        {/* Search on mobile */}
        <div className="md:hidden relative w-32">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-yellow-500 rounded-r-md text-white hover:bg-yellow-600 transition-all"
            onClick={() => {
              if (searchQuery.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
              }
            }}
          >
            <FaSearch />
          </button>
        </div>

        <button onClick={onUserClick} className="bg-white text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition-all">
          <FaUser className="text-lg" />
        </button>

        <Link to="/cart" className="bg-white text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition-all">
          <FaShoppingCart className="text-lg" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
