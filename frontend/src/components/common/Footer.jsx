import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-300">FarmFresh</h3>
          <p className="text-sm">
            Bringing fresh, organic produce directly from local farms to your table.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/productlist" className="hover:underline">Products</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-300">Contact Us</h3>
          <p>Email: support@farmfresh.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: SKN Road, Pandharpur, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-green-100">
        © {new Date().getFullYear()} FarmFresh. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
