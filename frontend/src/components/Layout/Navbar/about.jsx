import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AboutUs = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-yellow-50 via-green-50 to-green-100 text-gray-800 p-6">
      {/* Header */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-green-900 mb-4">AgroKart: Cultivating Prosperity</h1>
        <p className="text-lg max-w-3xl mx-auto text-green-800">
          Empowering farmers to set their own pricing, connect with buyers, and grow
          their livelihoods sustainably.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-10 bg-white rounded-xl shadow-md mb-10 max-w-6xl mx-auto p-6 border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Who We Are</h2>
        <p className="text-lg text-gray-700">
          AgroKart bridges farmers directly to buyers, letting them price and sell
          produce on their terms while we handle logistics, reach, and community
          building — all with fair trade principles.
        </p>
      </section>

      {/* Our Journey with Slider */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Our Journey
        </h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...sliderSettings}>
            {[
              { year: '2022', desc: 'Idea Born in Rural Maharashtra' },
              { year: '2023', desc: 'AgroKart Beta with 500 Farmers' },
              { year: '2024', desc: 'Crossed 5000 Listings' },
              { year: '2025', desc: 'Recognized at National Startup Awards' },
              { year: '2026', desc: 'Community Farmer Workshops' },
            ].map((item, index) => (
              <div key={index} className="px-3">
                <div className="p-6 bg-white border border-yellow-300 rounded-lg shadow hover:scale-105 transition-all hover:shadow-lg">
                  <h3 className="text-2xl font-bold text-green-700">
                    {item.year}
                  </h3>
                  <p className="mt-3 text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 bg-green-50 rounded-xl shadow-md mb-10 max-w-6xl mx-auto p-6 border border-green-200">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Our Core Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { letter: 'M', title: 'Make It Fair' },
            { letter: 'A', title: 'Act with Integrity' },
            { letter: 'G', title: 'Grow Together' },
            { letter: 'I', title: 'Innovate for Farmers' },
            { letter: 'C', title: 'Customer First' },
          ].map((value, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border border-yellow-300 shadow hover:scale-105 transition-all hover:shadow-lg" // Added hover effects here
            >
              <div className="text-4xl font-bold text-green-700">
                {value.letter}
              </div>
              <p className="mt-2 text-lg text-green-800">{value.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Movement */}
      <section className="text-center py-10">
        <h2 className="text-4xl font-bold text-green-900 mb-4">
          Join the AgroKart Movement
        </h2>
        <p className="text-lg mb-6 text-green-800">
          Be part of our growing community of farmers and local produce buyers.
        </p>
        <button
          onClick={() => navigate('/Signup')}
          className="px-8 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-all duration-300 text-xl" //increased font and padding
        >
          Register Now
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
