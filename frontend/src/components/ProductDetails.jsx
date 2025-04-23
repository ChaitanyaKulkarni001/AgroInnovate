import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { products as allProducts } from "../data/Farmdata";

const ProductDetails = () => {
  const { name } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product || allProducts.find(p => p.name === name);

  if (!product) return <div className="p-10 text-center text-red-600">Product not found</div>;

  const [mainImage, setMainImage] = useState(product.images?.[0] || "");
  const [rating, setRating] = useState(0);
  const [reviewVisible, setReviewVisible] = useState(false);

  const reviews = [
    { user: "John Doe", rating: 4, comment: "Great product, highly recommended!" },
    { user: "Jane Smith", rating: 5, comment: "Best quality organic seeds I have ever used!" },
    { user: "Mike Johnson", rating: 5, comment: "Excellent product for farming!" },
  ];

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.name !== product.name);

  const sellerInfo = {
    name: "Green Earth Suppliers",
    rating: 4.5,
    contact: "contact@greenearthsuppliers.com",
  };

  const handleRating = (starIndex) => {
    setRating(starIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 hover:text-green-800 transition duration-300"
      >
        ← Back to Products
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Main Product Image */}
          <div className="space-y-4 mb-6">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Small Images Below */}
          <div className="flex space-x-4 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75 transition duration-200"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold text-green-800 mb-4">{product.name}</h2>
          <p className="text-xl text-green-700 font-bold mb-2">{product.price}</p>
          <p className="text-gray-700 mb-6">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg mb-4 transition duration-300">
            Add to Cart
          </button>

          {/* Specifications */}
          {product.specifications && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Product Specifications</h3>
              <table className="w-full text-sm text-left text-gray-700">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{spec.label}</td>
                      <td className="border-b p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Seller Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Seller Information</h3>
            <p className="text-gray-700">Name: {sellerInfo.name}</p>
            <p className="text-gray-700">Rating: {sellerInfo.rating} / 5</p>
            <p className="text-gray-700">Contact: {sellerInfo.contact}</p>
          </div>

          {/* Reviews */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
            {reviewVisible ? (
              reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-gray-800">{review.user}</p>
                    <p className="text-sm text-gray-600">{`Rating: ${review.rating} / 5`}</p>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No reviews yet</p>
              )
            ) : (
              <button
                className="text-green-600 hover:text-green-800 transition duration-300"
                onClick={() => setReviewVisible(true)}
              >
                Show Reviews
              </button>
            )}
          </div>

          {/* Rate My Product */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Rate My Product</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-8 h-8 cursor-pointer ${
                    rating > index ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRating(index)}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15l-3.293 1.734 0.636-3.718-2.7-2.634 3.732-0.544 1.625-3.3 1.625 3.3 3.732 0.544-2.7 2.634 0.636 3.718L10 15z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                onClick={() => navigate(`/product/${related.name}`, { state: { product: related } })}
              >
                {related.images?.[0] ? (
                  <img
                    src={related.images[0]}
                    alt={related.name}
                    className="h-40 w-full object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 rounded-md mb-2"></div>
                )}
                <h4 className="font-semibold text-gray-800">{related.name}</h4>
                <p className="text-green-700 font-bold">{related.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No related products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
