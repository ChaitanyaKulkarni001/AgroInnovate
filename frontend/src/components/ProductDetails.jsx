// src/components/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [magnify, setMagnify] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  // Fetch product by PK
  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await api.get(`api/products/${id}`);
        setProduct(data);
        setMainImage(data.image1 || "");
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setProduct(undefined);
      }
    }
    fetchProduct();
  }, [id]);

  // Track mouse for zoom
  const handleMouseMove = (e) => {
    if (!magnify) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin({ x: `${x}%`, y: `${y}%` });
  };

  if (product === null) {
    return <div className="p-10 text-center">Loading…</div>;
  }
  if (product === undefined) {
    return <div className="p-10 text-center text-red-600">Product not found</div>;
  }

  // Collect all images
  const images = [product.image1, product.image2, product.image3]
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-green-600 hover:text-green-800"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-lg">
        {/* IMAGE COLUMN */}
        <div>
          <div
            className="relative overflow-hidden rounded-lg shadow-md"
            onMouseEnter={() => setMagnify(true)}
            onMouseLeave={() => {
              setMagnify(false);
              setOrigin({ x: "50%", y: "50%" });
            }}
            onMouseMove={handleMouseMove}
            style={{ height: 288 }}
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {magnify && (
              <div
                className="absolute top-0 left-full ml-4 w-96 h-96 border bg-white bg-no-repeat"
                style={{
                  backgroundImage: `url(${mainImage})`,
                  backgroundSize: "200% 200%",
                  backgroundPosition: `${origin.x} ${origin.y}`,
                }}
              />
            )}
          </div>

          {/* THUMBNAILS */}
          <div className="mt-4 flex space-x-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75"
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
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl text-green-700 font-semibold mb-4">
            ₹{product.discounted_price || product.original_price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-2">
            <strong>Available:</strong> {product.quantity_available} {product.unit}
          </p>
          <p className="mb-4">
            <strong>Farmer’s city:</strong>{" "}
            {product.farmer?.city?.name || "Unknown"}
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full mb-6">
            Add to Cart
          </button>

          {/* SPECIFICATIONS */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Specifications</h3>
              <table className="w-full text-sm text-left text-gray-700 border">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2 font-medium">{spec.label}</td>
                      <td className="p-2">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
