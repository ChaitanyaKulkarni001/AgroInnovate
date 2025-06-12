 import React from "react";
import Slider from "react-slick";
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
  const handleExplore = () => {
    window.location.href = "/productlist"; // ✅ Static redirect to next page
  };

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="jumbotron p-5 text-center bg-light position-relative rounded shadow">
        <div className="position-absolute w-100 h-100 bg-dark opacity-50 top-0 start-0"></div>
        <h1 className="display-4 text-white position-relative">
          🌿 Step into the Future of Farming with <span className="text-warning">AgroInnovate</span>
        </h1>
        <p className="lead text-white position-relative">
          Discover premium seeds, tools & supplies made for the modern Indian farmer.
        </p>
        <button className="btn btn-success btn-lg position-relative" onClick={handleExplore}>
          🌾 Explore Now
        </button>
      </div>

      {/* Testimonials Section */}
      <section className="my-5">
        <h3 className="text-center text-success mb-4">What Our Users Say</h3>
        <div className="row justify-content-center">
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
            <div className="col-md-4 mb-3" key={i}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <p className="card-text">"{t.quote}"</p>
                  <h5 className="card-title text-success mt-3">{t.name}</h5>
                  <p className="card-subtitle text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="my-5 p-5 bg-success text-white rounded shadow text-center">
        <h3 className="mb-3">Stay Updated</h3>
        <p className="mb-4">Sign up to receive the latest news and updates from FarmKart.</p>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control w-auto me-2"
          />
          <button className="btn btn-light text-success">Subscribe</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="my-5">
        <h3 className="text-center text-success mb-4">Frequently Asked Questions</h3>
        <div className="accordion" id="faqAccordion">
          {[
            {
              question: "How do I place an order?",
              answer:
                "Simply browse through the categories and select the products you want to buy. Add them to the cart and proceed with checkout.",
            },
            {
              question: "What is the delivery time?",
              answer:
                "Delivery times vary based on location, but we strive to deliver within 5-7 business days.",
            },
          ].map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
