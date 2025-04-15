import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Header = () => {
  return (
    <header className="bg-green-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className="hover:text-yellow-300">
            <span className="font-serif text-green-200">Farm</span>
            <span className="text-yellow-300">Fresh</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-8 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition duration-300">Products</Link>
          <Link to="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
