import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-4"> {/* Increased padding and color */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold text-green-200 mb-4">About Us</h3> {/* Lighter text for contrast */}
            <p className="text-gray-300">
              FarmKart is dedicated to empowering farmers by providing a platform for quality tools and produce. We strive to connect farmers with a wider market.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-green-200 mb-4">Contact</h3>
            <ul className="text-gray-300">
              <li className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-green-100" />
                <span>123 Farmer Street, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-green-100" />
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-100" />
                <span>info@farmkart.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-200 mb-4">Quick Links</h3>
            <ul className="text-gray-300">
              <li><a href="/" className="hover:text-green-200 transition">Home</a></li>
              <li><a href="/products" className="hover:text-green-200 transition">Products</a></li>
              <li><a href="/about" className="hover:text-green-200 transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-green-200 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-green-200 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-200 transition">
                <Facebook className="w-6 h-6 text-green-100" />
              </a>
              <a href="#" className="hover:text-green-200 transition">
                <Twitter className="w-6 h-6 text-green-100" />
              </a>
              <a href="#" className="hover:text-green-200 transition">
                <Instagram className="w-6 h-6 text-green-100" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm"> {/* Increased margin */}
          &copy; {new Date().getFullYear()} FarmKart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
