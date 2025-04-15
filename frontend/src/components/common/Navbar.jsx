import React from 'react';
import { NavLink } from 'react-router-dom'; // Changed to import NavLink instead of Link
// import Button from './Button';

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-white">
          <NavLink to="/" className="hover:text-yellow-300">
            <span className="font-serif text-green-200">Farm</span>
            <span className="text-yellow-300">Fresh</span>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? 'text-white underline text-yellow-300' 
                : 'text-white hover:text-yellow-300 transition duration-300'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/productlist" 
            className={({ isActive }) => 
              isActive 
                ? 'text-white underline text-yellow-300' 
                : 'text-white hover:text-yellow-300 transition duration-300'
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive 
                ? 'text-white underline text-yellow-300' 
                : 'text-white hover:text-yellow-300 transition duration-300'
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive 
                ? 'text-white underline text-yellow-300' 
                : 'text-white hover:text-yellow-300 transition duration-300'
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:flex">
          <NavLink
            to="/login"
            className="bg-yellow-300 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Sign In
          </NavLink>
        </div>

        {/* Mobile Menu Toggle (for responsive design) */}
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (optional) */}
      <div className="md:hidden mt-4 space-y-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive 
              ? 'block text-white underline text-yellow-300' 
              : 'block text-white hover:text-yellow-300 transition duration-300'
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            isActive 
              ? 'block text-white underline text-yellow-300' 
              : 'block text-white hover:text-yellow-300 transition duration-300'
          }
        >
          Products
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            isActive 
              ? 'block text-white underline text-yellow-300' 
              : 'block text-white hover:text-yellow-300 transition duration-300'
          }
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            isActive 
              ? 'block text-white underline text-yellow-300' 
              : 'block text-white hover:text-yellow-300 transition duration-300'
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
