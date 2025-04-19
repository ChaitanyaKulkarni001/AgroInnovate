import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { products as allProducts } from "../data/Farmdata";

const ProductDetails = () => {
  const { name } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product || allProducts.find(p => p.name === name);

  if (!product) return <div className="p-10 text-center text-red-600">Product not found</div>;

  // Dummy data for reviews and related products
  const reviews = [
    { user: "John Doe", rating: 4, comment: "Great product, highly recommended!" },
    { user: "Jane Smith", rating: 5, comment: "Best quality organic seeds I have ever used!" },
    { user: "Mike Johnson", rating: 5, comment: "Excellent product for farming!" },
  ];

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.name !== product.name);

  // Specification details
  const specs = [
    { label: "Brand", value: "Organic Farms" },
    { label: "Weight", value: "500g" },
    { label: "Color", value: "Green" },
    { label: "Type", value: "Non-GMO" },
  ];

  // Seller info
  const sellerInfo = {
    name: "Green Earth Suppliers",
    rating: 4.5,
    contact: "contact@greenearthsuppliers.com",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 hover:text-green-800 transition duration-300"
      >
        ← Back to Products
      </button>

      {/* Product Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded-lg mb-6 md:mb-0"></div>

        <div>
          <h2 className="text-3xl font-semibold text-green-800 mb-4">{product.name}</h2>
          <p className="text-xl text-green-700 font-bold mb-2">{product.price}</p>
          <p className="text-gray-700 mb-6">Category: <strong>{product.category}</strong></p>
          <p className="text-gray-600 mb-6">
            This is a high-quality farm product, grown or manufactured with care. Ideal for sustainable farming and organic living.
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg mb-4 transition duration-300">
            Add to Cart
          </button>

          {/* Specifications Table */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Product Specifications</h3>
            <table className="w-full text-sm text-left text-gray-700">
              <tbody>
                {specs.map((spec, index) => (
                  <tr key={index}>
                    <td className="border-b p-2">{spec.label}</td>
                    <td className="border-b p-2">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Seller Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Seller Information</h3>
            <p className="text-gray-700">Name: {sellerInfo.name}</p>
            <p className="text-gray-700">Rating: {sellerInfo.rating} / 5</p>
            <p className="text-gray-700">Contact: {sellerInfo.contact}</p>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
                  <p className="text-lg font-semibold text-gray-800">{review.user}</p>
                  <p className="text-sm text-gray-600">{`Rating: ${review.rating} / 5`}</p>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product, idx) => (
              <div key={idx} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300">
                <div className="h-40 bg-gray-200 mb-4 rounded-md"></div>
                <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                <p className="text-green-700 font-bold">{product.price}</p>
                <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition duration-300">
                  View Details
                </button>
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
