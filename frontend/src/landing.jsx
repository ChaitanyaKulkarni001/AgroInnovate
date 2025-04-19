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
      <section className="bg-green-100 py-20 text-center">
        <h2 className="text-5xl font-extrabold text-green-800 mb-4">Grow Smart with FarmKart</h2>
        <p className="text-lg text-green-700 mb-6">Empowering Farmers with Quality Tools & Produce</p>
        <button
          className="bg-green-700 hover:bg-green-900 text-white px-8 py-3 rounded-full text-lg transition"
          onClick={handleExplore}
        >
          Explore Products
        </button>
      </section>

      <section className="py-6 px-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Search Categories"
          value={searchQuery}
          onChange={(e) => handleCategorySearch(e.target.value)}
        />
      </section>

      <section className="py-12 bg-white">
        <h3 className="text-3xl font-semibold text-center text-green-800 mb-6">Top Categories</h3>
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : filteredCategories.length > 0 ? (
          shouldUseSlider ? (
            <Slider {...carouselSettings}>
              {filteredCategories.map((cat, i) => (
                <div key={i} className="px-3" onClick={() => handleCategoryClick(cat.name)}>
                  <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 text-center cursor-pointer">
                    <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                    <p className="text-green-900 font-medium text-lg">{cat.name}</p>
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
                  className="w-64 bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 text-center cursor-pointer"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                  <p className="text-green-900 font-medium text-lg">{cat.name}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center text-red-600 font-medium">No categories found</div>
        )}
      </section>
    </div>
  );
};

export default Landing;
