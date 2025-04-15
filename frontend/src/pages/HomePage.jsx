import React from 'react';
import Testimonial from '../components/common/Testimonial';

const HomePage = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">FarmFresh</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Fresh produce straight from the fields to your home.
          </p>
          <a
            href="/products"
            className="bg-yellow-300 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Explore Products
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="/images/organic.png" alt="Organic" className="mx-auto mb-4 h-20" />
            <h3 className="text-xl font-bold text-green-700 mb-2">100% Organic</h3>
            <p>All our produce is grown naturally without chemicals or pesticides.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="/images/farm.png" alt="Farm Direct" className="mx-auto mb-4 h-20" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Farm Direct</h3>
            <p>We connect you directly with trusted local farmers and growers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <img src="/images/fresh.png" alt="Fresh Delivery" className="mx-auto mb-4 h-20" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Fresh Delivery</h3>
            <p>Timely delivery ensures that you get only the freshest goods.</p>
          </div>
        </div>
      </section>
      <Testimonial/>
    </div>
  );
};

export default HomePage;
