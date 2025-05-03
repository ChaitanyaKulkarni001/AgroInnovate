  // BecomeSeller.jsx
import React, { useState } from 'react';

const BecomeSeller = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("Seller application submitted!");
  };

  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-green-900 text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">Become a Seller on AgroKart</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Join our growing community of sellers and take your agricultural business online. 
          Reach millions of customers, sell your products easily, and manage your business efficiently.
        </p>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-800">Register to Start Selling</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Product Category</label>
              <select
                id="category"
                name="category"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" disabled>Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
              required
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-yellow-500">terms and conditions</a>.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agree}
            className="w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          >
            Apply Now
          </button>
        </form>
      </div>

      {/* Benefits Section */}
      <div className="bg-green-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Why Become a Seller?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Reach Millions of Customers</h3>
            <p className="text-gray-700">Showcase your products to a wide audience and increase your sales.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Easy Product Management</h3>
            <p className="text-gray-700">Manage your inventory, prices, and orders with ease through our intuitive platform.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-3">Secure Payments</h3>
            <p className="text-gray-700">Get paid safely with our reliable payment gateway.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
