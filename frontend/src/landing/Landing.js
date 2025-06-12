import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { categories, products as dummyProducts } from "./data/Farmdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "./Hero.jpg"
// import './Landing.css'; // custom styles if needed

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
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleCategorySearch = (query) => {
    setSearchQuery(query);
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleCategoryClick = (category) => {
    history.push("/products", { category, products: dummyProducts });
  };

  const handleExplore = () => {
    history.push("/", { category: "", products: dummyProducts });
  };

  const shouldUseSlider = filteredCategories.length >= 5;

  return (
    <>
      {/* Hero Section */}
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width:'180vh', 
          height: '60vh',
          position: 'relative',
        }}
      >
        <div className="overlay"></div>
        <div className="container text-center position-relative">
          <h1 className="display-4 font-weight-bold mb-3">
            🌿 Step into the Future of Farming with <span className="text-gradient">AgroInnovate</span>
          </h1>
          <p className="lead mb-4">
            Discover premium seeds, tools & supplies made for the modern Indian farmer.
          </p>
          <button onClick={handleExplore} className="btn btn-success btn-lg">
            🌾 Browse Products
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-5">
        <div className="container">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search Categories..."
              value={searchQuery}
              onChange={(e) => handleCategorySearch(e.target.value)}
            />
          </div>
        </div>
      </section>
      {/* Top Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-4">Top Categories</h3>
          {filteredCategories.length > 0 ? (
            shouldUseSlider ? (
              <Slider {...carouselSettings}>
                {filteredCategories.map((cat, i) => (
                  <div key={i} onClick={() => handleCategoryClick(cat.name)}>
                    <div className="card mx-2">
                      <img src={cat.image} className="card-img-top" alt={cat.name} />
                      <div className="card-body text-center">
                        <h5 className="card-title">{cat.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="row">
  {filteredCategories.map((category, idx) => (
    <div className="col-md-3 mb-4" key={idx}>
      <div
        className="category-card"
        onClick={() => handleCategoryClick(category.name)}
      >
        <img src={category.image} alt={category.name} />
        <div className="category-card-title">{category.name}</div>
      </div>
    </div>
  ))}
</div>

            )
          ) : (
            <p className="text-center text-danger">No categories found</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-4">What Our Users Say</h3>
          <div className="row">
            {[
              {
                quote: "FarmKart has changed the way we buy and sell agricultural tools.",
                name: "John Doe",
                role: "Farmer, Rural India",
              },
              {
                quote: "The quality of the products here is unmatched!",
                name: "Jane Smith",
                role: "Agri-business Owner",
              },
            ].map((t, i) => (
              <div key={i} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <p className="card-text fst-italic">"{t.quote}"</p>
                    <h5 className="card-title mt-4">{t.name}</h5>
                    <p className="text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white text-center">
        <div className="container">
          <h3 className="mb-3">Stay Updated</h3>
          <p className="mb-4">Sign up to receive the latest news and updates from FarmKart.</p>
          <form className="row justify-content-center">
            <div className="col-auto">
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-light">Subscribe</button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Product Section
      <section className="py-5">
        <div className="container text-center">
          <h3 className="mb-4">Featured Product</h3>
          <div className="card mx-auto" style={{ maxWidth: '400px' }}>
            <img src="path-to-product-image.jpg" className="card-img-top" alt="Featured Product" />
            <div className="card-body">
              <h5 className="card-title">High-Quality Organic Fertilizer</h5>
              <p className="card-text">Boost your crop yields with our best-selling fertilizer, made from 100% organic ingredients.</p>
              <button className="btn btn-success" onClick={handleExplore}>Explore Now</button>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-4">Frequently Asked Questions</h3>
          <div className="accordion" id="faqAccordion">
            {[
              { question: "How do I place an order?", answer: "Simply browse through the categories and select the products you want to buy. Add them to the cart and proceed with checkout." },
              { question: "What is the delivery time?", answer: "Delivery times vary based on location, but we strive to deliver within 5-7 business days." }
            ].map((faq, i) => (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={`heading${i}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${i}`}
                    aria-expanded="false"
                    aria-controls={`collapse${i}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${i}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${i}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Landing;
