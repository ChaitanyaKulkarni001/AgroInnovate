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
  const [magnify, setMagnify] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = e => {
    if (!magnify) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <button onClick={() => navigate(-1)} className="mb-4 text-green-600 hover:text-green-800">
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE COLUMN */}
        <div className="relative">
          {/* main image container */}
          <div
            className="overflow-hidden rounded-lg shadow-md cursor-crosshair"
            onMouseEnter={() => setMagnify(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setMagnify(false);
              setOrigin({ x: "50%", y: "50%" });
            }}
            style={{ width: "100%", height: "288px" }}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* zoom pane */}
          {magnify && (
            <div
              className="absolute top-0 left-full ml-4 w-96 h-96 border-2 border-gray-200 shadow-lg bg-white z-50"
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundSize: "200% 200%",
                backgroundPosition: `${origin.x} ${origin.y}`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {/* thumbnails */}
          <div className="flex space-x-4 mt-4">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-75"
                onClick={() => {
                  setMainImage(img);
                  setMagnify(false);
                }}
              />
            ))}
          </div>
        </div>

        {/* DETAILS COLUMN */}
        <div>
          <h2 className="text-3xl font-semibold text-green-800 mb-4">{product.name}</h2>
          <p className="text-xl text-green-700 font-bold mb-2">{product.price}</p>
          <p className="text-gray-700 mb-6">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full mb-4">
            Add to Cart
          </button>

          {product.specifications && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Specifications</h3>
              <table className="w-full text-sm text-left text-gray-700">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td className="border-b p-2">{spec.label}</td>
                      <td className="border-b p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="border-t pt-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Seller Info</h3>
            <p>Name: Green Earth Suppliers</p>
            <p>Rating: 4.5 / 5</p>
            <p>Contact: contact@greenearthsuppliers.com</p>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
            {reviewVisible ? (
              <>
                {[
                  { user: "John Doe", rating: 4, comment: "Great product, highly recommended!" },
                  { user: "Jane Smith", rating: 5, comment: "Best quality organic seeds I have ever used!" },
                  { user: "Mike Johnson", rating: 5, comment: "Excellent product for farming!" },
                ].map((r, i) => (
                  <div key={i} className="mb-4 p-4 border rounded-lg">
                    <p className="font-semibold">{r.user}</p>
                    <p className="text-sm">Rating: {r.rating} / 5</p>
                    <p className="mt-2">{r.comment}</p>
                  </div>
                ))}
              </>
            ) : (
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => setReviewVisible(true)}
              >
                Show Reviews
              </button>
            )}
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-2xl font-semibold mb-4">Rate This Product</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`w-8 h-8 cursor-pointer ${
                    rating > i ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15l-3.293 1.734.636-3.718-2.7-2.634 3.732-.544L10 6l1.625 3.3 3.732.544-2.7 2.634.636 3.718z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-green-800 mb-6">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts
            .filter(p => p.category === product.category && p.name !== product.name)
            .map((r, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => navigate(`/product/${r.name}`, { state: { product: r } })}
              >
                {r.images?.[0] ? (
                  <img
                    src={r.images[0]}
                    alt={r.name}
                    className="h-40 w-full object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="h-40 bg-gray-200 rounded-md mb-2" />
                )}
                <h4 className="font-semibold text-gray-800">{r.name}</h4>
                <p className="text-green-700 font-bold">{r.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
