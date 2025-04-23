import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { categories, products as dummyProducts } from "./data/Farmdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const Landing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [loading, setLoading] = useState(false);

  const handleCategorySearch = (query) => {
    setSearchQuery(query);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCategoryClick = (category) => {
    navigate("/products", { state: { category, products: dummyProducts } });
  };

  const handleExplore = () => {
    navigate("/products", { state: { category: "", products: dummyProducts } });
  };

  const shouldUseSlider = filteredCategories.length >= 5;

  return (
    <div className="bg-green-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-green-50 flex items-center justify-center overflow-hidden shadow-inner rounded-b-xl border-b-4 border-green-200">
  {/* Background Image with Slow Zoom + Pan */}
  <div
    className="absolute inset-0 bg-[url('/images/farm-bg.jpg')] bg-cover bg-center opacity-30 blur-sm scale-105"
    style={{
      animation: 'zoomPan 30s ease-in-out infinite alternate',
      transformOrigin: 'center',
    }}
  />

  {/* Gradient Overlay for Light Effect */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#e8fbe0]/80 via-[#d3fcd6]/70 to-[#c2f0c2]/70 mix-blend-multiply z-0" />

  {/* Hero Content */}
  <div className="relative z-10 text-center px-4 max-w-2xl">
    <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 drop-shadow-lg leading-snug mb-3">
      🌿 Step into the Future of Farming with <span className="text-green-700">FarmKart</span>
    </h1>
    <p className="text-lg md:text-xl text-green-800 font-medium mb-6 tracking-wide">
      Discover premium seeds, tools & supplies made for the modern Indian farmer.
    </p>
    <button
      onClick={handleExplore}
      className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 md:px-8 md:py-3 text-lg font-semibold rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      🌾 Browse Products
    </button>
  </div>

  {/* Floating Plant Left */}
  <img
    src="/images/plant-left.png"
    alt="left-plant"
    className="absolute bottom-0 left-0 w-24 md:w-32 lg:w-40"
    style={{
      animation: 'float 5s ease-in-out infinite',
    }}
  />

  {/* Floating Plant Right */}
  <img
    src="/images/plant-right.png"
    alt="right-plant"
    className="absolute bottom-0 right-0 w-24 md:w-32 lg:w-40"
    style={{
      animation: 'float 6s ease-in-out infinite',
      animationDelay: '0.3s',
    }}
  />
</section>


      {/* Search Section */}
      <section className="py-6 px-4 max-w-4xl mx-auto">
        <input
          type="text"
          className="w-full px-5 py-3 border-2 border-green-200 focus:border-green-500 rounded-xl shadow-sm focus:outline-none text-lg"
          placeholder="Search Categories..."
          value={searchQuery}
          onChange={(e) => handleCategorySearch(e.target.value)}
        />
      </section>

      {/* Top Categories Section */}
      <section className="py-12 bg-white">
        <h3 className="text-3xl font-bold text-center text-green-800 mb-10">Top Categories</h3>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredCategories.length > 0 ? (
          shouldUseSlider ? (
            <Slider {...carouselSettings}>
              {filteredCategories.map((cat, i) => (
                <div
                  key={i}
                  className="px-3"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 text-center cursor-pointer">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <p className="text-green-900 font-semibold text-lg">{cat.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {filteredCategories.map((cat, i) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="w-64 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 text-center cursor-pointer"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <p className="text-green-900 font-semibold text-lg">{cat.name}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center text-red-600 font-medium">
            No categories found
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-50 text-center">
        <h3 className="text-4xl font-bold text-green-800 mb-12">What Our Users Say</h3>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[{
            quote: "FarmKart has changed the way we buy and sell agricultural tools.",
            name: "John Doe",
            role: "Farmer, Rural India"
          }, {
            quote: "The quality of the products here is unmatched!",
            name: "Jane Smith",
            role: "Agri-business Owner"
          }].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg max-w-xs text-center transition-transform duration-300 hover:scale-105">
              <p className="text-green-900 text-lg italic">"{t.quote}"</p>
              <p className="text-green-800 font-bold mt-4">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section for Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-green-50 text-center">
        <h3 className="text-4xl font-bold text-green-800 mb-4">Stay Updated</h3>
        <p className="text-lg text-green-700 mb-6">
          Sign up to receive the latest news and updates from FarmKart.
        </p>
        <div className="flex justify-center items-center flex-wrap gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 w-80"
          />
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full text-lg shadow-lg">
            Subscribe
          </button>
        </div>
      </section>

      {/* Featured Product Spotlight Section */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-4xl font-bold text-green-800 mb-6">Featured Product</h3>
        <div className="max-w-md mx-auto bg-green-50 p-8 rounded-2xl shadow-xl">
          <img
            src="path-to-product-image.jpg"
            alt="Featured Product"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-xl font-semibold text-green-900 mb-2">
            High-Quality Organic Fertilizer
          </p>
          <p className="text-green-700 mb-4">
            Boost your crop yields with our best-selling fertilizer, made from 100% organic ingredients.
          </p>
          <button
            className="bg-green-700 hover:bg-green-900 text-white px-8 py-3 rounded-full text-lg"
            onClick={handleExplore}
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-green-50 text-center">
        <h3 className="text-4xl font-bold text-green-800 mb-6">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto text-left">
          {[
            { question: "How do I place an order?", answer: "Simply browse through the categories and select the products you want to buy. Add them to the cart and proceed with checkout." },
            { question: "What is the delivery time?", answer: "Delivery times vary based on location, but we strive to deliver within 5-7 business days." }
          ].map((faq, i) => (
            <details key={i} className="bg-white p-4 mb-4 rounded-xl shadow-md">
              <summary className="cursor-pointer text-lg font-semibold text-green-900">
                {faq.question}
              </summary>
              <p className="mt-2 text-green-700 text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;