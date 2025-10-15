import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { categories, products as dummyProducts } from "./data/Farmdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "./Hero.jpg"
import './Landing.css';

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
    history.push("/", { category, products: dummyProducts });
  };

  const handleExplore = () => {
    history.push("/", { category: "", products: dummyProducts });
  };

  const shouldUseSlider = filteredCategories.length >= 5;

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-white"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '70vh',
          position: 'relative',
          marginLeft: '-15px',
          marginRight: '-15px',
        }}
      >
        <div className="overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 font-weight-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            🌿 Step into the Future of Farming with AgroInnovate
          </h1>
          <p className="lead mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Discover premium seeds, tools & supplies made for the modern Indian farmer.
          </p>
          <button onClick={handleExplore} className="btn btn-success btn-lg">
            🌾 Browse Products
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-4">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="form-group" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Categories..."
              value={searchQuery}
              onChange={(e) => handleCategorySearch(e.target.value)}
              style={{ padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>
      {/* Top Categories Section */}
      <section className="py-4 bg-light">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <h3 className="text-center mb-4" style={{ fontSize: '1.75rem', fontWeight: '600' }}>Top Categories</h3>
          {filteredCategories.length > 0 ? (
            shouldUseSlider ? (
              <Slider {...carouselSettings}>
                {filteredCategories.map((cat, i) => (
                  <div key={i} onClick={() => handleCategoryClick(cat.name)} style={{ cursor: 'pointer', padding: '0 10px' }}>
                    <div className="card" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-5px)';
                           e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = 'none';
                         }}>
                      <img 
                        src={cat.image} 
                        className="card-img-top" 
                        alt={cat.name}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                      <div className="card-body text-center" style={{ padding: '1rem' }}>
                        <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0', fontWeight: '500' }}>{cat.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="row">
                {filteredCategories.map((category, idx) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={idx}>
                    <div
                      className="card"
                      onClick={() => handleCategoryClick(category.name)}
                      style={{ 
                        cursor: 'pointer', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        height: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <img 
                        src={category.image} 
                        alt={category.name}
                        style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                      />
                      <div className="card-body text-center" style={{ padding: '1rem' }}>
                        <h5 style={{ fontSize: '1rem', marginBottom: '0', fontWeight: '500' }}>{category.name}</h5>
                      </div>
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
      <section className="py-4">
        <div className="container text-center" style={{ maxWidth: '1400px' }}>
          <h3 className="mb-4" style={{ fontSize: '1.75rem', fontWeight: '600' }}>What Our Users Say</h3>
          <div className="row justify-content-center">
            {[
              {
                quote: "AgroInnovate has changed the way we buy and sell agricultural tools.",
                name: "Rajesh Kumar",
                role: "Farmer, Rural India",
              },
              {
                quote: "The quality of the products here is unmatched!",
                name: "Priya Sharma",
                role: "Agri-business Owner",
              },
            ].map((t, i) => (
              <div key={i} className="col-md-6 col-lg-5 mb-3">
                <div className="card h-100 shadow-sm" style={{ border: '1px solid #e0e0e0' }}>
                  <div className="card-body" style={{ padding: '1.5rem' }}>
                    <p className="card-text fst-italic" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>"{t.quote}"</p>
                    <h5 className="card-title mt-3" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{t.name}</h5>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4 bg-success text-white text-center">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <h3 className="mb-3" style={{ fontSize: '1.5rem' }}>Stay Updated</h3>
          <p className="mb-4" style={{ fontSize: '1rem' }}>Sign up to receive the latest news and updates from AgroInnovate.</p>
          <form className="row justify-content-center g-2">
            <div className="col-auto">
              <input type="email" className="form-control" placeholder="Enter your email" style={{ padding: '0.5rem 1rem' }} />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-light" style={{ padding: '0.5rem 1.5rem' }}>Subscribe</button>
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
