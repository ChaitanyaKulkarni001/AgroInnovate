import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-6">About Us</h1>
      
      <div className="text-lg leading-relaxed text-gray-700">
        <p className="mb-4">
          Welcome to <span className="font-semibold text-green-600">FarmFresh</span>! We are dedicated to providing the freshest and most organic produce to you directly from the farm. Our goal is to connect local farmers with consumers to offer a sustainable and healthy food supply.
        </p>
        
        <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Mission</h2>
        <p className="mb-4">
          At <span className="font-semibold text-green-600">FarmFresh</span>, our mission is to make healthy, organic, and fresh produce accessible to every household. We believe in promoting sustainable farming practices while supporting local communities. Our farmers are passionate about what they do, and we ensure that every product is grown with care and love.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-3">Our Values</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Quality - We ensure the highest quality of produce.</li>
          <li>Sustainability - We promote eco-friendly farming practices.</li>
          <li>Community - We support local farmers and contribute to their growth.</li>
          <li>Transparency - We believe in providing full transparency to our customers.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-600 mb-3">Why Choose Us?</h2>
        <p>
          By choosing <span className="font-semibold text-green-600">FarmFresh</span>, you are not only getting fresh and organic produce, but you are also helping local farmers thrive. Our farm-to-table model ensures that the food you eat is not only healthy but also supports sustainable agricultural practices.
        </p>
      </div>
    </div>
  );
};

export default About;
